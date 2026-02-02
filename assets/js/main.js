document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Mobile Menu (Priority)
    initMobileMenu();

    // 2. Initialize Global Components (Modal)
    initModal();

    // 3. Handle Dynamic Page Content
    handleDynamicContent();

    // 4. Initialize Dropdowns (if present)
    initDropdowns();

    // 5. Initialize Countries Grid (if present)
    initCountriesGrid();
});

// --- Modal Logic ---
function initModal() {
    // Check if modal exists, if not inject it
    if (!document.getElementById('modalOverlay')) {
        const modalHTML = `
        <div id="modalOverlay" style="display: none;" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-blue-950/40 backdrop-blur-md transition-opacity"></div>
            <div class="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" id="modalContent">
                <button id="closeModalBtn" class="absolute top-6 right-6 z-10 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <div class="max-h-[90vh] overflow-y-auto">
                    <div class="relative">
                        <div id="modalInnerForm" class="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-blue-50">
                            <div class="mb-10">
                                <h3 class="text-3xl font-bold text-blue-950 mb-3">Başvuru Formu</h3>
                                <p class="text-slate-500">Lütfen aşağıdaki bilgileri eksiksiz doldurunuz.</p>
                            </div>
                            <form id="globalAppForm" class="space-y-5">
                                <input type="hidden" name="form_type" value="application">
                                <div class="grid md:grid-cols-2 gap-5">
                                    <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Adınız*</label><input required name="name" placeholder="Adınız" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50 text-black" type="text"></div>
                                    <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Soyadınız*</label><input required name="surname" placeholder="Soyadınız" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50 text-black" type="text"></div>
                                </div>
                                <div class="grid md:grid-cols-2 gap-5">
                                    <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Doğum Tarihi*</label><input required name="birthdate" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50 text-black" type="date"></div>
                                    <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Email*</label><input required name="email" placeholder="example@mail.com" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50 text-black" type="email"></div>
                                </div>
                                <div class="grid md:grid-cols-2 gap-5">
                                    <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Telefon*</label><input required name="phone" placeholder="0 (5XX) XXX XX XX" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50 text-black" type="tel"></div>
                                    <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Gidilecek Ülke*</label>
                                        <select required name="country" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all appearance-none disabled:opacity-50 text-black">
                                            <option value="">Seçiniz</option>
                                            <option value="Almanya">Almanya</option>
                                            <option value="Amerika">Amerika Birleşik Devletleri</option>
                                            <option value="Fransa">Fransa</option>
                                            <option value="İtalya">İtalya</option>
                                            <option value="İngiltere">İngiltere</option>
                                            <option value="Hollanda">Hollanda</option>
                                            <option value="Kanada">Kanada</option>
                                            <option value="İspanya">İspanya</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-sm font-semibold text-slate-700 ml-1">Pasaport Numarası*</label>
                                    <input required name="passport" placeholder="U12345678" class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all disabled:opacity-50 text-black" type="text">
                                </div>
                                <div class="space-y-1.5"><label class="text-sm font-semibold text-slate-700 ml-1">Adres*</label><textarea required name="address" rows="2" placeholder="Tam adresinizi yazınız..." class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:bg-white outline-none transition-all resize-none disabled:opacity-50 text-black"></textarea></div>
                                <div class="flex items-start gap-3 py-2"><input required id="terms" class="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50" type="checkbox"><label for="terms" class="text-xs text-slate-600 leading-tight select-none cursor-pointer">Vize danışmanlık süreçleri için verilerimin işlenmesini ve tarafıma ulaşılmasını <span class="font-bold text-blue-900">Okudum Onaylıyorum*</span></label></div>
                                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 text-lg group disabled:bg-slate-400 disabled:shadow-none">
                                    Talebi Oluştur
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send group-hover:translate-x-1 transition-transform"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Open Modal Logic
    document.addEventListener('click', (e) => {
        // Find closest anchor tag that links to #basvuru-formu
        const target = e.target.closest('a[href*="#basvuru-formu"]') || e.target.closest('#openModalBtn');
        if (target) {
            e.preventDefault();
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            // Auto complete country if on detail page
            const urlParams = new URLSearchParams(window.location.search);
            const countryCode = urlParams.get('country');
            if (countryCode) {
                // Try to select if option exists
                const select = modalOverlay.querySelector('select[name="country"]');
                // Naive mapping or check values (need to match casing: 'almanya' -> 'Almanya')
                // For now leaving manual selection or enhancing in next iteration
            }
        }
    });

    // Close Modal Logic
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    modalOverlay.addEventListener('click', (e) => {
        if (!e.target.closest('#modalContent')) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Form Submissions
    setupFormSubmission('globalAppForm');
    setupFormSubmission('onPageAppForm');
    setupFormSubmission('contactForm');
}

function setupFormSubmission(formId) {
    const form = document.getElementById(formId);
    console.log(`Setting up form submission for: ${formId}`, form ? 'Found' : 'Not Found');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log(`Form submitted: ${formId}`);

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'Gönderiliyor...';

            const formData = new FormData(form);

            // Debug: Log form data
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            try {
                // Adjust path for subdirectories
                let actionUrl = 'send-mail.php';
                const path = window.location.pathname;
                if (path.includes('/ulke/') || path.includes('/hizmet/')) {
                    actionUrl = '../send-mail.php';
                }
                console.log(`Sending to: ${actionUrl}`);

                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData
                });

                // Check if response is JSON
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    console.error("Non-JSON response received:", text);
                    throw new Error("Sunucudan geçersiz yanıt alındı. Lütfen daha sonra tekrar deneyiniz.");
                }

                const result = await response.json();

                if (result.status === 'success') {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Talebiniz Alındı!',
                            text: 'Talebiniz başarıyla iletildi. Uzmanlarımız en kısa sürede size dönüş yapacaktır.',
                            confirmButtonText: 'Tamam',
                            confirmButtonColor: '#3b82f6'
                        });
                    } else {
                        alert("Talebiniz Alındı!\nTalebiniz başarıyla iletildi. Uzmanlarımız en kısa sürede size dönüş yapacaktır.");
                    }

                    // Close modal if this form is inside one
                    const modalOverlay = document.getElementById('modalOverlay');
                    if (modalOverlay && form.closest('#modalContent')) {
                        modalOverlay.style.display = 'none';
                        document.body.style.overflow = '';
                    }

                    form.reset();
                } else {
                    const msg = result.message || 'İşleminiz gerçekleştirilemedi.';
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Bir Hata Oluştu',
                            text: msg,
                            confirmButtonText: 'Tekrar Dene',
                            confirmButtonColor: '#ef4444'
                        });
                    } else {
                        alert("Bir Hata Oluştu:\n" + msg);
                    }
                }
            } catch (error) {
                console.error("Form submission error:", error);
                const errorMsg = error.message || 'Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.';

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sunucu Hatası',
                        text: errorMsg,
                        confirmButtonText: 'Tamam',
                        confirmButtonColor: '#ef4444'
                    });
                } else {
                    alert("Sunucu Hatası:\n" + errorMsg);
                }
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }); // End of event listener
    } // End of if(form)
} // End of setupFormSubmission

// --- Dynamic Content Logic ---
// --- Dynamic Content Logic ---
async function handleDynamicContent() {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code') || urlParams.get('ulke') || urlParams.get('hizmet');

    // Fallback: extract code from path
    if (!code) {
        // Remove trailing slashes and split
        const cleanPath = path.replace(/\/$/, '');
        const segments = cleanPath.split('/').filter(Boolean);

        if (segments.length > 0) {
            // Check if we are in 'ulke' or 'hizmet' context
            // Logic: if path ends with .html, verify filename matches expectation
            // Or if rewritten url like /ulke/almanya, take last segment

            const lastSegment = segments[segments.length - 1].replace('.html', '');

            if (path.includes('ulke') || path.includes('hizmet')) {
                // Avoid using 'ulke-detay' or 'hizmet-detay' as the code itself
                if (lastSegment !== 'ulke-detay' && lastSegment !== 'hizmet-detay') {
                    code = lastSegment;
                }
            }
        }
    }

    if (!code) return;

    try {
        // Robust fetch path: Always use root-relative path
        let fetchUrl = '/assets/data/data.json';

        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`Data fetch failed: ${response.status}`);

        const data = await response.json();

        // Use lowercase for matching keys
        if (path.includes('ulke')) {
            loadCountryData(code, data.countries);
        } else if (path.includes('hizmet')) {
            loadServiceData(code, data.services);
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function loadCountryData(code, countries) {
    const country = countries[code.toLowerCase()];
    if (!country) return; // Or redirect to 404

    document.title = `${country.title} | VHS Vize Merkezi`;

    // Helper to safely set text
    const setText = (selector, text) => {
        const el = document.querySelector(selector);
        if (el) el.innerText = text;
    };

    setText('h1', country.title);
    setText('.text-8xl', country.flag); // Flag placeholder
    // If you have specific IDs in your HTML:
    // setText('#country-title', country.title);

    // Example of mapping generic classes update (specific to current template structure)
    // Update Description
    const descEl = document.querySelector('p.text-xl.text-blue-100\\/60');
    if (descEl) descEl.innerText = country.description;

    // Update Page Content (Main Body)
    const contentEl = document.getElementById('country-page-content');
    if (contentEl) {
        if (country.page_content) {
            contentEl.innerHTML = country.page_content;
        } else {
            // Fallback text if no specific content is provided
            contentEl.innerHTML = 'Vize danışmanlık süreci, konsolosluk gerekliliklerine göre titizlikle yönetilmelidir. Uzman danışmanlarımız dosyanızı eksiksiz hazırlar.';
        }
    }

    // Update Important Note
    const noteEl = document.getElementById('country-important-note');
    if (noteEl && country.important_note) {
        noteEl.innerHTML = country.important_note;
    }
}

function loadServiceData(code, services) {
    // Similar logic for services
    const service = services[code.toLowerCase()];
    if (!service) return;

    document.title = `${service.title} | VHS Vize Merkezi`;

    const header = document.getElementById('service-title') || document.querySelector('h1');
    if (header) header.innerText = service.title;

    // Also update description if placeholder exists
    const descEl = document.querySelector('p.text-xl.text-blue-100\\/60');
    if (descEl) descEl.innerText = service.description;

    // Update Service Page Content
    const contentEl = document.getElementById('service-page-content');
    if (contentEl) {
        if (service.page_content) {
            contentEl.innerHTML = service.page_content;
        } else {
            // Fallback content
            contentEl.innerHTML = `
                <h2 class="text-3xl font-bold text-blue-950 mb-6">Hizmet Detayları</h2>
                <p class="text-lg text-slate-600 mb-8 leading-relaxed">${service.details || service.description}</p>
                <div class="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                    <p class="text-blue-900 font-medium">Bu hizmet hakkında detaylı bilgi almak için lütfen uzman danışmanlarımızla iletişime geçiniz.</p>
                </div>
            `;
        }
    }
}


// --- Dropdown Logic ---
function initDropdowns() {
    document.querySelectorAll('.dropdown-container').forEach(container => {
        const trigger = container.querySelector('.trigger');
        const menu = container.querySelector('.dropdown-menu'); // Ensure this matches HTML structure

        if (trigger && menu) {
            trigger.addEventListener('click', (e) => {
                document.querySelectorAll('.dropdown-container').forEach(c => {
                    if (c !== container) {
                        c.querySelector('.dropdown-menu')?.classList.remove('active');
                        c.classList.remove('active');
                    }
                });

                menu.classList.toggle('active');
                container.classList.toggle('active');
                e.stopPropagation();
            });
        }
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
        document.querySelectorAll('.dropdown-container').forEach(container => {
            container.classList.remove('active');
        });
    });
}

// --- Selection Logic ---
// --- Selection Logic ---
// --- Selection Logic ---
// Commented out to prevent overriding index.html logic which includes checkAndOpenModal()
/*
window.selectCountry = function (flag, name) {
    console.log('selectCountry called:', flag, name);
    const flagEl = document.getElementById('selected-country-flag');
    const nameEl = document.getElementById('selected-country-name');

    if (flagEl) flagEl.innerText = flag;
    if (nameEl) nameEl.innerText = name;

    // Select value in hidden form if needed or just visual
    // Update global form select if it exists
    const globalSelect = document.querySelector('select[name="country"]');
    if (globalSelect) {
        // Find option with matching text or value
        for (let i = 0; i < globalSelect.options.length; i++) {
            if (globalSelect.options[i].text === name || globalSelect.options[i].value === name) {
                globalSelect.selectedIndex = i;
                break;
            }
        }
    }

    closeDropdowns();
}

window.selectProcess = function (name) {
    console.log('selectProcess called:', name);
    const nameEl = document.getElementById('selected-process-name');
    if (nameEl) nameEl.innerText = name;
    closeDropdowns();
}

window.selectInfo = function (name) {
    console.log('selectInfo called:', name);
    const nameEl = document.getElementById('selected-info-name');
    if (nameEl) nameEl.innerText = name;
    closeDropdowns();
}
*/

function closeDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
    document.querySelectorAll('.dropdown-container').forEach(container => container.classList.remove('active'));
}

// --- Mobile Menu Logic ---
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('translate-x-full');
        // Prevent scrolling when menu is open
        if (!mobileMenu.classList.contains('translate-x-full')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking links
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                toggleMenu();
            });
        });
    }
}

// --- Countries Grid Logic ---
async function initCountriesGrid() {
    const grid = document.getElementById('countries-grid');
    if (!grid) return;

    try {
        const response = await fetch('/assets/data/data.json');
        if (!response.ok) throw new Error(`Data fetch failed: ${response.status}`);
        const data = await response.json();
        const countries = data.countries;

        // Sort countries locally by title for better UX
        const sortedKeys = Object.keys(countries).sort((a, b) => {
            return countries[a].title.localeCompare(countries[b].title, 'tr');
        });

        let html = '';
        sortedKeys.forEach(key => {
            const country = countries[key];
            // Determine subtitle
            let subtitle = 'Vize Danışmanlığı';
            if (country.types && country.types.length > 0) {
                // Use the first type as subtitle, maybe truncate if too long
                subtitle = country.types[0];
                // Clean up parentheses for cleaner look if needed
                // subtitle = subtitle.split('(')[0].trim();
            }
            // For Schengen countries, user might prefer "Schengen Vizesi" text explicitly
            // But types[0] "C Tipi..." is technically more accurate.
            // Let's stick to using the first type for now as it distinguishes the main visa category.
            // Exception: For display consistency, let's simplify if it's very long.

            // Link construction: simplified
            const link = `ulke/${key}`;

            html += `
            <a href="${link}"
                class="country-card group bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl p-10 rounded-4xl text-center transition-all duration-500 block">
                <span class="flag-emoji text-6xl block mb-6 transition-transform duration-500">${country.flag}</span>
                <h4 class="text-xl font-bold text-blue-950 mb-2">${country.title.replace(' Vizesi', '')}</h4>
                <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest truncate">${subtitle}</p>
            </a>
            `;
        });

        grid.innerHTML = html;

    } catch (error) {
        console.error('Error loading countries grid:', error);
        grid.innerHTML = '<p class="col-span-full text-center text-red-500">Ülkeler yüklenirken bir hata oluştu.</p>';
    }
}
