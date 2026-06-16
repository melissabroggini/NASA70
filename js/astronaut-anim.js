document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const imageIds = ['sourceImage0', 'sourceImage1', 'sourceImage2', 'sourceImage3'];
    const sourceImages = imageIds.map(id => document.getElementById(id));
    if (!canvas || sourceImages.some(img => !img)) return;

    const worker = new Worker('js/astronaut-worker.js');
    const offscreen = canvas.transferControlToOffscreen();

    let cachedImages = null;

    function loadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img);
            img.src = src;
        });
    }

    Promise.all(sourceImages.map(imgEl => loadImage(imgEl.src))).then((loadedImages) => {
        cachedImages = loadedImages;
        setTimeout(() => {
            initParticles();
        }, 100);
    });

    function initParticles() {
        if (!cachedImages) return;
        const w = canvas.offsetWidth || 596;
        const h = canvas.offsetHeight || 596;

        const isMobile = window.innerWidth < 768;
        const targetParticles = isMobile ? 6000 : 12000;
        const step = isMobile ? 2.5 : 1.5; // Density step: smaller for higher resolution

        // Helper function to sample an image to raw coordinates
        function sampleElement(img) {
            const nw = img.naturalWidth || 1000;
            const nh = img.naturalHeight || 1000;
            if (!nw || !nh) return [];
            
            // Draw image to a standard base width for density consistency
            const baseSize = 500;
            const drawW = baseSize;
            const drawH = Math.ceil(drawW * (nh / nw));
            
            const elCanvas = document.createElement('canvas');
            elCanvas.width = drawW;
            elCanvas.height = drawH;
            const elCtx = elCanvas.getContext('2d');
            elCtx.drawImage(img, 0, 0, drawW, drawH);
            
            const imgData = elCtx.getImageData(0, 0, drawW, drawH).data;

            function sampleNeighborhood(cx, cy, radius) {
                let hasOpaquePixel = false;
                let totalLuminance = 0;
                let totalCount = 0;

                for (let dy = -radius; dy <= radius; dy++) {
                    for (let dx = -radius; dx <= radius; dx++) {
                        let sx = Math.round(cx + dx);
                        let sy = Math.round(cy + dy);
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

                        hasOpaquePixel = true;
                    }
                }

                return {
                    found: hasOpaquePixel,
                    avgLuminance: totalCount > 0 ? totalLuminance / totalCount : 255
                };
            }

            const coords = [];
            let minLum = Infinity;
            let maxLum = -Infinity;

            for (let ly = 0; ly < drawH; ly += step) {
                for (let lx = 0; lx < drawW; lx += step) {
                    let sample = sampleNeighborhood(lx, ly, 1); // radius = 1 for ultra-sharp details (no blur)

                    if (sample.found) {
                        const lum = sample.avgLuminance;
                        if (lum < minLum) minLum = lum;
                        if (lum > maxLum) maxLum = lum;

                        coords.push({
                            rawX: lx,
                            rawY: ly,
                            rawLum: lum
                        });
                    }
                }
            }

            if (coords.length === 0) {
                // Fallback in case no coords were found
                const fallbackCoords = [];
                for (let i = 0; i < targetParticles; i++) {
                    fallbackCoords.push({ rawX: drawW / 2, rawY: drawH / 2, opacityIndex: 0 });
                }
                return fallbackCoords;
            }

            const selected = [];
            const stepSize = coords.length / targetParticles;
            for (let i = 0; i < targetParticles; i++) {
                const idx = Math.min(Math.floor(i * stepSize), coords.length - 1);
                selected.push(coords[idx]);
            }

            const lumRange = maxLum - minLum;
            const tempOpacities = selected.map(pt => {
                const normalizedLum = lumRange > 0 ? (pt.rawLum - minLum) / lumRange : 1.0;
                return 0.05 + Math.pow(normalizedLum, 2.5) * 0.70;
            });

            const currentSum = tempOpacities.reduce((sum, val) => sum + val, 0);
            const targetSum = targetParticles * 0.28; // Target average opacity of 0.28 (bright but structured)
            const scaleFactor = targetSum / currentSum;

            return selected.map((pt, idx) => {
                let opacity = tempOpacities[idx] * scaleFactor;
                // Clamp between 0.02 and 0.75 to prevent overexposure
                opacity = Math.max(0.02, Math.min(opacity, 0.75));

                let opacityIndex = Math.min(Math.floor(opacity * 50), 49);
                if (opacityIndex < 0) opacityIndex = 0;

                return {
                    rawX: pt.rawX,
                    rawY: pt.rawY,
                    opacityIndex: opacityIndex
                };
            });
        }

        const allRawCoords = cachedImages.map(img => sampleElement(img));
        
        // Define target physical height in layout pixels to remain compact
        const targetShapeHeight = 450;
        
        const allSampledCoords = allRawCoords.map((rawCoords) => {
            if (rawCoords.length === 0) return [];
            
            // Find the bounding box of the physical shape (excluding transparent borders)
            let minY = Infinity, maxY = -Infinity;
            let minX = Infinity, maxX = -Infinity;
            
            for (let i = 0; i < rawCoords.length; i++) {
                const pt = rawCoords[i];
                if (pt.rawY < minY) minY = pt.rawY;
                if (pt.rawY > maxY) maxY = pt.rawY;
                if (pt.rawX < minX) minX = pt.rawX;
                if (pt.rawX > maxX) maxX = pt.rawX;
            }
            
            const rawWidth = maxX - minX;
            const rawHeight = maxY - minY;
            if (rawHeight <= 0) return [];
            
            // Scale factor to make all physical shape heights exactly equal to targetShapeHeight
            const scaleFactor = targetShapeHeight / rawHeight;
            
            // Calculate center point of the physical shape bounds
            const midRawX = (minX + maxX) / 2;
            const midRawY = (minY + maxY) / 2;
            
            // Center of the canvas
            const canvasCenterX = w / 2;
            const canvasCenterY = h / 2;
            
            // Map raw coordinates to centered and scaled canvas coordinates
            return rawCoords.map((pt) => {
                const x = canvasCenterX + (pt.rawX - midRawX) * scaleFactor;
                const y = canvasCenterY + (pt.rawY - midRawY) * scaleFactor;
                return {
                    x: x,
                    y: y,
                    opacityIndex: pt.opacityIndex
                };
            });
        });

        const maxParticles = Math.max(...allSampledCoords.map(c => c.length));

        // Generate static shared properties for all particle slots
        const phaseOffsets = new Float32Array(maxParticles);
        const noiseOffsets = new Float32Array(maxParticles);
        const escapeXs = new Float32Array(maxParticles);
        const escapeYs = new Float32Array(maxParticles);

        for (let i = 0; i < maxParticles; i++) {
            phaseOffsets[i] = Math.random() * 0.15;
            noiseOffsets[i] = Math.random() * Math.PI * 2;
            escapeXs[i] = Math.random() * w;
            escapeYs[i] = Math.random() * h;
        }

        // Build a buffer for each image
        const buffers = allSampledCoords.map((coords) => {
            const tempParticles = new Float32Array(maxParticles * 8);
            for (let i = 0; i < maxParticles; i++) {
                const base = i * 8;
                let homeX = 0;
                let homeY = 0;
                let opacityIndex = 0; // invisible for extra particles
                let symbolType = Math.random() > 0.5 ? 0 : 1;

                if (i < coords.length) {
                    homeX = coords[i].x;
                    homeY = coords[i].y;
                    opacityIndex = coords[i].opacityIndex;
                }

                tempParticles[base + 0] = homeX;
                tempParticles[base + 1] = homeY;
                tempParticles[base + 2] = escapeXs[i];
                tempParticles[base + 3] = escapeYs[i];
                tempParticles[base + 4] = phaseOffsets[i];
                tempParticles[base + 5] = symbolType;
                tempParticles[base + 6] = opacityIndex;
                tempParticles[base + 7] = noiseOffsets[i];
            }
            return tempParticles;
        });

        const transferBuffers = buffers.map(b => b.buffer);

        if (!canvas._initialized) {
            worker.postMessage({ 
                type: 'init', 
                canvas: offscreen, 
                buffers: buffers,
                width: w,
                height: h
            }, [offscreen, ...transferBuffers]);
            canvas._initialized = true;
        } else {
            worker.postMessage({ 
                type: 'updateBuffers', 
                buffers: buffers,
                width: w,
                height: h
            }, transferBuffers);
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initParticles();
        }, 200);
    });
});
