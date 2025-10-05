# DYAI Website Deployment auf Fly.io

Dieses Repository enthält die statische DYAI-Website und eine minimalistische Deploy-Konfiguration für [Fly.io](https://fly.io/). Die Seite wird über einen schlanken Nginx-Container ausgeliefert.

## Voraussetzungen

- Installiertes [Flyctl](https://fly.io/docs/hands-on/install-flyctl/)
- Ein Fly.io Account und eine bestehende Organisation

## Ordnerstruktur

- `QJOBc9N/` – Quellcode der Website (HTML, CSS und JavaScript)
- `Dockerfile` – Build-Konfiguration für das Nginx-Image
- `nginx.conf` – Nginx Server-Konfiguration (lauscht auf Port 8080)
- `fly.toml` – Fly.io App-Konfiguration

## Erster Deployment-Lauf

1. **Einmalig anmelden:**
   ```bash
   fly auth login
   ```
2. **App initialisieren (optional, falls noch kein App-Name gesetzt ist):**
   ```bash
   fly launch --no-deploy
   ```
   Wähle einen eindeutigen App-Namen. Passe den Wert `app` in der Datei `fly.toml` entsprechend an.
3. **Deployment starten:**
   ```bash
   fly deploy
   ```
4. **Status prüfen:**
   ```bash
   fly status
   ```

## Lokales Testen

Um die Website lokal mit Docker zu testen:

```bash
docker build -t dyai-site .
docker run --rm -p 8080:8080 dyai-site
```

Die Seite ist anschließend unter `http://localhost:8080` erreichbar.

## Impressum & Datenschutz

Die rechtlichen Seiten (`impressum.html` und `privacy.html`) sowie die Kontaktdaten basieren auf den Angaben von Benjamin Poersch. Aktualisiere die Inhalte, falls sich Daten oder rechtliche Anforderungen ändern.
