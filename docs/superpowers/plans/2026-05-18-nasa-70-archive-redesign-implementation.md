# NASA 70 Archive UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the 13-project scroll exhibition into a masonry grid archive simulating 100+ projects with search and tag filtering.

**Architecture:** Vanilla JavaScript client-side application using Fetch API, DOM manipulation, and CSS multi-column masonry.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Tailwind CSS (CDN).

---

### Task 1: UI Scaffolding & Cleanup

**Files:**
- Modify: `nasa-70-simplified-nav.html`
- Create: `archive-app.js`
- Delete: `projects-scroll.js`

- [ ] **Step 1: Remove old scripts and link the new app**

Remove the `<script src="projects-scroll.js"></script>` from `nasa-70-simplified-nav.html` and replace it with:
```html
<script src="archive-app.js"></script>
```

- [ ] **Step 2: Strip old HTML structure and add Hero & Filter Bar**

Replace the `<section id="projects-showcase">` block with:
```html
<section id="archive-section" class="w-full bg-[#f9fafb] text-[#111827] min-h-screen pb-24 relative z-20">
    <!-- Filter Bar (Sticky) -->
    <div class="sticky top-0 w-full bg-[#ffffff]/90 backdrop-blur-md border-b border-gray-200 z-50 px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <!-- Search Input -->
        <div class="relative w-full md:w-1/3">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <span class="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input type="text" id="searchInput" placeholder="Search projects..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-body-md transition-all">
        </div>

        <!-- Tag Pills Container -->
        <div id="tagContainer" class="flex w-full md:w-2/3 gap-2 overflow-x-auto no-scrollbar py-1">
            <!-- Tags will be injected here -->
        </div>
    </div>

    <!-- Masonry Grid -->
    <div class="max-w-[1600px] mx-auto px-6 pt-12">
        <div id="archive-grid" class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <!-- Project Cards will be injected here -->
        </div>
    </div>
</section>
```
*Note: Make sure to add `no-scrollbar` class definition in CSS if needed, or use standard CSS for hiding scrollbars.*

- [ ] **Step 3: Create `archive-app.js` boilerplate**

```javascript
// archive-app.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("Archive App initialized");
});
```

- [ ] **Step 4: Delete the old JS file**

Run: `rm projects-scroll.js` (or use powershell equivalent `Remove-Item projects-scroll.js`)

- [ ] **Step 5: Commit scaffolding**

```bash
git add nasa-70-simplified-nav.html archive-app.js projects-scroll.js
git commit -m "refactor: scaffold new masonry grid UI and remove old scroll logic"
```

---

### Task 2: Data Fetching & Amplification

**Files:**
- Modify: `archive-app.js`

- [ ] **Step 1: Fetch and duplicate data**

```javascript
// Inside DOMContentLoaded
const API_URL = 'https://ixd-supsi.github.io/n70api/data.json';
const IMG_BASE_URL = 'https://ixd-supsi.github.io/n70api/immagini/';

let allProjects = [];

async function loadData() {
    try {
        const response = await fetch(API_URL);
        const originalData = await response.json();
        
        // Duplicate 8 times to get 104 items
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

loadData();
```

- [ ] **Step 2: Render Masonry Grid**

```javascript
const gridContainer = document.getElementById('archive-grid');

function renderGrid(projectsToRender) {
    gridContainer.innerHTML = '';
    
    projectsToRender.forEach((project, index) => {
        // Find the image, data.json has 'immagine' array. We use the first one.
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

- [ ] **Step 3: Commit Data Fetching**

```bash
git add archive-app.js
git commit -m "feat: fetch external JSON, duplicate to 104 items, and render masonry grid"
```

---

### Task 3: Search & Tag Filtering Logic

**Files:**
- Modify: `archive-app.js`

- [ ] **Step 1: Extract Unique Tags & Render Pills**

```javascript
// Add these global variables
let uniqueTags = new Set();
let activeTags = new Set();
let currentSearch = '';

// Inside loadData() after fetching originalData, but before duplication:
originalData.forEach(item => {
    if(item.tags) {
        item.tags.forEach(tag => uniqueTags.add(tag.toLowerCase()));
    }
});
renderTags();

// Outside
function renderTags() {
    const tagContainer = document.getElementById('tagContainer');
    tagContainer.innerHTML = '';
    
    Array.from(uniqueTags).sort().forEach(tag => {
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

- [ ] **Step 2: Add Search Event Listener**

```javascript
document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    filterProjects();
});
```

- [ ] **Step 3: Implement `filterProjects` logic**

Instead of clearing the DOM (which destroys the masonry transition), we will use CSS display or opacity.

```javascript
// Add to CSS in nasa-70-simplified-nav.html
/*
<style>
    .project-card.hidden-card { display: none; }
</style>
*/

// In archive-app.js
function filterProjects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card, index) => {
        const project = allProjects[index];
        let matchesSearch = true;
        let matchesTags = true;

        // Search logic
        if (currentSearch) {
            const searchString = `${project.titolo} ${project.autore} ${project.descrizione}`.toLowerCase();
            matchesSearch = searchString.includes(currentSearch);
        }

        // Tag logic (OR)
        if (activeTags.size > 0) {
            if (!project.tags) {
                matchesTags = false;
            } else {
                const projectTags = project.tags.map(t => t.toLowerCase());
                // Check if project has AT LEAST ONE of the active tags
                matchesTags = Array.from(activeTags).some(activeTag => projectTags.includes(activeTag));
            }
        }

        if (matchesSearch && matchesTags) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
}
```

- [ ] **Step 4: Update CSS in HTML**

In `nasa-70-simplified-nav.html` inside `<style>` add:
```css
.hidden-card { display: none !important; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 5: Commit filtering**

```bash
git add archive-app.js nasa-70-simplified-nav.html
git commit -m "feat: implement dynamic tag generation, search, and OR-logic filtering"
```

---

### Task 4: Final Verification & Polish

**Files:**
- Manual UI Testing

- [ ] **Step 1: Test the UI manually**
- Open `nasa-70-simplified-nav.html` in browser.
- Verify 104 items render in 3-4 columns on desktop.
- Verify typing in search box instantly hides non-matching cards.
- Verify clicking a tag pill filters cards to those containing the tag.
- Verify clicking a card opens the correct URL in a new tab.

- [ ] **Step 2: Commit any final CSS tweaks if required**
(Only if issues were found during step 1).

```bash
git commit -am "chore: final ui tweaks"
```
