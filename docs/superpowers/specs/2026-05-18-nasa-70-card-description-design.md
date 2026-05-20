# Design Spec: Project Card Descriptions

**Date:** 2026-05-18
**Topic:** Integrating descriptions into the masonry project cards.

## 1. Objective
Enhance the information density of the project archive by displaying project descriptions directly on the cards. This allows users to understand the context of each project without needing to navigate away first, while strictly maintaining the "NASA 70" minimalist/brutalist aesthetic.

## 2. Visual Design
All text elements MUST use **Helvetica Neue**.

- **Card Structure:**
    - **Image:** Full width, top of the card. Maintains existing 1.05x hover zoom.
    - **Text Container:** Padding `p-5` for a clean, spacious look.
    - **Title:** `font-bold`, `text-lg`, black.
    - **Author:** `text-[10px]`, `font-medium`, `uppercase`, `tracking-wider`, `text-gray-500`. Positioned below the title.
    - **Description:** `text-sm`, `font-normal`, `leading-relaxed`, `text-gray-600`, `mt-3`.
        - **Constraint:** `line-clamp-4` (maximum 4 lines) to maintain masonry balance.

## 3. Technical Implementation
- **File:** `archive-app.js`
- **Logic:** Update the `renderGrid` function's template literal to include the description field from the data.
- **Dependencies:** Ensure Tailwind's `line-clamp` utility is available (it's included by default in modern Tailwind or via the plugin already in the HTML).

## 4. UX & Accessibility
- **Readability:** High contrast text on white card background.
- **Affordance:** The entire card remains a clickable link (`<a>` tag).
- **Responsiveness:** Descriptions will adjust as columns stack on smaller screens.
