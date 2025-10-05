import { services, insights } from './data.js';

const App = {
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadHeaderFooter();
            this.initPageSpecifics();
            this.initScrollAnimations();
            this.initAIFeatures();
            this.initInteractiveElements();
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
                            <button type="button" id="mobile-menu-button" class="text-deep-space-blue">
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

                    // Add stagger effect
                    const delay = entry.target.style.animationDelay || '0ms';
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, parseInt(delay));

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    },

    initAIFeatures() {
        this.initVoiceAssistant();
        this.initChatBot();
        this.initSmartNavigation();
        this.initDynamicContent();
    },

    initVoiceAssistant() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'de-DE';

        // Add voice control button
        const voiceButton = document.createElement('button');
        voiceButton.innerHTML = '<i data-lucide="mic" class="w-5 h-5"></i>';
        voiceButton.className = 'fixed bottom-6 right-6 bg-living-coral text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50';
        voiceButton.title = 'Sprachsteuerung aktivieren';
        document.body.appendChild(voiceButton);

        voiceButton.addEventListener('click', () => {
            recognition.start();
            voiceButton.innerHTML = '<i data-lucide="mic-off" class="w-5 h-5"></i>';
            voiceButton.classList.add('animate-pulse');
        });

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            this.processVoiceCommand(command);
        };

        recognition.onend = () => {
            voiceButton.innerHTML = '<i data-lucide="mic" class="w-5 h-5"></i>';
            voiceButton.classList.remove('animate-pulse');
        };
    },

    processVoiceCommand(command) {
        const commands = {
            'philosophie': () => window.location.href = 'philosophy.html',
            'angebote': () => window.location.href = 'services.html',
            'kontakt': () => window.location.href = 'contact.html',
            'start': () => window.location.href = 'index.html',
            'einblicke': () => window.location.href = 'insights.html',
            'nach oben': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            'nach unten': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        };

        for (const [key, action] of Object.entries(commands)) {
            if (command.includes(key)) {
                action();
                this.showNotification(`Navigiere zu ${key}`);
                return;
            }
        }

        this.showNotification('Befehl nicht erkannt. Versuchen Sie: Philosophie, Angebote, Kontakt');
    },

    initChatBot() {
        // Create floating chat button
        const chatButton = document.createElement('button');
        chatButton.innerHTML = '<i data-lucide="message-circle" class="w-6 h-6"></i>';
        chatButton.className = 'fixed bottom-6 left-6 bg-deep-space-blue text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50';
        chatButton.title = 'DYAI Assistant';
        document.body.appendChild(chatButton);

        // Create chat interface
        const chatInterface = document.createElement('div');
        chatInterface.className = 'fixed bottom-24 left-6 w-80 h-96 bg-white rounded-lg shadow-2xl hidden flex-col z-50';
        chatInterface.innerHTML = `
            <div class="bg-deep-space-blue text-white p-4 rounded-t-lg flex justify-between items-center">
                <h3 class="font-sans-custom font-semibold">DYAI Assistant</h3>
                <button id="close-chat" class="text-white hover:text-living-coral">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div id="chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3">
                <div class="bg-future-white p-3 rounded-lg">
                    <p class="text-sm">Hallo! Ich bin Ihr DYAI Assistant. Wie kann ich Ihnen helfen?</p>
                </div>
            </div>
            <div class="p-4 border-t">
                <div class="flex gap-2">
                    <input type="text" id="chat-input" placeholder="Ihre Frage..." class="flex-1 p-2 border rounded-lg text-sm" />
                    <button id="send-chat" class="bg-living-coral text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90">
                        <i data-lucide="send" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(chatInterface);

        // Chat functionality
        let isOpen = false;
        chatButton.addEventListener('click', () => {
            isOpen = !isOpen;
            chatInterface.classList.toggle('hidden', !isOpen);
            chatInterface.classList.toggle('flex', isOpen);
        });

        chatInterface.querySelector('#close-chat').addEventListener('click', () => {
            isOpen = false;
            chatInterface.classList.add('hidden');
            chatInterface.classList.remove('flex');
        });

        const chatInput = chatInterface.querySelector('#chat-input');
        const sendButton = chatInterface.querySelector('#send-chat');
        const messagesContainer = chatInterface.querySelector('#chat-messages');

        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'bg-living-coral text-white p-3 rounded-lg ml-8';
            userMsg.innerHTML = `<p class="text-sm">${message}</p>`;
            messagesContainer.appendChild(userMsg);

            chatInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const aiResponse = this.generateAIResponse(message);
                const aiMsg = document.createElement('div');
                aiMsg.className = 'bg-future-white p-3 rounded-lg mr-8';
                aiMsg.innerHTML = `<p class="text-sm">${aiResponse}</p>`;
                messagesContainer.appendChild(aiMsg);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    },

    generateAIResponse(message) {
        const responses = {
            'philosophie': 'Unsere Philosophie basiert auf vier Kernprinzipien: Partnerschaft statt Werkzeug, proaktive Zukunftsgestaltung, menschzentrierte Evolution und bewusste Auseinandersetzung.',
            'angebote': 'Wir bieten Beratung, Workshops und kuratierte Lernreisen rund um den bewussten Einsatz von KI an.',
            'kontakt': 'Sie können uns gerne unter Ben.Poersch@DYAI.app erreichen oder unser Kontaktformular nutzen.',
            'ki': 'Wir verstehen AI als Augmented Intelligence - eine Erweiterung des Menschen und seiner Fähigkeiten.',
            'training': 'Unsere Trainings sind praxisorientiert und auf Ihre spezifischen Bedürfnisse zugeschnitten.',
            'zukunft': 'In der Zukunft wird KI nahtlos in unsere Gesellschaft integriert sein - als Partner, nicht als Ersatz.'
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return 'Das ist eine interessante Frage! Für detailliertere Informationen empfehle ich Ihnen, unsere Philosophie-Seite zu besuchen oder direkt Kontakt mit uns aufzunehmen.';
    },

    initSmartNavigation() {
        // Track user behavior for smart suggestions
        let scrollDepth = 0;
        let timeOnPage = Date.now();

        window.addEventListener('scroll', () => {
            const currentScroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollDepth = Math.max(scrollDepth, currentScroll);

            // Show smart navigation suggestions
            if (scrollDepth > 80 && !document.querySelector('.smart-nav-suggestion')) {
                this.showSmartSuggestion();
            }
        });

        // Track time spent on sections
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.dataset.viewTime = Date.now();
                } else if (entry.target.dataset.viewTime) {
                    const timeSpent = Date.now() - parseInt(entry.target.dataset.viewTime);
                    // Log time spent for analytics
                    console.log(`Time spent in section: ${timeSpent}ms`);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => sectionObserver.observe(section));
    },

    showSmartSuggestion() {
        const suggestions = [
            { text: 'Interessiert an unserer Philosophie?', link: 'philosophy.html' },
            { text: 'Entdecken Sie unsere Angebote', link: 'services.html' },
            { text: 'Lesen Sie unsere Einblicke', link: 'insights.html' },
            { text: 'Kontaktieren Sie uns', link: 'contact.html' }
        ];

        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

        const suggestionEl = document.createElement('div');
        suggestionEl.className = 'smart-nav-suggestion fixed bottom-20 right-6 bg-white p-4 rounded-lg shadow-lg border-l-4 border-living-coral z-50 transform translate-x-full';
        suggestionEl.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-semibold text-deep-space-blue">${randomSuggestion.text}</p>
                    <a href="${randomSuggestion.link}" class="text-xs text-living-coral hover:underline">Mehr erfahren →</a>
                </div>
                <button class="text-gray-400 hover:text-gray-600 ml-4">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        document.body.appendChild(suggestionEl);

        // Animate in
        setTimeout(() => {
            suggestionEl.style.transform = 'translateX(0)';
            suggestionEl.style.transition = 'transform 0.3s ease-out';
        }, 100);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            suggestionEl.style.transform = 'translateX(100%)';
            setTimeout(() => suggestionEl.remove(), 300);
        }, 5000);

        // Close button
        suggestionEl.querySelector('button').addEventListener('click', () => {
            suggestionEl.style.transform = 'translateX(100%)';
            setTimeout(() => suggestionEl.remove(), 300);
        });
    },

    initDynamicContent() {
        // Dynamic time-based greetings
        const greetingEl = document.querySelector('.animated-text-line');
        if (greetingEl) {
            const hour = new Date().getHours();
            let greeting = '';

            if (hour < 12) greeting = 'Guten Morgen! ';
            else if (hour < 18) greeting = 'Guten Tag! ';
            else greeting = 'Guten Abend! ';

            greetingEl.textContent = greeting + greetingEl.textContent;
        }

        // Dynamic stats counter
        this.initStatsCounter();
    },

    initStatsCounter() {
        const stats = [
            { element: '#projects-count', target: 150, suffix: '+' },
            { element: '#clients-count', target: 50, suffix: '+' },
            { element: '#experience-count', target: 10, suffix: ' Jahre' }
        ];

        stats.forEach(stat => {
            const el = document.querySelector(stat.element);
            if (!el) return;

            let current = 0;
            const increment = stat.target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    current = stat.target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + stat.suffix;
            }, 20);
        });
    },

    initInteractiveElements() {
        // Add interactive hover effects to cards
        const cards = document.querySelectorAll('.card-3d');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(13, 27, 42, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button, .pulse-button');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRipple);
        });
    },

    createRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-living-coral text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.transition = 'transform 0.3s ease-out';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

App.init();
