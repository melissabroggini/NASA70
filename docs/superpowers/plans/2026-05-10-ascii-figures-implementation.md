# B&W ASCII Project Figures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace colored pixel art and asteroid figures with a unified black and white procedural ASCII system.

**Architecture:** Create a central `generateAsciiFigure(seed)` function that uses a canvas to draw procedural geometry and then maps pixel intensity to ASCII characters.

**Tech Stack:** JavaScript (Vanilla), HTML5 Canvas.

---

### Task 1: Refactor `projects-scroll.js` Structure

**Files:**
- Modify: `projects-scroll.js`

- [ ] **Step 1: Remove legacy generation functions**

Remove `generatePixelArt` and `generateAsciiAsteroid`.

- [ ] **Step 2: Prepare the `generateAsciiFigure` skeleton**

```javascript
function generateAsciiFigure(seed) {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 500, 500);

    // TODO: Implementation in Task 2
    return canvas;
}
```

- [ ] **Step 3: Update `projectImages` initialization**

```javascript
const projectImages = projects.map((p, i) => {
    return generateAsciiFigure(i * 100 + 42);
});
```

- [ ] **Step 4: Commit**

```bash
git add projects-scroll.js
git commit -m "refactor: replace legacy generators with generateAsciiFigure skeleton"
```

### Task 2: Implement Procedural Geometry

**Files:**
- Modify: `projects-scroll.js`

- [ ] **Step 1: Add procedural shape drawing to `generateAsciiFigure`**

Use the seed to create unique geometries (circles, polygons, noise-deformed shapes).

- [ ] **Step 2: Commit**

```bash
git add projects-scroll.js
git commit -m "feat: add procedural geometry to generateAsciiFigure"
```

### Task 3: Implement ASCII Rendering Logic

**Files:**
- Modify: `projects-scroll.js`

- [ ] **Step 1: Add ASCII mapping to `generateAsciiFigure`**

- [ ] **Step 2: Commit**

```bash
git add projects-scroll.js
git commit -m "feat: implement ASCII rendering in generateAsciiFigure"
```
