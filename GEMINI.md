# GEMINI.md - NASA 70 Project Context

## Project Overview
**NASA 70** is a web-based digital exhibition celebrating the 70th anniversary of NASA. It showcases 13 creative research projects developed by a collective of Visual Communication students from SUPSI (University of Applied Sciences and Arts of Southern Switzerland).

The site features a brutalist, high-contrast aesthetic with heavy use of typography (Helvetica Neue) and interactive, scroll-linked animations.

### Main Technologies
- **HTML5 & Vanilla JavaScript**
- **Tailwind CSS**: Used via CDN for layout and styling.
- **Canvas API**: Powers the complex particle animations and procedural "glitch" shapes.
- **Google Fonts**: Comfortaa, Space Mono, Sora.

## Architecture & Interaction Design
The project is a single-page application centered around two main interactive experiences:

1.  **Hero Animation (`astronaut-anim.js`)**:
    - A full-screen canvas displays an astronaut formed from binary characters ('0' and '1').
    - The particles undergo a periodic cycle of "dissolving" into a flow field and "re-forming" back into the astronaut shape.
    - Uses halftone-style image sampling to determine particle placement and opacity.

2.  **Projects Showcase (`projects-scroll.js`)**:
    - **da fare**

## Key Files
- **`nasa-70-simplified-nav.html`**: The primary entry point for the application.
- **`data.json`**: Contains metadata for the 13 projects (title, description, author, tags, URL).
- **`astronaut-anim.js`**: Core logic for the hero particle animation.
- **`projects-scroll.js`**: Core logic for the scroll-linked project showcase.
- **`astronaut_halftone.png`**: Source image for the astronaut particle system.
- **`docs/superpowers/`**: Contains design specifications and implementation plans that guided the project's development.
- **`stitch_temp.html`**: A template/reference file used during the design phase.

## Building and Running
This is a static web project. No build step is required.
- **To Run**: Open `nasa-70-simplified-nav.html` in any modern web browser.
- **Development**: Edits to CSS/JS are reflected immediately upon refresh. Tailwind is loaded via CDN, so an internet connection is required for styles to render correctly.

## Development Conventions
- **Minimalist/Brutalist Aesthetic**: Maintain high contrast, large typography, and functional "raw" design elements.
- **Scroll-Linked Logic**: When adding or modifying projects, ensure the scroll duration in the HTML (`h-[1400vh]`) and the logic in `projects-scroll.js` remain synchronized.
- **Procedural Generation**: Use the Canvas API for interactive visuals rather than static images where possible to maintain the "digital" and "dynamic" feel of the exhibition.
- **Data Synchronization**: Ensure project data in `data.json` matches the hardcoded `projects` array in `projects-scroll.js` (TODO: Refactor to fetch from `data.json` dynamically).

## Project History
- **Academic Context**: Developed for the SP2025/26 Visual Communication class at SUPSI.
- **Design Intent**: Blending interactive design, typography, and experimental coding to celebrate aerospace history.
