// Language Switcher for DYAI Website
// Manages bilingual content switching between German (DE) and English (EN)

(function() {
  'use strict';

  // Default language
  let currentLanguage = localStorage.getItem('language') || 'de';

  // Initialize language on page load
  function initLanguage() {
    setLanguage(currentLanguage);
    updateLanguageButton();
  }

  // Set language and update all text elements
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all elements with lang-text class
    const langElements = document.querySelectorAll('.lang-text');

    langElements.forEach(element => {
      const germanText = element.getAttribute('data-de');
      const englishText = element.getAttribute('data-en');

      if (lang === 'de' && germanText) {
        // Check if the element contains HTML (like <strong> tags)
        if (germanText.includes('<')) {
          element.innerHTML = germanText;
        } else {
          element.textContent = germanText;
        }
      } else if (lang === 'en' && englishText) {
        // Check if the element contains HTML (like <strong> tags)
        if (englishText.includes('<')) {
          element.innerHTML = englishText;
        } else {
          element.textContent = englishText;
        }
      }
    });

    updateLanguageButton();
  }

  // Update the language button text
  function updateLanguageButton() {
    const langButton = document.getElementById('current-lang');
    if (langButton) {
      langButton.textContent = currentLanguage.toUpperCase();
    }
  }

  // Toggle between languages
  function toggleLanguage() {
    const newLang = currentLanguage === 'de' ? 'en' : 'de';
    setLanguage(newLang);
  }

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Initialize when DOM is ready
  ready(function() {
    // Initialize language
    initLanguage();

    // Add event listener to language toggle button
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
      languageToggle.addEventListener('click', toggleLanguage);
    }

    // Re-initialize icons after language change (for lucide icons)
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // Export functions for potential external use
  window.LanguageSwitcher = {
    setLanguage: setLanguage,
    getCurrentLanguage: function() { return currentLanguage; },
    toggleLanguage: toggleLanguage
  };

})();
