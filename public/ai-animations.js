// AI Animations JavaScript

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Particle System Configuration
const particlesConfig = {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#FF6F61", "#00CED1", "#FFD700", "#9D4EDD"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#FF6F61",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
};

// Neural Network Visualization
class NeuralNetworkVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        this.time = 0;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Create neural network structure
        this.createNetwork();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    createNetwork() {
        const layers = [4, 6, 8, 6, 4];
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        layers.forEach((nodeCount, layerIndex) => {
            const x = (width / (layers.length + 1)) * (layerIndex + 1);

            for (let i = 0; i < nodeCount; i++) {
                const y = (height / (nodeCount + 1)) * (i + 1);
                this.nodes.push({
                    x,
                    y,
                    layer: layerIndex,
                    activation: Math.random(),
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }
        });

        // Create connections
        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayer = this.nodes.filter(n => n.layer === i);
            const nextLayer = this.nodes.filter(n => n.layer === i + 1);

            currentLayer.forEach(node1 => {
                nextLayer.forEach(node2 => {
                    if (Math.random() > 0.3) {
                        this.connections.push({
                            from: node1,
                            to: node2,
                            weight: Math.random(),
                            pulseOffset: Math.random() * Math.PI * 2
                        });
                    }
                });
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.time += 0.02;

        // Draw connections
        this.connections.forEach(conn => {
            const pulse = Math.sin(this.time * 2 + conn.pulseOffset) * 0.5 + 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.strokeStyle = `rgba(255, 111, 97, ${0.2 + pulse * 0.3})`;
            this.ctx.lineWidth = 0.5 + pulse * 1.5;
            this.ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const pulse = Math.sin(this.time * 3 + node.pulsePhase) * 0.5 + 0.5;
            const radius = 5 + pulse * 3;

            // Glow effect
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
            gradient.addColorStop(0, `rgba(0, 206, 209, ${0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 111, 97, ${0.4})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FF6F61';
            this.ctx.fill();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// AI Particles Animation
class AIParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 100 };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    createParticles() {
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: ['#FF6F61', '#00CED1', '#FFD700'][Math.floor(Math.random() * 3)],
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.x += Math.cos(angle) * force * 2;
                    particle.y += Math.sin(angle) * force * 2;
                }
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });

        // Draw connections
        this.ctx.globalAlpha = 0.2;
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = '#FF6F61';
                    this.ctx.lineWidth = 0.5 * (1 - distance / 100);
                    this.ctx.stroke();
                }
            });
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// Typing Animation
class TypeWriter {
    constructor(elementId, texts, speed = 100) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;

        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        const currentChar = currentText.substring(0, this.charIndex);

        this.element.textContent = currentChar;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, 2000);
            return;
        }

        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        this.charIndex += this.isDeleting ? -1 : 1;

        setTimeout(() => this.type(), this.isDeleting ? this.speed / 2 : this.speed);
    }
}

// GSAP Scroll Animations
function initScrollAnimations() {
    // Parallax effect for hero section
    gsap.to('.floating-orb', {
        scrollTrigger: {
            trigger: '.hero-gradient',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -200,
        ease: 'none'
    });

    // Fade in cards on scroll
    gsap.utils.toArray('.card-3d').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Text reveal animation
    gsap.utils.toArray('.animated-text-line').forEach((line, index) => {
        gsap.from(line, {
            scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });
}

// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.columns = [];
        this.init();
    }

    init() {
        const container = document.createElement('div');
        container.className = 'matrix-rain';
        document.body.appendChild(container);

        const columnCount = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * 20}px`;
            column.style.animationDuration = `${Math.random() * 5 + 5}s`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            column.style.opacity = Math.random() * 0.5 + 0.1;

            // Add random characters
            for (let j = 0; j < 30; j++) {
                const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                const span = document.createElement('div');
                span.textContent = char;
                span.style.opacity = Math.random();
                column.appendChild(span);
            }

            container.appendChild(column);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Disabled particles for professional look
    // if (document.getElementById('particles-background')) {
    //     particlesJS('particles-background', particlesConfig);
    // }

    // Initialize neural network visualization
    const neuralViz = new NeuralNetworkVisualization('neural-visualization');

    // Disabled AI particles for professional look
    // const aiParticles = new AIParticles('ai-particles');

    // Initialize typing animation
    const typeWriter = new TypeWriter('main-title', [
        'Design Your',
        'Develop Your',
        'Deploy Your',
        'Define Your'
    ]);

    // Initialize GSAP animations
    initScrollAnimations();

    // AI Demo Button
    const demoButton = document.getElementById('ai-demo-button');
    if (demoButton) {
        demoButton.addEventListener('click', () => {
            // Create matrix rain effect
            new MatrixRain();

            // Remove after 5 seconds
            setTimeout(() => {
                const matrixElement = document.querySelector('.matrix-rain');
                if (matrixElement) {
                    matrixElement.style.opacity = '0';
                    matrixElement.style.transition = 'opacity 1s';
                    setTimeout(() => matrixElement.remove(), 1000);
                }
            }, 5000);

            // Show notification
            showAINotification('AI Demo aktiviert! Neural Network wird simuliert...');
        });
    }
});

// AI Notification System
function showAINotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-deep-space-blue text-future-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="ai-loading"></div>
            <p class="font-sans-custom">${message}</p>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.transition = 'transform 0.3s ease-out';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 3D Card Tilt Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
    });
});

// Performance optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update animations here
    ticking = false;
}

// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        requestTick();
    });
}, { passive: true });