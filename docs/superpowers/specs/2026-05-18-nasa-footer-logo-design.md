# Design Specification: NASA Logo Footer Integration

## Overview
Add the official NASA "Meatball" logo and the text "NASA ®" to the center of the footer on both the home page (`index.html`) and the archive page (`archive.html`). The logo will act as a hyperlink to the official NASA website.

## Goals
- Enhance the institutional feel of the digital exhibition.
- Provide a direct link to the source of inspiration (NASA).
- Maintain the brutalist, high-contrast aesthetic of the project.

## Components

### 1. Footer Structure
The current footer uses `flex justify-between`. To ensure perfect centering of the logo, it will be refactored to:
- Use a 3-column layout on desktop (using CSS Grid or Flexbox with equal widths).
- Maintain the existing brand identification (NASA 70) and academic credit (SUPSI).

### 2. NASA Identity Block (Center)
- **Logo:** NASA "Meatball" (Circular blue logo).
- **Format:** SVG for scalability and performance.
- **Text:** "NASA ®" in Helvetica Neue, 10px, Bold, Uppercase, tracking-widest.
- **Link:** `https://www.nasa.gov`
- **Behavior:** Open in a new tab (`target="_blank"`).
- **Hover State:** `hover:opacity-70` transition for consistency with other links.

### 3. Visual Placement
- **Position:** Exactly center of the footer width.
- **Alignment:** Vertically aligned with the flanking text elements.
- **Gap:** Small gap (approx. 8px) between the SVG logo and the text.

### 4. Responsiveness
- **Desktop (md and up):** Horizontal layout: Left (NASA 70) | Center (NASA Logo) | Right (SUPSI).
- **Mobile:** Vertical stack with center alignment for all elements. The NASA logo block will remain in the center of the stack.

## Technical Implementation
- **Files to modify:** `index.html`, `archive.html`.
- **Assets:** SVG code for the Meatball logo will be embedded directly to avoid external requests and ensure immediate rendering.
- **Tailwind Classes:** Use `grid-cols-3` or `flex-1` containers to enforce centering.

## Success Criteria
- The NASA logo is perfectly centered on desktop view.
- The link opens the official NASA homepage correctly.
- The aesthetic matches the existing typography and spacing of the site.
