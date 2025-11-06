# DYAI – Tools Section (Design & Implementation Spec)

Ziel: Einen allgemeinen, erweiterbaren Bereich „Tools“ (Download/Info) definieren, der mehrere Werkzeuge (z. B. InstaFile, weitere) in einheitlicher Designsprache präsentiert. Dieses Dokument beschreibt Inhalt, UI, Accessibility, Theming, Datenmodell und Beispiel-Markup/CSS – damit die Implementierung auf einer eigenen Seite (z. B. `tools.html`) oder als Sektion auf bestehenden Seiten konsistent erfolgen kann.

---

## 1) Scope und Ziele

- Einheitlicher, neutraler „Tools“-Hub (nicht produkt-spezifisch) mit DYAI-Branding
- Erweiterbar: Mehrere Tools, Filter/Tags, künftige Detailseiten möglich
- Klare CTAs (Primär: Download/Installieren, Sekundär: Details/Repo/Privacy)
- Saubere Semantik, gute Accessibility, responsive Grid
- Datengetrieben umsetzbar (optional: Array in `data.js`, Rendering in `app.js`)

---

## 2) Inhaltsmodell (Content Model)

Empfohlene Felder je Tool (für Datenhaltung, SEO und Anzeige):

- id: string (slug, z. B. "instafile")
- name: string (z. B. "InstaFile")
- shortDescription: string (1–2 Sätze für Card)
- longDescription: string (optional für Detail)
- version: string (z. B. "1.2.0")
- status: "stable" | "beta" | "experimental" | "deprecated"
- platforms: array of strings (z. B. ["Chrome", "Firefox", "Web", "CLI"])
- categories/tags: array of strings (z. B. ["Produktivität", "Browser-Extension"])
- accentColor: string (optional Hex, überschreibt Card-Akzent)
- icon: url oder icon-name (z. B. Lucide-Icon-Key)
- repoUrl: string (GitHub/GitLab o. Ä.)
- homepageUrl: string (Tool-Detailseite, falls vorhanden)
- privacyUrl: string (Datenschutz/Permissions)
- download: object
  - primaryUrl: string (z. B. Chrome Web Store Link)
  - mirrors: array (optional)
  - checksumSha256: string (optional)
  - fileSize: string (optional, z. B. "1.2 MB")
  - requirements: string (optional, z. B. "Chrome 118+")
- releaseDate: ISO string
- i18n: optional mapping (z. B. de/en Texte)

---

## 3) Informationsarchitektur (IA)

- Tools Hub (Seite `tools.html`):
  - Hero (Intro, kurzer Pitch, neutral DYAI-Branding)
  - Filter/Tags (optional, wenn >6 Tools)
  - Card Grid (1/2/3 Spalten je Breakpoint)
  - CTA-Bereich am Ende (Kontakt/Feedback)
- Tool-Detail (optional, später):
  - Separate Seite `tools/<slug>.html` oder eigener Abschnitt/Modal
  - Mehr Infos, Screens, Changelog, Datenschutz, Downloads

---

## 4) UI-Komponenten

### 4.1 Hero (neutral)

- Headline: „Tools“
- Subline: 1–2 Sätze über DYAI Tools-Philosophie (Privacy-first, effizient)
- CTA: optional zu GitHub-Organisation oder Kontakt

### 4.2 Filters/Tags (optional)

- Chips/Buttons für Kategorien (z. B. Browser, CLI, Produktivität)
- Clientseitiges Filtern (Datenmodell s. Abschnitt 2)

### 4.3 Tool Card

- Icon (Lucide), Name, Status-Badge
- Kurzbeschreibung (max. 2 Zeilen auf Mobile, 3 auf Desktop)
- Badges für Plattformen (Chrome, Firefox, CLI …)
- Primär-Button: Download/Installieren
- Sekundär-Links: Details, Repo, Privacy
- Optional: Checksum/Größe/Version unterhalb der Aktion

### 4.4 CTA/Footer-Sektion

- Hinweis auf Feedback / Feature-Wünsche
- Link Kontakt/Issue-Tracker

---

## 5) Theming & Design-Tokens

Nutze die bestehenden Tokens aus `style.css` und `design-tokens.json`. Für den neutralen Tools-Hub:

- Primärfarbe: DYAI Akzent (z. B. Living Coral) für primäre CTAs
- Hintergrund: Future White auf Seite, Cards auf Weiß mit Subtle Shadow
- Optionale Tool-Akzente: Card-Akzentkante oder Icon-Tint über `accentColor`

Empfohlene semantische Variablen (falls noch nicht vorhanden), im `:root` definieren:

```css
:root {
  --tools-bg: var(--color-surface, #ffffff);
  --tools-text: var(--color-text, #0d1b2a);
  --tools-muted: var(--color-muted, #415a77);
  --tools-border: var(--color-border, #e2e8f0);
  --tools-primary: var(--color-accent, #ff6f61); /* DYAI Coral */
  --tools-card-shadow: var(--shadow-subtle);
  --tools-badge-bg: rgba(13, 27, 42, 0.06);
}
```

Status-Badgefarben (optional):

```css
:root {
  --tools-status-stable: #16a34a; /* green-600 */
  --tools-status-beta: #f59e0b; /* amber-500 */
  --tools-status-experimental: #8b5cf6; /* purple-500 */
  --tools-status-deprecated: #ef4444; /* red-500 */
}
```

---

## 6) Accessibility

- Semantik: `section`, `header`, `ul/li`, Buttons vs. Links korrekt
- Labels: `aria-label` für Aktionen (z. B. „InstaFile installieren“)
- Badges: `aria-describedby` für Status (z. B. „Beta“)
- Fokus: sichtbarer Fokusrahmen für alle interaktiven Elemente
- Tastatur: Alle Controls erreichbar, keine `tabindex=-1` für Inhalte

---

## 7) Responsive-Verhalten

- Mobile (<640px): 1 Spalte, Actions stapeln
- Tablet (≥768px): 2 Spalten Grid
- Desktop (≥1024px): 3 Spalten Grid
- Max-Width Container: `max-w-6xl` zentral

---

## 8) Beispiel-Markup (Hub-Auszug)

```html
<section id="tools" class="py-20" aria-labelledby="tools-title">
  <div class="container mx-auto px-4 max-w-6xl">
    <header class="mb-10 text-center">
      <h2 id="tools-title" class="text-4xl font-bold">Tools</h2>
      <p class="mt-3 text-lg text-muted-foreground">
        Privacy-first Werkzeuge von DYAI – effizient, klar, ohne Ballast.
      </p>
    </header>

    <!-- Optional: Filterchips -->
    <div class="mb-8 flex flex-wrap gap-2" aria-label="Filter">
      <button class="chip" data-filter="all">Alle</button>
      <button class="chip" data-filter="browser">Browser</button>
      <button class="chip" data-filter="cli">CLI</button>
      <button class="chip" data-filter="productivity">Produktivität</button>
    </div>

    <!-- Cards Grid -->
    <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
      <li class="tool-card" data-tags="browser productivity">
        <article class="h-full flex flex-col">
          <div class="tool-card__header">
            <div class="tool-card__icon" aria-hidden="true">
              <!-- Beispiel Lucide Icon -->
              <i data-lucide="zap" aria-hidden="true"></i>
            </div>
            <div class="tool-card__title">
              <h3 class="text-xl font-semibold">InstaFile</h3>
              <span class="badge badge--beta" aria-label="Status: Beta"
                >Beta</span
              >
            </div>
          </div>
          <p class="tool-card__desc">
            Markierten Text im Browser sofort als Datei speichern – mit einem
            Klick.
          </p>

          <div class="tool-card__meta">
            <span class="pill">Chrome</span>
            <span class="pill">Produktivität</span>
            <span class="meta">v1.2.0</span>
          </div>

          <div class="tool-card__actions mt-auto">
            <a
              class="btn btn-primary"
              href="#"
              aria-label="InstaFile installieren"
              >Installieren</a
            >
            <a class="btn btn-ghost" href="#">Details</a>
            <a class="btn btn-ghost" href="#">Repo</a>
          </div>

          <div class="tool-card__foot">
            <span class="meta">SHA256: …</span>
            <span class="meta">Größe: 1.2 MB</span>
          </div>
        </article>
      </li>

      <!-- Weitere Tool-Cards … -->
    </ul>

    <footer class="mt-12 text-center">
      <p>
        Feature-Wunsch? <a class="link" href="contact.html">Schreib uns</a> oder
        eröffne ein Issue.
      </p>
    </footer>
  </div>
</section>
```

---

## 9) Beispiel-CSS (Ergänzung für `style.css`)

Hinweis: Nutzt vorhandene Variablen und ergänzt minimale Utility-Klassen.

```css
/* Utilities (falls nicht über Tailwind) */
.text-muted-foreground {
  color: var(--tools-muted);
}
.container {
  max-width: 80rem;
}

/* Chips */
.chip {
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  background: var(--tools-badge-bg);
  color: var(--tools-text);
  border: 1px solid var(--tools-border);
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
}
.chip:focus,
.chip:hover {
  background: #f1f5f9;
}

/* Tool Card */
.tool-card {
  background: var(--tools-bg);
  border: 1px solid var(--tools-border);
  border-radius: 12px;
  box-shadow: var(--tools-card-shadow);
  padding: 1rem;
}
.tool-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.tool-card__icon i {
  width: 28px;
  height: 28px;
  color: var(--tools-primary);
}
.tool-card__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tool-card__desc {
  margin: 0.5rem 0 0.75rem;
  color: var(--tools-text);
}
.tool-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.pill {
  font-size: 0.8125rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: var(--tools-badge-bg);
  border: 1px solid var(--tools-border);
}
.meta {
  color: var(--tools-muted);
  font-size: 0.8125rem;
}

.tool-card__actions {
  display: flex;
  gap: 0.5rem;
}
.btn {
  inline-size: auto;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  border: 1px solid transparent;
}
.btn-primary {
  background: var(--tools-primary);
  color: white;
}
.btn-primary:hover,
.btn-primary:focus {
  filter: brightness(0.95);
}
.btn-ghost {
  background: transparent;
  border-color: var(--tools-border);
  color: var(--tools-text);
}
.btn-ghost:hover,
.btn-ghost:focus {
  background: #f8fafc;
}

.tool-card__foot {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

/* Badges */
.badge {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  background: var(--tools-badge-bg);
}
.badge--stable {
  color: var(--tools-status-stable);
}
.badge--beta {
  color: var(--tools-status-beta);
}
.badge--experimental {
  color: var(--tools-status-experimental);
}
.badge--deprecated {
  color: var(--tools-status-deprecated);
}
```

---

## 10) Datenmodell (Option: `data.js`)

```js
export const TOOLS_REGISTRY = [
  {
    id: "instafile",
    name: "InstaFile",
    shortDescription: "Markierten Text im Browser sofort als Datei speichern.",
    version: "1.2.0",
    status: "beta",
    platforms: ["Chrome"],
    tags: ["Produktivität", "Browser"],
    accentColor: "#6366F1",
    icon: "zap",
    repoUrl: "https://github.com/dyai/instafile",
    homepageUrl: "instafile.html",
    privacyUrl: "privacy.html#instafile",
    download: {
      primaryUrl: "https://chrome.google.com/webstore/detail/...",
      checksumSha256: "…",
      fileSize: "1.2 MB",
      requirements: "Chrome 118+",
    },
    releaseDate: "2025-10-12",
  },
];
```

Render-Idee (in `app.js`):

- `renderTools(TOOLS_REGISTRY, containerEl, { filter: … })`
- Server-seitiges HTML belassen; JS nur für Filter/Enhancements

---

## 11) SEO

- Seite `tools.html` mit eindeutigen Title/Description
- JSON-LD (ItemList) für Tools-Hub, `SoftwareApplication` für einzelne Tools

Beispiel JSON-LD (Hub):

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "DYAI Tools",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://dyai.app/instafile.html",
      "name": "InstaFile"
    }
  ]
}
```

---

## 12) Implementierung – empfohlene Schritte

1. Neue Seite `tools.html` anlegen (oder Sektion in bestehender Seite)
2. Hero/Intro + Grid gemäß obigem Markup
3. Optional: `TOOLS_REGISTRY` in `data.js` pflegen
4. Optional: Filter-Chips + JS-Filter-Logik
5. Navigation/Footers: Link „Tools“ ergänzen
6. Privacy/Impressum: Crosslinks prüfen (z. B. Tool-Abschnitte)

---

## 13) Guidelines für neue Tools

- Kurzbeschreibung maximal 140–180 Zeichen
- Einheitliche Icon-Größe (24–32px)
- Primär-CTA eindeutig benennen (Installieren/Download)
- Checksum/Größe optional, bei Binärdownloads empfohlen
- Versionsnummer pflegen
- Status-Badge konsequent setzen (stable/beta/experimental/deprecated)
- Datenschutz-Link bereitstellen, wenn relevant

---

Mit diesem Leitfaden kannst du den bisherigen InstaFile-Bereich zu einem allgemeinen, skalierbaren „Tools“-Hub umgestalten und zukünftig weitere Werkzeuge konsistent ergänzen.
