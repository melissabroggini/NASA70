# Design Spec: Page Separation (Landing & Archive)

**Date:** 2026-05-18
**Topic:** Splitting the single-page site into two separate HTML files.

## 1. Objective
Improve site structure and user experience by separating the high-impact landing animation from the data-heavy project archive. This ensures a cleaner focus for each part of the site and optimized asset loading.

## 2. Page Architecture

### index.html (Home/Landing)
- **Role:** The entry point and emotional core of the site.
- **Header:**
    - "NASA 70" logo (links to top of page).
    - "PROJECTS" (links to `archive.html`).
    - "ABOUT US" (links to `#about-project` section).
- **Hero:** Full-screen astronaut animation via `astronaut-anim.js`.
- **Primary CTA:** "View Projects" button linking to `archive.html`.
- **About Section:** Positioned below the hero as the concluding content of the page.
- **Footer:** Shared footer at the bottom.

### archive.html (The Archive)
- **Role:** Functional research tool for exploring the 104 projects.
- **Header:**
    - "NASA 70" logo (links back to `index.html`).
    - "PROJECTS" (active state or links to top).
    - "ABOUT US" (links to `index.html#about-project`).
- **Filter Bar:** Sticky search input and expandable tag drawer.
- **Content:** Masonry grid rendered via `archive-app.js`.
- **Background:** Clean solid background (white/light gray) for maximum readability. No particle animation.
- **Footer:** Shared footer at the bottom.

## 3. Shared Elements
- **Navigation:** Uniform typography (Helvetica Neue Bold/Uppercase) and spacing.
- **Footer:** Minimalist design containing project credits and institutional links (SUPSI).
- **Styling:** Consistent Tailwind CDN configuration for both files.

## 4. Technical Migration
- **HTML Split:** Extract the `#archive-section` from the current file into `archive.html`.
- **JS Isolation:**
    - `index.html` only includes `astronaut-anim.js`.
    - `archive.html` only includes `archive-app.js`.
- **Linking:** Update all internal `href` attributes to point to the correct files instead of anchor IDs.
