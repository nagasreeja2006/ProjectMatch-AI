/**
 * Seed dataset of 52+ realistic, industry-relevant engineering & software projects
 */
const seedProjects = [
  {
    title: "AI Resume Analyzer & Job Fit Scorer",
    description: "An intelligent platform that parses resumes (PDF/DOCX), extracts technical skills, matches them against job descriptions, and gives actionable optimization advice with ATS compatibility scores.",
    domain: "AI/ML",
    difficulty: "Medium",
    technologies: ["React", "Node.js", "Python", "FastAPI", "Gemini API", "Tailwind CSS"],
    requiredSkills: ["Python", "React", "REST API", "NLP"],
    optionalSkills: ["FastAPI", "Tailwind CSS", "Docker"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["AI/ML Engineer", "Full Stack Developer", "Data Scientist"],
    features: [
      "PDF Resume parser with text extraction",
      "Job description keyword similarity calculator",
      "ATS compatibility score generator (0-100%)",
      "Skill gap detection and course recommendations",
      "AI resume summary and bullet point rewriter"
    ],
    learningOutcomes: [
      "Natural Language Processing (NLP) text processing",
      "Full-stack integration with AI LLM APIs",
      "Vector embeddings and cosine similarity",
      "Secure file upload handling and parsing"
    ],
    resumeValue: "High",
    popularity: 98,
    prerequisites: ["Basic React state management", "Python text handling"]
  },
  {
    title: "Student Academic Performance Predictor",
    description: "Predicts student exam scores, dropout risk, and subject-wise difficulty using machine learning classification and regression algorithms with interactive faculty dashboards.",
    domain: "Data Science",
    difficulty: "Medium",
    technologies: ["Python", "Scikit-Learn", "Flask", "React", "Pandas", "Recharts"],
    requiredSkills: ["Python", "Machine Learning", "React", "SQL"],
    optionalSkills: ["Pandas", "Scikit-Learn", "Flask"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    features: [
      "Multi-variable student demographic & attendance data ingestion",
      "Random Forest & XGBoost predictive performance models",
      "Early warning system for students at risk of failing",
      "Interactive analytics dashboard with grade distribution charts",
      "CSV export and automated counselor report generation"
    ],
    learningOutcomes: [
      "Data preprocessing, imputation, and feature engineering",
      "Supervised ML model training and evaluation metrics (ROC-AUC, F1-score)",
      "RESTful API model serving with Flask",
      "Data visualization using Recharts and React"
    ],
    resumeValue: "High",
    popularity: 91,
    prerequisites: ["Understanding of statistics and basic supervised learning"]
  },
  {
    title: "Fake News & Misinformation Detection Engine",
    description: "Detects fraudulent news articles and misleading social media claims using Transformer-based NLP models and real-time fact-checking API integrations.",
    domain: "NLP",
    difficulty: "Hard",
    technologies: ["Python", "PyTorch", "HuggingFace Transformers", "FastAPI", "React"],
    requiredSkills: ["Python", "Deep Learning", "NLP", "React"],
    optionalSkills: ["PyTorch", "Transformers", "Docker"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Researcher", "Data Scientist"],
    features: [
      "Fine-tuned BERT/RoBERTa model for truthfulness classification",
      "Source domain credibility assessment module",
      "Browser extension integration for on-the-fly article verification",
      "Linguistic cue analysis (sentiment polarity, clickbait indicators)",
      "Explainable AI visualization highlighting suspicious phrases"
    ],
    learningOutcomes: [
      "Fine-tuning Transformer architectures for text classification",
      "Explainable AI (SHAP / LIME text attribution)",
      "High-throughput microservice deployment with FastAPI",
      "Cross-origin browser extension architecture"
    ],
    resumeValue: "High",
    popularity: 94,
    prerequisites: ["PyTorch fundamentals", "Deep learning basics"]
  },
  {
    title: "Smart Facial Recognition Attendance System",
    description: "An automated contact-free attendance tracking solution using live webcam feeds, OpenCV face detection, and real-time student presence logging.",
    domain: "Computer Vision",
    difficulty: "Medium",
    technologies: ["Python", "OpenCV", "dlib", "SQLite", "Tkinter", "Flask"],
    requiredSkills: ["Python", "Computer Vision", "SQL"],
    optionalSkills: ["OpenCV", "Flask", "dlib"],
    estimatedTime: "1 month",
    projectType: "College Mini Project",
    careerGoals: ["AI/ML Engineer", "Software Developer"],
    features: [
      "Real-time Haar Cascade / MTCNN facial detection",
      "Face encoding generator using 128-dimensional landmarks",
      "Anti-spoofing liveness check using blink detection",
      "Automated attendance spreadsheet exporter with timestamps",
      "Admin web portal for student enrollment and attendance history"
    ],
    learningOutcomes: [
      "Facial detection and Euclidean distance matching",
      "Computer vision pipeline optimization for 30+ FPS video",
      "Relational database design for event logging",
      "Hardware webcam stream interfacing"
    ],
    resumeValue: "Medium",
    popularity: 95,
    prerequisites: ["Python programming", "Basic image processing concepts"]
  },
  {
    title: "AI Interview Coach & Speech Evaluation Platform",
    description: "Simulates mock technical and behavioral interviews with real-time speech-to-text, facial expression sentiment analysis, and answer feedback powered by LLMs.",
    domain: "AI/ML",
    difficulty: "Advanced",
    technologies: ["React", "Node.js", "WebRTC", "Gemini API", "Whisper", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "AI/ML", "Web Development"],
    optionalSkills: ["WebRTC", "Whisper API", "Tailwind CSS"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Full Stack Developer", "AI/ML Engineer", "Software Developer"],
    features: [
      "Contextual interview question generation tailored to role & level",
      "Live audio transcription using Web Speech / Whisper API",
      "Grammar, clarity, and keyword density evaluation",
      "Body language and confidence scoring via camera feed",
      "Comprehensive performance summary card with STAR method guidance"
    ],
    learningOutcomes: [
      "Real-time audio/video processing in modern browsers",
      "Advanced prompt engineering and structured JSON outputs",
      "Full-stack stateful WebSocket / WebRTC communication",
      "Enterprise SaaS UX architecture"
    ],
    resumeValue: "High",
    popularity: 99,
    prerequisites: ["Modern React", "REST APIs", "Node.js"]
  },
  {
    title: "Decentralized Personal Finance & Expense Tracker",
    description: "A secure, privacy-first personal wealth tracker with automatic bank statement CSV parsing, budget forecasting, and optional Ethereum wallet balance sync.",
    domain: "Web Development",
    difficulty: "Medium",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
    optionalSkills: ["Express", "Chart.js", "Ethers.js"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Bank statement CSV drag-and-drop parsing & category tagging",
      "Monthly budget alert thresholds and push notifications",
      "Predictive spend forecast based on previous 3-month velocity",
      "Multi-currency support with real-time conversion rates",
      "End-to-end encrypted local storage backup"
    ],
    learningOutcomes: [
      "MERN stack design patterns & secure token authentication",
      "Aggregation pipelines in MongoDB for analytical queries",
      "Complex charting with interactive date range filters",
      "Responsive UI design with modern dark mode"
    ],
    resumeValue: "Medium",
    popularity: 88,
    prerequisites: ["JavaScript ES6+", "HTML/CSS"]
  },
  {
    title: "Campus Event Management & Ticket Booking Portal",
    description: "A centralized college fest and tech symposium platform with QR-code entry verification, team registrations, and payment gateway simulation.",
    domain: "Web Development",
    difficulty: "Easy",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "MongoDB", "HTML", "CSS"],
    optionalSkills: ["Express", "JWT", "QRCode.js"],
    estimatedTime: "2 weeks",
    projectType: "College Mini Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Role-based access control (Student, Organizer, Faculty Admin)",
      "Digital ticket generation with cryptographically signed QR codes",
      "Real-time organizer ticket scanner via smartphone camera",
      "Team registration with member invitation emails",
      "Live event announcement noticeboard with push notifications"
    ],
    learningOutcomes: [
      "RESTful API design and JWT authentication",
      "Role-based authorization and middleware guards",
      "QR code generation and mobile camera scanning integration",
      "Form validation and dynamic team member forms"
    ],
    resumeValue: "Medium",
    popularity: 87,
    prerequisites: ["Basic web development fundamentals"]
  },
  {
    title: "College Placement Prediction & Skill Roadmap Engine",
    description: "Evaluates student academic records, coding problem metrics, and internship profiles to predict campus placement probabilities with customized skill roadmaps.",
    domain: "Data Science",
    difficulty: "Medium",
    technologies: ["Python", "Scikit-Learn", "React", "Node.js", "Tailwind CSS"],
    requiredSkills: ["Python", "Machine Learning", "React", "Data Science"],
    optionalSkills: ["Scikit-Learn", "Node.js", "Pandas"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Data Scientist", "AI/ML Engineer", "Data Analyst"],
    features: [
      "Logistic regression and gradient boosting placement models",
      "Interactive radar chart comparing student skills with tier-1 company cutoffs",
      "Personalized learning path generator based on target dream company",
      "Placement historical trends explorer across branches and years",
      "Mock interview score calculator"
    ],
    learningOutcomes: [
      "Feature engineering on tabular student records",
      "Handling class imbalance using SMOTE",
      "Radar charts and interactive SVG visualizations in React",
      "Deploying ML pipelines with Docker and REST endpoints"
    ],
    resumeValue: "High",
    popularity: 93,
    prerequisites: ["Python", "Basic ML algorithms"]
  },
  {
    title: "E-Commerce Collaborative Filtering Recommendation System",
    description: "A high-performance product recommender utilizing collaborative filtering and matrix factorization to deliver personalized product suggestions with sub-50ms latency.",
    domain: "AI/ML",
    difficulty: "Medium",
    technologies: ["Python", "Surprise", "FastAPI", "React", "Redis"],
    requiredSkills: ["Python", "Machine Learning", "React", "SQL"],
    optionalSkills: ["Redis", "FastAPI", "Surprise"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["AI/ML Engineer", "Data Scientist", "Full Stack Developer"],
    features: [
      "User-based and item-based collaborative filtering",
      "Matrix Factorization with SVD (Singular Value Decomposition)",
      "Redis in-memory caching for ultra-fast recommendations",
      "E-commerce storefront with real-time cart and 'Customers Also Bought' carousel",
      "A/B testing simulation comparing popularity vs personalized recommendations"
    ],
    learningOutcomes: [
      "Recommendation system paradigms (Collaborative vs Content-Based)",
      "Cold start problem resolution strategies",
      "Redis caching layer architecture",
      "Microservice communication and latency benchmarking"
    ],
    resumeValue: "High",
    popularity: 92,
    prerequisites: ["Linear algebra basics", "Python"]
  },
  {
    title: "Automated Crop Disease Detection via Leaf Imagery",
    description: "A mobile-friendly computer vision tool for farmers that diagnoses plant diseases from leaf photos using deep Convolutional Neural Networks and recommends organic remedies.",
    domain: "Computer Vision",
    difficulty: "Hard",
    technologies: ["Python", "TensorFlow", "Keras", "FastAPI", "React", "Tailwind CSS"],
    requiredSkills: ["Python", "Deep Learning", "Computer Vision", "React"],
    optionalSkills: ["TensorFlow", "Keras", "FastAPI"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Researcher"],
    features: [
      "Fine-tuned MobileNetV3 / ResNet50 model achieving 96%+ validation accuracy",
      "Offline progressive web app (PWA) with image caching",
      "Multi-lingual remedy instructions (English, Hindi, regional languages)",
      "Geo-tagged disease incidence heatmap for agricultural officers",
      "Confidence thresholding to flag ambiguous photos"
    ],
    learningOutcomes: [
      "Transfer learning with deep CNN architectures",
      "Image augmentation, normalization, and optimization for edge devices",
      "PWA offline service worker caching",
      "Multi-lingual i18n frontend architecture"
    ],
    resumeValue: "High",
    popularity: 96,
    prerequisites: ["Convolutional Neural Networks", "Python"]
  },
  {
    title: "Autonomous Traffic Sign Recognition & Lane Assist",
    description: "Self-driving car computer vision pipeline that recognizes international traffic signs, detects lane markings in dashcam videos, and warns of speed limit breaches.",
    domain: "Computer Vision",
    difficulty: "Hard",
    technologies: ["Python", "OpenCV", "PyTorch", "Flask", "React"],
    requiredSkills: ["Python", "Computer Vision", "Deep Learning"],
    optionalSkills: ["PyTorch", "OpenCV", "Flask"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Researcher"],
    features: [
      "German Traffic Sign Recognition Benchmark (GTSRB) CNN classifier",
      "Hough Transform and sliding window lane boundary detection",
      "Real-time video annotation stream with speed limit HUD display",
      "Collision risk warning on sudden obstacle detection",
      "Interactive video upload and playback debugger"
    ],
    learningOutcomes: [
      "Spatial transformations and perspective mapping with OpenCV",
      "Real-time video frame processing pipelines",
      "Deep learning classification with multi-class loss functions",
      "Autonomous vehicle sensory algorithms"
    ],
    resumeValue: "High",
    popularity: 90,
    prerequisites: ["OpenCV", "PyTorch fundamentals"]
  },
  {
    title: "Cloud-Native Cybersecurity Threat & Intrusion Detector",
    description: "Monitors server network packets and system logs in real-time, detecting anomalies and port scanning attacks using Isolation Forests and rule-based alerts.",
    domain: "Cybersecurity",
    difficulty: "Advanced",
    technologies: ["Python", "Scapy", "Node.js", "React", "Docker", "Socket.io"],
    requiredSkills: ["Cybersecurity", "Python", "Node.js", "React"],
    optionalSkills: ["Scapy", "Docker", "Socket.io"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Cybersecurity Engineer", "Cloud Engineer", "Software Developer"],
    features: [
      "Live packet sniffing and protocol inspection (TCP, UDP, ICMP)",
      "SYN flood and brute-force SSH attack signature detection",
      "Unsupervised anomaly detection with Isolation Forest ML",
      "Live security operations center (SOC) dashboard with WebSockets",
      "Automated IP ban trigger via iptables integration"
    ],
    learningOutcomes: [
      "Network packet structures and OSI layers",
      "Anomaly detection algorithms on high-dimensional traffic",
      "WebSocket streaming architecture for real-time telemetry",
      "Containerized deployment and Linux security commands"
    ],
    resumeValue: "High",
    popularity: 94,
    prerequisites: ["Computer networks", "Python basics"]
  },
  {
    title: "Smart AI Study Planner & Pomodoro Scheduler",
    description: "An adaptive productivity tool that breaks syllabi into manageable study sessions, schedules spaced repetition reviews, and adjusts schedules based on exam dates.",
    domain: "Web Development",
    difficulty: "Easy",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Lucide React"],
    requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
    optionalSkills: ["Node.js", "MongoDB", "Tailwind CSS"],
    estimatedTime: "2 weeks",
    projectType: "College Mini Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Automated syllabus breakdown across available preparation days",
      "Integrated customizable Pomodoro timer with ambient sounds",
      "Spaced repetition revision reminders based on Ebbinghaus forgetting curve",
      "Streak tracking and motivational achievement badges",
      "Calendar export to Google Calendar and iCal"
    ],
    learningOutcomes: [
      "Local state and browser storage synchronization",
      "Complex date-time calculation algorithms",
      "Audio API and notification APIs in the browser",
      "Clean UI component design with Tailwind CSS"
    ],
    resumeValue: "Medium",
    popularity: 86,
    prerequisites: ["React basics", "JavaScript"]
  },
  {
    title: "Doctor-Patient Telehealth Appointment & EHR System",
    description: "HIPAA-conscious healthcare portal featuring role-based portals for doctors and patients, calendar slot booking, digital prescription writing, and WebRTC video calls.",
    domain: "Web Development",
    difficulty: "Hard",
    technologies: ["React", "Node.js", "Express", "MongoDB", "WebRTC", "Socket.io"],
    requiredSkills: ["React", "Node.js", "MongoDB", "Web Development"],
    optionalSkills: ["WebRTC", "Socket.io", "Express"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Doctor schedule slot availability manager with conflict prevention",
      "Peer-to-peer encrypted video consultation via WebRTC",
      "Digital prescription generator with PDF export and QR validation",
      "Medical history and lab report document vault",
      "Automated SMS/Email appointment reminders"
    ],
    learningOutcomes: [
      "Full-stack WebRTC peer connection negotiation and STUN/TURN",
      "Role-based multi-tenant authentication patterns",
      "PDF generation on the backend with digital signatures",
      "Complex scheduling algorithms and timezone normalization"
    ],
    resumeValue: "High",
    popularity: 91,
    prerequisites: ["Node.js", "React", "MongoDB"]
  },
  {
    title: "AI Job Match & Tech Career Advisory Platform",
    description: "Scrapes technical job boards, parses candidate GitHub profiles, and calculates semantic matching scores to recommend highest-probability tech job openings.",
    domain: "AI/ML",
    difficulty: "Medium",
    technologies: ["React", "Python", "FastAPI", "Gemini API", "PostgreSQL"],
    requiredSkills: ["Python", "React", "SQL", "AI/ML"],
    optionalSkills: ["FastAPI", "PostgreSQL", "Gemini API"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["AI/ML Engineer", "Data Scientist", "Full Stack Developer"],
    features: [
      "GitHub profile scraper analyzing top languages, commit frequency, and repositories",
      "Semantic job description matching using vector embeddings",
      "Salary benchmark estimator based on experience and tech stack",
      "Automated cold outreach email generator tailored to hiring managers",
      "Kanban board for tracking job application pipelines"
    ],
    learningOutcomes: [
      "Third-party REST API integration (GitHub REST API)",
      "Relational schema modeling with PostgreSQL",
      "Vector embeddings and similarity searches",
      "Kanban drag-and-drop state machines in React"
    ],
    resumeValue: "High",
    popularity: 95,
    prerequisites: ["Python", "React", "Database concepts"]
  },
  {
    title: "Real-Time Weather Analytics & Extreme Climate Dashboard",
    description: "Visualizes global climate telemetry, storm trajectories, and historical temperature anomalies with interactive Mapbox maps and 7-day predictive charts.",
    domain: "Web Development",
    difficulty: "Easy",
    technologies: ["React", "Mapbox GL", "OpenWeatherMap API", "Recharts", "Tailwind CSS"],
    requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
    optionalSkills: ["Mapbox GL", "Recharts", "Tailwind CSS"],
    estimatedTime: "2 weeks",
    projectType: "College Mini Project",
    careerGoals: ["Full Stack Developer", "Data Analyst"],
    features: [
      "Interactive 3D globe with temperature and precipitation radar overlays",
      "City search with geolocation autocompletion",
      "7-day hourly temperature trend and UV index charts",
      "Extreme weather warning alert banners",
      "Historical weather comparison vs 30-year averages"
    ],
    learningOutcomes: [
      "Geospatial data rendering with WebGL / Mapbox",
      "Third-party API asynchronous fetching and caching",
      "Interactive data visualizations with Recharts",
      "Responsive layout engineering"
    ],
    resumeValue: "Medium",
    popularity: 84,
    prerequisites: ["React state", "Fetch / Axios"]
  },
  {
    title: "Distributed Network Latency & Server Health Monitor",
    description: "A lightweight ping and HTTP endpoint uptime tracker with synthetic health checks, latency heatmaps, and instant Telegram/Discord outage notifications.",
    domain: "Cloud Computing",
    difficulty: "Medium",
    technologies: ["Go", "Node.js", "React", "Docker", "Prometheus", "Tailwind CSS"],
    requiredSkills: ["Node.js", "React", "Cloud", "Cybersecurity"],
    optionalSkills: ["Go", "Docker", "Prometheus"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Cloud Engineer", "Cybersecurity Engineer", "Software Developer"],
    features: [
      "Configurable cron-based HTTP, TCP, and ICMP ping probes",
      "Latency percentiles (p50, p95, p99) calculation and graphs",
      "Webhook alerts for Discord, Slack, and Telegram on status degradation",
      "Public status page generation for SaaS applications",
      "SSL certificate expiration tracking and alert notifications"
    ],
    learningOutcomes: [
      "Network socket programming and HTTP protocol diagnostics",
      "Cron scheduling and background worker pool management",
      "Time-series data storage and percentile aggregation",
      "DevOps monitoring concepts (uptime, SLI, SLO)"
    ],
    resumeValue: "High",
    popularity: 89,
    prerequisites: ["Node.js or Python", "Basic networking concepts"]
  },
  {
    title: "IoT Smart Home Energy & Automation Hub",
    description: "Simulates and controls connected smart appliances, calculates electricity kilowatt-hour consumption, and automatically shifts heavy loads to off-peak hours.",
    domain: "IoT",
    difficulty: "Medium",
    technologies: ["Node.js", "MQTT", "React", "MongoDB", "Arduino / ESP32 Simulator"],
    requiredSkills: ["Node.js", "React", "IoT", "JavaScript"],
    optionalSkills: ["MQTT", "MongoDB", "ESP32"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Software Developer", "Full Stack Developer"],
    features: [
      "MQTT broker pub/sub architecture for bi-directional device communication",
      "Virtual smart device simulator (lighting, HVAC, solar battery)",
      "Peak-hour electricity cost calculator with automatic appliance throttling",
      "Voice command simulation for smart home actions",
      "Daily and monthly energy consumption charts"
    ],
    learningOutcomes: [
      "IoT communication protocols (MQTT vs HTTP vs WebSockets)",
      "Sensor telemetry ingestion and time-series aggregation",
      "Event-driven architecture and message brokering",
      "Interactive device toggle states in React"
    ],
    resumeValue: "High",
    popularity: 88,
    prerequisites: ["JavaScript", "Basic async programming"]
  },
  {
    title: "Cloud File Storage & Encrypted Sharing System (Google Drive Clone)",
    description: "A secure cloud storage portal with chunked multi-part uploads, encrypted file storage on AWS S3, password-protected shareable links, and expiration timers.",
    domain: "Cloud Computing",
    difficulty: "Hard",
    technologies: ["Node.js", "Express", "React", "AWS S3 / MinIO", "MongoDB", "Tailwind CSS"],
    requiredSkills: ["Node.js", "React", "Cloud", "MongoDB"],
    optionalSkills: ["AWS S3", "Express", "Tailwind CSS"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Cloud Engineer", "Full Stack Developer", "Software Developer"],
    features: [
      "Resumable chunked file upload for files up to 2GB",
      "Direct-to-S3 presigned URL uploads reducing backend memory pressure",
      "AES-256 client-side encryption option prior to cloud upload",
      "Granular folder hierarchy, file search, and tag management",
      "Expiring, password-protected download links with access logging"
    ],
    learningOutcomes: [
      "Object storage integration (AWS S3 / MinIO SDK)",
      "Presigned URL security architecture",
      "Handling large stream uploads and chunk verification",
      "File metadata indexing in MongoDB"
    ],
    resumeValue: "High",
    popularity: 97,
    prerequisites: ["Node.js", "Express", "React"]
  },
  {
    title: "AI Document QA & Multi-PDF Conversational Search (RAG)",
    description: "Upload research papers or technical documentation to query them via Retrieval-Augmented Generation (RAG) using vector embeddings and Gemini API.",
    domain: "AI/ML",
    difficulty: "Hard",
    technologies: ["Python", "LangChain", "ChromaDB", "Gemini API", "React", "Tailwind CSS"],
    requiredSkills: ["Python", "AI/ML", "React", "NLP"],
    optionalSkills: ["LangChain", "ChromaDB", "Gemini API"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Data Scientist", "Full Stack Developer"],
    features: [
      "Multi-PDF text extraction and semantic chunking",
      "Vector embedding generation stored in ChromaDB",
      "Top-k similarity retrieval with source page citation",
      "Interactive chat interface streaming AI answers",
      "Document summary and key takeaway extraction"
    ],
    learningOutcomes: [
      "RAG (Retrieval-Augmented Generation) pipeline architecture",
      "Vector database operations (embeddings, indexing, similarity metrics)",
      "Handling hallucinations with strict contextual constraints",
      "Streaming responses in full-stack web applications"
    ],
    resumeValue: "High",
    popularity: 100,
    prerequisites: ["Python", "Basic LLM concepts", "React"]
  },
  {
    title: "Source Code Plagiarism & Similarity Detector",
    description: "Compares student coding submissions in Python, C++, and Java using Abstract Syntax Tree (AST) analysis and Winnowing algorithm to detect structural copying.",
    domain: "Software Development",
    difficulty: "Medium",
    technologies: ["Python", "FastAPI", "React", "ANTLR", "Tailwind CSS"],
    requiredSkills: ["Python", "React", "Software Development", "C++"],
    optionalSkills: ["FastAPI", "AST Parsing", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Software Developer", "Researcher", "Full Stack Developer"],
    features: [
      "Variable name and comment stripping to defeat surface obfuscation",
      "Abstract Syntax Tree (AST) structural comparison",
      "Winnowing algorithm generating fingerprint hashes for fast matching",
      "Side-by-side synchronized code comparison view highlighting matches",
      "Batch zip file upload for entire classroom assignment submissions"
    ],
    learningOutcomes: [
      "Compiler design concepts (Lexing, Parsing, ASTs)",
      "String hashing algorithms and rolling hash techniques",
      "Building synchronized diff viewers in React",
      "File system processing and batch job handling"
    ],
    resumeValue: "High",
    popularity: 91,
    prerequisites: ["Python", "Data structures and algorithms"]
  },
  {
    title: "Blockchain Decentralized Voting System",
    description: "A tamper-proof electoral voting dApp built on Ethereum/Polygon with MetaMask authentication, blind voter eligibility verification, and immutable ledger tallies.",
    domain: "Blockchain",
    difficulty: "Advanced",
    technologies: ["Solidity", "Hardhat", "React", "Ethers.js", "Tailwind CSS"],
    requiredSkills: ["Blockchain", "React", "JavaScript"],
    optionalSkills: ["Solidity", "Hardhat", "Ethers.js"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Software Developer", "Researcher"],
    features: [
      "Smart contract enforcing one-vote-per-registered-voter policy",
      "Gas-optimized Solidity contract with automated deployment scripts",
      "MetaMask web3 wallet integration and cryptographic signature verification",
      "Real-time election tally visualizer updated with every mined block",
      "Audit trail verifiable on Etherscan testnet"
    ],
    learningOutcomes: [
      "Smart contract development, testing, and deployment lifecycle",
      "Web3 frontend integration with Ethers.js",
      "Cryptographic hashing and zero-knowledge proof concepts",
      "Security vulnerabilities in Solidity (re-entrancy, gas limits)"
    ],
    resumeValue: "High",
    popularity: 93,
    prerequisites: ["JavaScript ES6+", "Basic cryptography concepts"]
  },
  {
    title: "AI-Powered Code Reviewer & Bug Explainer",
    description: "Analyzes GitHub Pull Requests or raw source code snippets, identifies security flaws, performance anti-patterns, and auto-suggests refactored pull requests.",
    domain: "Software Development",
    difficulty: "Medium",
    technologies: ["React", "Node.js", "Gemini API", "Monaco Editor", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "AI/ML", "JavaScript"],
    optionalSkills: ["Monaco Editor", "Gemini API", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Full Stack Developer", "Software Developer", "AI/ML Engineer"],
    features: [
      "Interactive code editor with syntax highlighting using Monaco (VS Code core)",
      "Automated time complexity (Big-O) analysis and detection of bottlenecks",
      "OWASP top-10 security vulnerability scanner (SQLi, XSS, insecure deps)",
      "Diff comparison between original code and AI refactored code",
      "One-click code format and unit test suite generation"
    ],
    learningOutcomes: [
      "Integrating Monaco Editor in React applications",
      "Static code analysis techniques and regex rule matching",
      "LLM prompting for deterministic code modification",
      "Code diff visualization rendering"
    ],
    resumeValue: "High",
    popularity: 96,
    prerequisites: ["React", "JavaScript", "Understanding of code quality"]
  },
  {
    title: "Smart Waste Sorting & Recyclable Classifier (IoT + CV)",
    description: "An automated trash classification bin using Raspberry Pi camera and deep learning to instantly classify waste into organic, plastic, paper, and metal categories.",
    domain: "IoT",
    difficulty: "Hard",
    technologies: ["Python", "TensorFlow Lite", "OpenCV", "Raspberry Pi", "Flask", "React"],
    requiredSkills: ["Python", "Computer Vision", "IoT", "Deep Learning"],
    optionalSkills: ["TensorFlow Lite", "Raspberry Pi", "Flask"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Software Developer"],
    features: [
      "Quantized TensorFlow Lite model running at 20 FPS on Raspberry Pi",
      "Servo motor control simulation to divert items into appropriate bins",
      "Cloud telemetry dashboard tracking diversion rates and bin fullness",
      "Gamified student rewards portal scanning barcodes on recyclable items",
      "Audio speaker feedback announcing item category upon deposition"
    ],
    learningOutcomes: [
      "Edge computing and model quantization for low-power devices",
      "Hardware GPIO pin interfacing in Python",
      "Computer vision under varying lighting conditions",
      "Real-time IoT data syncing to web dashboards"
    ],
    resumeValue: "High",
    popularity: 89,
    prerequisites: ["Python", "Basic electronics / IoT concepts"]
  },
  {
    title: "Cross-Platform Fitness & Workout Tracker with Pose Estimation",
    description: "A mobile-responsive fitness application that tracks workout repetitions (squats, pushups, bicep curls) in real-time using MediaPipe camera pose estimation.",
    domain: "Mobile Development",
    difficulty: "Hard",
    technologies: ["React", "MediaPipe", "Tailwind CSS", "Chart.js", "Web APIs"],
    requiredSkills: ["React", "JavaScript", "Computer Vision", "HTML", "CSS"],
    optionalSkills: ["MediaPipe", "Chart.js", "PWA"],
    estimatedTime: "1-2 months",
    projectType: "Resume",
    careerGoals: ["Mobile Developer", "Full Stack Developer", "AI/ML Engineer"],
    features: [
      "33-point body skeleton landmark tracking in browser via WebAssembly",
      "Joint angle trigonometry calculation for form feedback (e.g. 'Squat deeper')",
      "Automated repetition counter with audio ding sound effects",
      "Calorie expenditure estimator based on body weight and exercise METs",
      "Workout history analytics and personal record tracking"
    ],
    learningOutcomes: [
      "MediaPipe WebAssembly pose estimation pipeline",
      "Mathematical vector calculations and joint angle mathematics",
      "Camera hardware stream manipulation in HTML5 canvas",
      "Mobile-optimized web touch interfaces"
    ],
    resumeValue: "High",
    popularity: 97,
    prerequisites: ["React", "Basic trigonometry"]
  },
  {
    title: "AI Voice-Powered Customer Support Bot with Sentiment Escalation",
    description: "An automated voice and chat support agent that answers common customer inquiries, evaluates sentiment tone, and smoothly escalates angry customers to humans.",
    domain: "NLP",
    difficulty: "Medium",
    technologies: ["Node.js", "React", "Gemini API", "Socket.io", "Tailwind CSS"],
    requiredSkills: ["Node.js", "React", "AI/ML", "JavaScript"],
    optionalSkills: ["Socket.io", "Gemini API", "SpeechSynthesis API"],
    estimatedTime: "1 month",
    projectType: "College Mini Project",
    careerGoals: ["Full Stack Developer", "AI/ML Engineer"],
    features: [
      "Natural conversational dialogue with real-time text-to-speech synthesis",
      "Live customer sentiment score gauge (-1.0 negative to +1.0 positive)",
      "Automatic ticket generation in customer support CRM",
      "Admin supervisor dashboard to monitor live chat transcripts and take over",
      "Configurable FAQ knowledge base importer"
    ],
    learningOutcomes: [
      "Web Speech API (SpeechRecognition and SpeechSynthesis)",
      "Real-time bi-directional messaging with Socket.io",
      "Sentiment classification and intent detection with LLMs",
      "State management for multi-participant chat rooms"
    ],
    resumeValue: "Medium",
    popularity: 88,
    prerequisites: ["JavaScript", "React", "Node.js"]
  },
  {
    title: "Automated Microservices API Gateway & Rate Limiter",
    description: "A high-performance reverse proxy and API Gateway implementing token bucket rate limiting, JWT validation, circuit breaker pattern, and request caching.",
    domain: "Cloud Computing",
    difficulty: "Hard",
    technologies: ["Node.js", "Express", "Redis", "Docker", "React Dashboard"],
    requiredSkills: ["Node.js", "Cloud", "Cybersecurity", "React"],
    optionalSkills: ["Redis", "Docker", "Express"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Cloud Engineer", "Software Developer", "Full Stack Developer"],
    features: [
      "Token bucket and sliding window rate limiting algorithm using Redis",
      "Centralized JWT verification before forwarding requests to microservices",
      "Circuit breaker implementation with fallback responses during service outages",
      "Dynamic routing and weighted load balancing across multiple service instances",
      "Live Grafana-style metrics dashboard displaying requests/sec and error rates"
    ],
    learningOutcomes: [
      "System design architecture for distributed microservices",
      "High-throughput Redis scripting with Lua",
      "Circuit breaker resilience patterns (Netflix Hystrix concepts)",
      "Reverse proxying and HTTP header management"
    ],
    resumeValue: "High",
    popularity: 92,
    prerequisites: ["Node.js", "Express", "Understanding of HTTP"]
  },
  {
    title: "Multiplayer Collaborative Code Editor with Live Execution",
    description: "A Google Docs-style real-time collaborative code workspace with operational transformation/CRDT, multi-language code execution sandbox, and voice chat.",
    domain: "Software Development",
    difficulty: "Advanced",
    technologies: ["React", "Node.js", "Socket.io", "Docker", "Monaco Editor"],
    requiredSkills: ["React", "Node.js", "Software Development", "JavaScript"],
    optionalSkills: ["Docker", "Socket.io", "WebRTC"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Real-time multi-cursor collaboration with color-coded participant labels",
      "Isolated Docker container execution sandbox for Python, JavaScript, and C++",
      "Integrated audio voice room using WebRTC mesh network",
      "Version history snapshots and time-travel rollback slider",
      "Dark and light theme toggle with custom font sizing"
    ],
    learningOutcomes: [
      "Conflict-free replicated data types (CRDTs) and Operational Transformation",
      "Secure backend code execution sandboxes with resource limits",
      "WebRTC audio streaming and peer management",
      "Complex React state synchronization across network clients"
    ],
    resumeValue: "High",
    popularity: 98,
    prerequisites: ["Full stack JavaScript", "Docker basics"]
  },
  {
    title: "Stock Market Algorithmic Trading Backtester & Visualizer",
    description: "Allows finance enthusiasts to design custom technical trading strategies (MACD, RSI, Bollinger Bands) and backtest them on 10 years of historical equities data.",
    domain: "Data Science",
    difficulty: "Medium",
    technologies: ["Python", "Pandas", "Plotly", "Flask", "React", "Tailwind CSS"],
    requiredSkills: ["Python", "Data Science", "React"],
    optionalSkills: ["Pandas", "Plotly", "Flask"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Data Scientist", "Data Analyst", "Software Developer"],
    features: [
      "Historical OHLC stock price data ingestion via Yahoo Finance API",
      "Custom indicator builder (Moving Averages, RSI, Stochastic Oscillator)",
      "Backtest metrics engine (Sharpe Ratio, Max Drawdown, Win/Loss Rate, CAGR)",
      "Interactive candlestick charting with buy/sell execution markers",
      "Portfolio optimization tool using Markowitz Efficient Frontier"
    ],
    learningOutcomes: [
      "Time-series financial data manipulation with Pandas",
      "Algorithmic trading risk and performance metrics",
      "Interactive financial charting with Plotly and React",
      "Vectorized backtesting vs event-driven backtesting"
    ],
    resumeValue: "High",
    popularity: 93,
    prerequisites: ["Python", "Basic statistics and finance principles"]
  },
  {
    title: "Smart Hospital Bed & ICU Patient Monitoring System",
    description: "An IoT and web dashboard that monitors vital patient signs (heart rate, SpO2, body temperature), detects critical anomalies, and alerts on-duty nurses.",
    domain: "IoT",
    difficulty: "Medium",
    technologies: ["Node.js", "React", "Socket.io", "MongoDB", "ESP32 Simulation"],
    requiredSkills: ["Node.js", "React", "IoT", "Web Development"],
    optionalSkills: ["Socket.io", "MongoDB", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "College Mini Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Real-time ECG and vitals waveform visualizer via HTML5 canvas",
      "Instant sound alarm and SMS dispatch when vitals cross threshold limits",
      "ICU bed ward floorplan view displaying status of all rooms at a glance",
      "Patient medication schedule and historical vital chart logs",
      "Role-based login for doctors, nurses, and administrative staff"
    ],
    learningOutcomes: [
      "High-frequency streaming data rendering in browser canvas",
      "Real-time event triggering and urgent notification dispatch",
      "Healthcare data structures and audit logging",
      "Responsive emergency room dashboard UX"
    ],
    resumeValue: "Medium",
    popularity: 87,
    prerequisites: ["React", "Node.js"]
  },
  {
    title: "AI Mental Health Companion & Daily Mood Journal",
    description: "A private mental wellness app with cognitive behavioral therapy (CBT) reflection prompts, voice mood analysis, and crisis hotline detection.",
    domain: "AI/ML",
    difficulty: "Medium",
    technologies: ["React", "Node.js", "Gemini API", "Recharts", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "AI/ML", "JavaScript"],
    optionalSkills: ["Gemini API", "Recharts", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Full Stack Developer", "AI/ML Engineer"],
    features: [
      "Daily guided reflection journal with AI sentiment summary",
      "Safety guardrail detector alerting user with emergency contacts if distress is identified",
      "Weekly mood trend charts correlated with sleep and study hours",
      "Guided audio breathing exercises and grounding mini-games",
      "Zero-knowledge encrypted client-side journal storage"
    ],
    learningOutcomes: [
      "AI safety guardrails and critical keyword detection",
      "Emotion and sentiment scoring across longitudinal text entries",
      "Client-side encryption using Web Crypto API",
      "Empathetic conversational UX design"
    ],
    resumeValue: "High",
    popularity: 91,
    prerequisites: ["React", "JavaScript"]
  },
  {
    title: "Automated Container Vulnerability Scanner & CI/CD Guard",
    description: "Inspects Docker container images for known Common Vulnerabilities and Exposures (CVEs), generates SBOMs (Software Bill of Materials), and fails pull requests on high risk.",
    domain: "Cybersecurity",
    difficulty: "Hard",
    technologies: ["Go", "Python", "Docker SDK", "React", "GitHub Actions"],
    requiredSkills: ["Cybersecurity", "Cloud", "Python", "Software Development"],
    optionalSkills: ["Docker", "Go", "GitHub Actions"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Cybersecurity Engineer", "Cloud Engineer"],
    features: [
      "Docker layer unpacking and binary signature extraction",
      "National Vulnerability Database (NVD) CVE cross-referencing",
      "CycloneDX / SPDX Software Bill of Materials (SBOM) generator",
      "GitHub Action CLI integration for pull request automated blocking",
      "Visual dependency vulnerability tree and patch version recommendations"
    ],
    learningOutcomes: [
      "Container internals, Union filesystem layers, and OCI image specs",
      "CVE databases, CVSS v3 score calculation, and vulnerability matching",
      "Building command-line developer tooling and CI/CD pipelines",
      "Security compliance and SBOM standards"
    ],
    resumeValue: "High",
    popularity: 94,
    prerequisites: ["Linux basics", "Docker familiarity"]
  },
  {
    title: "AI Video Summarizer & Chapter Generator",
    description: "Extracts audio from video lectures or YouTube videos, generates timestamped transcripts, identifies key concept shifts, and compiles executive summaries.",
    domain: "NLP",
    difficulty: "Medium",
    technologies: ["Python", "FastAPI", "React", "Gemini API", "Whisper", "Tailwind CSS"],
    requiredSkills: ["Python", "React", "AI/ML", "NLP"],
    optionalSkills: ["FastAPI", "Whisper", "Gemini API"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["AI/ML Engineer", "Full Stack Developer", "Data Scientist"],
    features: [
      "Automated audio extraction and speech transcription with timestamps",
      "Topic boundary segmentation into clickable video chapters",
      "Key concept flashcard and quiz generator for students",
      "Searchable interactive transcript with synchronized video player",
      "One-click PDF study notes download"
    ],
    learningOutcomes: [
      "Audio processing pipelines and FFmpeg integration in Python",
      "Speech-to-text alignment and timestamp normalization",
      "Prompt engineering for hierarchical document summarization",
      "Synchronizing custom HTML5 video controls with text cursors"
    ],
    resumeValue: "High",
    popularity: 95,
    prerequisites: ["Python", "React"]
  },
  {
    title: "Disaster Relief Resource Allocation & Volunteer Dispatch",
    description: "A disaster response coordination portal with crowdsourced supply request maps, volunteer skills registry, and automated relief routing.",
    domain: "Web Development",
    difficulty: "Medium",
    technologies: ["React", "Leaflet", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
    optionalSkills: ["Leaflet", "Express", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Offline-first incident reporting for flood/earthquake victims",
      "Interactive relief map with cluster pins for food, water, medical aid",
      "Volunteer skills matching algorithm (doctors, drivers, rescue divers)",
      "Supply inventory tracking across decentralized relief camps",
      "SMS broadcast integration for emergency weather alerts"
    ],
    learningOutcomes: [
      "Geospatial indexing and radius queries in MongoDB ($nearSphere)",
      "Interactive map rendering with Leaflet / OpenStreetMap",
      "Offline form submission queueing using IndexedDB",
      "Emergency response optimization workflows"
    ],
    resumeValue: "High",
    popularity: 89,
    prerequisites: ["JavaScript", "React", "Basic databases"]
  },
  {
    title: "Automated Legal Contract Analysis & Clause Risk Flagging",
    description: "Scans non-disclosure agreements (NDAs) and freelance service contracts, flags unfavorable liability terms, and explains legalese in plain English.",
    domain: "NLP",
    difficulty: "Hard",
    technologies: ["Python", "FastAPI", "Gemini API", "React", "Tailwind CSS"],
    requiredSkills: ["Python", "AI/ML", "NLP", "React"],
    optionalSkills: ["FastAPI", "Gemini API", "Tailwind CSS"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Full Stack Developer", "Researcher"],
    features: [
      "PDF and Word contract parser with clause segmentation",
      "Risk assessment rating (Low, Medium, High risk clauses)",
      "Side-by-side legalese to plain-English translation",
      "Missing critical clauses detector (e.g. intellectual property rights)",
      "Exportable redline contract with suggested renegotiation wording"
    ],
    learningOutcomes: [
      "Information extraction from unstructured legal documents",
      "Few-shot prompt calibration for domain-specific risk scoring",
      "Building high-contrast document review interfaces",
      "Handling multi-page complex document formats"
    ],
    resumeValue: "High",
    popularity: 92,
    prerequisites: ["Python", "React", "REST APIs"]
  },
  {
    title: "Augmented Reality Furniture Placement Mobile Web App",
    description: "Allows shoppers to visualize 3D furniture models inside their living room using WebXR and smartphone cameras without downloading a native mobile app.",
    domain: "Mobile Development",
    difficulty: "Hard",
    technologies: ["JavaScript", "Three.js", "WebXR", "React", "Tailwind CSS"],
    requiredSkills: ["JavaScript", "React", "Mobile Development"],
    optionalSkills: ["Three.js", "WebXR", "GLTF 3D modeling"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Mobile Developer", "Software Developer", "Full Stack Developer"],
    features: [
      "WebXR surface plane detection for floor and tabletop alignment",
      "Interactive 3D model rotation, scaling, and texture swapping",
      "Realistic shadow casting and ambient lighting estimation",
      "Room dimension measurement tool via AR tape measure",
      "Shopping cart integration with direct order checkout"
    ],
    learningOutcomes: [
      "WebXR device APIs and mobile AR capabilities",
      "3D graphics rendering with Three.js and WebGL",
      "Touch gesture controls for 3D object manipulation",
      "Performance optimization for mobile browser frame rates (60 FPS)"
    ],
    resumeValue: "High",
    popularity: 94,
    prerequisites: ["JavaScript", "React", "Basic 3D vector math"]
  },
  {
    title: "Serverless Micro-SaaS Analytics Platform with Edge Workers",
    description: "A lightweight, privacy-focused alternative to Google Analytics using Cloudflare Edge Workers, ClickHouse columnar storage, and sub-10ms event tracking.",
    domain: "Cloud Computing",
    difficulty: "Advanced",
    technologies: ["TypeScript", "Cloudflare Workers", "React", "Recharts", "Tailwind CSS"],
    requiredSkills: ["Cloud", "React", "Software Development", "JavaScript"],
    optionalSkills: ["Cloudflare Workers", "TypeScript", "Recharts"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Cloud Engineer", "Full Stack Developer", "Software Developer"],
    features: [
      "Ultra-lightweight 1KB tracking script with cookie-less visitor fingerprinting",
      "Edge worker ingestion pipeline executing worldwide within 5ms",
      "Real-time visitor live counter via Server-Sent Events (SSE)",
      "Referral source, top pages, device, and geographic breakdown charts",
      "Custom goal conversion and click event tracking"
    ],
    learningOutcomes: [
      "Edge computing paradigms and serverless execution models",
      "High-scale telemetry ingestion architecture",
      "Privacy regulations (GDPR, CCPA) compliant data anonymization",
      "High-performance frontend charting for time-series streams"
    ],
    resumeValue: "High",
    popularity: 95,
    prerequisites: ["JavaScript/TypeScript", "React", "Web fundamentals"]
  },
  {
    title: "Automated Chess Engine & AI Strategy Tutor",
    description: "A web-based chess platform with a custom minimax chess engine, alpha-beta pruning, move evaluation, and AI post-game blunder analysis.",
    domain: "Software Development",
    difficulty: "Hard",
    technologies: ["React", "JavaScript", "Web Workers", "Chess.js", "Tailwind CSS"],
    requiredSkills: ["JavaScript", "Software Development", "React"],
    optionalSkills: ["Web Workers", "Game Development", "Tailwind CSS"],
    estimatedTime: "1-2 months",
    projectType: "Major Project",
    careerGoals: ["Software Developer", "AI/ML Engineer"],
    features: [
      "Custom chess engine implementing Minimax with Alpha-Beta pruning",
      "Web Workers multi-threading ensuring UI remains silky smooth during engine depth calculation",
      "Move evaluation bar showing positional advantage (e.g. +2.4 for White)",
      "Interactive post-game review identifying Best moves, Mistakes, and Blunders",
      "Tactical puzzle trainer with Elo rating progression"
    ],
    learningOutcomes: [
      "Classic game tree search algorithms and heuristic evaluation functions",
      "Web Workers concurrency in browser JavaScript",
      "State management for complex rule systems (FEN, PGN formats)",
      "Interactive board UI design and drag-and-drop mechanics"
    ],
    resumeValue: "High",
    popularity: 92,
    prerequisites: ["Data structures (Trees, Graphs)", "JavaScript ES6+"]
  },
  {
    title: "AI Voice Mimic & Audio Deepfake Detector",
    description: "Analyzes audio recordings to distinguish between genuine human speech and AI-cloned synthesized voices by analyzing spectral frequency anomalies.",
    domain: "AI/ML",
    difficulty: "Advanced",
    technologies: ["Python", "Librosa", "PyTorch", "FastAPI", "React", "Tailwind CSS"],
    requiredSkills: ["Python", "Deep Learning", "AI/ML", "Cybersecurity"],
    optionalSkills: ["Librosa", "PyTorch", "FastAPI"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Cybersecurity Engineer", "Researcher"],
    features: [
      "Audio preprocessing into Mel-Frequency Cepstral Coefficients (MFCCs)",
      "Deep ResNet/Conformer architecture trained on synthetic audio datasets",
      "Authenticity probability meter and voice anomaly heatmaps",
      "Interactive audio spectrogram visualizer in the browser",
      "Batch processing API for security verification teams"
    ],
    learningOutcomes: [
      "Digital signal processing (DSP) and spectrogram conversion with Librosa",
      "Audio deepfake artifacts and synthetic voice generation vulnerabilities",
      "Deep learning on 2D audio representations",
      "Audio file streaming and player integration in React"
    ],
    resumeValue: "High",
    popularity: 96,
    prerequisites: ["Python", "Deep learning", "Signal processing basics"]
  },
  {
    title: "Gamified Learn-to-Code Platform with Interactive Challenges",
    description: "An engaging coding academy platform featuring interactive browser coding puzzles, test runner sandboxes, level progression, and RPG-style avatar unlocks.",
    domain: "Web Development",
    difficulty: "Medium",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "JavaScript", "HTML", "CSS"],
    optionalSkills: ["Express", "MongoDB", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "In-browser JavaScript challenge runner with automated unit test assertions",
      "XP progression, badges, daily challenge streaks, and global leaderboards",
      "Interactive coding hints unlocked using earned points",
      "Syntax highlighted coding exercise interface with live console logs",
      "Teacher portal to create custom classroom exercises"
    ],
    learningOutcomes: [
      "Building client-side code evaluation engines",
      "Gamification psychology and reward state management",
      "MERN stack full-stack design patterns",
      "Dynamic test case runner and assertion parsing"
    ],
    resumeValue: "Medium",
    popularity: 90,
    prerequisites: ["React", "JavaScript"]
  },
  {
    title: "Smart Smart-Metering & Electricity Theft Detection",
    description: "Analyzes smart electricity meter time-series data to detect abnormal consumption drops indicative of physical meter tampering or power theft.",
    domain: "Data Science",
    difficulty: "Hard",
    technologies: ["Python", "Scikit-Learn", "FastAPI", "React", "Recharts"],
    requiredSkills: ["Python", "Data Science", "Machine Learning", "SQL"],
    optionalSkills: ["Scikit-Learn", "FastAPI", "Recharts"],
    estimatedTime: "2 months",
    projectType: "Major Project",
    careerGoals: ["Data Scientist", "Data Analyst", "AI/ML Engineer"],
    features: [
      "Time-series decomposition (trend, seasonality, noise)",
      "Autoencoder neural network trained on normal consumer consumption patterns",
      "Reconstruction error thresholding to flag suspicious tamper incidents",
      "Geographic map view showing suspicious neighborhood clusters",
      "Automated inspection ticket dispatch system for utility technicians"
    ],
    learningOutcomes: [
      "Unsupervised anomaly detection with Autoencoders",
      "Time-series preprocessing, resampling, and rolling statistical features",
      "Deploying model endpoints with FastAPI",
      "Utility industry analytics domain knowledge"
    ],
    resumeValue: "High",
    popularity: 88,
    prerequisites: ["Python", "Basic neural networks", "Pandas"]
  },
  {
    title: "Automated Multi-Cloud Resource Cost Optimizer",
    description: "Connects to AWS/GCP accounts to identify orphaned storage volumes, idle compute instances, and unattached IP addresses to reduce cloud spending by up to 30%.",
    domain: "Cloud Computing",
    difficulty: "Medium",
    technologies: ["Python", "AWS SDK (Boto3)", "React", "Node.js", "Tailwind CSS"],
    requiredSkills: ["Cloud", "Python", "React", "Software Development"],
    optionalSkills: ["Boto3", "AWS", "Node.js"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Cloud Engineer", "Software Developer"],
    features: [
      "AWS CloudWatch metric analysis to spot instances with <5% average CPU",
      "Unused EBS volume and old snapshot identifier",
      "Estimated monthly dollar savings calculator with ROI chart",
      "One-click resource stop or terminate action via secure IAM role",
      "Automated weekly cost anomaly PDF report emailed to team"
    ],
    learningOutcomes: [
      "AWS cloud architecture and IAM cross-account authentication",
      "Cloud FinOps principles and infrastructure cost metrics",
      "Automating infrastructure operations via Boto3 SDK",
      "Building dashboard interfaces for cloud telemetry"
    ],
    resumeValue: "High",
    popularity: 93,
    prerequisites: ["Python", "Basic AWS / Cloud knowledge"]
  },
  {
    title: "Personalized AI Music Generation & Mood Playlist Creator",
    description: "Generates custom ambient instrumental tracks or curates personalized Spotify playlists based on user facial expressions or stated emotional states.",
    domain: "AI/ML",
    difficulty: "Medium",
    technologies: ["Python", "React", "Spotify Web API", "Web Audio API", "Tailwind CSS"],
    requiredSkills: ["React", "Python", "JavaScript", "AI/ML"],
    optionalSkills: ["Spotify Web API", "Web Audio API", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "College Mini Project",
    careerGoals: ["AI/ML Engineer", "Full Stack Developer", "Software Developer"],
    features: [
      "Webcam emotion recognition (happy, stressed, focused, sleepy)",
      "Spotify Web API OAuth integration and custom playlist generator",
      "Procedural background ambient synthesizer using Web Audio API",
      "BPM and tempo slider affecting synthesizer frequency in real-time",
      "Shareable mood playlist link generator"
    ],
    learningOutcomes: [
      "Web Audio API oscillator nodes and audio synthesis",
      "OAuth 2.0 PKCE authentication flow with Spotify",
      "Facial sentiment classification integration",
      "Interactive audio visualization with HTML5 canvas"
    ],
    resumeValue: "Medium",
    popularity: 91,
    prerequisites: ["JavaScript", "React basics"]
  },
  {
    title: "Autonomous Drone Flight Simulator & Path Planner",
    description: "A 3D browser flight simulator for quadcopter drones featuring A* and RRT (Rapidly-exploring Random Tree) obstacle avoidance algorithms.",
    domain: "Software Development",
    difficulty: "Hard",
    technologies: ["JavaScript", "Three.js", "React", "Canvas 3D", "Tailwind CSS"],
    requiredSkills: ["JavaScript", "Software Development", "React"],
    optionalSkills: ["Three.js", "Robotics", "3D Math"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Software Developer", "Researcher", "AI/ML Engineer"],
    features: [
      "3D physics simulator for quadcopter thrust, drag, and gravity",
      "Pathfinding visualization comparing A* and RRT algorithms through obstacle fields",
      "First-person drone camera view and third-person spectator view",
      "Custom 3D obstacle editor with draggable buildings and trees",
      "Waypoint navigation mission upload and replay telemetry"
    ],
    learningOutcomes: [
      "Robotics pathfinding algorithms (A*, Dijkstra, RRT)",
      "3D physics integration and rigid body dynamics",
      "Three.js camera matrices, lighting, and rendering loop",
      "Mathematical modeling of flight dynamics"
    ],
    resumeValue: "High",
    popularity: 90,
    prerequisites: ["Data structures and algorithms", "JavaScript", "Trigonometry"]
  },
  {
    title: "AI Nutritionist & Meal Planner with Calorie Photo Scanner",
    description: "Analyzes photos of meals to estimate portion sizes, calorie counts, and macro distributions, tailoring balanced diet plans based on fitness goals.",
    domain: "Computer Vision",
    difficulty: "Medium",
    technologies: ["React", "FastAPI", "Python", "Gemini API", "Tailwind CSS"],
    requiredSkills: ["React", "Python", "Computer Vision", "AI/ML"],
    optionalSkills: ["FastAPI", "Gemini API", "Tailwind CSS"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: ["Full Stack Developer", "AI/ML Engineer"],
    features: [
      "Camera photo upload with food dish recognition and ingredients listing",
      "Automated macro calculation (Proteins, Carbs, Fats, Dietary Fiber)",
      "Daily caloric target tracker with progress rings",
      "Weekly grocery shopping list generator based on chosen meal plans",
      "Dietary restriction filters (Vegan, Keto, Gluten-free, Halal)"
    ],
    learningOutcomes: [
      "Multi-modal AI vision prompts for dietary item recognition",
      "Mobile-optimized camera upload and preview workflows",
      "Full-stack state management for longitudinal health tracking",
      "Interactive nutrition data visualizations"
    ],
    resumeValue: "High",
    popularity: 94,
    prerequisites: ["React", "Python"]
  },
  {
    title: "Crowdsourced Public Transit Bus Tracker with Live ETA",
    description: "Calculates accurate real-time bus arrivals using passenger smartphone GPS locations, eliminating ghost buses and static timetable inaccuracies.",
    domain: "Mobile Development",
    difficulty: "Medium",
    technologies: ["React", "Node.js", "Leaflet", "Socket.io", "MongoDB"],
    requiredSkills: ["React", "Node.js", "Mobile Development", "JavaScript"],
    optionalSkills: ["Socket.io", "Leaflet", "MongoDB"],
    estimatedTime: "1 month",
    projectType: "Major Project",
    careerGoals: ["Full Stack Developer", "Mobile Developer", "Software Developer"],
    features: [
      "Passenger onboard GPS broadcasting mode updating bus route coordinates",
      "Kalman filter smoothing to clean noisy GPS coordinates",
      "Real-time route map with animated bus icons moving along corridors",
      "Arrival countdown timer for all upcoming bus stops",
      "Crowdedness indicator reported by traveling commuters"
    ],
    learningOutcomes: [
      "High-frequency geolocation tracking in mobile browsers",
      "Smoothing algorithms (Kalman filtering / Moving Average) on GPS data",
      "WebSocket real-time broadcast rooms segmented by transit routes",
      "Interactive map rendering with Leaflet"
    ],
    resumeValue: "High",
    popularity: 92,
    prerequisites: ["JavaScript", "React", "Node.js"]
  },
  {
    title: "Zero-Knowledge Password Manager & Breach Scanner",
    description: "A secure web vault for credentials featuring client-side PBKDF2 + AES-256-GCM encryption, master password verification, and HaveIBeenPwned breach checks.",
    domain: "Cybersecurity",
    difficulty: "Hard",
    technologies: ["React", "Web Crypto API", "Node.js", "MongoDB", "Tailwind CSS"],
    requiredSkills: ["Cybersecurity", "React", "JavaScript", "Software Development"],
    optionalSkills: ["Web Crypto API", "Node.js", "MongoDB"],
    estimatedTime: "2 months",
    projectType: "Major Project",
    careerGoals: ["Cybersecurity Engineer", "Full Stack Developer", "Software Developer"],
    features: [
      "Zero-knowledge architecture: Master password never leaves the client browser",
      "Client-side AES-256-GCM encryption with randomized initialization vectors",
      "Integration with HaveIBeenPwned k-Anonymity API to scan for compromised passwords",
      "Cryptographically secure password generator with customizable symbol sets",
      "Secure encrypted vault export and import (JSON backup)"
    ],
    learningOutcomes: [
      "Modern cryptography principles (PBKDF2 key derivation, AES-GCM, IVs)",
      "Zero-knowledge security proof models",
      "k-Anonymity API integration for privacy-safe password hashing",
      "Strict browser security headers and memory clearing"
    ],
    resumeValue: "High",
    popularity: 95,
    prerequisites: ["JavaScript ES6+", "Basic cryptography concepts"]
  },
  {
    title: "AI-Assisted 2D Platformer Game with Dynamic Level Generator",
    description: "A web browser retro platformer game created with Phaser.js featuring procedural level generation, responsive jump physics, and AI enemy patrol behaviors.",
    domain: "Game Development",
    difficulty: "Medium",
    technologies: ["JavaScript", "Phaser.js", "HTML5 Canvas", "React", "Tailwind CSS"],
    requiredSkills: ["JavaScript", "Game Development", "Software Development"],
    optionalSkills: ["Phaser.js", "HTML5 Canvas", "React"],
    estimatedTime: "1 month",
    projectType: "College Mini Project",
    careerGoals: ["Software Developer", "Full Stack Developer"],
    features: [
      "Procedural dungeon and platform level generation using Perlin noise",
      "Tile-based physics engine with gravity, momentum, and collision detection",
      "Finite State Machine (FSM) AI enemies (Patrol, Chase, Attack states)",
      "Scoreboard with local and global high scores",
      "Mobile touch virtual joystick controls alongside keyboard support"
    ],
    learningOutcomes: [
      "Game development loop (Init, Preload, Create, Update)",
      "Procedural content generation algorithms",
      "Finite State Machines for enemy artificial intelligence",
      "Sprite sheet animation and audio sound effect triggers"
    ],
    resumeValue: "Medium",
    popularity: 88,
    prerequisites: ["JavaScript", "Object-Oriented Programming"]
  },
  {
    title: "Federated Learning Privacy-Preserving Health Predictor",
    description: "Simulates distributed machine learning training where patient records stay on client nodes, only encrypted model weight gradients are shared with the master server.",
    domain: "Data Science",
    difficulty: "Advanced",
    technologies: ["Python", "PyTorch", "Flask", "React", "Socket.io"],
    requiredSkills: ["Python", "Machine Learning", "Cybersecurity", "Data Science"],
    optionalSkills: ["PyTorch", "Flask", "Socket.io"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Researcher", "Data Scientist", "AI/ML Engineer"],
    features: [
      "Federated Averaging (FedAvg) algorithm aggregating weights from 5+ client nodes",
      "Differential privacy noise injection using Laplacian mechanisms",
      "Visual dashboard demonstrating global model accuracy improving without seeing raw patient data",
      "Simulated non-IID (non-independent and identically distributed) client data partitions",
      "Tamper detection for malicious client weight poisoning"
    ],
    learningOutcomes: [
      "Federated learning architecture and distributed gradient aggregation",
      "Differential privacy mathematical guarantees and epsilon budgets",
      "Advanced PyTorch model serialization and weight manipulation",
      "Research paper implementation methodology"
    ],
    resumeValue: "High",
    popularity: 92,
    prerequisites: ["Deep learning with PyTorch", "Linear algebra", "Python"]
  },
  {
    title: "AI Video Dubbing & Lip Sync Translator",
    description: "Translates speech in short video clips to another language, generates cloned voice audio, and adjusts mouth movements for seamless natural lip synchronization.",
    domain: "Computer Vision",
    difficulty: "Advanced",
    technologies: ["Python", "PyTorch", "Wav2Lip", "Whisper", "FastAPI", "React"],
    requiredSkills: ["Python", "Computer Vision", "Deep Learning", "NLP"],
    optionalSkills: ["PyTorch", "Wav2Lip", "FastAPI"],
    estimatedTime: "3+ months",
    projectType: "Major Project",
    careerGoals: ["AI/ML Engineer", "Researcher"],
    features: [
      "Speech recognition using Whisper followed by translation API",
      "Neural voice synthesis matching the original speaker's pitch and timbre",
      "Wav2Lip GAN model synthesizing realistic mouth movements matching new audio",
      "Video rendering pipeline outputting synchronized MP4 video",
      "Side-by-side original vs dubbed video comparison player"
    ],
    learningOutcomes: [
      "Generative Adversarial Networks (GANs) for video facial synthesis",
      "Multi-modal audio-visual synchronization pipelines",
      "GPU-accelerated video rendering pipelines with Torch and FFmpeg",
      "Advanced multi-step AI orchestration"
    ],
    resumeValue: "High",
    popularity: 97,
    prerequisites: ["PyTorch", "Computer Vision", "Python"]
  },
  {
    title: "Serverless E-Commerce Microservices with Event-Driven Architecture",
    description: "An event-driven online store with independent microservices for Catalog, Cart, Payment, and Shipping communicating via Kafka/RabbitMQ events.",
    domain: "Cloud Computing",
    difficulty: "Hard",
    technologies: ["Node.js", "Express", "RabbitMQ / Kafka", "MongoDB", "React", "Docker"],
    requiredSkills: ["Node.js", "Cloud", "MongoDB", "Software Development"],
    optionalSkills: ["RabbitMQ", "Docker", "React"],
    estimatedTime: "2-3 months",
    projectType: "Major Project",
    careerGoals: ["Cloud Engineer", "Software Developer", "Full Stack Developer"],
    features: [
      "Decoupled microservice containers communicating via asynchronous message queues",
      "Saga pattern implementation to handle distributed transactions and rollbacks",
      "Stripe payment integration with webhook confirmation events",
      "Centralized logging and distributed tracing via OpenTelemetry",
      "Full modern React customer storefront with instant cart updates"
    ],
    learningOutcomes: [
      "Event-driven architecture and message broker queuing patterns",
      "Saga pattern for eventual consistency in distributed systems",
      "Docker Compose orchestration for multi-container development",
      "Idempotent API endpoint design"
    ],
    resumeValue: "High",
    popularity: 94,
    prerequisites: ["Node.js", "REST APIs", "Docker"]
  },
  {
    title: "AI-Powered Smart Code Snippet & Bookmark Manager",
    description: "Organizes developer code snippets with automatic programming language detection, AI documentation generator, syntax highlighting, and tags.",
    domain: "Software Development",
    difficulty: "Easy",
    technologies: ["React", "Node.js", "MongoDB", "Monaco Editor", "Tailwind CSS"],
    requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
    optionalSkills: ["Node.js", "MongoDB", "Monaco Editor"],
    estimatedTime: "2 weeks",
    projectType: "College Mini Project",
    careerGoals: ["Full Stack Developer", "Software Developer"],
    features: [
      "Auto-detect language from pasted code (JS, Python, Go, C++, Rust, SQL)",
      "AI explanation button generating clean inline comments and docstrings",
      "Instant fuzzy search across code titles, tags, and code contents",
      "One-click copy to clipboard with formatting preserved",
      "Public and private snippet sharing with secret URLs"
    ],
    learningOutcomes: [
      "Integration with Monaco Editor in React",
      "Fuzzy search algorithms and indexing",
      "Clipboard API interactions and toast feedback",
      "Full-stack CRUD patterns with MERN"
    ],
    resumeValue: "Medium",
    popularity: 88,
    prerequisites: ["React basics", "JavaScript"]
  }
];

module.exports = seedProjects;
