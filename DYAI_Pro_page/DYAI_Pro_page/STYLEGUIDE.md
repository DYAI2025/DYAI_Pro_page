# DYAI Design System & Styleguide

Version 1.0.0 | November 2025

## Einleitung

Dieser Styleguide definiert die visuellen und interaktiven Standards für die DYAI-Website und alle zugehörigen Landingpages (inkl. Instafile).

---

## 1. Markenidentität

### DYAI – Design Your Augmented Intelligence

- **Mission**: Partnerschaftliche Mensch-KI-Integration
- **Tonalität**: Professionell, zukunftsorientiert, menschenzentriert
- **Kernwerte**: Partnerschaft, Proaktivität, menschzentrierte Evolution, bewusste Auseinandersetzung

### Instafile

- **Mission**: Effizienz im Browser – sofortiges Speichern ohne Umwege
- **Tonalität**: Pragmatisch, schnell, entwicklerfreundlich
- **Design-Differenzierung**: Leicht abgesetzte Farbwelt (Indigo/Purple), gleiche Designsprache

---

## 2. Farbsystem

### DYAI Hauptfarben

#### Deep Space Blue `#0D1B2A`

- **Verwendung**: Headlines, primärer Text, Navigation
- **Kontrast**: WCAG AAA auf Weiß
- **CSS Variable**: `--deep-space-blue`

#### Living Coral `#FF6F61`

- **Verwendung**: CTAs, Links, Akzente, Hover-States
- **Kontrast**: WCAG AA auf Weiß
- **CSS Variable**: `--living-coral`

#### Structure Grey `#415A77`

- **Verwendung**: Body-Text, sekundäre Elemente
- **CSS Variable**: `--structure-grey`

#### Future White `#F0F4F8`

- **Verwendung**: Hintergründe, subtile Flächen
- **CSS Variable**: `--future-white`

### Instafile Farben

#### Indigo `#6366F1`

- **Verwendung**: Primäre Brand-Farbe für Instafile-Elemente
- **CSS Variable**: `--instafile-primary`

#### Lightning Yellow `#FCD34D`

- **Verwendung**: Icon-Akzent (Blitz-Symbol)
- **CSS Variable**: `--instafile-icon`

### Semantische Farben

- **Success**: `#10B981` (Grün)
- **Error**: `#EF4444` (Rot)
- **Warning**: `#F59E0B` (Orange)
- **Info**: `#3B82F6` (Blau)

---

## 3. Typografie

### Schriftarten

```css
/* Sans-Serif - UI, Navigation, Headlines */
font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Serif - Fließtext, längere Inhalte */
font-family: "Lora", Georgia, serif;

/* Display - DYAI Logo, spezielle Akzente */
font-family: "Orbitron", "Poppins", sans-serif;

/* Mono - Code-Beispiele (Instafile) */
font-family: "Fira Code", "Courier New", monospace;
```

### Schriftgrößen

| Verwendung    | Größe           | CSS Class   |
| ------------- | --------------- | ----------- |
| H1 (Hero)     | 3.75rem (60px)  | `text-6xl`  |
| H1 (Standard) | 3rem (48px)     | `text-5xl`  |
| H2            | 2.25rem (36px)  | `text-4xl`  |
| H3            | 1.875rem (30px) | `text-3xl`  |
| H4            | 1.5rem (24px)   | `text-2xl`  |
| Lead Text     | 1.25rem (20px)  | `text-xl`   |
| Body          | 1rem (16px)     | `text-base` |
| Small         | 0.875rem (14px) | `text-sm`   |

### Schriftgewichte

- **Light**: 300 (sparsam einsetzen)
- **Normal**: 400 (Body-Text)
- **Medium**: 500 (Navigation)
- **Semibold**: 600 (Subheadlines)
- **Bold**: 700 (Headlines, CTAs)

---

## 4. Spacing & Layout

### Spacing-Skala

```
0: 0
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
24: 6rem (96px)
28: 7rem (112px)
32: 8rem (128px)
```

### Container-Breiten

- **Container**: max-width: 1280px
- **Content-Narrow**: max-width: 768px
- **Content-Standard**: max-width: 1024px

### Breakpoints

```css
sm: 640px   /* Mobile Landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
2xl: 1536px /* XL Desktop */
```

---

## 5. Komponenten

### Buttons

#### Primary Button

```html
<button
  class="bg-living-coral text-white font-sans-custom font-semibold 
               py-3 px-8 rounded-lg shadow-lg 
               hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
>
  Call to Action
</button>
```

#### Secondary Button

```html
<button
  class="bg-white text-deep-space-blue font-sans-custom font-semibold 
               py-3 px-8 rounded-lg border-2 border-deep-space-blue
               hover:bg-deep-space-blue hover:text-white transition-all duration-300"
>
  Mehr erfahren
</button>
```

#### Instafile Button

```html
<button
  class="bg-instafile-primary text-white font-sans-custom font-semibold 
               py-3 px-8 rounded-lg shadow-lg 
               hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
>
  Im Chrome Web Store
</button>
```

### Cards

```html
<div
  class="bg-white rounded-xl shadow-subtle p-8 
            hover:shadow-strong transition-shadow duration-300"
>
  <!-- Content -->
</div>
```

### Forms

```html
<input
  type="text"
  class="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-living-coral focus:border-living-coral 
              transition-colors duration-300 bg-future-white/50"
/>
```

---

## 6. Schatten & Effekte

```css
/* Subtle - Cards im Ruhezustand */
box-shadow: 0 4px 12px rgba(13, 27, 42, 0.05), 0 2px 4px rgba(13, 27, 42, 0.05);

/* Medium - leichte Hover */
box-shadow: 0 6px 20px rgba(13, 27, 42, 0.08), 0 3px 6px rgba(13, 27, 42, 0.06);

/* Strong - starke Hover, aktive Elemente */
box-shadow: 0 10px 25px rgba(13, 27, 42, 0.1), 0 5px 10px rgba(13, 27, 42, 0.08);

/* XL - Modals, wichtige Overlays */
box-shadow: 0 20px 40px rgba(13, 27, 42, 0.15), 0 8px 16px rgba(13, 27, 42, 0.1);
```

---

## 7. Border-Radius

- **sm**: 0.125rem (2px) - kleine Elemente
- **default**: 0.375rem (6px) - Buttons, Inputs
- **lg**: 0.75rem (12px) - größere Buttons
- **xl**: 1rem (16px) - Cards
- **2xl**: 1.5rem (24px) - große Flächen
- **full**: 9999px - runde Buttons, Badges

---

## 8. Transitions & Animations

### Standard-Transitions

```css
/* Schnell - kleine UI-Änderungen */
transition: all 150ms ease;

/* Standard - die meisten Interaktionen */
transition: all 300ms ease;

/* Langsam - komplexe Animationen */
transition: all 500ms ease;
```

### Easing-Funktionen

```css
/* Standard */
cubic-bezier(0.4, 0, 0.2, 1)

/* Ease In */
cubic-bezier(0.4, 0, 1, 1)

/* Ease Out */
cubic-bezier(0, 0, 0.2, 1)
```

### Fade-In Animation

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 9. Accessibility

### Kontrast-Anforderungen

- **Normal Text**: Mindestens WCAG AA (4.5:1)
- **Large Text** (>18px oder >14px bold): Mindestens WCAG AA (3:1)
- **Ziel**: WCAG AAA wo möglich

### Fokus-Indikatoren

```css
:focus {
  outline: 2px solid var(--living-coral);
  outline-offset: 2px;
}
```

### ARIA Labels

- Alle interaktiven Elemente benötigen aussagekräftige Labels
- Icons ohne Text benötigen `aria-label`
- Navigation nutzt `role="navigation"`

---

## 10. Responsive Design

### Mobile-First Approach

1. Design für Mobile (320px+)
2. Erweitere für Tablet (768px+)
3. Optimiere für Desktop (1024px+)

### Kritische Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
}

/* Desktop */
@media (min-width: 1024px) {
}
```

---

## 11. Icon-System

### Lucide Icons

Verwendete Icon-Bibliothek: [Lucide](https://lucide.dev/)

**Größen:**

- Small: `w-4 h-4` (16px)
- Medium: `w-5 h-5` (20px)
- Large: `w-6 h-6` (24px)
- XL: `w-8 h-8` (32px)

---

## 12. Navigation

### Desktop Navigation

- Sticky Header (backdrop-blur für Glassmorphismus)
- Höhe: 80px
- Aktive Seite: Living Coral
- Hover: Deep Space Blue

### Mobile Navigation

- Hamburger-Menü (ab <768px)
- Full-Width Dropdown
- Touch-optimierte Ziele (min. 44x44px)

---

## 13. SEO & Performance

### Meta-Tags (Minimum)

```html
<title>Seitentitel - DYAI</title>
<meta name="description" content="150-160 Zeichen Beschreibung" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Open Graph

```html
<meta property="og:title" content="Seitentitel" />
<meta property="og:description" content="Beschreibung" />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:type" content="website" />
```

### Performance-Budget

- **Lighthouse Score**: ≥ 90
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1

---

## 14. Dark Mode (Optional)

Falls Dark Mode implementiert wird:

```css
[data-theme="dark"] {
  --deep-space-blue: #1e293b;
  --future-white: #0f172a;
  --structure-grey: #94a3b8;
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
}
```

---

## 15. Instafile-Spezifika

### Visuelle Differenzierung

- **Hauptfarbe**: Indigo statt Coral
- **Gradient**: Purple-Indigo für Hero
- **Icon**: Lightning Bolt in Yellow
- **Schriftart**: Gleiche wie DYAI, aber Code-Beispiele in Mono

### Tone of Voice

- Direkter, entwicklerorientierter
- Weniger philosophisch, mehr pragmatisch
- Feature-fokussiert

---

## 16. Dos & Don'ts

### ✅ Dos

- Konsistente Abstände verwenden (Spacing-Skala)
- Mobile-First denken
- Accessibility-Standards einhalten
- Living Coral sparsam als Akzent einsetzen
- Lucide Icons für visuelle Konsistenz
- Smooth Transitions für bessere UX

### ❌ Don'ts

- Keine inkonsistenten Schatten (nur definierte Werte)
- Keine willkürlichen Spacing-Werte
- Keine schwer lesbaren Kontraste
- Living Coral nicht als Background-Farbe
- Keine zu komplexen Animationen
- Keine unterschiedlichen Icon-Sets mischen

---

## 17. Code-Konventionen

### CSS-Klassennamen

- Tailwind CSS als Utility-First Framework
- Eigene Klassen für wiederkehrende Komponenten
- BEM-Notation für komplexe Custom-Komponenten

### JavaScript

- ES6+ Module
- Event Delegation für Performance
- Progressive Enhancement

---

## Änderungsprotokoll

| Version | Datum    | Änderung                              |
| ------- | -------- | ------------------------------------- |
| 1.0.0   | Nov 2025 | Initiale Version mit DYAI & Instafile |

---

## Kontakt & Feedback

Bei Fragen zum Styleguide:  
**contact@DYAI.app**
