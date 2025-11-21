/**
 * DYAI AI Avatar Controller
 * Manages speaking avatar with lip-sync animation
 * Integrates with ElevenLabs ConvAI widget
 */

class AvatarController {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.isInitialized = false;
        this.isSpeaking = false;
        this.mouthOpenAmount = 0;
        this.animationFrame = null;

        // Avatar configuration
        this.config = {
            faceColor: '#FF6F61', // Living coral
            eyeColor: '#0D1B2A', // Deep space blue
            mouthColor: '#415A77', // Structure grey
            headRadius: 80,
            eyeRadius: 8,
            pupilRadius: 4
        };

        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.canvas = document.getElementById('avatar-canvas');
        if (!this.canvas) {
            console.error('Avatar canvas not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.drawAvatar();
        this.startAnimation();

        // Try to integrate with ElevenLabs widget
        this.integrateWithConvAI();
    }

    setupEventListeners() {
        // Monitor ElevenLabs widget for audio events
        document.addEventListener('elevenlabs:audio:start', () => {
            this.startSpeaking();
        });

        document.addEventListener('elevenlabs:audio:end', () => {
            this.stopSpeaking();
        });

        // Show avatar when widget is opened
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const widget = document.querySelector('elevenlabs-convai');
                    if (widget && widget.shadowRoot) {
                        this.checkWidgetState();
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Close button
        const closeBtn = document.getElementById('close-avatar');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideAvatar();
            });
        }

        // Setup audio analysis
        this.setupAudioAnalysis();
    }

    async setupAudioAnalysis() {
        try {
            // Create audio context for visualization
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;

            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);

            // Try to capture ElevenLabs audio output
            this.captureAudioOutput();
        } catch (error) {
            console.log('Audio analysis setup:', error.message);
        }
    }

    captureAudioOutput() {
        // Try to capture audio from the page
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            try {
                const source = this.audioContext.createMediaElementSource(audio);
                source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            } catch (e) {
                // Audio element might already be connected
            }
        });

        // Monitor for new audio elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'AUDIO') {
                        try {
                            const source = this.audioContext.createMediaElementSource(node);
                            source.connect(this.analyser);
                            this.analyser.connect(this.audioContext.destination);
                        } catch (e) {
                            // Already connected
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    integrateWithConvAI() {
        // Check for ElevenLabs widget
        const checkWidget = setInterval(() => {
            const widget = document.querySelector('elevenlabs-convai');
            if (widget) {
                console.log('ElevenLabs ConvAI widget found');

                // Try to access shadow DOM
                if (widget.shadowRoot) {
                    this.monitorWidgetAudio(widget);
                }

                // Show avatar when widget button is clicked
                this.setupWidgetTrigger(widget);

                clearInterval(checkWidget);
            }
        }, 1000);

        // Stop checking after 10 seconds
        setTimeout(() => clearInterval(checkWidget), 10000);
    }

    monitorWidgetAudio(widget) {
        // Monitor audio elements in the widget's shadow DOM
        const shadowRoot = widget.shadowRoot;
        if (!shadowRoot) return;

        const checkAudio = () => {
            const audioElements = shadowRoot.querySelectorAll('audio');
            audioElements.forEach(audio => {
                audio.addEventListener('play', () => this.startSpeaking());
                audio.addEventListener('pause', () => this.stopSpeaking());
                audio.addEventListener('ended', () => this.stopSpeaking());
            });
        };

        checkAudio();

        // Re-check periodically for dynamically added audio
        setInterval(checkAudio, 2000);
    }

    setupWidgetTrigger(widget) {
        // Monitor when the widget is opened/closed
        const shadowRoot = widget.shadowRoot;
        if (!shadowRoot) return;

        const observer = new MutationObserver(() => {
            const isOpen = shadowRoot.querySelector('[aria-expanded="true"]');
            if (isOpen) {
                this.showAvatar();
            } else {
                this.hideAvatar();
            }
        });

        observer.observe(shadowRoot, {
            attributes: true,
            subtree: true,
            attributeFilter: ['aria-expanded']
        });
    }

    showAvatar() {
        const container = document.getElementById('ai-avatar-container');
        if (container) {
            container.classList.remove('hidden');
            setTimeout(() => {
                container.classList.add('visible');
            }, 10);
        }
    }

    hideAvatar() {
        const container = document.getElementById('ai-avatar-container');
        if (container) {
            container.classList.remove('visible');
            setTimeout(() => {
                container.classList.add('hidden');
            }, 300);
        }
    }

    startSpeaking() {
        this.isSpeaking = true;
        this.updateVisualizerState(true);
    }

    stopSpeaking() {
        this.isSpeaking = false;
        this.mouthOpenAmount = 0;
        this.updateVisualizerState(false);
    }

    updateVisualizerState(isActive) {
        const visualizer = document.querySelector('.audio-visualizer');
        if (visualizer) {
            if (isActive) {
                visualizer.classList.add('active');
            } else {
                visualizer.classList.remove('active');
            }
        }
    }

    startAnimation() {
        const animate = () => {
            this.updateMouthAnimation();
            this.drawAvatar();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    updateMouthAnimation() {
        if (this.isSpeaking) {
            // Analyze audio if available
            if (this.analyser && this.dataArray) {
                this.analyser.getByteFrequencyData(this.dataArray);

                // Calculate average amplitude
                const average = this.dataArray.reduce((a, b) => a + b, 0) / this.dataArray.length;
                this.mouthOpenAmount = Math.min(average / 128, 1);
            } else {
                // Fallback: Simple sine wave animation
                const time = Date.now() / 100;
                this.mouthOpenAmount = (Math.sin(time) + 1) / 2 * 0.7 + 0.3;
            }
        } else {
            // Smoothly close mouth
            this.mouthOpenAmount *= 0.9;
            if (this.mouthOpenAmount < 0.01) {
                this.mouthOpenAmount = 0;
            }
        }
    }

    drawAvatar() {
        const canvas = this.canvas;
        const ctx = this.ctx;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw head
        ctx.fillStyle = this.config.faceColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.config.headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw eyes
        const eyeOffset = 25;
        const eyeY = centerY - 15;

        // Left eye
        this.drawEye(centerX - eyeOffset, eyeY);

        // Right eye
        this.drawEye(centerX + eyeOffset, eyeY);

        // Draw mouth (with lip-sync)
        this.drawMouth(centerX, centerY + 20);

        // Draw subtle glow effect
        this.drawGlow(centerX, centerY);
    }

    drawEye(x, y) {
        const ctx = this.ctx;

        // Eye white
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, this.config.eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = this.config.eyeColor;
        ctx.beginPath();
        ctx.arc(x, y, this.config.pupilRadius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(x - 1, y - 1, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    drawMouth(x, y) {
        const ctx = this.ctx;
        const mouthWidth = 40;
        const mouthHeight = 5 + this.mouthOpenAmount * 25;

        ctx.fillStyle = this.config.mouthColor;
        ctx.beginPath();

        if (this.mouthOpenAmount < 0.1) {
            // Closed mouth - simple line
            ctx.moveTo(x - mouthWidth / 2, y);
            ctx.lineTo(x + mouthWidth / 2, y);
            ctx.lineWidth = 3;
            ctx.strokeStyle = this.config.mouthColor;
            ctx.stroke();
        } else {
            // Open mouth - ellipse
            ctx.ellipse(x, y, mouthWidth / 2, mouthHeight / 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Teeth (when mouth is very open)
            if (this.mouthOpenAmount > 0.5) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(x - 15, y - mouthHeight / 4, 30, 3);
            }
        }
    }

    drawGlow(x, y) {
        const ctx = this.ctx;

        if (this.isSpeaking) {
            const gradient = ctx.createRadialGradient(x, y, this.config.headRadius - 10, x, y, this.config.headRadius + 15);
            gradient.addColorStop(0, 'rgba(255, 111, 97, 0)');
            gradient.addColorStop(1, 'rgba(255, 111, 97, 0.3)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, this.config.headRadius + 15, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Initialize avatar when page loads
let avatarController;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        avatarController = new AvatarController();
    });
} else {
    avatarController = new AvatarController();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (avatarController) {
        avatarController.destroy();
    }
});
