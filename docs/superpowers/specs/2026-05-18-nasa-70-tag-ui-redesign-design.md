# Tag Selection UI/UX Redesign - Design Spec

## Goal
Improve the usability of the project archive by redesigning the tag selection system. The current single-row horizontal scroll is difficult to navigate and often inaccessible. The new system will prioritize tags by project frequency and provide an expandable drawer to view the full tag cloud.

## Data Logic (Ranking & Frequency)
- **Tag Frequency Map**: During the `loadData` phase, the application will iterate through all 104 projects and create a frequency count for every unique tag.
- **Sorting Algorithm**: Tags will no longer be sorted alphabetically by default. They will be sorted in descending order of frequency (most used tags first).
- **Secondary Sorting**: If two tags have the same frequency, they will be sorted alphabetically.

## UI/UX Components

### 1. Filter Bar Structure
- The sticky filter bar will be split into two functional zones:
    - **Top Zone**: Search Input and "Expand/Collapse" Toggle.
    - **Tag Zone**: The tag container.

### 2. The Tag Container (Drawer)
- **Collapsed State (Default)**: 
    - Displays a single horizontal row of the top-ranked tags.
    - Features a subtle "fade-out" gradient at the right edge to signal more content.
    - Horizontal scrolling is enabled with a clean, minimalist scrollbar.
- **Expanded State**:
    - Triggered by clicking a "MORE +" button or a toggle icon.
    - The container expands vertically to reveal a full, wrapping flex-grid of all tags.
    - Tags are displayed in multiple rows.
- **"Show Less" Trigger**: When expanded, the toggle button changes to "LESS -" to allow collapsing back to the single row.

### 3. Tag Pills Styling
- **Visual Weight**: Tags with higher frequency could have a slightly bolder font or a more prominent outline to reinforce their importance.
- **Active State**: Selected tags will have a solid black background with white text, ensuring they are high-contrast and clearly visible.
- **Order Preservation**: Active tags should remain visible or move to the beginning of the primary row when the drawer is collapsed.

## Technical Implementation
- **State Management**: A new boolean `isFilterExpanded` will track the drawer state.
- **CSS Transitions**: Use `max-height` and `opacity` transitions to animate the expansion of the tag container smoothly without layout jumps.
- **Refactoring `renderTags`**:
    - Update logic to calculate frequencies before rendering.
    - Split rendering into "Primary" and "Secondary" if needed, or use a flexible CSS grid/flex-wrap layout controlled by a parent class.

## Self-Review
1. **Placeholder scan**: No "TBD" or "TODO".
2. **Internal consistency**: The frequency-based sorting is consistently applied.
3. **Scope check**: This is a focused UI/UX improvement on the existing archive.
4. **Ambiguity check**: The OR logic for filtering (established in previous tasks) remains unchanged.
