// archive-app.js
const API_URL = 'https://ixd-supsi.github.io/n70api/data.json';
const IMG_BASE_URL = 'https://ixd-supsi.github.io/n70api/immagini/';

let allProjects = [];
let selectedMacroTags = new Set();
let selectedMicroTags = new Set();
let currentSearch = '';
let currentSort = 'shuffle';

const SORT_OPTIONS = {
    SHUFFLE: 'shuffle',
    ALPHA_AZ: 'alpha-az',
    ALPHA_ZA: 'alpha-za',
    CHRONO_NEW: 'chrono-new',
    CHRONO_OLD: 'chrono-old'
};

const gridContainer = document.getElementById('archive-grid');
const resultsCountEl = document.getElementById('resultsCount');
const macroContainer = document.getElementById('macroContainer');
const microContainer = document.getElementById('microContainer');

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// User-specified Macro Tags definition & normalization mapping
const MACRO_TAGS_LIST = [
    '2D', '3D', 'Apollo', 'Astronomy', 'Audio', 'Climate', 'Science', 
    'Data visualization', 'Earth', 'Planets', 'Educational', 'Game', 
    'History', 'Archive', 'Robot', 'Space'
];

const MACRO_TAGS_MAP = {
    '2d': '2D',
    '3d': '3D',
    'apollo': 'Apollo',
    'apollo-program': 'Apollo',
    'astronomy': 'Astronomy',
    'audio': 'Audio',
    'sound': 'Audio',
    'sounds': 'Audio',
    'climate': 'Climate',
    'science': 'Science',
    'data visualization': 'Data visualization',
    'data-visualization': 'Data visualization',
    'earth': 'Earth',
    'planet': 'Planets',
    'planets': 'Planets',
    'exoplanet': 'Planets',
    'exoplanets': 'Planets',
    'educational': 'Educational',
    'game': 'Game',
    'history': 'History',
    'historical': 'History',
    'historical-archives': 'History',
    'archive': 'Archive',
    'nasa archive': 'Archive',
    'robot': 'Robot',
    'rover': 'Robot',
    'space': 'Space',
    'deep space': 'Space'
};

/**
 * Fisher-Yates shuffle for robust randomness.
 * @param {Array} array - The array to shuffle.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Categorize project tags into MACRO and MICRO sets.
 */
function categorizeProjectTags(project) {
    project.macroTags = [];
    project.microTags = [];

    if (project.tags) {
        project.tags.forEach(tag => {
            const cleaned = tag.trim().toLowerCase();
            if (!cleaned) return;

            if (MACRO_TAGS_MAP[cleaned]) {
                const mappedMacro = MACRO_TAGS_MAP[cleaned];
                if (!project.macroTags.includes(mappedMacro)) {
                    project.macroTags.push(mappedMacro);
                }
            } else {
                // Capitalize micro tags nicely for premium HUD look
                const formattedMicro = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
                if (!project.microTags.includes(formattedMicro)) {
                    project.microTags.push(formattedMicro);
                }
            }
        });
    }
}

/**
 * Collects and sorts all active macro and micro tags found in the database.
 */
function getPresentTags() {
    const macroSet = new Set();
    const microSet = new Set();

    allProjects.forEach(project => {
        project.macroTags.forEach(t => macroSet.add(t));
        project.microTags.forEach(t => microSet.add(t));
    });

    // We sort the macro tags by user specified order, keeping only those present
    const sortedMacro = MACRO_TAGS_LIST.filter(t => macroSet.has(t));
    
    // Sort micro tags alphabetically
    const sortedMicro = Array.from(microSet).sort((a, b) => a.localeCompare(b));

    return { macroTags: sortedMacro, microTags: sortedMicro };
}

/**
 * Renders macro and micro tag filter buttons dynamically in their respective containers.
 */
function renderFilterButtons() {
    const { macroTags, microTags } = getPresentTags();

    if (macroContainer) {
        macroContainer.innerHTML = '';
        macroTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.innerText = tag.toUpperCase();
            
            const isSelected = selectedMacroTags.has(tag);
            if (isSelected) {
                btn.className = "px-3 py-1.5 border border-nasa-red bg-nasa-red text-[11px] font-bold tech-label text-white shadow-[0_0_10px_rgba(224,58,62,0.3)] rounded-full";
            } else {
                btn.className = "px-3 py-1.5 border border-outline-variant bg-surface-container-low text-[11px] font-bold tech-label hover:border-nasa-red transition-all text-on-surface rounded-full";
            }
            
            btn.onclick = () => {
                if (isSelected) {
                    selectedMacroTags.delete(tag);
                } else {
                    selectedMacroTags.add(tag);
                }
                renderFilterButtons();
                const filtered = filterProjects();
                applySortToArray(filtered);
                updateResultsState(filtered.length);
                renderGrid(filtered);
                updateTagChipStates();
            };
            macroContainer.appendChild(btn);
        });
    }

    if (microContainer) {
        microContainer.innerHTML = '';
        microTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.innerText = tag.toUpperCase();
            
            const isSelected = selectedMicroTags.has(tag);
            if (isSelected) {
                btn.className = "px-3 py-1.5 border border-nasa-red bg-nasa-red text-[11px] font-bold tech-label text-white shadow-[0_0_10px_rgba(224,58,62,0.3)] rounded-full";
            } else {
                btn.className = "px-3 py-1.5 border border-outline-variant bg-surface-container-low text-[11px] font-bold tech-label hover:border-nasa-red transition-all text-on-surface rounded-full";
            }
            
            btn.onclick = () => {
                if (isSelected) {
                    selectedMicroTags.delete(tag);
                } else {
                    selectedMicroTags.add(tag);
                }
                renderFilterButtons();
                const filtered = filterProjects();
                applySortToArray(filtered);
                updateResultsState(filtered.length);
                renderGrid(filtered);
                updateTagChipStates();
            };
            microContainer.appendChild(btn);
        });
    }
}

/**
 * Fetches data from the API, amplifies to ~104 items, categorizes tags, and handles shuffles.
 */
async function loadData() {
    try {
        if (resultsCountEl) {
            resultsCountEl.innerText = "ESTABLISHING TELEMETRY LINK...";
        }

        const response = await fetch(API_URL);
        const originalData = await response.json();

        // Duplicate to reach exactly 104 items (13 projects * 8 cycles) for dense masonry grid simulation
        allProjects = [];
        for (let i = 0; i < 8; i++) {
            originalData.forEach((item, originalIndex) => {
                const projectCopy = JSON.parse(JSON.stringify(item));
                
                // Deterministic indexing
                projectCopy._globalIndex = (i * originalData.length) + originalIndex + 1;
                
                // Categorize tags into Macro and Micro groups
                categorizeProjectTags(projectCopy);
                
                // Safe Image handling
                const imgName = (projectCopy.immagine && projectCopy.immagine.length > 0) ? projectCopy.immagine[0] : '';
                projectCopy._imgSrc = imgName && !imgName.startsWith('...') ? `${IMG_BASE_URL}${imgName}` : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop';
                
                // Safe Date handling
                let day = 20;
                let monthStr = 'JUL';
                if (projectCopy.data) {
                    if (projectCopy.data.giorno) day = projectCopy.data.giorno;
                    if (projectCopy.data.mese) {
                        const mIdx = Math.max(1, Math.min(12, projectCopy.data.mese)) - 1;
                        monthStr = MONTH_NAMES[mIdx];
                    }
                }
                projectCopy._dateStr = `${monthStr} ${day}`;

                // Search string calculation
                projectCopy._searchStr = `${projectCopy.titolo || ''} ${projectCopy.autore || ''} ${projectCopy.descrizione || ''} ${projectCopy.macroTags.join(' ')} ${projectCopy.microTags.join(' ')}`.toLowerCase();

                allProjects.push(projectCopy);
            });
        }

        // Apply current sort
        applySort();

        // Render initially
        renderFilterButtons();
        renderGrid(allProjects);
        
        if (resultsCountEl) {
            resultsCountEl.innerText = `${allProjects.length} Results`;
        }
    } catch (error) {
        console.error("Error loading archive telemetry:", error);
        if (resultsCountEl) {
            resultsCountEl.innerText = "CONNECTION FAILURE // OFFLINE";
            resultsCountEl.classList.add("text-nasa-red");
        }
    }
}

/**
 * Populates grid with generated card DOM elements.
 */
function renderGrid(projectsToRender) {
    if (!gridContainer) return;

    const NUM_COLUMNS = 3;
    const columns = Array.from({ length: NUM_COLUMNS }, () => []);

    // Distribute projects across columns in round-robin for horizontal ordering
    projectsToRender.forEach((project, index) => {
        const columnIndex = index % NUM_COLUMNS;
        columns[columnIndex].push(project);
    });

    // Build card HTML for each project
    const buildCardHTML = (project, index) => {
        const displayTags = [...project.macroTags, ...project.microTags].sort();

        return `
            <article data-id="${index}" class="project-card break-inside-avoid mb-8 group cursor-pointer rounded-xl overflow-hidden flex flex-col border border-white/20 hover:border-white/60 transition-all duration-300 bg-surface-container-low">
                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full w-full">
                    <div class="relative overflow-hidden aspect-[16/10] bg-surface-container">
                        <img src="${project._imgSrc}" alt="${project.titolo}" class="w-full h-full object-cover halftone-img transition-transform duration-700 ease-out" loading="lazy">
                        <div class="absolute top-4 right-4">
                            <span class="text-[10px] font-bold text-white bg-nasa-red px-2 py-1 rounded-full">${project._dateStr}</span>
                        </div>
                    </div>
                    <div class="p-6 flex-grow flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-on-surface mb-2 uppercase font-display">${project.titolo}</h3>
                            <p class="tech-label text-[10px] font-medium text-nasa-red mb-3 font-mono">${project.autore || 'NASA'}</p>
                            <p class="text-sm text-on-surface-variant/90 leading-relaxed mb-6 font-sans">${project.descrizione}</p>
                        </div>
                        <div class="flex flex-wrap gap-1 mb-4">
                            ${displayTags.map(t => `
                                <span class="tag-chip px-2 py-0.5 border border-nasa-red rounded text-[8px] font-mono text-nasa-red uppercase tracking-wider transition-all">
                                    ${t}
                                </span>
                            `).join('')}
                        </div>
                        <div class="flex items-center justify-end pt-4 mt-auto">
                            <span class="inline-flex items-center gap-2 text-on-surface group-hover:text-nasa-red transition-colors border-b border-nasa-red pb-1">
                                <span class="uppercase font-label-sm text-label-sm uppercase tracking-widest">View Project</span>
                                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_forward</span>
                            </span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    };

    // Build columns HTML - each column is a flex column
    let gridHTML = columns.map((colProjects, colIdx) => {
        const colCards = colProjects.map((project, projIdx) => {
            const globalIndex = colIdx + (projIdx * NUM_COLUMNS);
            return buildCardHTML(project, globalIndex);
        }).join('');
        return `<div class="flex flex-col gap-8 flex-1">${colCards}</div>`;
    }).join('');

    gridContainer.innerHTML = gridHTML;
}

/**
 * Applies the current sort option to allProjects array.
 */
function applySort() {
    applySortToArray(allProjects);
}

/**
 * Applies the current sort option to a given array.
 */
function applySortToArray(arr) {
    switch (currentSort) {
        case SORT_OPTIONS.ALPHA_AZ:
            arr.sort((a, b) => (a.titolo || '').localeCompare(b.titolo || ''));
            break;
        case SORT_OPTIONS.ALPHA_ZA:
            arr.sort((a, b) => (b.titolo || '').localeCompare(a.titolo || ''));
            break;
        case SORT_OPTIONS.CHRONO_NEW:
            arr.sort((a, b) => {
                const dateA = (a.data?.mese || 0) * 31 + (a.data?.giorno || 0);
                const dateB = (b.data?.mese || 0) * 31 + (b.data?.giorno || 0);
                return dateB - dateA;
            });
            break;
        case SORT_OPTIONS.CHRONO_OLD:
            arr.sort((a, b) => {
                const dateA = (a.data?.mese || 0) * 31 + (a.data?.giorno || 0);
                const dateB = (b.data?.mese || 0) * 31 + (b.data?.giorno || 0);
                return dateA - dateB;
            });
            break;
        case SORT_OPTIONS.SHUFFLE:
        default:
            shuffle(allProjects);
            break;
    }
}

/**
 * Core cumulative filtering logic intersecting active macro, micro and search states.
 * Returns filtered array of projects.
 */
function filterProjects() {
    let results = allProjects.filter(project => {
        let matchesMacro = selectedMacroTags.size === 0 ||
                           project.macroTags.some(t => selectedMacroTags.has(t));

        let matchesMicro = selectedMicroTags.size === 0 ||
                           project.microTags.some(t => selectedMicroTags.has(t));

        let matchesSearch = !currentSearch || project._searchStr.includes(currentSearch);

        return matchesMacro && matchesMicro && matchesSearch;
    });

    if (currentSearch && currentSort === 'shuffle') {
        const term = currentSearch.toLowerCase();
        results.sort((a, b) => {
            const aTitle = (a.titolo || '').toLowerCase();
            const bTitle = (b.titolo || '').toLowerCase();
            const aStarts = aTitle.startsWith(term);
            const bStarts = bTitle.startsWith(term);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            if (aTitle.includes(term) && !bTitle.includes(term)) return -1;
            if (!aTitle.includes(term) && bTitle.includes(term)) return 1;

            return 0;
        });
    }

    return results;
}

/**
 * Updates tag chip active states based on selected filters.
 */
function updateTagChipStates() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const tagChips = card.querySelectorAll('.tag-chip');
        tagChips.forEach(chip => {
            const chipText = chip.textContent.trim();
            const isMacroSelected = selectedMacroTags.has(chipText);
            const isMicroSelected = selectedMicroTags.has(chipText);
            const hasActiveFilter = selectedMacroTags.size > 0 || selectedMicroTags.size > 0;

            if (hasActiveFilter && (isMacroSelected || isMicroSelected)) {
                chip.classList.add('tag-active');
            } else {
                chip.classList.remove('tag-active');
            }
        });
    });
}

/**
 * Updates results count and handles empty state display.
 */
function updateResultsState(visibleCount) {
    if (resultsCountEl) {
        resultsCountEl.innerText = `${visibleCount} Results`;
    }

    const existingMsg = document.getElementById('no-telemetry-msg');
    if (visibleCount === 0) {
        if (!existingMsg) {
            const msgDiv = document.createElement('div');
            msgDiv.id = 'no-telemetry-msg';
            msgDiv.className = 'col-span-full py-20 text-center w-full';
            msgDiv.innerHTML = `
                <p class="text-outline text-sm font-mono uppercase tracking-widest mb-4">NO TELEMETRY MATCHES FOUND IN ARCHIVE DATABASE</p>
                <button onclick="resetFilters()" class="text-[10px] font-mono uppercase tracking-widest text-[#E03A3E] border-b border-[#E03A3E] border-dashed pb-1 hover:opacity-75 transition-opacity">
                    SYSTEM RESET // CLEAR FILTER LOGS
                </button>
            `;
            gridContainer.appendChild(msgDiv);
        }
    } else if (existingMsg) {
        existingMsg.remove();
    }
}

/**
 * Full reset to default states.
 */
window.resetFilters = () => {
    selectedMacroTags.clear();
    selectedMicroTags.clear();
    currentSearch = '';

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const microSearchInput = document.getElementById('microSearchInput');
    if (microSearchInput) {
        microSearchInput.value = '';
        const microContainer = document.getElementById('microContainer');
        if (microContainer) {
            microContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('hidden'));
        }
    }

    renderFilterButtons();
    const filtered = filterProjects();
    applySortToArray(filtered);
    updateResultsState(filtered.length);
    renderGrid(filtered);
    updateTagChipStates();
};

// Initialize app when DOM is fully prepared
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            const filtered = filterProjects();
            updateResultsState(filtered.length);
            renderGrid(filtered);
            updateTagChipStates();
        });
    }

    const microSearchInput = document.getElementById('microSearchInput');
    if (microSearchInput) {
        microSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const microContainer = document.getElementById('microContainer');
            if (!microContainer) return;
            const buttons = Array.from(microContainer.querySelectorAll('button'));

            if (searchTerm === '') {
                buttons.forEach(btn => {
                    btn.classList.remove('hidden');
                    microContainer.appendChild(btn);
                });
                return;
            }

            const startsWith = buttons.filter(btn => btn.innerText.toLowerCase().startsWith(searchTerm));
            const contains = buttons.filter(btn => {
                const text = btn.innerText.toLowerCase();
                return text.includes(searchTerm) && !text.startsWith(searchTerm);
            });

            buttons.forEach(btn => btn.classList.add('hidden'));

            [...startsWith, ...contains].forEach(btn => {
                btn.classList.remove('hidden');
                microContainer.appendChild(btn);
            });
        });
    }

    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resetFilters();
        });
    }

    const sortBtn = document.getElementById('sortBtn');
    const sortMenu = document.getElementById('sortMenu');

    if (sortBtn && sortMenu) {
        // Toggle dropdown
        sortBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sortMenu.classList.toggle('hidden');
        });

        // Close on outside click
        document.addEventListener('click', () => {
            sortMenu.classList.add('hidden');
        });

        // Sort option clicks
        sortMenu.querySelectorAll('.sort-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSort = btn.dataset.sort;
                sortMenu.classList.add('hidden');
                const filtered = filterProjects();
                applySortToArray(filtered);
                renderGrid(filtered);
                updateTagChipStates();
            });
        });
    }
});
