import { services, insights } from './data.js';

const App = {
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadHeaderFooter();
            this.initPageSpecifics();
            this.initScrollAnimations();
            lucide.createIcons();
        });
    },

    async loadHeaderFooter() {
        const headerContainer = document.getElementById('main-header');
        const footerContainer = document.getElementById('main-footer');
        if (headerContainer) {
            headerContainer.innerHTML = this.getHeaderHTML();
            this.initNavigation();
        }
        if (footerContainer) {
            footerContainer.innerHTML = this.getFooterHTML();
        }
    },

    getHeaderHTML() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = [
            { href: 'index.html', text: 'Start' },
            { href: 'philosophy.html', text: 'Philosophie' },
            { href: 'services.html', text: 'Angebote' },
            { href: 'insights.html', text: 'Einblicke' },
            { href: 'contact.html', text: 'Kontakt' }
        ];

        return `
            <nav class="bg-white/80 backdrop-blur-lg shadow-subtle">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-20">
                        <a href="index.html" class="flex items-center space-x-2">
                            <span class="font-sans-custom text-2xl font-bold text-deep-space-blue">DY<span class="text-living-coral">AI</span></span>
                        </a>
                        <div class="hidden md:flex items-center space-x-2">
                            ${navLinks.map(link => `
                                <a href="${link.href}" class="font-sans-custom font-medium px-4 py-2 rounded-md transition-colors duration-300 ${currentPage === link.href ? 'text-living-coral' : 'text-structure-grey hover:text-deep-space-blue'}">
                                    ${link.text}
                                </a>
                            `).join('')}
                        </div>
                        <div class="md:hidden">
                            <button id="mobile-menu-button" class="text-deep-space-blue">
                                <i data-lucide="menu" class="w-7 h-7"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Mobile Menu -->
                <div id="nav-menu" class="hidden md:hidden bg-white border-t border-gray-200">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        ${navLinks.map(link => `
                            <a href="${link.href}" class="block font-sans-custom font-medium px-3 py-2 rounded-md ${currentPage === link.href ? 'bg-living-coral/10 text-living-coral' : 'text-structure-grey hover:bg-gray-100'}">
                                ${link.text}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </nav>
        `;
    },

    getFooterHTML() {
        return `
            <div class="bg-deep-space-blue text-future-white/80">
                <div class="container mx-auto px-4 py-12">
                    <div class="grid gap-10 md:grid-cols-3">
                        <div>
                            <a href="index.html" class="font-sans-custom text-2xl font-bold text-future-white">DY<span class="text-living-coral">AI</span></a>
                            <p class="text-sm mt-3 leading-relaxed">Design Your Augmented Intelligence – Beratung, Workshops und kuratierte Lernreisen rund um den bewussten Einsatz von KI.</p>
                        </div>
                        <div>
                            <h3 class="font-sans-custom text-lg font-semibold text-future-white mb-3">Rechtliches</h3>
                            <ul class="space-y-2 text-sm">
                                <li><a href="impressum.html" class="hover:text-living-coral transition-colors">Impressum</a></li>
                                <li><a href="privacy.html" class="hover:text-living-coral transition-colors">Datenschutzerklärung</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-sans-custom text-lg font-semibold text-future-white mb-3">Kontakt</h3>
                            <p class="text-sm leading-relaxed">
                                Benjamin Poersch<br>
                                Grazer Damm 207<br>
                                15127 Berlin
                            </p>
                            <p class="text-sm mt-3">
                                <a href="mailto:Ben.Poersch@DYAI.app" class="hover:text-living-coral transition-colors">Ben.Poersch@DYAI.app</a>
                            </p>
                        </div>
                    </div>
                    <div class="border-t border-white/10 mt-10 pt-6 text-xs text-future-white/60 text-center md:text-left">
                        &copy; ${new Date().getFullYear()} DYAI · Alle Rechte vorbehalten.
                    </div>
                </div>
            </div>
        `;
    },

    initNavigation() {
        const menuButton = document.getElementById('mobile-menu-button');
        const navMenu = document.getElementById('nav-menu');
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('hidden');
                const icon = menuButton.querySelector('i');
                icon.setAttribute('data-lucide', navMenu.classList.contains('hidden') ? 'menu' : 'x');
                lucide.createIcons();
            });
        }
    },
    
    initPageSpecifics() {
        const path = window.location.pathname;
        if (path.endsWith('services.html')) {
            this.loadServices();
        }
        if (path.endsWith('insights.html')) {
            this.loadInsights();
        }
        if (path.endsWith('contact.html')) {
            this.handleContactForm();
        }
        document.querySelectorAll('[data-initial-hidden]').forEach(el => el.style.opacity = '1');
    },

    loadServices() {
        const container = document.getElementById('services-container');
        if (!container) return;
        let html = '';
        services.forEach((service, index) => {
            html += `
                <div data-scroll-fade style="animation-delay: ${index * 150}ms;" class="bg-white rounded-xl shadow-subtle p-8 flex flex-col hover:shadow-strong transition-shadow duration-300">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-living-coral/10 mb-6">
                        <i data-lucide="${service.icon}" class="w-8 h-8 text-living-coral"></i>
                    </div>
                    <h3 class="font-sans-custom text-2xl font-bold text-deep-space-blue mb-4">${service.title}</h3>
                    <p class="text-base text-structure-grey flex-grow">${service.description}</p>
                    <a href="contact.html" class="mt-6 text-living-coral font-sans-custom font-semibold group flex items-center gap-2">
                        Mehr erfahren
                        <i data-lucide="arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"></i>
                    </a>
                </div>
            `;
        });
        container.innerHTML = html;
    },

    loadInsights() {
        const container = document.getElementById('insights-container');
        if (!container) return;
        let html = '';
        insights.forEach((post, index) => {
            html += `
                <div data-scroll-fade style="animation-delay: ${index * 150}ms;" class="bg-white rounded-xl shadow-subtle overflow-hidden flex flex-col group hover:shadow-strong transition-shadow duration-300">
                    <div class="p-8 flex-grow flex flex-col">
                        <p class="font-sans-custom text-sm text-structure-grey/70 mb-2">${post.category}</p>
                        <h3 class="font-sans-custom text-xl font-bold text-deep-space-blue mb-3 flex-grow">${post.title}</h3>
                        <p class="text-base text-structure-grey mb-4">${post.summary}</p>
                        <div class="mt-auto">
                           <span class="text-living-coral font-sans-custom font-semibold flex items-center gap-2">
                                Beitrag lesen (bald verfügbar)
                                <i data-lucide="arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    },

    handleContactForm() {
        const form = document.getElementById('contact-form');
        const feedbackEl = document.getElementById('form-feedback');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            feedbackEl.textContent = 'Vielen Dank! Ihre Nachricht wird verarbeitet...';
            feedbackEl.className = 'mt-4 text-center text-structure-grey';
            
            setTimeout(() => {
                feedbackEl.textContent = 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.';
                feedbackEl.className = 'mt-4 text-center text-green-700 font-semibold';
                form.reset();
            }, 1500);
        });
    },

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-scroll-fade]');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
};

App.init();
