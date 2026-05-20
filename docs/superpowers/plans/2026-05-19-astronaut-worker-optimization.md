# Astronaut Worker Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Offload the astronaut animation math and rendering to a Web Worker using Typed Arrays for maximum performance.

**Architecture:** `astronaut-anim.js` (Main Thread) handles image sampling and data prep. `astronaut-worker.js` (Worker) handles physics and canvas drawing via `OffscreenCanvas`.

**Tech Stack:** Vanilla JavaScript, Web Workers, OffscreenCanvas, Typed Arrays.

---

### Task 1: Create the Web Worker Skeleton

**Files:**
- Create: `astronaut-worker.js`

- [ ] **Step 1: Implement the message listener and basic structure**

```javascript
// astronaut-worker.js
let canvas, ctx, spriteSheet;
let spriteSize = 12;
let particlesBuffer; // Float32Array
let globalTimer = 10000;
let lastTime = 0;
const CYCLE_DURATION = 20000;

self.onmessage = function(e) {
    if (e.data.type === 'init') {
        canvas = e.data.canvas;
        ctx = canvas.getContext('2d');
        particlesBuffer = e.data.buffer;
        spriteSheet = createSymbolSprites();
        requestAnimationFrame(animate);
    }
};

function createSymbolSprites() {
    // Ported from previous optimization
    const offCanvas = new OffscreenCanvas(spriteSize * 50, spriteSize * 2);
    const offCtx = offCanvas.getContext('2d');
    offCtx.font = 'bold 8px "Space Mono", monospace';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    for (let i = 0; i < 50; i++) {
        let opacity = 0.02 + (i / 49) * 0.98;
        offCtx.clearRect(i * spriteSize, 0, spriteSize, spriteSize);
        offCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        offCtx.fillText('●', i * spriteSize + spriteSize / 2, spriteSize / 2);
        offCtx.clearRect(i * spriteSize, spriteSize, spriteSize, spriteSize);
        offCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        offCtx.fillText('○', i * spriteSize + spriteSize / 2, spriteSize + spriteSize / 2);
    }
    return offCanvas;
}
```

- [ ] **Step 2: Port math and animation functions**

```javascript
function smoothPulse(t) {
    if (t < 0.25) return 0;
    else if (t < 0.50) {
        let phase = (t - 0.25) / 0.25;
        return (1 - Math.cos(phase * Math.PI)) / 2;
    } else if (t < 0.75) return 1;
    else {
        let phase = (t - 0.75) / 0.25;
        return (1 + Math.cos(phase * Math.PI)) / 2;
    }
}

function animate(currentTime) {
    requestAnimationFrame(animate);
    if (!lastTime) lastTime = currentTime;
    let dt = currentTime - lastTime;
    lastTime = currentTime;
    if (dt > 100) dt = 16.66;
    let dtSec = dt / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    globalTimer += dt;
    let cycleProgress = (globalTimer % CYCLE_DURATION) / CYCLE_DURATION;

    const stride = 8;
    for (let i = 0; i < particlesBuffer.length; i += stride) {
        // Read from buffer
        let homeX = particlesBuffer[i];
        let homeY = particlesBuffer[i + 1];
        let escapeX = particlesBuffer[i + 2];
        let escapeY = particlesBuffer[i + 3];
        let phaseOffset = particlesBuffer[i + 4];
        let symbolType = particlesBuffer[i + 5];
        let opacityIndex = particlesBuffer[i + 6];
        let noiseOffset = particlesBuffer[i + 7];

        if (Math.random() > 0.95) {
            symbolType = Math.random() > 0.5 ? 0 : 1;
            particlesBuffer[i + 5] = symbolType; // Write back glitch
        }

        let particleProgress = (cycleProgress + phaseOffset) % 1.0;
        let displacement = smoothPulse(particleProgress);
        let x, y;

        if (displacement >= 0.999) {
            let flowScale = 0.002;
            let timeScale = globalTimer * 0.0004;
            let flowAngle = Math.sin(escapeX * flowScale + timeScale) * 2.0 +
                             Math.cos(escapeY * flowScale * 0.7 + timeScale * 1.3) * 1.5 +
                             Math.sin((escapeX + escapeY) * flowScale * 0.5 + timeScale * 0.8 + noiseOffset) * 1.0;
            let speed = 90 + Math.sin(globalTimer * 0.001 + noiseOffset) * 30;
            escapeX += Math.cos(flowAngle) * speed * dtSec;
            escapeY += Math.sin(flowAngle) * speed * dtSec;
            x = escapeX; y = escapeY;
            particlesBuffer[i + 2] = escapeX; // Write back
            particlesBuffer[i + 3] = escapeY;
        } else if (displacement <= 0.001) {
            x = homeX; y = homeY;
            escapeX = homeX; escapeY = homeY;
            particlesBuffer[i + 2] = escapeX;
            particlesBuffer[i + 3] = escapeY;
        } else {
            x = homeX + (escapeX - homeX) * displacement;
            y = homeY + (escapeY - homeY) * displacement;
            if (particleProgress > 0.25 && particleProgress < 0.5) {
                let flowScale = 0.002;
                let timeScale = globalTimer * 0.0004;
                let flowAngle = Math.sin(escapeX * flowScale + timeScale) * 2.0 +
                                 Math.cos(escapeY * flowScale * 0.7 + timeScale * 1.3) * 1.5;
                let speed = 120 * displacement;
                escapeX += Math.cos(flowAngle) * speed * dtSec;
                escapeY += Math.sin(flowAngle) * speed * dtSec;
                particlesBuffer[i + 2] = escapeX;
                particlesBuffer[i + 3] = escapeY;
            }
        }

        ctx.drawImage(spriteSheet, opacityIndex * spriteSize, symbolType * spriteSize, spriteSize, spriteSize, x - spriteSize / 2, y - spriteSize / 2, spriteSize, spriteSize);
    }
}
```

- [ ] **Step 3: Commit**
```bash
git add astronaut-worker.js
git commit -m "feat: create astronaut worker skeleton"
```

---

### Task 2: Refactor Main Thread to use Worker and Typed Arrays

**Files:**
- Modify: `astronaut-anim.js`

- [ ] **Step 1: Setup Worker communication and Canvas transfer**

```javascript
    // astronaut-anim.js inside DOMContentLoaded
    const canvas = document.getElementById('astronautCanvas');
    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker('astronaut-worker.js');
    
    // Global particles as Typed Array
    let particlesData; 
```

- [ ] **Step 2: Update `sampleElement` to populate Typed Array**

```javascript
            // Instead of particles.push({...})
            // We need to count first or pre-allocate a large buffer
            // Let's use a temporary array and convert it
            let tempParticles = [];
            // ... logic to push to tempParticles ...
            
            // After all sampling:
            particlesData = new Float32Array(tempParticles.length * 8);
            for(let i=0; i<tempParticles.length; i++) {
                let p = tempParticles[i];
                particlesData[i*8 + 0] = p.homeX;
                particlesData[i*8 + 1] = p.homeY;
                particlesData[i*8 + 2] = p.escapeX;
                particlesData[i*8 + 3] = p.escapeY;
                particlesData[i*8 + 4] = p.phaseOffset;
                particlesData[i*8 + 5] = p.symbolType;
                particlesData[i*8 + 6] = p.opacityIndex;
                particlesData[i*8 + 7] = p.noiseOffset;
            }
```

- [ ] **Step 3: Send data to Worker**

```javascript
    worker.postMessage({
        type: 'init',
        canvas: offscreen,
        buffer: particlesData
    }, [offscreen]); // Transfer ownership of canvas
```

- [ ] **Step 4: Cleanup redundant logic in `astronaut-anim.js`**
Remove `animate`, `smoothPulse`, `createSymbolSprites`, and the particle drawing loop from the main file.

- [ ] **Step 5: Commit**
```bash
git add astronaut-anim.js
git commit -m "perf: migrate animation logic to web worker"
```

---

### Task 3: Handle Window Resizing

**Files:**
- Modify: `astronaut-anim.js`
- Modify: `astronaut-worker.js`

- [ ] **Step 1: Send resize message from Main Thread**
Update the resize listener in `astronaut-anim.js`.

```javascript
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Need to re-init everything because image coordinates changed
            initParticles(); 
        }, 200);
    });
```

- [ ] **Step 2: Handle re-init in Worker**
Add a message type to update the buffer in `astronaut-worker.js`.

```javascript
    if (e.data.type === 'updateBuffer') {
        particlesBuffer = e.data.buffer;
    }
```

- [ ] **Step 3: Commit**
```bash
git add astronaut-anim.js astronaut-worker.js
git commit -m "feat: handle resizing with web worker"
```

---

### Task 4: Verification

- [ ] **Step 1: Test animation playback**
Ensure the astronaut still dissolves and re-forms exactly as before.

- [ ] **Step 2: Check Main Thread load**
Verify that scrolling is smooth while the animation is running.

- [ ] **Step 3: Commit final optimization**
```bash
git commit -m "perf: complete web worker and typed array optimization"
```
