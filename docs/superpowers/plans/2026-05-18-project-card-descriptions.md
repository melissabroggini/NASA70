# Add Project Descriptions to Archive Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the project card template in `archive-app.js` to include the `descrizione` field with specific typography and layout requirements.

**Architecture:** Update the `renderGrid` function's template literal to include the new description element and adjust Tailwind classes for the title, author, and container.

**Tech Stack:** JavaScript (ES6+), Tailwind CSS.

---

### Task 1: Update Card Template in `archive-app.js`

**Files:**
- Modify: `archive-app.js:108-115`

- [ ] **Step 1: Replace the `renderGrid` content template**

Replace the existing template literal inside `projectsToRender.forEach` with the updated structure and styles.

```javascript
        // Using <a> tag for better accessibility
        gridHTML += `
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-card break-inside-avoid mb-6 cursor-pointer group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 block" data-id="${index}">
                <div class="relative overflow-hidden">
                    <img src="${imgSrc}" alt="${project.titolo}" class="w-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy">
                </div>
                <div class="p-5">
                    <h3 class="font-bold text-lg leading-tight tracking-tight mb-1" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${project.titolo}</h3>
                    <p class="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-3" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${project.autore}</p>
                    <p class="text-sm font-normal leading-relaxed text-gray-600 line-clamp-4" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${project.descrizione}</p>
                </div>
            </a>
        `;
```

- [ ] **Step 2: Commit changes**

```bash
git add archive-app.js
git commit -m "feat: add project descriptions to archive cards"
```

### Task 2: Verification

- [ ] **Step 1: Verify Tailwind classes and data fields**
Check that:
- `p-5` is used for the content div.
- Title has `font-bold text-lg`.
- Author has `text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-3`.
- Description has `text-sm font-normal leading-relaxed text-gray-600 line-clamp-4`.
- `project.descrizione` is correctly interpolated.
- All text elements have the `Helvetica Neue` inline style.
