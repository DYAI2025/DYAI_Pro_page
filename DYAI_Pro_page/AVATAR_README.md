# DYAI AI Avatar System

## Übersicht

Das AI Avatar System bietet einen lippensynchronen, animierten Avatar, der mit dem ElevenLabs ConvAI Widget interagiert. Der Avatar reagiert in Echtzeit auf die Sprachausgabe des AI-Assistenten.

## Features

✅ **Lippensynchrone Animation**: Mund öffnet sich basierend auf Audio-Analyse
✅ **Echtzeit Audio-Visualisierung**: 5-Bar Equalizer während der Sprachausgabe
✅ **Smooth Animations**: Professionelle Übergänge und Effekte
✅ **Responsive Design**: Optimiert für Desktop und Mobile
✅ **Dark Mode Support**: Passt sich dem Theme an
✅ **ElevenLabs Integration**: Automatische Synchronisation mit ConvAI Widget

## Architektur

```
index.html
├── <elevenlabs-convai> Widget (ElevenLabs)
├── Avatar Container (Custom)
│   ├── Avatar Window
│   │   ├── Header (Status Indicator, Titel, Close Button)
│   │   ├── Body
│   │   │   ├── Canvas (Animierter Avatar)
│   │   │   └── Audio Visualizer
│   │   └── Footer
└── avatar-controller.js (Steuerungslogik)
```

## Technische Details

### Avatar Controller (`avatar-controller.js`)

**Hauptkomponenten:**

1. **Canvas Rendering**
   - Zeichnet Avatar-Gesicht mit Canvas 2D API
   - Face: Living Coral (#FF6F61)
   - Eyes: Deep Space Blue (#0D1B2A)
   - Mouth: Structure Grey (#415A77)

2. **Lippensynchronisation**
   - Web Audio API für Frequenzanalyse
   - Analyser Node mit FFT Size 256
   - Echtzeit Mundöffnung basierend auf Amplitude
   - Fallback: Sine-Wave Animation

3. **ElevenLabs Integration**
   - Shadow DOM Monitoring
   - Audio Element Detection
   - Event Listeners für play/pause/ended
   - Automatisches Show/Hide bei Widget-Interaktion

### CSS Styling (`style.css`)

**Key Classes:**

- `.ai-avatar-overlay`: Fixed positioning, fade-in animation
- `.ai-avatar-window`: Gradient background, glassmorphism
- `.avatar-status-indicator`: Pulsierender grüner Punkt
- `.audio-visualizer`: 5-Bar Equalizer mit staggered animation

### Animation Details

**Mouth Animation:**
```javascript
mouthOpenAmount = audioAmplitude / 128 // 0.0 - 1.0
mouthHeight = 5 + mouthOpenAmount * 25 // 5px - 30px
```

**Visualizer:**
- 5 Bars mit 0.1s staggered delay
- Bounce animation: 8px → 24px → 8px
- Active nur während Sprachausgabe

## Erweiterte Integration: Realistische Avatare

Der aktuelle Avatar ist ein **Canvas-basiertes 2D-Icon**. Für **realistische Video-Avatare** können Sie folgende Services integrieren:

### Option 1: D-ID Streaming Avatar (EMPFOHLEN)

**Features:**
- Fotorealistische 3D Avatare
- Perfekte Lippensynchronisation
- Gesichtsausdrücke und Emotionen
- Streaming in Echtzeit

**Integration:**

```javascript
// 1. D-ID SDK hinzufügen
<script src="https://cdn.d-id.com/streaming-client/latest/streaming-client.js"></script>

// 2. In avatar-controller.js erweitern:
class AvatarController {
    async initDID() {
        const DID_API_KEY = 'YOUR_DID_API_KEY';
        const streamingClient = new DID.StreamingClient({
            apiKey: DID_API_KEY
        });

        // Create streaming session
        const session = await streamingClient.createSession({
            presenter: {
                type: 'clip',
                presenter_id: 'amy-jcwCkr1grs', // oder eigenes Foto
                driver_id: 'mXra4jY38i'
            }
        });

        // Connect zu ElevenLabs Audio
        session.connect();

        // Stream Audio vom ElevenLabs Widget
        const audioElement = this.getElevenLabsAudio();
        const stream = audioElement.captureStream();
        session.playAudio(stream);
    }
}
```

**Kosten:** ~$0.10 pro Minute Video

**Setup Guide:**
1. Account bei D-ID erstellen: https://studio.d-id.com
2. API Key generieren
3. Avatar-Foto hochladen oder Preset wählen
4. Integration wie oben beschrieben

### Option 2: Azure Neural TTS + Ready Player Me

**Features:**
- 3D Avatar von Ready Player Me
- Azure Neural TTS für Voice
- Three.js für Rendering
- Kostenlos bis 500K Zeichen/Monat

**Integration:**

```javascript
// 1. Ready Player Me Avatar laden
import { AvatarCreator } from '@readyplayerme/rpm-js';

const avatarUrl = 'https://models.readyplayerme.com/YOUR_AVATAR_ID.glb';

// 2. Three.js Scene
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
loader.load(avatarUrl, (gltf) => {
    const avatar = gltf.scene;
    scene.add(avatar);

    // Viseme-basierte Lippensync
    const visemes = avatar.morphTargetInfluences;
    // Sync mit ElevenLabs Audio
});

// 3. Azure TTS (optional)
const speechConfig = SpeechConfig.fromSubscription(
    'YOUR_KEY',
    'YOUR_REGION'
);
```

### Option 3: Synthesia API

**Features:**
- Hollywood-Quality Avatare
- 140+ AI Avatare verfügbar
- Mehrsprachig
- Video-Output

**Hinweis:** Keine Echtzeit-Streaming, nur Video-Generierung

### Option 4: Hedra (Character-1)

**Features:**
- Text-to-Video mit Lipsync
- Eigene Fotos als Avatar
- Sehr natürliche Bewegungen
- API verfügbar

## Empfohlene Upgrade-Strategie

**Phase 1: Aktuell (Canvas 2D)**
- ✅ Schnell, lightweight
- ✅ Keine API-Kosten
- ✅ Funktioniert offline
- ⚠️ Weniger realistisch

**Phase 2: D-ID Integration**
```javascript
// Hybrid-Ansatz: Canvas als Fallback
if (DID_API_KEY && navigator.onLine) {
    this.initDID();
} else {
    this.useCanvasAvatar();
}
```

**Phase 3: Vollständig fotorealistisch**
- D-ID für alle Sessions
- Custom Avatar-Foto von Benjamin Poersch
- Professionelles Branding

## Kosten-Übersicht

| Service | Kosten | Qualität | Latenz |
|---------|--------|----------|--------|
| Canvas 2D (aktuell) | Kostenlos | ⭐⭐ | 0ms |
| D-ID Streaming | $0.10/min | ⭐⭐⭐⭐⭐ | 200ms |
| Azure Neural TTS + RPM | ~Free | ⭐⭐⭐⭐ | 300ms |
| Synthesia | $30/mo | ⭐⭐⭐⭐⭐ | N/A (Video) |

## Konfiguration

### Avatar Aussehen anpassen

In `avatar-controller.js`:

```javascript
this.config = {
    faceColor: '#FF6F61',  // Living coral
    eyeColor: '#0D1B2A',   // Deep space blue
    mouthColor: '#415A77', // Structure grey
    headRadius: 80,
    eyeRadius: 8,
    pupilRadius: 4
};
```

### Position anpassen

In `style.css`:

```css
.ai-avatar-overlay {
    bottom: 100px;  /* Abstand von unten */
    right: 30px;    /* Abstand von rechts */
}
```

### Auto-Show deaktivieren

In `avatar-controller.js`, Methode `setupWidgetTrigger()` auskommentieren.

## Debugging

### Audio nicht erkannt

```javascript
// Console öffnen, dann:
console.log('Audio Context:', avatarController.audioContext);
console.log('Analyser:', avatarController.analyser);

// Manuell Audio-Element verbinden:
const audio = document.querySelector('audio');
const source = avatarController.audioContext.createMediaElementSource(audio);
source.connect(avatarController.analyser);
```

### Avatar zeigt sich nicht

```javascript
// Manuell anzeigen:
document.getElementById('ai-avatar-container').classList.remove('hidden');
document.getElementById('ai-avatar-container').classList.add('visible');
```

### Lippensync nicht smooth

Analyser FFT Size erhöhen:

```javascript
this.analyser.fftSize = 512; // oder 1024
```

## Performance

**Optimierungen:**

1. **RequestAnimationFrame Throttling:**
```javascript
let lastFrame = 0;
const fps = 30;
const frameDelay = 1000 / fps;

const animate = (timestamp) => {
    if (timestamp - lastFrame >= frameDelay) {
        this.drawAvatar();
        lastFrame = timestamp;
    }
    requestAnimationFrame(animate);
};
```

2. **Canvas Caching:**
```javascript
// Statische Teile nur einmal zeichnen
this.backgroundCanvas = document.createElement('canvas');
this.drawStaticElements(); // Kopf, Augen
// Nur Mund neu zeichnen
```

## Browser-Kompatibilität

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE: Nicht unterstützt

## Sicherheit

**CORS & CSP:**

Wenn D-ID integriert wird, CSP anpassen:

```html
<meta http-equiv="Content-Security-Policy"
      content="connect-src 'self' https://api.d-id.com https://streaming.d-id.com;">
```

## Lizenz

Proprietär - DYAI 2024

## Support

Bei Fragen: Ben.Poersch@DYAI.app
