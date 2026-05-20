# Page Separation (Landing & Archive) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single-page site into `index.html` (Landing) and `archive.html` (Archive) with shared header/footer.

**Architecture:** Multipage static approach. `index.html` handles hero and about sections; `archive.html` handles project research.

**Tech Stack:** HTML5, Vanilla JS, Tailwind CSS.

---

### Task 1: Prepare index.html (Landing)

**Files:**
- Rename: `nasa-70-simplified-nav.html` to `index.html`
- Modify: `index.html`

- [ ] **Step 1: Rename the file**
Execute: `mv nasa-70-simplified-nav.html index.html`

- [ ] **Step 2: Clean up index.html**
Remove the `#archive-section` div and its associated scripts (`archive-app.js`). Update the navigation links.

```html
<!-- Update Nav -->
<a href="archive.html" ... >PROJECTS</a>
<a href="#about-project" ... >ABOUT US</a>

<!-- Update CTA -->
<a href="archive.html" ... >View Projects</a>

<!-- Remove Archive Section and its JS -->
<!-- Delete <section id="archive-section"> ... </section> -->
<!-- Delete <script src="archive-app.js"></script> -->
```

- [ ] **Step 3: Add Footer**
Add a minimalist footer to `index.html`.

```html
<footer class="w-full px-grid_margin py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
    <div class="text-[10px] font-bold uppercase tracking-widest" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">NASA 70 — 2026</div>
    <div class="text-[10px] font-medium uppercase tracking-widest text-gray-500" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">SUPSI Visual Communication Class</div>
</footer>
```

- [ ] **Step 4: Commit changes**
`git add index.html && git commit -m "feat: setup index.html as pure landing page"`

---

### Task 2: Create archive.html (The Archive)

**Files:**
- Create: `archive.html`

- [ ] **Step 1: Scaffold archive.html**
Copy the head, header, and the archive section from the original file. Ensure it has a clean background and ONLY includes `archive-app.js`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Copy from index.html -->
    <style>
        .hidden-card { display: none !important; }
        #tagWrapper.expanded { max-height: 500px; }
        #tagContainer { display: flex; flex-wrap: wrap; overflow: hidden; }
    </style>
</head>
<body class="bg-white text-black font-body-md overflow-x-hidden">
    <!-- Header with logo linking back to index.html -->
    <header class="w-full px-grid_margin py-md flex justify-between items-center z-40">
        <a href="index.html" class="font-bold text-headline-md uppercase tracking-tight" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">NASA 70</a>
        <nav class="hidden md:flex gap-lg">
            <a href="archive.html" class="text-sm font-bold tracking-widest uppercase" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">PROJECTS</a>
            <a href="index.html#about-project" class="text-sm font-bold tracking-widest uppercase hover:opacity-70" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">ABOUT US</a>
        </nav>
    </header>

    <!-- Archive Section Content -->
    <main id="archive-section" class="pt-12">
        <!-- Sticky Filter Bar and Masonry Grid -->
    </main>

    <!-- Add Footer (same as index.html) -->

    <script src="archive-app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit changes**
`git add archive.html && git commit -m "feat: create archive.html for project exploration"`

---

### Task 3: Final Cleanup and Linking

**Files:**
- Modify: `index.html`
- Modify: `archive.html`

- [ ] **Step 1: Verify all links**
Ensure "NASA 70" logo always leads to `index.html` and "PROJECTS" leads to `archive.html`.

- [ ] **Step 2: Remove redundant code**
Check if there are any remaining scroll-linked logic or unused IDs in either file.

- [ ] **Step 3: Commit changes**
`git commit -am "chore: final link verification and cleanup"`
