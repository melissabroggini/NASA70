# NASA Footer Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a centered NASA "Meatball" logo with "NASA ®" text to the footers of `index.html` and `archive.html`, linking to `https://www.nasa.gov`.

**Architecture:** Refactor the existing 2-column flex footer into a 3-column grid (or equivalent centered flex layout) to ensure the logo is perfectly centered on desktop. The NASA identity block will be a single hyperlink containing an SVG and text.

**Tech Stack:** HTML5, Tailwind CSS, SVG.

---

### Task 1: Refactor footer in index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace existing footer with 3-column grid layout**

Modify the `<footer>` element to use `grid-cols-1 md:grid-cols-3` and add the NASA identity block in the middle.

```html
<footer class="w-full px-grid_margin py-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
    <!-- Left: Brand -->
    <div class="text-[10px] font-bold uppercase tracking-widest text-center md:text-left" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        NASA 70 — 2026
    </div>
    
    <!-- Center: NASA Logo & Link -->
    <div class="flex justify-center items-center">
        <a href="https://www.nasa.gov" target="_blank" class="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 92" class="w-8 h-auto">
                <circle fill="#0B3C91" cx="55" cy="46" r="45"/>
                <g fill="#FFFFFF">
                    <circle cx="47.68" cy="12.57" r="0.45"/><circle cx="52.30" cy="13.17" r="0.45"/><circle cx="58.36" cy="21.33" r="0.45"/><circle cx="25.12" cy="63.33" r="0.45"/><circle cx="26.29" cy="66.93" r="0.45"/><circle cx="35.80" cy="61.32" r="0.45"/><circle cx="38.50" cy="67.02" r="0.45"/><circle cx="70.84" cy="61.08" r="0.45"/><circle cx="82.48" cy="60.42" r="0.45"/><circle cx="76.72" cy="57.96" r="0.45"/><circle cx="70.84" cy="58.20" r="0.45"/>
                    <path d="M30.1 20.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
                    <path d="M80.1 30.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
                </g>
                <path fill="#FC3D21" d="M59.57 35.39c-4.67 1.81-9.22 3.43-13.06 4.63-7.8 2.45-29.16 9.06-42.06 17.4l1.08.42c7.86-4.44 12.97-5.84 17.88-7.38 5.34-1.68 22.6-5.72 30.42-7.92 2.64-.74 5.73-1.72 9.01-2.9-.76-1.06-1.57-2.13-2.41-3.19-.29-.35-.58-.71-.87-1.06zM65.27 43.24c-1.13.77-2.08 1.38-2.74 1.76-3.84 2.22-22.56 15-26.82 17.94s-16.08 14.1-19.56 17.34l-.12 1.32c11.22-10.08 14.74-12.57 19.2-15.96 5.52-4.2 16.94-11.97 20.82-14.46 3.71-2.38 7.06-4.57 10.06-6.57-.05-.08-.1-.16-.15-.25-.23-.38-.46-.75-.7-1.12zM82.81 24.72c-5.47 3.2-14.08 7.07-22.44 10.35.2.25.4.49.6.74.93 1.18 1.81 2.36 2.64 3.55 6.57-2.42 13.78-5.67 19.5-9.6-2.73 2.58-11.73 9.32-17.23 13.07.28.46.56.92.82 1.38 8.32-5.57 13.92-9.67 17.19-12.41 4.5-3.78 14.76-12.24 18.66-23.58-3.75 4.74-11.84 9.72-16.65 12.54z"/>
                <path fill="none" stroke="#FFFFFF" stroke-width="0.5" d="M44.88 54.94c-.88-1.11-2.11-2.61-3.03-3.76-1.23-1.55-2.37-3.11-3.41-4.67-.34.08-.68.17-1.02.25 1.26 1.96 2.66 3.92 4.18 5.84 1.11 1.4 2.12 2.53 2.64 3.23.1.14.31.46.59.87.33-.22.65-.44.98-.67-.3-.38-.62-.74-.93-1.13zM51.34 60.8c-.73-.69-2.49-1.84-4.33-3.56-.4.28-.81.56-1.22.84 1.18 1.67 2.8 3.72 4.06 4.32.91.6 1.42-1.02.49-1.9zM60.97 35.81c-10.49-13.21-23.31-20.46-28.84-16.07-4.29 3.41-2.53 13.38 3.39 23.85.3-.1.61-.21.91-.31-5.97-10.2-7.61-19.68-3.56-22.9 5.09-4.04 17.37 3.24 27.56 16.06 2.11 2.66 3.96 5.32 5.53 7.92 6.01 9.95 7.86 18.95 3.7 22.62-1.27 1.12-5.15 1.56-10.24-.72-.07.09.04.33.13.39 4.39 1.77 8.6 2.44 10.72.75 4.31-3.42.39-17.74-10.1-30.9z"/>
                <text x="55" y="56" fill="#FFFFFF" font-family="serif" font-weight="bold" font-size="18" text-anchor="middle">NASA</text>
            </svg>
            <span class="text-[10px] font-bold uppercase tracking-widest" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">NASA ®</span>
        </a>
    </div>

    <!-- Right: SUPSI -->
    <div class="text-[10px] font-medium uppercase tracking-widest text-gray-500 text-center md:text-right" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        SUPSI Visual Communication Class
    </div>
</footer>
```

- [ ] **Step 2: Commit changes to index.html**

```bash
git add index.html
git commit -m "feat: add NASA logo to index footer"
```

---

### Task 2: Refactor footer in archive.html

**Files:**
- Modify: `archive.html`

- [ ] **Step 1: Replace existing footer with 3-column grid layout**

(Repeat the same structure as in Task 1)

```html
<footer class="w-full px-grid_margin py-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
    <!-- Left: Brand -->
    <div class="text-[10px] font-bold uppercase tracking-widest text-center md:text-left" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        NASA 70 — 2026
    </div>
    
    <!-- Center: NASA Logo & Link -->
    <div class="flex justify-center items-center">
        <a href="https://www.nasa.gov" target="_blank" class="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 92" class="w-8 h-auto">
                <circle fill="#0B3C91" cx="55" cy="46" r="45"/>
                <g fill="#FFFFFF">
                    <circle cx="47.68" cy="12.57" r="0.45"/><circle cx="52.30" cy="13.17" r="0.45"/><circle cx="58.36" cy="21.33" r="0.45"/><circle cx="25.12" cy="63.33" r="0.45"/><circle cx="26.29" cy="66.93" r="0.45"/><circle cx="35.80" cy="61.32" r="0.45"/><circle cx="38.50" cy="67.02" r="0.45"/><circle cx="70.84" cy="61.08" r="0.45"/><circle cx="82.48" cy="60.42" r="0.45"/><circle cx="76.72" cy="57.96" r="0.45"/><circle cx="70.84" cy="58.20" r="0.45"/>
                    <path d="M30.1 20.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
                    <path d="M80.1 30.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
                </g>
                <path fill="#FC3D21" d="M59.57 35.39c-4.67 1.81-9.22 3.43-13.06 4.63-7.8 2.45-29.16 9.06-42.06 17.4l1.08.42c7.86-4.44 12.97-5.84 17.88-7.38 5.34-1.68 22.6-5.72 30.42-7.92 2.64-.74 5.73-1.72 9.01-2.9-.76-1.06-1.57-2.13-2.41-3.19-.29-.35-.58-.71-.87-1.06zM65.27 43.24c-1.13.77-2.08 1.38-2.74 1.76-3.84 2.22-22.56 15-26.82 17.94s-16.08 14.1-19.56 17.34l-.12 1.32c11.22-10.08 14.74-12.57 19.2-15.96 5.52-4.2 16.94-11.97 20.82-14.46 3.71-2.38 7.06-4.57 10.06-6.57-.05-.08-.1-.16-.15-.25-.23-.38-.46-.75-.7-1.12zM82.81 24.72c-5.47 3.2-14.08 7.07-22.44 10.35.2.25.4.49.6.74.93 1.18 1.81 2.36 2.64 3.55 6.57-2.42 13.78-5.67 19.5-9.6-2.73 2.58-11.73 9.32-17.23 13.07.28.46.56.92.82 1.38 8.32-5.57 13.92-9.67 17.19-12.41 4.5-3.78 14.76-12.24 18.66-23.58-3.75 4.74-11.84 9.72-16.65 12.54z"/>
                <path fill="none" stroke="#FFFFFF" stroke-width="0.5" d="M44.88 54.94c-.88-1.11-2.11-2.61-3.03-3.76-1.23-1.55-2.37-3.11-3.41-4.67-.34.08-.68.17-1.02.25 1.26 1.96 2.66 3.92 4.18 5.84 1.11 1.4 2.12 2.53 2.64 3.23.1.14.31.46.59.87.33-.22.65-.44.98-.67-.3-.38-.62-.74-.93-1.13zM51.34 60.8c-.73-.69-2.49-1.84-4.33-3.56-.4.28-.81.56-1.22.84 1.18 1.67 2.8 3.72 4.06 4.32.91.6 1.42-1.02.49-1.9zM60.97 35.81c-10.49-13.21-23.31-20.46-28.84-16.07-4.29 3.41-2.53 13.38 3.39 23.85.3-.1.61-.21.91-.31-5.97-10.2-7.61-19.68-3.56-22.9 5.09-4.04 17.37 3.24 27.56 16.06 2.11 2.66 3.96 5.32 5.53 7.92 6.01 9.95 7.86 18.95 3.7 22.62-1.27 1.12-5.15 1.56-10.24-.72-.07.09.04.33.13.39 4.39 1.77 8.6 2.44 10.72.75 4.31-3.42.39-17.74-10.1-30.9z"/>
                <text x="55" y="56" fill="#FFFFFF" font-family="serif" font-weight="bold" font-size="18" text-anchor="middle">NASA</text>
            </svg>
            <span class="text-[10px] font-bold uppercase tracking-widest" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">NASA ®</span>
        </a>
    </div>

    <!-- Right: SUPSI -->
    <div class="text-[10px] font-medium uppercase tracking-widest text-gray-500 text-center md:text-right" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        SUPSI Visual Communication Class
    </div>
</footer>
```

- [ ] **Step 2: Commit changes to archive.html**

```bash
git add archive.html
git commit -m "feat: add NASA logo to archive footer"
```

---

### Task 3: Verification

- [ ] **Step 1: Check link target and behavior**

Verify that the link in both files points to `https://www.nasa.gov` and has `target="_blank"`.

- [ ] **Step 2: Visual check of centering**

Ensure that on desktop, the NASA block is perfectly centered between the left and right elements. On mobile, all three elements should be centered and stacked.
