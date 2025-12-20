/**
 * Modern Effects Module for DYAI
 * Lightweight animations and interactions using native APIs
 */

const ModernEffects = {
    init() {
        this.initScrollEffects();
        this.initMagneticButtons();
        this.initParallax();
        this.initGlassmorphism();
        this.initReducedMotion();
    },

    /**
     * Scroll-driven animations using Intersection Observer
     */
    initScrollEffects() {
        const elements = document.querySelectorAll('[data-scroll-fade]');
        
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Stagger effect
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

        elements.forEach(el => observer.observe(el));
    },

    /**
     * Magnetic button effect - buttons attract cursor
     */
    initMagneticButtons() {
        const buttons = document.querySelectorAll('.magnetic-button, .pulse-button');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 50;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.3;
                    const moveY = y * strength * 0.3;
                    
                    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    },

    /**
     * Smooth parallax scrolling effect
     */
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-slow');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    parallaxElements.forEach(el => {
                        const speed = el.dataset.speed || 0.5;
                        const yPos = -(scrolled * speed);
                        el.style.transform = `translateY(${yPos}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    },

    /**
     * Dynamic glassmorphism effect based on scroll
     */
    initGlassmorphism() {
        const header = document.querySelector('header nav');
        if (!header) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const opacity = Math.min(scrolled / 100, 0.95);
                    const blur = Math.min(scrolled / 10, 10);
                    
                    header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
                    header.style.backdropFilter = `blur(${blur}px)`;
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    },

    /**
     * Respect user's reduced motion preference
     */
    initReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-base', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }
    },

    /**
     * Create ripple effect on click
     */
    createRipple(event, element) {
        const button = element || event.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

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

    /**
     * Smooth scroll to anchor with offset
     */
    smoothScroll(target, offset = 80) {
        const element = document.querySelector(target);
        if (!element) return;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Add shimmer effect to elements
     */
    addShimmer(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.add('shimmer'));
    },

    /**
     * Stagger animation for multiple elements
     */
    staggerAnimation(elements, delay = 100) {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delay}ms`;
            el.classList.add('fade-in-sequence');
        });
    }
};

// Add ripple animation CSS
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ModernEffects.init());
} else {
    ModernEffects.init();
}

// Export for use in other modules
window.ModernEffects = ModernEffects;