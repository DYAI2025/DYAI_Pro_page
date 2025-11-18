export const services = [
    {
        icon: 'briefcase',
        title: 'Strategische Unternehmensberatung',
        description: 'Wir analysieren Ihr Geschäftsmodell und entwickeln maßgeschneiderte Strategien zur Integration von KI als strategischen Partner, um nachhaltiges Wachstum und Innovation zu fördern.'
    },
    {
        icon: 'users',
        title: 'Agile Coaching & Team Empowerment',
        description: 'Durch agiles Coaching befähigen wir Ihre Teams, neue Arbeitsweisen zu etablieren und eine produktive, symbiotische Partnerschaft mit intelligenten Systemen zu entwickeln.'
    },
    {
        icon: 'presentation',
        title: 'Workshops & Keynotes',
        description: 'Inspirierende Keynotes und interaktive Workshops vermitteln die Kernprinzipien der Mensch-KI-Partnerschaft und bieten praktische Werkzeuge für die Gestaltung der Zukunft.'
    }
];

export const insights = [
    {
        category: 'Vision & Inspiration',
        title: 'Die Zukunft ist keine Einbahnstraße: Warum wir KI gestalten müssen.',
        summary: 'Eine Erkundung der proaktiven Rolle, die wir bei der Formung einer positiven Zukunft mit künstlicher Intelligenz spielen müssen.'
    },
    {
        category: 'Strategie & Methode',
        title: 'Das 5-Stufen-Modell zur KI-Partnerschaft im Team.',
        summary: 'Ein praktisches Framework für Führungskräfte, um KI schrittweise als vollwertigen Partner in Teamprozesse zu integrieren.'
    },
    {
        category: 'Orientierung & Dialog',
        title: 'Jenseits des Werkzeugs: Erste Schritte zur symbiotischen KI-Integration.',
        summary: 'Wie Individuen und kleine Teams beginnen können, ihre Denkweise über KI zu ändern und erste partnerschaftliche Beziehungen aufzubauen.'
    }
];

export const projects = [
    {
        id: 'ruv-swarm',
        title: 'RUV Swarm Intelligence System',
        category: 'agents',
        categoryLabel: 'AI Agents',
        featured: true,
        description: 'Multi-Agent System für koordinierte AI-Tasks mit SPARC Methodology Implementation. Orchestrierung von spezialisierten Agenten für komplexe Entwicklungsaufgaben.',
        summary: 'Intelligente Agent-Koordination für Softwareentwicklung',
        technologies: ['Claude API', 'Python', 'LangChain', 'SPARC'],
        metrics: {
            agents: '54',
            tasks: '1000+',
            efficiency: '+60%'
        },
        github: 'https://github.com/DYAI2025/ruv-swarm',
        demo: null,
        image: '/assets/projects/swarm-preview.jpg',
        year: '2024',
        status: 'active',
        highlights: [
            'SPARC Methodology Integration',
            'Dynamische Agent-Koordination',
            'Context-aware Task Distribution',
            'Real-time Collaboration Monitoring'
        ]
    },
    {
        id: 'leandeep-rag',
        title: 'LeanDeep Semantic Analyzer',
        category: 'rag',
        categoryLabel: 'RAG Systems',
        featured: true,
        description: 'RAG-basiertes System für Unternehmensdiagnostik mit semantischer Analyse von Kommunikationsmustern. Frühindikatoren für Spannung und Vertrauensbruch in Organisationen.',
        summary: 'Semantische Diagnostik für präventives Krisenmanagement',
        technologies: ['Claude', 'Embeddings', 'Pinecone', 'FastAPI'],
        metrics: {
            accuracy: '94%',
            patterns: '200+',
            predictions: '30 days'
        },
        github: 'https://github.com/DYAI2025/leandeep-analyzer',
        demo: '/lab/semantic-analyzer',
        image: '/assets/projects/semantic-analyzer.jpg',
        year: '2024',
        status: 'active',
        highlights: [
            'Real-time Communication Analysis',
            'Pattern Recognition ML',
            'Predictive Crisis Indicators',
            'Interactive Dashboard'
        ]
    },
    {
        id: 'ai-leadership-coach',
        title: 'AI Leadership Coach',
        category: 'automation',
        categoryLabel: 'AI Applications',
        featured: true,
        description: 'Personalisierter Leadership-Coaching Assistent für Executive Decision Making. Unterstützt C-Level bei Szenario-Analyse, Entscheidungsreflexion und strategischer Navigation.',
        summary: 'Intelligenter Executive Sparring Partner',
        technologies: ['Claude Sonnet', 'Custom Prompts', 'Node.js', 'React'],
        metrics: {
            sessions: '500+',
            satisfaction: '4.8/5',
            impact: '+40%'
        },
        github: 'https://github.com/DYAI2025/ai-leadership-coach',
        demo: null,
        image: '/assets/projects/leadership-coach.jpg',
        year: '2024',
        status: 'active',
        highlights: [
            'Scenario-based Decision Support',
            'Psychological Safety Metrics',
            'Mirror Meeting Protocols',
            'Confidential Executive Sparring'
        ]
    },
    {
        id: 'hybrid-workflow-engine',
        title: 'Human-AI Hybrid Workflow Engine',
        category: 'automation',
        categoryLabel: 'Workflow Automation',
        featured: false,
        description: 'Orchestration Tool für Mensch-KI-Teams mit transparenten Entscheidungsprozessen. Integration von Psychological Safety Metriken und Readiness-Checks.',
        summary: 'Workflow-Automatisierung für hybride Teams',
        technologies: ['n8n', 'Claude API', 'PostgreSQL', 'TypeScript'],
        metrics: {
            workflows: '50+',
            teams: '25',
            time_saved: '40%'
        },
        github: 'https://github.com/DYAI2025/hybrid-workflow',
        demo: null,
        image: '/assets/projects/workflow-engine.jpg',
        year: '2024',
        status: 'active',
        highlights: [
            'Transparent Decision Logging',
            'Team Readiness Automation',
            'Custom n8n Nodes',
            'Integration APIs'
        ]
    },
    {
        id: 'prompt-engineering-studio',
        title: 'Prompt Engineering Studio',
        category: 'research',
        categoryLabel: 'Research Tools',
        featured: false,
        description: 'Interaktives Tool zur Optimierung und Testing von AI Prompts. Systematische Evaluation verschiedener Prompt-Strategien mit Echtzeit-Feedback.',
        summary: 'Professional Prompt Development Environment',
        technologies: ['React', 'Claude API', 'OpenAI', 'MongoDB'],
        metrics: {
            prompts: '1000+',
            users: '100+',
            iterations: '10K+'
        },
        github: 'https://github.com/DYAI2025/prompt-studio',
        demo: '/lab/prompt-studio',
        image: '/assets/projects/prompt-studio.jpg',
        year: '2024',
        status: 'beta',
        highlights: [
            'Multi-Model Testing',
            'Version Control for Prompts',
            'A/B Testing Framework',
            'Performance Analytics'
        ]
    },
    {
        id: 'ai-interaction-research',
        title: 'AI Interaction Pattern Research',
        category: 'research',
        categoryLabel: 'Research',
        featured: false,
        description: 'Empirische Studien zu Mensch-KI-Kommunikationsmustern. Qualitative und quantitative Analysen zur Optimierung der Human-AI Collaboration.',
        summary: 'Wissenschaftliche Grundlagen der Mensch-KI-Interaktion',
        technologies: ['Python', 'Jupyter', 'D3.js', 'Observable'],
        metrics: {
            studies: '15',
            participants: '500+',
            insights: '100+'
        },
        github: 'https://github.com/DYAI2025/interaction-research',
        demo: null,
        image: '/assets/projects/research.jpg',
        year: '2023-2024',
        status: 'ongoing',
        highlights: [
            'Longitudinal User Studies',
            'Behavioral Pattern Analysis',
            'Best Practices Framework',
            'Open Research Data'
        ]
    }
];

export const projectCategories = [
    { id: 'all', label: 'Alle Projekte', icon: 'layers' },
    { id: 'agents', label: 'AI Agents', icon: 'bot' },
    { id: 'rag', label: 'RAG Systems', icon: 'database' },
    { id: 'automation', label: 'Automation', icon: 'zap' },
    { id: 'research', label: 'Research', icon: 'microscope' }
];
