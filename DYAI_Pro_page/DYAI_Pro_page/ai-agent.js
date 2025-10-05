// KI-Agent Integration mit 11 Labs
class DYAIAgent {
    constructor() {
        this.isActive = false;
        this.isListening = false;
        this.isSpeaking = false;
        this.conversationHistory = [];

        // Konfiguration - Lädt aus Umgebungsvariablen oder localStorage
        this.config = {
            elevenLabsApiKey: this.getEnvVar('ELEVENLABS_API_KEY') || null,
            voiceId: this.getEnvVar('ELEVENLABS_VOICE_ID') || '21m00Tcm4TlvDq8ikWAM',
            model: this.getEnvVar('ELEVENLABS_MODEL') || 'eleven_monolingual_v1',
            stability: parseFloat(this.getEnvVar('ELEVENLABS_STABILITY')) || 0.75,
            similarityBoost: parseFloat(this.getEnvVar('ELEVENLABS_SIMILARITY_BOOST')) || 0.75,

            // OpenAI Configuration (für Chat-Funktionalität)
            openaiApiKey: this.getEnvVar('OPENAI_API_KEY') || null,
            systemPrompt: `Du bist der DYAI-Assistent. Du repräsentierst "Design Your Augmented Intelligence" - ein Unternehmen, das sich auf die menschenzentrierte Integration von KI spezialisiert hat.

Kernphilosophie:
- KI ist nicht künstliche, sondern augmentierte Intelligenz
- Partnerschaftlicher Ansatz statt Werkzeug-Denken
- Integration vor Innovation
- Transparenz über Kontrolle

Deine Aufgabe ist es, Besuchern bei Fragen zu DYAI zu helfen und sie über unsere Philosophie und Angebote zu informieren. Antworte präzise, professionell und in einem warmen, aber sachlichen Ton auf Deutsch.`
        };

        this.init();
    }

    // Hilfsfunktion zum Laden von Umgebungsvariablen
    getEnvVar(name) {
        // In einer echten Produktionsumgebung würden diese über einen Backend-Service geladen
        // Für Entwicklung können sie über die Browser-Konsole gesetzt werden
        if (typeof process !== 'undefined' && process.env) {
            return process.env[name];
        }
        // Fallback: aus localStorage lesen
        return localStorage.getItem(`dyai_${name.toLowerCase()}`);
    }

    init() {
        this.createAgentInterface();
        this.setupEventListeners();
        this.checkWebAudioSupport();
    }

    createAgentInterface() {
        // Agent Chat Interface
        const agentInterface = document.createElement('div');
        agentInterface.id = 'ai-agent-interface';
        agentInterface.className = 'fixed bottom-6 right-6 w-96 h-96 bg-white rounded-xl shadow-2xl border border-structure-grey/20 transform translate-y-full opacity-0 transition-all duration-300 z-50';
        agentInterface.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="bg-deep-space-blue text-white p-4 rounded-t-xl flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full bg-living-coral animate-pulse"></div>
                        <h3 class="font-sans-custom font-semibold">DYAI Assistent</h3>
                    </div>
                    <button id="close-agent" class="text-white hover:text-living-coral transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Status Bar -->
                <div id="agent-status" class="px-4 py-2 bg-future-white border-b border-structure-grey/10">
                    <span class="text-xs text-structure-grey">Bereit für Ihre Fragen</span>
                </div>

                <!-- Chat Messages -->
                <div id="agent-messages" class="flex-1 p-4 overflow-y-auto space-y-3">
                    <div class="bg-future-white p-3 rounded-lg">
                        <p class="text-sm text-structure-grey">
                            Hallo! Ich bin Ihr DYAI-Assistent. Wie kann ich Ihnen bei Fragen zu unserer Philosophie oder unseren Angeboten helfen?
                        </p>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="p-4 border-t border-structure-grey/10">
                    <div class="flex gap-2">
                        <button id="voice-input" class="p-2 bg-living-coral text-white rounded-lg hover:bg-opacity-90 transition-colors" title="Sprachaufnahme">
                            <i data-lucide="mic" class="w-4 h-4"></i>
                        </button>
                        <input type="text" id="text-input" placeholder="Ihre Nachricht..."
                               class="flex-1 p-2 border border-structure-grey/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-living-coral/20" />
                        <button id="send-message" class="p-2 bg-deep-space-blue text-white rounded-lg hover:bg-opacity-90 transition-colors">
                            <i data-lucide="send" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(agentInterface);

        // Audio-Element für Sprachausgabe
        const audioElement = document.createElement('audio');
        audioElement.id = 'agent-audio';
        audioElement.controls = false;
        document.body.appendChild(audioElement);
    }

    setupEventListeners() {
        // Agent Toggle
        document.getElementById('ai-agent-toggle').addEventListener('click', () => {
            this.toggleAgent();
        });

        // Close Agent
        document.getElementById('close-agent').addEventListener('click', () => {
            this.closeAgent();
        });

        // Voice Input
        document.getElementById('voice-input').addEventListener('click', () => {
            this.toggleVoiceInput();
        });

        // Text Input
        const textInput = document.getElementById('text-input');
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Send Message
        document.getElementById('send-message').addEventListener('click', () => {
            this.sendMessage();
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
    }

    toggleAgent() {
        this.isActive = !this.isActive;
        const agentInterface = document.getElementById('ai-agent-interface');
        const toggleButton = document.getElementById('ai-agent-toggle');

        if (this.isActive) {
            agentInterface.classList.remove('translate-y-full', 'opacity-0');
            agentInterface.classList.add('translate-y-0', 'opacity-100');
            toggleButton.classList.add('active');
            this.updateStatus('Agent aktiviert');
        } else {
            this.closeAgent();
        }
    }

    closeAgent() {
        this.isActive = false;
        const agentInterface = document.getElementById('ai-agent-interface');
        const toggleButton = document.getElementById('ai-agent-toggle');

        agentInterface.classList.add('translate-y-full', 'opacity-0');
        agentInterface.classList.remove('translate-y-0', 'opacity-100');
        toggleButton.classList.remove('active');

        if (this.isListening) {
            this.stopVoiceInput();
        }
        if (this.isSpeaking) {
            this.stopSpeaking();
        }
    }

    async sendMessage() {
        const textInput = document.getElementById('text-input');
        const message = textInput.value.trim();

        if (!message) return;

        // Benutzer-Nachricht anzeigen
        this.addMessage(message, 'user');
        textInput.value = '';

        this.updateStatus('Verarbeite Anfrage...');

        try {
            // Chat-Antwort generieren
            const response = await this.generateResponse(message);

            // Agent-Antwort anzeigen
            this.addMessage(response, 'agent');

            // Sprach-Antwort generieren
            await this.speak(response);

            this.updateStatus('Bereit für Ihre Fragen');
        } catch (error) {
            console.error('Fehler beim Verarbeiten der Nachricht:', error);
            this.addMessage('Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.', 'agent');
            this.updateStatus('Fehler - Bereit für Ihre Fragen');
        }
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('agent-messages');
        const messageDiv = document.createElement('div');

        if (sender === 'user') {
            messageDiv.className = 'bg-living-coral text-white p-3 rounded-lg ml-8';
        } else {
            messageDiv.className = 'bg-future-white p-3 rounded-lg mr-8';
        }

        messageDiv.innerHTML = `<p class="text-sm">${content}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async generateResponse(message) {
        if (!this.config.openaiApiKey) {
            return 'Um mit mir zu chatten, muss zunächst ein OpenAI API-Schlüssel konfiguriert werden. Bitte wenden Sie sich an den Website-Administrator.';
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.openaiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: this.config.systemPrompt },
                        ...this.conversationHistory,
                        { role: 'user', content: message }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Konversationshistorie aktualisieren
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );

            // Historie auf die letzten 10 Nachrichten begrenzen
            if (this.conversationHistory.length > 20) {
                this.conversationHistory = this.conversationHistory.slice(-20);
            }

            return aiResponse;
        } catch (error) {
            console.error('Fehler bei OpenAI API:', error);
            return 'Entschuldigung, ich kann momentan nicht antworten. Bitte versuchen Sie es später erneut.';
        }
    }

    async speak(text) {
        if (!this.config.elevenLabsApiKey) {
            console.log('ElevenLabs API-Schlüssel nicht konfiguriert');
            return;
        }

        try {
            this.isSpeaking = true;
            this.updateStatus('Spreche...');

            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.config.voiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': this.config.elevenLabsApiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: this.config.model,
                    voice_settings: {
                        stability: this.config.stability,
                        similarity_boost: this.config.similarityBoost
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`ElevenLabs API Error: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = document.getElementById('agent-audio');

            audioElement.src = audioUrl;
            audioElement.onended = () => {
                this.isSpeaking = false;
                URL.revokeObjectURL(audioUrl);
                this.updateStatus('Bereit für Ihre Fragen');
            };

            await audioElement.play();
        } catch (error) {
            console.error('Fehler bei Sprachausgabe:', error);
            this.isSpeaking = false;
            this.updateStatus('Bereit für Ihre Fragen');
        }
    }

    toggleVoiceInput() {
        if (this.isListening) {
            this.stopVoiceInput();
        } else {
            this.startVoiceInput();
        }
    }

    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.addMessage('Spracherkennung wird in Ihrem Browser nicht unterstützt.', 'agent');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'de-DE';

        this.recognition.onstart = () => {
            this.isListening = true;
            document.getElementById('voice-input').innerHTML = '<i data-lucide="mic-off" class="w-4 h-4"></i>';
            this.updateStatus('Höre zu...');
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('text-input').value = transcript;
        };

        this.recognition.onend = () => {
            this.stopVoiceInput();
        };

        this.recognition.onerror = (event) => {
            console.error('Spracherkennungsfehler:', event.error);
            this.stopVoiceInput();
            this.addMessage('Fehler bei der Spracherkennung. Bitte versuchen Sie es erneut.', 'agent');
        };

        this.recognition.start();
    }

    stopVoiceInput() {
        this.isListening = false;
        document.getElementById('voice-input').innerHTML = '<i data-lucide="mic" class="w-4 h-4"></i>';
        this.updateStatus('Bereit für Ihre Fragen');

        if (this.recognition) {
            this.recognition.stop();
        }
    }

    stopSpeaking() {
        const audioElement = document.getElementById('agent-audio');
        audioElement.pause();
        audioElement.currentTime = 0;
        this.isSpeaking = false;
        this.updateStatus('Bereit für Ihre Fragen');
    }

    updateStatus(message) {
        document.getElementById('agent-status').innerHTML = `<span class="text-xs text-structure-grey">${message}</span>`;
    }

    checkWebAudioSupport() {
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.warn('Web Audio API wird nicht unterstützt');
        }
    }

    // Konfigurationsmethoden
    setElevenLabsApiKey(apiKey) {
        this.config.elevenLabsApiKey = apiKey;
        localStorage.setItem('dyai_elevenlabs_api_key', apiKey);
    }

    setOpenAIApiKey(apiKey) {
        this.config.openaiApiKey = apiKey;
        localStorage.setItem('dyai_openai_api_key', apiKey);
    }

    setVoiceId(voiceId) {
        this.config.voiceId = voiceId;
        localStorage.setItem('dyai_elevenlabs_voice_id', voiceId);
    }

    loadStoredConfig() {
        // Diese Funktion lädt gespeicherte Konfiguration aus localStorage
        // Die Umgebungsvariablen werden bereits im Konstruktor geladen
        const elevenLabsKey = localStorage.getItem('dyai_elevenlabs_api_key');
        const openaiKey = localStorage.getItem('dyai_openai_api_key');
        const voiceId = localStorage.getItem('dyai_elevenlabs_voice_id');

        if (elevenLabsKey) this.config.elevenLabsApiKey = elevenLabsKey;
        if (openaiKey) this.config.openaiApiKey = openaiKey;
        if (voiceId) this.config.voiceId = voiceId;
    }
}

// Agent initialisieren
document.addEventListener('DOMContentLoaded', () => {
    window.dyaiAgent = new DYAIAgent();
    window.dyaiAgent.loadStoredConfig();

    // Globale Konfigurationsfunktionen verfügbar machen
    window.setDYAIConfig = (config) => {
        if (config.elevenLabsApiKey) window.dyaiAgent.setElevenLabsApiKey(config.elevenLabsApiKey);
        if (config.openaiApiKey) window.dyaiAgent.setOpenAIApiKey(config.openaiApiKey);
        if (config.voiceId) window.dyaiAgent.setVoiceId(config.voiceId);
    };
});