// Dark Mode Implementation for DYAI
class DarkModeManager {
    constructor() {
        this.init();
    }

    init() {
        // Load saved theme preference or default to light
        const savedTheme = localStorage.getItem('dyai-theme') || 'light';
        this.setTheme(savedTheme);

        // Set up toggle button
        this.setupToggle();

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    setupToggle() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        const html = document.documentElement;

        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }

        // Save preference
        localStorage.setItem('dyai-theme', theme);

        // Update any theme-dependent elements
        this.updateThemeElements(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    watchSystemTheme() {
        // Only apply system theme if user hasn't set a preference
        if (!localStorage.getItem('dyai-theme')) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const handleChange = (e) => {
                if (!localStorage.getItem('dyai-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            };

            mediaQuery.addListener(handleChange);
            handleChange(mediaQuery);
        }
    }

    updateThemeElements(theme) {
        // Update any specific elements that need theme-specific handling
        const aiInterface = document.getElementById('ai-agent-interface');
        if (aiInterface) {
            // AI interface will automatically adapt via CSS variables
        }

        // Update meta theme-color for mobile browsers
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }

        themeColorMeta.content = theme === 'dark' ? '#0f172a' : '#ffffff';
    }

    // Method to force a specific theme (useful for demos or special cases)
    forceTheme(theme) {
        this.setTheme(theme);
    }

    // Method to reset to system preference
    resetToSystem() {
        localStorage.removeItem('dyai-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(systemPrefersDark ? 'dark' : 'light');
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeManager = new DarkModeManager();

    // Make it globally accessible for debugging/configuration
    window.setDarkMode = (enabled) => {
        window.darkModeManager.setTheme(enabled ? 'dark' : 'light');
    };
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeManager;
}