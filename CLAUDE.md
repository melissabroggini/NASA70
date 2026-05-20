# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NASA 70th Anniversary website with two main pages:
- **index.html** - Homepage with featured projects and random project of the day
- **archive.html** - Projects archive with filtering and masonry grid layout

## Tech Stack

- **HTML5/CSS3** with Tailwind CSS via CDN (no build step)
- **Vanilla JavaScript** (ES6+) for all interactivity
- **Google Fonts**: Inter, DM Mono, Public Sans, Material Symbols Outlined
- **External APIs**:
  - Projects data: `https://ixd-supsi.github.io/n70api/data.json`
  - Images: `https://ixd-supsi.github.io/n70api/immagini/`

## Key Files

| File | Purpose |
|------|---------|
| `components.js` | Shared header/footer components (`renderHeader`, `renderFooter`) |
| `archive-app.js` | Archive page logic: filtering, sorting, masonry grid rendering |
| `index.html` | Homepage with hero, featured projects, random project of the day |
| `archive.html` | Archive page with filter sidebar and masonry card grid |

## Commands

This is a static site - no build step required. Open `index.html` or `archive.html` directly in a browser.

For local development with live reload, use any static server:
```bash
npx serve .
# or
python -m http.server 8000
```

## Architecture Notes

### Shared Components
Header and footer are rendered via `components.js`:
- `renderHeader({ activePage, aboutHref })` - sticky NASA-branded header
- `renderFooter({ aboutHref })` - 4-column footer with NASA logo

### Archive Data Flow
1. `loadData()` fetches 13 projects from API, duplicates 8x to 104 items, shuffles
2. `categorizeProjectTags()` maps raw tags to MACRO_TAGS_MAP (e.g., 'apollo' → 'Apollo')
3. `renderGrid()` distributes cards across 3 columns in round-robin for horizontal ordering
4. `filterProjects()` applies macro/micro tag filters and search with OR logic within groups, AND between groups
5. Sort options (shuffle, alpha-az, alpha-za, chrono-new, chrono-old) are applied via `applySort()`

### Custom CSS Classes
- `.tech-label` - DM Mono monospace, uppercase, tracked
- `.halftone-img` - Grayscale filter that reveals color on hover
- `.tag-chip` / `.tag-active` - Filter tag states (outline vs filled red)
- `.hidden-card` - Hides filtered cards

### NASA Red Color
`#E03A3E` is used throughout for accents, active states, and tag highlights.