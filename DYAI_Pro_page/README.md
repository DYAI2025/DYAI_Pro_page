# DYAI Website Deployment auf Render.com

Dieses Repository enthält die statische DYAI-Website mit einer Deploy-Konfiguration für [Render.com](https://render.com/). Die Seite wird als statische Website bereitgestellt.

## Voraussetzungen

- Ein [Render.com](https://render.com/) Account
- GitHub Repository verbunden mit Render
- Node.js für lokale Entwicklung (optional)

## Ordnerstruktur

- `*.html, *.css, *.js` – Quellcode der Website (HTML, CSS und JavaScript)
- `render.yaml` – Render.com Deployment-Konfiguration
- `package.json` – Build-Scripts und Projekt-Metadaten
- `public/` – Build-Output (wird automatisch erstellt)
- `Dockerfile` – Legacy Docker-Konfiguration (für lokale Tests)
- `fly.toml` – Legacy Fly.io Konfiguration (nicht verwendet)

## Deployment auf Render.com

### Automatisches Deployment
1. **Repository mit Render verbinden:**
   - Gehe zu [render.com](https://render.com/) und melde dich an
   - Klicke auf "New" → "Static Site"
   - Verbinde dein GitHub Repository
   - Setze folgende Einstellungen:
     - **Build Command:** `npm run build`
     - **Publish Directory:** `public`
     - **Auto-Deploy:** Yes (bei Git Push)

2. **Deployment erfolgt automatisch:**
   - Bei jedem Push zum `main` Branch
   - Render führt `npm run build` aus
   - Statische Dateien werden aus `public/` bereitgestellt

### Manuelles Build-Testing
```bash
# Build für Produktion
npm run build

# Überprüfe public/ Verzeichnis
ls public/

# Lokaler Test
npm start
# Öffne http://localhost:8080
```

## Lokales Testen

### Empfohlene Methode (NPM):
```bash
# Build-Prozess testen
npm run build

# Lokalen Server starten
npm start
```

### Alternative (Docker - Legacy):
```bash
docker build -t dyai-site .
docker run --rm -p 8080:8080 dyai-site
```

Die Seite ist anschließend unter `http://localhost:8080` erreichbar.

## Impressum & Datenschutz

Die rechtlichen Seiten (`impressum.html` und `privacy.html`) sowie die Kontaktdaten basieren auf den Angaben von Benjamin Poersch. Aktualisiere die Inhalte, falls sich Daten oder rechtliche Anforderungen ändern.
