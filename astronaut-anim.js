document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const sourceImage = document.getElementById('sourceImage');
    if (!canvas || !sourceImage) return;

    const worker = new Worker('astronaut-worker.js');
    const offscreen = canvas.transferControlToOffscreen();

    const img = new Image();
    
    img.onload = () => {
        setTimeout(() => {
            initParticles();
        }, 100);
    };

    img.src = sourceImage.src;

    function initParticles() {
        const w = canvas.offsetWidth || 596;
        const h = canvas.offsetHeight || 596;

        const isMobile = window.innerWidth < 768;
        const step = isMobile ? 7 : 5; // density step

        const tempParticles = [];

        function sampleElement(img) {
            const nw = img.naturalWidth || 4267;
            const nh = img.naturalHeight || 3200;
            if (!nw || !nh) return;
            
            // Base layout size for the visual logo is 596
            const baseSize = 596;
            const scale = 0.8; 
            const drawW = Math.ceil(baseSize * scale);
            const drawH = Math.ceil(drawW * (nh / nw));
            
            const elCanvas = document.createElement('canvas');
            elCanvas.width = drawW;
            elCanvas.height = drawH;
            const elCtx = elCanvas.getContext('2d');
            elCtx.drawImage(img, 0, 0, drawW, drawH);
            
            const imgData = elCtx.getImageData(0, 0, drawW, drawH).data;
            
            const offsetX = (w - drawW) / 2;
            const offsetY = (h - drawH) / 2;

            function sampleNeighborhood(cx, cy, radius) {
                let hasDarkPixel = false;
                let totalLuminance = 0;
                let totalCount = 0;

                for (let dy = -radius; dy <= radius; dy++) {
                    for (let dx = -radius; dx <= radius; dx++) {
                        let sx = cx + dx;
                        let sy = cy + dy;
                        if (sx < 0 || sx >= drawW || sy < 0 || sy >= drawH) continue;

                        let idx = (sy * drawW + sx) * 4;
                        let pa = imgData[idx + 3];
                        if (pa < 10) continue;

                        let pr = imgData[idx];
                        let pg = imgData[idx + 1];
                        let pb = imgData[idx + 2];
                        let lum = 0.299 * pr + 0.587 * pg + 0.114 * pb;

                        totalLuminance += lum;
                        totalCount++;

                        if (lum < 230) hasDarkPixel = true;
                    }
                }

                return {
                    found: hasDarkPixel,
                    avgLuminance: totalCount > 0 ? totalLuminance / totalCount : 255
                };
            }

            for (let ly = 0; ly < drawH; ly += step) {
                for (let lx = 0; lx < drawW; lx += step) {
                    let sample = sampleNeighborhood(lx, ly, 3);

                    if (sample.found) {
                        let normalizedLum = sample.avgLuminance / 255;
                        let opacity = 1.0 - normalizedLum * 0.88;
                        let opacityIndex = Math.min(Math.floor(opacity * 50), 49);
                        if (opacityIndex < 0) opacityIndex = 0;

                        let gx = offsetX + lx;
                        let gy = offsetY + ly;

                        let escapeX = Math.random() * w;
                        let escapeY = Math.random() * h;

                        tempParticles.push(
                            gx, gy,            // homeX, homeY
                            escapeX, escapeY,  // escapeX, escapeY
                            Math.random() * 0.15, // phaseOffset
                            Math.random() > 0.5 ? 0 : 1, // symbolType
                            opacityIndex,      // opacityIndex
                            Math.random() * Math.PI * 2 // noiseOffset
                        );
                    }
                }
            }
        }

        sampleElement(sourceImage);

        const particlesBuffer = new Float32Array(tempParticles);
        
        if (!canvas._initialized) {
            worker.postMessage({ 
                type: 'init', 
                canvas: offscreen, 
                buffer: particlesBuffer,
                width: w,
                height: h
            }, [offscreen, particlesBuffer.buffer]);
            canvas._initialized = true;
        } else {
            worker.postMessage({ 
                type: 'updateBuffer', 
                buffer: particlesBuffer,
                width: w,
                height: h
            }, [particlesBuffer.buffer]);
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initParticles();
        }, 200);
    });
    
    // In case the image is already cached and loaded
    if (sourceImage.complete) {
        initParticles();
    }
});
