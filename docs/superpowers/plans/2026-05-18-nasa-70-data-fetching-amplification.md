# NASA 70 Data Fetching & Amplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fetch project data from an external API, amplify it to ~100 items, and render it in a masonry grid.

**Architecture:** Use `fetch` API for data retrieval, JavaScript loops for array amplification and shuffling, and dynamic DOM manipulation for grid rendering.

**Tech Stack:** Vanilla JavaScript, HTML5, CSS Columns (for Masonry).

---

### Task 1: Update Static Text in HTML

**Files:**
- Modify: `C:\Users\simmo\Downloads\00_Progetti_Esame\00_Progetti_Esame\Web_Page\nasa-70-simplified-nav.html`

- [ ] **Step 1: Replace "13 projects" text**
Update the text to reflect the larger archive size.

**Changes:**
- Line 93: `Discover our 13 projects` -> `Discover our archive of projects`
- Line 106: `About these 13 projects` -> `About our project archive`
- Line 108: `As a collective of 13 Visual Communication students` -> `As a collective of Visual Communication students`

- [ ] **Step 2: Commit changes**

```bash
git add nasa-70-simplified-nav.html
git commit -m "text: update project count text to reflect larger archive"
```

### Task 2: Implement Data Fetching and Amplification

**Files:**
- Modify: `C:\Users\simmo\Downloads\00_Progetti_Esame\00_Progetti_Esame\Web_Page\archive-app.js`

- [ ] **Step 1: Implement loadData function**
Fetch data from `https://ixd-supsi.github.io/n70api/data.json`, duplicate it 8 times, and shuffle.

```javascript
const API_URL = 'https://ixd-supsi.github.io/n70api/data.json';
const IMG_BASE_URL = 'https://ixd-supsi.github.io/n70api/immagini/';

let allProjects = [];

async function loadData() {
    try {
        const response = await fetch(API_URL);
        const originalData = await response.json();
        
        // Duplicate 8 times to get 104 items
        allProjects = [];
        for(let i=0; i<8; i++) {
            originalData.forEach(item => {
                // Deep copy to ensure independent objects
                allProjects.push(JSON.parse(JSON.stringify(item)));
            });
        }
        
        // Shuffle the array to make it organic
        allProjects = allProjects.sort(() => Math.random() - 0.5);
        
        renderGrid(allProjects);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
```

- [ ] **Step 2: Implement renderGrid function**
Render the amplified projects into the `#archive-grid`.

```javascript
const gridContainer = document.getElementById('archive-grid');

function renderGrid(projectsToRender) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    
    projectsToRender.forEach((project, index) => {
        const imgName = (project.immagine && project.immagine.length > 0) ? project.immagine[0] : '';
        const imgSrc = imgName ? `${IMG_BASE_URL}${imgName}` : 'https://via.placeholder.com/600x400?text=No+Image';

        const cardHTML = `
            <div class="project-card break-inside-avoid mb-6 cursor-pointer group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300" data-id="${index}" onclick="window.open('${project.url}', '_blank')">
                <div class="relative overflow-hidden">
                    <img src="${imgSrc}" alt="${project.titolo}" class="w-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy">
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-lg leading-tight tracking-tight mb-1" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${project.titolo}</h3>
                    <p class="text-sm text-gray-500 font-light" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${project.autore}</p>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}
```

- [ ] **Step 3: Call loadData on DOMContentLoaded**
Update the event listener.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
```

- [ ] **Step 4: Commit changes**

```bash
git add archive-app.js
git commit -m "feat: fetch external JSON, duplicate to 104 items, and render masonry grid"
```

### Task 3: Verification

- [ ] **Step 1: Verify file content**
Ensure all changes are correctly applied.
