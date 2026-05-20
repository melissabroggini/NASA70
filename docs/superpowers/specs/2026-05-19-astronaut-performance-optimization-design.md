# Design: Astronaut Animation Performance Optimization (Pre-rendered Sprites)

## Overview
The current `astronaut-anim.js` relies on `ctx.fillText()` to draw thousands of particles per frame. Text rendering in Canvas is computationally expensive because the browser must rasterize vectors into pixels for every single call. To achieve high performance while maintaining the exact visual appearance, we will transition to a pre-rendered sprite-based approach.

## Objectives
- **Performance:** Dramatically reduce CPU usage by replacing text rendering with `drawImage`.
- **Visual Fidelity:** Maintain identical appearance using 50 levels of opacity for both '●' and '○' symbols.
- **Maintainability:** Keep the existing organic flow and cycle logic intact.

## Technical Architecture

### 1. Sprite Sheet Generation
At startup, we will generate an offscreen "sprite sheet" canvas.
- **Structure:** Two rows (one for '●', one for '○'), each containing 50 steps of opacity (from 0.02 to 1.0).
- **Size:** Each sprite will be approximately 10x10 pixels (to accommodate the 8px font with some padding).

### 2. Particle Data Structure Change
The `particles` array will be updated:
- **OLD:** `p.color` (string like `rgba(0,0,0,0.5)`), `p.char` ('●' or '○').
- **NEW:** `p.opacityIndex` (integer 0-49), `p.symbolType` (0 for '●', 1 for '○').

### 3. Rendering Logic
The `animate` function will be modified:
- **Old call:** `ctx.fillText(p.char, p.x, p.y)`
- **New call:** `ctx.drawImage(spriteSheet, p.opacityIndex * spriteSize, p.symbolType * spriteSize, spriteSize, spriteSize, p.x - offset, p.y - offset, spriteSize, spriteSize)`

## Implementation Steps

### Step 1: Pre-calculation Function
Create a `createSymbolSprites()` function that:
1. Creates a `canvas` element in memory.
2. Loops 50 times to draw '●' and 50 times for '○' at incremental opacities.
3. Returns the canvas and coordinate mapping.

### Step 2: Update Initialization
Modify `initParticles` to:
1. Call `createSymbolSprites`.
2. Map the sampled luminance directly to an `opacityIndex` (0-49) instead of a CSS string.

### Step 3: Update Animation Loop
Modify the loop in `animate` to use the pre-rendered sprites. The glitch logic will now toggle `p.symbolType` between 0 and 1.

## Success Criteria
- **Visuals:** The animation must look identical to the current version.
- **Framerate:** Significant improvement in FPS, especially on lower-end devices or mobile.
- **Loading:** Negligible impact on startup time (drawing 100 small symbols is near-instant).
