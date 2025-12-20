// Gemeinsame Navigation für alle Seiten
const navigationHTML = `
<nav class="bg-white/80 backdrop-blur-lg shadow-subtle">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-20">
      <!-- Logo -->
      <a href="index.html" class="flex items-center">
        <span class="dyai-logo-professional text-2xl font-light tracking-wider">DYAI</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-2">
        <a href="index.html" class="nav-link px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Start</a>
        <a href="philosophy.html" class="nav-link px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Philosophie</a>
        <a href="services.html" class="nav-link px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Angebote</a>
        <a href="insights.html" class="nav-link px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Einblicke</a>
        <div class="relative group">
          <button type="button" class="nav-link px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1">
            Mehr
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </button>
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-structure-grey/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <a href="#" class="block px-4 py-2 text-sm text-structure-grey hover:bg-future-white">Downloads</a>
            <a href="contact.html" class="block px-4 py-2 text-sm text-structure-grey hover:bg-future-white">Kontakt</a>
            <a href="impressum.html" class="block px-4 py-2 text-sm text-structure-grey hover:bg-future-white">Impressum</a>
            <a href="privacy.html" class="block px-4 py-2 text-sm text-structure-grey hover:bg-future-white">Datenschutz</a>
          </div>
        </div>
      </div>

      <!-- Dark Mode Toggle & AI Agent Button -->
      <div class="flex items-center gap-4">
        <!-- Dark Mode Toggle -->
        <button id="dark-mode-toggle" class="dark-mode-toggle" title="Dark Mode umschalten" type="button"></button>

        <button id="ai-agent-toggle" class="ai-agent-button bg-living-coral text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2" type="button">
          <i data-lucide="bot" class="w-4 h-4"></i>
          <span>KI-Agent</span>
        </button>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-button" class="md:hidden text-structure-grey hover:text-deep-space-blue" type="button">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="md:hidden hidden border-t border-structure-grey/10 py-4">
      <div class="space-y-2">
        <a href="index.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Start</a>
        <a href="philosophy.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Philosophie</a>
        <a href="services.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Angebote</a>
        <a href="insights.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Einblicke</a>
        <a href="#" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Downloads</a>
        <a href="contact.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Kontakt</a>
        <a href="impressum.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Impressum</a>
        <a href="privacy.html" class="block px-4 py-2 text-sm font-medium text-structure-grey hover:text-deep-space-blue">Datenschutz</a>
      </div>
    </div>
  </div>
</nav>
`;

// Funktion um aktive Seite zu markieren
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Nach DOM Load ausführen
document.addEventListener('DOMContentLoaded', updateActiveNavigation);