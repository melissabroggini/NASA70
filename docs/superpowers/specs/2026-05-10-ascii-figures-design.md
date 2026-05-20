# Specification: NASA 70th B&W ASCII Project Figures

## Goal
Transform all central project figures in the `projects-scroll.js` section into black and white ASCII art with detailed shading. This replaces the current mix of colored pixel art and the colored asteroid.

## Design
- **Aesthetic:** Brutalist, technical, monochrome (Black & White).
- **Style:** "Detailed & Shaded" ASCII art. Characters will be used to create gradients and depth based on their visual density.
- **Color Palette:** Strictly `#000000` (black) and `#ffffff` (white/background). No colors from the project metadata will be used for the figures.
- **Consistency:** All 13 projects will use the same procedural generation logic to ensure a cohesive visual language across the scroll.

## Technical Implementation
1. **Refactor `projects-scroll.js`:**
   - Remove `generatePixelArt` and the colored `generateAsciiAsteroid`.
   - Implement a new `generateAsciiFigure(seed)` function.
   - The function will use a canvas to draw procedural shapes (based on the seed) and then "render" them into ASCII characters based on intensity.
   - Character sets will be mapped to intensity levels (e.g., `@%#*+=-:. `).
2. **Visual Variety:**
   - The `seed` will influence the base geometry (e.g., number of vertices, noise frequency, symmetry) so each project has a unique, recognizable "artifact".
3. **Integration:**
   - The `projectImages` array will be populated exclusively using `generateAsciiFigure`.
   - The glitch transition logic will remain but will now operate on monochrome ASCII textures.

## Success Criteria
- All 13 projects display unique, detailed ASCII figures.
- No colors are present in the figures (only B&W).
- The transition between figures via the glitch effect remains smooth and visually engaging.
