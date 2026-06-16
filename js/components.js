// components.js - Shared header and footer components

const NASA_LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 92" class="w-7 h-auto">
    <circle fill="#0B3C91" cx="55" cy="46" r="45"/>
    <g fill="#FFFFFF">
        <circle cx="47.68" cy="12.57" r="0.45"/><circle cx="52.30" cy="13.17" r="0.45"/><circle cx="58.36" cy="21.33" r="0.45"/><circle cx="25.12" cy="63.33" r="0.45"/><circle cx="26.29" cy="66.93" r="0.45"/><circle cx="35.80" cy="61.32" r="0.45"/><circle cx="38.50" cy="67.02" r="0.45"/><circle cx="70.84" cy="61.08" r="0.45"/><circle cx="82.48" cy="60.42" r="0.45"/><circle cx="76.72" cy="57.96" r="0.45"/><circle cx="70.84" cy="58.20" r="0.45"/>
        <path d="M30.1 20.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
        <path d="M80.1 30.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
    </g>
    <path fill="#E03A3E" d="M59.57 35.39c-4.67 1.81-9.22 3.43-13.06 4.63-7.8 2.45-29.16 9.06-42.06 17.4l1.08.42c7.86-4.44 12.97-5.84 17.88-7.38 5.34-1.68 22.6-5.72 30.42-7.92c2.64-.74 5.73-1.72 9.01-2.9-.76-1.06-1.57-2.13-2.41-3.19-.29-.35-.58-.71-.87-1.06zM65.27 43.24c-1.13.77-2.08 1.38-2.74 1.76-3.84 2.22-22.56 15-26.82 17.94s-16.08 14.1-19.56 17.34l-.12 1.32c11.22-10.08 14.74-12.57 19.2-15.96 5.52-4.2 16.94-11.97 20.82-14.46 3.71-2.38 7.06-4.57 10.06-6.57-.05-.08-.1-.16-.15-.25-.23-.38-.46-.75-.7-1.12zM82.81 24.72c-5.47 3.2-14.08 7.07-22.44 10.35.2.25.4.49.6.74.93 1.18 1.81 2.36 2.64 3.55 6.57-2.42 13.78-5.67 19.5-9.6-2.73 2.58-11.73 9.32-17.23 13.07.28.46.56.92.82 1.38 8.32-5.57 13.92-9.67 17.19-12.41 4.5-3.78 14.76-12.24 18.66-23.58-3.75 4.74-11.84 9.72-16.65 12.54z"/>
    <path fill="none" stroke="#FFFFFF" stroke-width="0.5" d="M44.88 54.94c-.88-1.11-2.11-2.61-3.03-3.76-1.23-1.55-2.37-3.11-3.41-4.67-.34.08-.68.17-1.02.25 1.26 1.96 2.66 3.92 4.18 5.84 1.11 1.4 2.12 2.53 2.64 3.23.1.14.31.46.59.87.33-.22.65-.44.98-.67-.3-.38-.62-.74-.93-1.13zM51.34 60.8c-.73-.69-2.49-1.84-4.33-3.56-.4.28-.81.56-1.22.84 1.18 1.67 2.8 3.72 4.06 4.32.91.6 1.42-1.02.49-1.9zM60.97 35.81c-10.49-13.21-23.31-20.46-28.84-16.07-4.29 3.41-2.53 13.38 3.39 23.85.3-.1.61-.21.91-.31-5.97-10.2-7.61-19.68-3.56-22.9 5.09-4.04 17.37 3.24 27.56 16.06 2.11 2.66 3.96 5.32 5.53 7.92 6.01 9.95 7.86 18.95 3.7 22.62-1.27 1.12-5.15 1.56-10.24-.72-.07.09.04.33.13.39 4.39 1.77 8.6 2.44 10.72.75 4.31-3.42.39-17.74-10.1-30.9z"/>
    <text x="55" y="56" fill="#FFFFFF" font-family="serif" font-weight="bold" font-size="18" text-anchor="middle">NASA</text>
</svg>`;

const NASA_LOGO_SVG_FOOTER = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 92" class="w-8 h-auto">
    <circle fill="#0B3C91" cx="55" cy="46" r="45"/>
    <g fill="#FFFFFF">
        <circle cx="47.68" cy="12.57" r="0.45"/><circle cx="52.30" cy="13.17" r="0.45"/><circle cx="58.36" cy="21.33" r="0.45"/><circle cx="25.12" cy="63.33" r="0.45"/><circle cx="26.29" cy="66.93" r="0.45"/><circle cx="35.80" cy="61.32" r="0.45"/><circle cx="38.50" cy="67.02" r="0.45"/><circle cx="70.84" cy="61.08" r="0.45"/><circle cx="82.48" cy="60.42" r="0.45"/><circle cx="76.72" cy="57.96" r="0.45"/><circle cx="70.84" cy="58.20" r="0.45"/>
        <path d="M30.1 20.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
        <path d="M80.1 30.1l.1-1.1.1 1.1.4.4 1.1.1-1.1.1-.4.4-.1 1.1-.1-1.1-.4-.4-1.1-.1 1.1-.1.4-.4z"/>
    </g>
    <path fill="#E03A3E" d="M59.57 35.39c-4.67 1.81-9.22 3.43-13.06 4.63-7.8 2.45-29.16 9.06-42.06 17.4l1.08.42c7.86-4.44 12.97-5.84 17.88-7.38 5.34-1.68 22.6-5.72 30.42-7.92c2.64-.74 5.73-1.72 9.01-2.9-.76-1.06-1.57-2.13-2.41-3.19-.29-.35-.58-.71-.87-1.06zM65.27 43.24c-1.13.77-2.08 1.38-2.74 1.76-3.84 2.22-22.56 15-26.82 17.94s-16.08 14.1-19.56 17.34l-.12 1.32c11.22-10.08 14.74-12.57 19.2-15.96 5.52-4.2 16.94-11.97 20.82-14.46 3.71-2.38 7.06-4.57 10.06-6.57-.05-.08-.1-.16-.15-.25-.23-.38-.46-.75-.7-1.12zM82.81 24.72c-5.47 3.2-14.08 7.07-22.44 10.35.2.25.4.49.6.74.93 1.18 1.81 2.36 2.64 3.55 6.57-2.42 13.78-5.67 19.5-9.6-2.73 2.58-11.73 9.32-17.23 13.07.28.46.56.92.82 1.38 8.32-5.57 13.92-9.67 17.19-12.41 4.5-3.78 14.76-12.24 18.66-23.58-3.75 4.74-11.84 9.72-16.65 12.54z"/>
    <path fill="none" stroke="#FFFFFF" stroke-width="0.5" d="M44.88 54.94c-.88-1.11-2.11-2.61-3.03-3.76-1.23-1.55-2.37-3.11-3.41-4.67-.34.08-.68.17-1.02.25 1.26 1.96 2.66 3.92 4.18 5.84 1.11 1.4 2.12 2.53 2.64 3.23.1.14.31.46.59.87.33-.22.65-.44.98-.67-.3-.38-.62-.74-.93-1.13zM51.34 60.8c-.73-.69-2.49-1.84-4.33-3.56-.4.28-.81.56-1.22.84 1.18 1.67 2.8 3.72 4.06 4.32.91.6 1.42-1.02.49-1.9zM60.97 35.81c-10.49-13.21-23.31-20.46-28.84-16.07-4.29 3.41-2.53 13.38 3.39 23.85.3-.1.61-.21.91-.31-5.97-10.2-7.61-19.68-3.56-22.9 5.09-4.04 17.37 3.24 27.56 16.06 2.11 2.66 3.96 5.32 5.53 7.92 6.01 9.95 7.86 18.95 3.7 22.62-1.27 1.12-5.15 1.56-10.24-.72-.07.09.04.33.13.39 4.39 1.77 8.6 2.44 10.72.75 4.31-3.42.39-17.74-10.1-30.9z"/>
    <text x="55" y="56" fill="#FFFFFF" font-family="serif" font-weight="bold" font-size="18" text-anchor="middle">NASA</text>
</svg>`;

/**
 * Renders the shared site header
 * @param {Object} options - Configuration options
 * @param {string} options.activePage - 'archive' or 'index'
 * @param {string} options.aboutHref - Href for the About link (e.g., '#about-project' or 'index.html#about-project')
 * @param {string} options.pathPrefix - Path prefix for resources (e.g., '../' or '')
 */
function renderHeader(options = {}) {
    const { activePage = 'index', aboutHref = '#about-project', pathPrefix = '' } = options;
    const isArchiveActive = activePage === 'archive';

    return `
    <header class="py-6 px-4 md:px-margin relative z-50 bg-transparent w-full">
        <div class="max-w-container-max-width mx-auto flex justify-between items-center relative w-full">
            <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant hover:text-nasa-red transition-all pb-1 text-sm font-medium">Go to nasa.gov</a>
            <a href="${pathPrefix}index.html" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:opacity-85 transition-all">
                <img src="${pathPrefix}Immagini/NASA_gov.png" alt="NASA Logo" class="h-12 w-auto">
            </a>
            <nav class="flex gap-8 text-sm font-medium" style="font-family: 'Inter', sans-serif;">
                <a class="${isArchiveActive ? 'text-nasa-red border-b border-nasa-red' : 'text-on-surface-variant hover:text-nasa-red'} transition-all pb-1" href="${pathPrefix}pages/archive.html">Projects</a>
                <a class="text-on-surface-variant hover:text-nasa-red transition-all pb-1" href="${aboutHref}">About this archive</a>
            </nav>
        </div>
    </header>`;
}

/**
 * Renders the shared site footer
 * @param {Object} options - Configuration options
 * @param {string} options.pathPrefix - Path prefix for resources (e.g., '../' or '')
 */
function renderFooter(options = {}) {
    const { pathPrefix = '' } = options;
    return `
    <footer class="bg-black text-white w-full border-t border-outline-variant mt-20 font-['Inter',sans-serif]">
        <div class="max-w-[1920px] mx-auto px-6 md:px-12 py-16">
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between pb-12">
                <!-- Brand Col -->
                <div class="lg:w-1/3 flex flex-col gap-6">
                    <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer" class="block hover:opacity-80 transition-opacity" title="NASA Official Website">
                        <img src="${pathPrefix}Immagini/NASA_gov.png" alt="NASA Logo" class="h-16 w-auto">
                    </a>
                    <h2 class="text-2xl font-bold leading-tight tracking-tight">National Aeronautics and Space<br>Administration</h2>
                    <p class="text-[13px] text-gray-300 leading-relaxed max-w-sm mt-2">
                        NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.
                    </p>
                    <a href="https://www.nasa.gov/about-nasas-mission/" target="_blank" class="text-[14px] font-bold hover:text-gray-300 transition-colors mt-2">About NASA's Mission</a>
                    <a href="https://www.nasa.gov/careers/" target="_blank" class="text-[14px] font-bold hover:text-gray-300 transition-colors flex items-center mt-2 group w-fit">
                        Join Us <svg class="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform text-nasa-red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 16v-3H7v-2h5V8l4 4-4 4z" fill="white"/></svg>
                    </a>
                </div>

                <!-- Link Columns & Socials -->
                <div class="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 lg:pt-20">
                    <!-- Col 1 -->
                    <ul class="flex flex-col gap-4 text-[13px] font-bold">
                        <li><a href="https://www.nasa.gov/" target="_blank" class="hover:text-gray-300 transition-colors">Home</a></li>
                        <li><a href="https://www.nasa.gov/news/" target="_blank" class="hover:text-gray-300 transition-colors">News & Events</a></li>
                        <li><a href="https://www.nasa.gov/multimedia/" target="_blank" class="hover:text-gray-300 transition-colors">Multimedia</a></li>
                        <li><a href="https://plus.nasa.gov/" target="_blank" class="hover:text-gray-300 transition-colors flex items-center">NASA+ <span class="ml-2 text-[9px] border border-nasa-red text-nasa-red px-1 rounded-sm">LIVE</span></a></li>
                        <li><a href="https://www.nasa.gov/missions/" target="_blank" class="hover:text-gray-300 transition-colors">Missions</a></li>
                    </ul>
                    
                    <!-- Col 2 -->
                    <ul class="flex flex-col gap-4 text-[13px] font-bold">
                        <li><a href="https://www.nasa.gov/humans-in-space/" target="_blank" class="hover:text-gray-300 transition-colors">Humans in Space</a></li>
                        <li><a href="https://www.nasa.gov/earth/" target="_blank" class="hover:text-gray-300 transition-colors">Earth</a></li>
                        <li><a href="https://science.nasa.gov/solar-system/" target="_blank" class="hover:text-gray-300 transition-colors">The Solar System</a></li>
                        <li><a href="https://science.nasa.gov/universe/" target="_blank" class="hover:text-gray-300 transition-colors">The Universe</a></li>
                        <li><a href="https://science.nasa.gov/" target="_blank" class="hover:text-gray-300 transition-colors">Science</a></li>
                    </ul>

                    <!-- Col 3 -->
                    <ul class="flex flex-col gap-4 text-[13px] font-bold">
                        <li><a href="https://www.nasa.gov/aeronautics/" target="_blank" class="hover:text-gray-300 transition-colors">Aeronautics</a></li>
                        <li><a href="https://www.nasa.gov/technology/" target="_blank" class="hover:text-gray-300 transition-colors">Technology</a></li>
                        <li><a href="https://www.nasa.gov/learning-resources/" target="_blank" class="hover:text-gray-300 transition-colors">Learning Resources</a></li>
                        <li><a href="https://www.nasa.gov/about-nasa/" target="_blank" class="hover:text-gray-300 transition-colors">About NASA</a></li>
                        <li><a href="https://www.nasa.gov/nasa-en-espanol/" target="_blank" class="hover:text-gray-300 transition-colors">NASA en Español</a></li>
                    </ul>

                    <!-- Col 4 (Socials) -->
                    <div class="flex flex-col gap-4">
                        <h4 class="text-[13px] font-bold">Follow NASA</h4>
                        <div class="flex gap-2">
                            <a href="https://www.facebook.com/NASA/" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors" aria-label="Facebook">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                            </a>
                            <a href="https://www.instagram.com/nasa/" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors" aria-label="Instagram">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                            </a>
                            <a href="https://twitter.com/NASA" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors" aria-label="X (formerly Twitter)">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://www.youtube.com/nasa" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors" aria-label="YouTube">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.253 0-7.812-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.747 5 12 5 12 5s6.253 0 7.812.418ZM15.328 12l-4.5-2.6v5.2l4.5-2.6Z" clip-rule="evenodd" /></svg>
                            </a>
                        </div>
                        <a href="https://www.nasa.gov/socialmedia/" target="_blank" class="text-[13px] font-bold hover:text-gray-300 transition-colors mt-2">More NASA Social Accounts</a>
                        <a href="https://www.nasa.gov/newsletters/" target="_blank" class="text-[13px] font-bold hover:text-gray-300 transition-colors">NASA Newsletters</a>
                    </div>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="border-t border-gray-800 pt-8 flex flex-col gap-6">
                <div class="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-gray-300 font-medium">
                    <a href="https://www.nasa.gov/sitemap/" target="_blank" class="hover:text-white transition-colors">Sitemap</a>
                    <a href="https://www.nasa.gov/news/media-resources/" target="_blank" class="hover:text-white transition-colors">For Media</a>
                    <a href="https://www.nasa.gov/privacy/" target="_blank" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="https://www.nasa.gov/foia/" target="_blank" class="hover:text-white transition-colors">FOIA</a>
                    <a href="https://www.nasa.gov/no-fear-act/" target="_blank" class="hover:text-white transition-colors">No FEAR Act</a>
                    <a href="https://www.nasa.gov/oig/" target="_blank" class="hover:text-white transition-colors">Office of the IG</a>
                    <a href="https://www.nasa.gov/budget-and-annual-reports/" target="_blank" class="hover:text-white transition-colors">Budget & Annual Reports</a>
                    <a href="https://www.nasa.gov/agency-financial-reports/" target="_blank" class="hover:text-white transition-colors">Agency Financial Reports</a>
                    <a href="https://www.nasa.gov/contact/" target="_blank" class="hover:text-white transition-colors">Contact NASA</a>
                    <a href="https://www.nasa.gov/accessibility/" target="_blank" class="hover:text-white transition-colors">Accessibility</a>
                </div>
                
                <div class="flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-gray-400 font-medium">
                    <span>Page Last Updated: May 20, 2026</span>
                    <span>Page Editor: Dacia Massengill</span>
                    <span>Responsible NASA Official: Abigail Bowman</span>
                </div>
            </div>
        </div>
    </footer>`;
}
