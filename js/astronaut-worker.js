/**
 * astronaut-worker.js
 * Web Worker for NASA 70 Astronaut Animation
 */

let canvas, ctx, spriteSheet;
const spriteSize = 12;
let particlesBuffer; // Float32Array
let buffers = [];    // Array of Float32Array templates
let currentImageIndex = 0;
let hasSwappedThisCycle = false;
let globalTimer = 10000;
let lastTime = 0;
const CYCLE_DURATION = 20000;
const STRIDE = 8;

/**
 * Message Handler
 */
onmessage = function(e) {
    const { type, ...payload } = e.data;
    
    if (type === 'init') {
        canvas = payload.canvas;
        if (payload.width) canvas.width = payload.width;
        if (payload.height) canvas.height = payload.height;
        ctx = canvas.getContext('2d', { alpha: true });
        buffers = payload.buffers;
        currentImageIndex = buffers.length - 1;
        particlesBuffer = new Float32Array(buffers[currentImageIndex]);
        
        createSymbolSprites();
        requestAnimationFrame(animate);
    } else if (type === 'updateBuffers') {
        if (payload.width) canvas.width = payload.width;
        if (payload.height) canvas.height = payload.height;
        buffers = payload.buffers;
        particlesBuffer = new Float32Array(buffers[currentImageIndex]);
    }
};

/**
 * Generates the symbol sprite sheet using OffscreenCanvas
 */
function createSymbolSprites() {
    const offCanvas = new OffscreenCanvas(spriteSize * 50, spriteSize * 2);
    const offCtx = offCanvas.getContext('2d');

    offCtx.font = 'bold 6px "DM Mono", monospace';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';

    for (let i = 0; i < 50; i++) {
        let opacity = 0.02 + (i / 49) * 0.98;
        
        // Row 0: ●
        offCtx.clearRect(i * spriteSize, 0, spriteSize, spriteSize);
        offCtx.fillStyle = `rgba(226, 226, 226, ${opacity})`;
        offCtx.fillText('●', i * spriteSize + spriteSize / 2, spriteSize / 2);

        // Row 1: ○
        offCtx.clearRect(i * spriteSize, spriteSize, spriteSize, spriteSize);
        offCtx.fillStyle = `rgba(226, 226, 226, ${opacity})`;
        offCtx.fillText('○', i * spriteSize + spriteSize / 2, spriteSize + spriteSize / 2);
    }
    spriteSheet = offCanvas.transferToImageBitmap();
}

/**
 * Smooth transition curve
 */
function smoothPulse(t) {
    if (t < 0.25) {
        return 0;
    } else if (t < 0.50) {
        let phase = (t - 0.25) / 0.25;
        return (1 - Math.cos(phase * Math.PI)) / 2;
    } else if (t < 0.75) {
        return 1;
    } else {
        let phase = (t - 0.75) / 0.25;
        return (1 + Math.cos(phase * Math.PI)) / 2;
    }
}

/**
 * Main Animation Loop
 */
function animate(currentTime) {
    requestAnimationFrame(animate);

    if (!lastTime) lastTime = currentTime;
    let dt = currentTime - lastTime;
    lastTime = currentTime;

    if (dt > 100) dt = 16.66;
    let dtSec = dt / 1000;

    if (!ctx || !particlesBuffer) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    globalTimer += dt;
    let cycleProgress = (globalTimer % CYCLE_DURATION) / CYCLE_DURATION;

    let fromIndex = currentImageIndex;
    let toIndex = (currentImageIndex + 1) % buffers.length;
    let transitionT = 0;

    // Transition logic: swap target image during the fully scattered phase [0.45, 0.55]
    if (buffers && buffers.length > 0) {
        if (cycleProgress >= 0.45 && cycleProgress <= 0.55) {
            transitionT = (cycleProgress - 0.45) / 0.10;
            
            // Swap home coordinates and symbol types at the midpoint of transition
            if (cycleProgress >= 0.50 && !hasSwappedThisCycle) {
                const nextBuffer = buffers[toIndex];
                const count = particlesBuffer.length / STRIDE;
                for (let i = 0; i < count; i++) {
                    const base = i * STRIDE;
                    particlesBuffer[base + 0] = nextBuffer[base + 0]; // homeX
                    particlesBuffer[base + 1] = nextBuffer[base + 1]; // homeY
                    particlesBuffer[base + 5] = nextBuffer[base + 5]; // symbolType
                }
                hasSwappedThisCycle = true;
            }
        } else if (cycleProgress > 0.55) {
            // Finalize transition
            if (hasSwappedThisCycle) {
                currentImageIndex = (currentImageIndex + 1) % buffers.length;
                hasSwappedThisCycle = false;
            }
            fromIndex = currentImageIndex;
            toIndex = currentImageIndex;
            transitionT = 0;
        } else {
            // Before transition window (cycleProgress < 0.45)
            hasSwappedThisCycle = false;
            fromIndex = currentImageIndex;
            toIndex = currentImageIndex;
            transitionT = 0;
        }
    }

    const count = particlesBuffer.length / STRIDE;

    for (let i = 0; i < count; i++) {
        const base = i * STRIDE;
        
        // Stride Layout:
        // 0: homeX, 1: homeY, 2: escapeX, 3: escapeY, 
        // 4: phaseOffset, 5: symbolType, 6: opacityIndex, 7: noiseOffset
        
        let homeX = particlesBuffer[base + 0];
        let homeY = particlesBuffer[base + 1];
        let escapeX = particlesBuffer[base + 2];
        let escapeY = particlesBuffer[base + 3];
        let phaseOffset = particlesBuffer[base + 4];
        let symbolType = particlesBuffer[base + 5];
        
        // Interpolate opacity index during transition
        let opacityIndex;
        if (transitionT > 0) {
            const op1 = buffers[fromIndex][base + 6];
            const op2 = buffers[toIndex][base + 6];
            opacityIndex = Math.round(op1 + (op2 - op1) * transitionT);
        } else {
            opacityIndex = buffers[currentImageIndex][base + 6];
        }

        let noiseOffset = particlesBuffer[base + 7];

        // Glitch dei caratteri
        if (Math.random() > 0.95) {
            symbolType = Math.random() > 0.5 ? 0 : 1;
            particlesBuffer[base + 5] = symbolType;
        }

        let particleProgress = (cycleProgress + phaseOffset) % 1.0;
        let displacement = smoothPulse(particleProgress);

        let renderX, renderY;

        if (displacement >= 0.999) {
            // === FASE LIBERA: campo di flusso organico ===
            let flowScale = 0.002;
            let timeScale = globalTimer * 0.0004;

            let flowAngle =
                Math.sin(escapeX * flowScale + timeScale) * 2.0 +
                Math.cos(escapeY * flowScale * 0.7 + timeScale * 1.3) * 1.5 +
                Math.sin((escapeX + escapeY) * flowScale * 0.5 + timeScale * 0.8 + noiseOffset) * 1.0;

            let speed = 90 + Math.sin(globalTimer * 0.001 + noiseOffset) * 30;

            escapeX += Math.cos(flowAngle) * speed * dtSec;
            escapeY += Math.sin(flowAngle) * speed * dtSec;

            // Update buffer with new escape values
            particlesBuffer[base + 2] = escapeX;
            particlesBuffer[base + 3] = escapeY;

            renderX = escapeX;
            renderY = escapeY;

        } else if (displacement <= 0.001) {
            // === FASE FERMA: perfettamente a casa ===
            renderX = homeX;
            renderY = homeY;
            
            // Reset escape point to home for next dissolution cycle
            if (escapeX !== homeX || escapeY !== homeY) {
                particlesBuffer[base + 2] = homeX;
                particlesBuffer[base + 3] = homeY;
            }

        } else {
            // === FASI DI TRANSIZIONE (dissoluzione / ricomposizione) ===
            renderX = homeX + (escapeX - homeX) * displacement;
            renderY = homeY + (escapeY - homeY) * displacement;

            // Durante la dissoluzione, inizia a muovere l'escape point
            if (particleProgress > 0.25 && particleProgress < 0.5) {
                let flowScale = 0.002;
                let timeScale = globalTimer * 0.0004;
                let flowAngle =
                    Math.sin(escapeX * flowScale + timeScale) * 2.0 +
                    Math.cos(escapeY * flowScale * 0.7 + timeScale * 1.3) * 1.5;

                let speed = 120 * displacement;
                escapeX += Math.cos(flowAngle) * speed * dtSec;
                escapeY += Math.sin(flowAngle) * speed * dtSec;
                
                particlesBuffer[base + 2] = escapeX;
                particlesBuffer[base + 3] = escapeY;
            }
        }

        // Rendering using sprite sheet
        ctx.drawImage(
            spriteSheet,
            opacityIndex * spriteSize,
            symbolType * spriteSize,
            spriteSize,
            spriteSize,
            renderX - spriteSize / 2,
            renderY - spriteSize / 2,
            spriteSize,
            spriteSize
        );
    }
}
