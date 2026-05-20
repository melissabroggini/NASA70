# Astronaut Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace real-time `fillText` calls with a pre-rendered sprite sheet to improve animation performance while maintaining identical visuals.

**Architecture:** A hidden offscreen canvas will be generated at startup, containing 50 opacity levels for both '●' and '○' symbols. Particles will store an index into this sprite sheet instead of a color string.

**Tech Stack:** Vanilla JavaScript, HTML5 Canvas API.

---

### Task 1: Sprite Sheet Generation

**Files:**
- Modify: `astronaut-anim.js` (Add helper function and global state)

- [ ] **Step 1: Add `spriteSheet` and `spriteSize` variables**
Add these to the top of the `DOMContentLoaded` listener.

```javascript
    let spriteSheet = null;
    const spriteSize = 12; // Sufficient for 8px font + padding
```

- [ ] **Step 2: Implement `createSymbolSprites` function**
This function will generate the offscreen canvas.

```javascript
    function createSymbolSprites() {
        const offCanvas = document.createElement('canvas');
        // 50 levels of opacity x 2 symbols (● and ○)
        offCanvas.width = spriteSize * 50;
        offCanvas.height = spriteSize * 2;
        const offCtx = offCanvas.getContext('2d');

        offCtx.font = 'bold 8px "Space Mono", monospace';
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';

        for (let i = 0; i < 50; i++) {
            let opacity = 0.02 + (i / 49) * 0.98;
            
            // Row 0: ●
            offCtx.clearRect(i * spriteSize, 0, spriteSize, spriteSize);
            offCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
            offCtx.fillText('●', i * spriteSize + spriteSize / 2, spriteSize / 2);

            // Row 1: ○
            offCtx.clearRect(i * spriteSize, spriteSize, spriteSize, spriteSize);
            offCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
            offCtx.fillText('○', i * spriteSize + spriteSize / 2, spriteSize + spriteSize / 2);
        }
        return offCanvas;
    }
```

- [ ] **Step 3: Initialize the sprite sheet**
Call this function inside the `DOMContentLoaded` listener, before `initParticles`.

```javascript
    spriteSheet = createSymbolSprites();
```

- [ ] **Step 4: Commit**
```bash
git add astronaut-anim.js
git commit -m "perf: add sprite sheet generation logic"
```

---

### Task 2: Refactor Particle Initialization

**Files:**
- Modify: `astronaut-anim.js` (Update `sampleElement` inside `initParticles`)

- [ ] **Step 1: Update particle object properties**
Change how particles are created to store `symbolType` and `opacityIndex`.

```javascript
                        // OLD:
                        // char: Math.random() > 0.5 ? '●' : '○',
                        // color: `rgba(0, 0, 0, ${opacity})`,
                        
                        // NEW:
                        let opacityIndex = Math.floor(opacity * 49);
                        if (opacityIndex < 0) opacityIndex = 0;
                        if (opacityIndex > 49) opacityIndex = 49;

                        particles.push({
                            homeX: gx,
                            homeY: gy,
                            escapeX: escapeX,
                            escapeY: escapeY,
                            x: escapeX,
                            y: escapeY,
                            phaseOffset: Math.random() * 0.15,
                            symbolType: Math.random() > 0.5 ? 0 : 1, // 0 for ●, 1 for ○
                            opacityIndex: opacityIndex,
                            noiseOffset: Math.random() * Math.PI * 2
                        });
```

- [ ] **Step 2: Commit**
```bash
git add astronaut-anim.js
git commit -m "perf: refactor particle initialization to use opacity indexes"
```

---

### Task 3: Update Animation Loop

**Files:**
- Modify: `astronaut-anim.js` (Update `animate` function)

- [ ] **Step 1: Update glitch logic**
Switch from character updates to `symbolType` updates.

```javascript
            // Glitch dei caratteri
            if (Math.random() > 0.95) {
                p.symbolType = Math.random() > 0.5 ? 0 : 1;
            }
```

- [ ] **Step 2: Replace `fillText` with `drawImage`**
Update the rendering at the end of the loop.

```javascript
            // ctx.fillStyle = p.color;
            // ctx.fillText(p.char, p.x, p.y);
            
            ctx.drawImage(
                spriteSheet,
                p.opacityIndex * spriteSize,
                p.symbolType * spriteSize,
                spriteSize,
                spriteSize,
                p.x - spriteSize / 2,
                p.y - spriteSize / 2,
                spriteSize,
                spriteSize
            );
```

- [ ] **Step 3: Remove unnecessary context settings**
Remove `ctx.font`, `ctx.textAlign`, and `ctx.textBaseline` from the `animate` loop since they are no longer needed for `drawImage`.

- [ ] **Step 4: Commit**
```bash
git add astronaut-anim.js
git commit -m "perf: use drawImage with sprite sheet in animation loop"
```

---

### Task 4: Verification

- [ ] **Step 1: Verify visual identicality**
Open `index.html` (or the relevant page) and ensure the astronaut still forms correctly with '●' and '○' and the motion is identical.

- [ ] **Step 2: Verify performance improvement**
Check the browser's DevTools Performance tab or observe the smoothness on a mobile device.

- [ ] **Step 3: Commit final cleanup**
```bash
git add astronaut-anim.js
git commit -m "perf: complete astronaut animation optimization"
```
