# NASA 70 Archive UI Redesign - Design Spec

## Goal
Transform the existing NASA 70 single-page scrolling exhibition (currently displaying 13 projects in a rigid sequence) into a modern, clean, and dynamic web archive that simulates a large-scale repository of over 100 websites. The new UI will emphasize exploration through a masonry grid layout and robust filtering tools.

## Architecture & Data Flow
- **Data Source**: The application will fetch project data from the external API at `https://ixd-supsi.github.io/n70api/data.json` dynamically on page load.
- **Image Source**: Images will be loaded from the external hosting folder `https://ixd-supsi.github.io/n70api/immagini/`.
- **Data Amplification**: The initial 13 projects will be programmatically duplicated 8 times in memory to create an array of 104 items. This array will be randomly shuffled so identical items are not placed adjacently, successfully simulating a large, diverse archive.
- **Tech Stack**: Vanilla JavaScript (ES6+), HTML5, and Tailwind CSS (via CDN). No build steps or complex frameworks will be added.

## UI/UX Components
1. **Hero Header**: 
   - A simplified, static version of the current NASA 70 branding. It will be smaller in vertical height to quickly lead users to the content archive below.
2. **Sticky Filter Bar**: 
   - Located immediately below the hero header and sticking to the top of the viewport upon scrolling.
   - Contains a text search input field (with a magnifying glass icon).
   - Contains a horizontal, side-scrollable list of "tag pills" dynamically generated from all unique tags found in the JSON data.
3. **Masonry Grid Layout**: 
   - Utilizing CSS `column-count` and `break-inside: avoid` (or Flexbox/Grid masonry equivalents in Tailwind like `columns-1 sm:columns-2 lg:columns-4`) to create a fluid, Pinterest-like interface.
   - Allows images of varying aspect ratios to pack efficiently without ugly gaps.
4. **Project Cards**: 
   - Minimalist design focusing on the thumbnail image.
   - Includes Title and Author text in clean typography (Helvetica Neue).
   - **Interaction**: Hovering over a card will trigger a subtle scale or shadow effect. Clicking anywhere on the card will immediately open the project's external `url` in a new browser tab (`target="_blank"`).

## Search & Filtering Logic
- **Text Search**: Real-time filtering (on `input` or `keyup`) that checks if the query matches the project's `titolo`, `autore`, or `descrizione`.
- **Tag Filtering (OR Logic)**: Users can click tag pills to toggle them active/inactive. When multiple tags are active, a project will be visible if it contains *at least one* of the active tags (OR logic).
- **Combined Filtering**: The text search and tag filters stack. A project must match the text query AND match the tag query (if any tags are selected).
- **Animations**: Cards failing the filter criteria will smoothly fade out (`opacity` transition) and be removed from the DOM layout to allow the masonry grid to animate and reflow.

## Scope & Implementation Constraints
- Remove the old `projects-scroll.js` logic completely, as the `1400vh` scroll concept is deprecated.
- Ensure responsive design (1 column mobile, 2 columns tablet, 4 columns desktop).