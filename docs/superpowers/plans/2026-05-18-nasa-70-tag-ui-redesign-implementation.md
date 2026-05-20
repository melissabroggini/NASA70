# Tag Selection UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the tag selection system to prioritize tags by frequency and add an expandable drawer for better accessibility.

**Architecture:** Vertical expansion of the tag container using CSS transitions, with dynamic tag sorting based on project frequency counts.

**Tech Stack:** Vanilla JavaScript, HTML5, CSS3, Tailwind CSS.

---

### Task 1: UI Scaffolding & CSS Transitions

**Files:**
- Modify: `nasa-70-simplified-nav.html`

- [ ] **Step 1: Add the "MORE" toggle button and update the filter bar structure**

Find the `tagContainer` in `nasa-70-simplified-nav.html` and wrap it to include the toggle button.

```html
<!-- Inside Archive Section, Replace the existing Filter Bar content -->
<div class="sticky top-0 w-full bg-[#ffffff]/90 backdrop-blur-md border-b border-gray-200 z-50 px-6 py-4 flex flex-col gap-4">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        <!-- Search Input -->
        <div class="relative w-full md:w-1/3">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <span class="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input type="text" id="searchInput" placeholder="Search projects..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-body-md transition-all">
        </div>

        <!-- Toggle Button -->
        <button id="toggleTagsBtn" class="hidden md:flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
            <span id="toggleText">More Filters</span>
            <span id="toggleIcon" class="material-symbols-outlined text-[16px]">expand_more</span>
        </button>
    </div>

    <!-- Tag Pills Container with expansion support -->
    <div id="tagWrapper" class="relative overflow-hidden transition-all duration-500 ease-in-out max-h-10">
        <div id="tagContainer" class="flex flex-wrap gap-2 overflow-x-auto no-scrollbar py-1 pr-12 transition-all duration-500">
            <!-- Tags will be injected here -->
        </div>
        <!-- Right Fade Gradient (only visible when collapsed) -->
        <div id="tagFade" class="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none transition-opacity duration-300"></div>
    </div>
</div>
```

- [ ] **Step 2: Add CSS for the expanded state**

Add necessary styles to the `<style>` block.

```css
/* Inside <style> */
#tagWrapper.expanded {
    max-h: 500px; /* Adjust based on content */
}
#tagWrapper.expanded #tagContainer {
    overflow-x: visible;
}
#tagWrapper.expanded #tagFade {
    opacity: 0;
}
#tagContainer {
    /* Ensure cards stay in a single row by default */
    display: flex;
    flex-wrap: nowrap;
}
#tagWrapper.expanded #tagContainer {
    flex-wrap: wrap;
}
```

- [ ] **Step 3: Commit UI scaffolding**

```bash
git add nasa-70-simplified-nav.html
git commit -m "style: add expandable tag drawer structure and transitions"
```

---

### Task 2: Frequency-Based Tag Sorting

**Files:**
- Modify: `archive-app.js`

- [ ] **Step 1: Implement frequency counting and ranked sorting**

Refactor `loadData` to calculate tag counts and sort the `uniqueTags` set.

```javascript
// archive-app.js: inside loadData
let tagCounts = {};

originalData.forEach(item => {
    if (item.tags) {
        item.tags.forEach(tag => {
            const lowerTag = tag.toLowerCase();
            tagCounts[lowerTag] = (tagCounts[lowerTag] || 0) + 1;
        });
    }
});

// Convert set to array and sort by frequency, then alphabetically
const sortedTags = Object.keys(tagCounts).sort((a, b) => {
    if (tagCounts[b] !== tagCounts[a]) {
        return tagCounts[b] - tagCounts[a];
    }
    return a.localeCompare(b);
});

renderTags(sortedTags);
```

- [ ] **Step 2: Update `renderTags` to use the sorted list**

```javascript
function renderTags(tags) {
    const tagContainer = document.getElementById('tagContainer');
    if (!tagContainer) return;
    
    tagContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.innerText = tag;
        btn.className = "px-4 py-1.5 rounded-full border border-gray-300 text-xs font-medium whitespace-nowrap transition-colors duration-200 text-gray-600 hover:border-black hover:text-black";
        
        btn.onclick = () => {
            if (activeTags.has(tag)) {
                activeTags.delete(tag);
                btn.classList.remove('bg-black', 'text-white', 'border-black');
                btn.classList.add('text-gray-600', 'border-gray-300');
            } else {
                activeTags.add(tag);
                btn.classList.add('bg-black', 'text-white', 'border-black');
                btn.classList.remove('text-gray-600', 'border-gray-300');
            }
            filterProjects();
        };
        
        tagContainer.appendChild(btn);
    });
}
```

- [ ] **Step 3: Commit sorting logic**

```bash
git add archive-app.js
git commit -m "feat: implement frequency-based tag sorting"
```

---

### Task 3: Expand/Collapse Interaction

**Files:**
- Modify: `archive-app.js`

- [ ] **Step 1: Add toggle logic and state management**

```javascript
// archive-app.js: inside DOMContentLoaded
const toggleBtn = document.getElementById('toggleTagsBtn');
const tagWrapper = document.getElementById('tagWrapper');
const toggleText = document.getElementById('toggleText');
const toggleIcon = document.getElementById('toggleIcon');

if (toggleBtn && tagWrapper) {
    toggleBtn.addEventListener('click', () => {
        const isExpanded = tagWrapper.classList.toggle('expanded');
        toggleText.innerText = isExpanded ? 'Less Filters' : 'More Filters';
        toggleIcon.innerText = isExpanded ? 'expand_less' : 'expand_more';
    });
}
```

- [ ] **Step 2: Ensure active tags are visible (Optional/Polish)**

We can update `filterProjects` to potentially move active tags or just rely on the expanded state. For now, let's keep the core toggle working.

- [ ] **Step 3: Commit interaction logic**

```bash
git add archive-app.js
git commit -m "feat: add tag drawer expand/collapse interaction"
```

---

### Task 4: Final Verification & Polish

**Files:**
- Manual UI Testing

- [ ] **Step 1: Verify tag ranking**
Check that the most common tags appear first in the row.

- [ ] **Step 2: Verify expansion**
Click "More Filters" and ensure all tags wrap and are selectable.

- [ ] **Step 3: Verify filtering**
Ensure selecting tags still filters the grid correctly.

- [ ] **Step 4: Commit any final tweaks**

```bash
git commit -am "chore: final tag UI polish"
```
