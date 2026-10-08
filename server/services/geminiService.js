const { GoogleGenerativeAI } = require('@google/generative-ai');
const { z } = require('zod');

// Initialize Gemini SDK if API key exists
const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
let model = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    genAI = new GoogleGenerativeAI(apiKey.trim());
    // Using gemini-1.5-flash or gemini-2.5-flash for speed and structured output
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('[Gemini AI] Initialized with Google Generative AI API');
  } catch (err) {
    console.warn('[Gemini AI] Initialization warning:', err.message);
  }
} else {
  console.info('[Gemini AI] GEMINI_API_KEY is not set or empty. Running in Demo / Fallback mode with smart deterministic matching algorithms.');
}

/**
 * Clean and parse JSON from Gemini's response text (handles code blocks like ```json ... ```)
 */
function cleanAndParseJSON(text) {
  if (!text) throw new Error('Empty response from AI');
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

// ==========================================
// DETERMINISTIC FALLBACK ALGORITHMS (Section 41)
// ==========================================
/**
 * Deterministic scoring formula:
 * Match Score = 40% Skill Match + 20% Interest Match + 20% Career Match + 10% Difficulty Match + 10% Time Match
 */
function calculateDeterministicMatch(userProfile, project) {
  const userSkillNames = (userProfile.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
  const projectReq = (project.requiredSkills || []).map(s => s.toLowerCase());
  const projectTech = (project.technologies || []).map(t => t.toLowerCase());

  // 1. Skill Match (40%)
  let matchedSkillsCount = 0;
  for (const req of projectReq) {
    if (userSkillNames.some(us => us.includes(req) || req.includes(us))) {
      matchedSkillsCount++;
    }
  }
  const skillMatchRatio = projectReq.length > 0 ? (matchedSkillsCount / projectReq.length) : 0.8;
  const skillMatch = Math.min(100, Math.round(skillMatchRatio * 100));

  // 2. Interest Match (20%)
  const userInterests = (userProfile.interests || []).map(i => i.toLowerCase());
  const projectDomain = (project.domain || '').toLowerCase();
  let interestMatchRatio = 0.5;
  if (userInterests.some(ui => projectDomain.includes(ui) || ui.includes(projectDomain))) {
    interestMatchRatio = 1.0;
  } else if (userInterests.some(ui => projectTech.some(t => t.includes(ui)))) {
    interestMatchRatio = 0.8;
  }
  const interestMatch = Math.min(100, Math.round(interestMatchRatio * 100));

  // 3. Career Match (20%)
  const targetCareer = (userProfile.careerGoal || '').toLowerCase();
  const projectCareers = (project.careerGoals || []).map(c => c.toLowerCase());
  let careerMatchRatio = 0.6;
  if (projectCareers.some(c => c.includes(targetCareer) || targetCareer.includes(c))) {
    careerMatchRatio = 0.95;
  }
  const careerMatch = Math.min(100, Math.round(careerMatchRatio * 100));

  // 4. Difficulty Match (10%)
  const userDiff = (userProfile.difficultyPreference || 'Medium').toLowerCase();
  const projDiff = (project.difficulty || 'Medium').toLowerCase();
  let diffScore = 80;
  if (userDiff === projDiff) {
    diffScore = 100;
  } else if (
    (userDiff === 'medium' && (projDiff === 'easy' || projDiff === 'hard')) ||
    (userDiff === 'hard' && projDiff === 'advanced')
  ) {
    diffScore = 75;
  } else {
    diffScore = 60;
  }
  const difficultyMatch = diffScore;

  // 5. Time Match (10%)
  const userTime = (userProfile.availableTime || '1 month').toLowerCase();
  const projTime = (project.estimatedTime || '1 month').toLowerCase();
  let timeScore = 85;
  if (userTime === projTime) timeScore = 100;
  else if (userTime.includes('month') && projTime.includes('month')) timeScore = 90;
  const timeMatch = timeScore;

  // Weighted Total (0 - 100)
  const matchScore = Math.round(
    (skillMatch * 0.40) +
    (interestMatch * 0.20) +
    (careerMatch * 0.20) +
    (difficultyMatch * 0.10) +
    (timeMatch * 0.10)
  );

  let reason = `Aligned with your ${project.domain} interest and ${userProfile.careerGoal || 'engineering'} goals. `;
  if (skillMatch >= 75) {
    reason += `You already have ${matchedSkillsCount}/${projectReq.length} core required skills.`;
  } else {
    reason += `Great stepping stone to bridge modern ${project.technologies.slice(0, 2).join(' & ')} proficiency.`;
  }

  return {
    projectId: project._id || project.id,
    matchScore: Math.min(99, Math.max(55, matchScore)),
    reason,
    skillMatch,
    careerMatch,
    difficultyMatch,
    timeMatch,
    interestMatch,
  };
}

// ==========================================
// GEMINI SERVICE FUNCTIONS
// ==========================================

const recommendationSchema = z.object({
  recommendations: z.array(z.object({
    projectId: z.string(),
    matchScore: z.number().min(0).max(100),
    reason: z.string(),
    skillMatch: z.number().min(0).max(100),
    careerMatch: z.number().min(0).max(100),
    difficultyMatch: z.number().min(0).max(100),
    timeMatch: z.number().min(0).max(100),
    interestMatch: z.number().min(0).max(100).optional().default(85),
  }))
});

/**
 * 1. AI Recommendation Engine
 */
async function generateRecommendations(userProfile, candidateProjects) {
  // If model is active, attempt structured call to Gemini
  if (model) {
    try {
      const simplifiedCandidates = candidateProjects.map(p => ({
        id: String(p._id || p.id),
        title: p.title,
        domain: p.domain,
        difficulty: p.difficulty,
        technologies: p.technologies,
        requiredSkills: p.requiredSkills,
        estimatedTime: p.estimatedTime,
        careerGoals: p.careerGoals,
        resumeValue: p.resumeValue
      }));

      const prompt = `You are the core AI matching engine for ProjectMatch AI.
Analyze this student's profile and evaluate their fit against candidate engineering projects.

STUDENT PROFILE:
- Skills: ${JSON.stringify(userProfile.skills || [])}
- Interests: ${JSON.stringify(userProfile.interests || [])}
- Target Career Goal: "${userProfile.careerGoal || 'Software Developer'}"
- Preferred Difficulty: "${userProfile.difficultyPreference || 'Medium'}"
- Available Time: "${userProfile.availableTime || '1 month'}"
- Project Purpose: "${userProfile.projectPurpose || 'Resume'}"

CANDIDATE PROJECTS:
${JSON.stringify(simplifiedCandidates.slice(0, 25))}

CRITICAL RULES:
1. Do not invent information about the user's skills. Only evaluate what is supplied.
2. Calculate realistic scores (0-100).
3. Select the TOP 8 best matching projects.
4. Return ONLY valid JSON adhering strictly to this schema:
{
  "recommendations": [
    {
      "projectId": "id_here",
      "matchScore": 94,
      "reason": "Detailed professional rationale why this project fits their profile",
      "skillMatch": 92,
      "careerMatch": 95,
      "difficultyMatch": 90,
      "timeMatch": 90,
      "interestMatch": 96
    }
  ]
}`;

      const result = await model.generateContent(prompt);
      const parsed = cleanAndParseJSON(result.response.text());
      const validated = recommendationSchema.parse(parsed);
      return validated.recommendations;
    } catch (err) {
      console.warn('[Gemini AI] Recommendation error, switching to deterministic fallback:', err.message);
    }
  }

  // Fallback: Compute deterministic scores for all projects and return sorted top 10
  const scores = candidateProjects.map(p => calculateDeterministicMatch(userProfile, p));
  scores.sort((a, b) => b.matchScore - a.matchScore);
  return scores.slice(0, 10);
}

/**
 * 2. Generate Project Blueprint (Section 17)
 */
async function generateProjectBlueprint(project, userProfile = {}) {
  if (model) {
    try {
      const prompt = `You are a Principal Software Architect.
Generate an exhaustive, production-grade technical project blueprint for the following project:

PROJECT DETAILS:
Title: ${project.title}
Domain: ${project.domain}
Difficulty: ${project.difficulty}
Technologies: ${project.technologies.join(', ')}
Required Skills: ${project.requiredSkills.join(', ')}
Features: ${project.features.join('; ')}

STUDENT CONTEXT:
Career Goal: ${userProfile.careerGoal || 'Software Engineer'}
Current Skills: ${JSON.stringify((userProfile.skills || []).map(s => typeof s === 'string' ? s : s.name))}

Return ONLY a valid JSON object with the following structure:
{
  "projectOverview": "Comprehensive executive summary",
  "problemStatement": "Clear problem this project solves",
  "proposedSolution": "Architectural solution overview",
  "objectives": ["Bullet 1", "Bullet 2", "Bullet 3"],
  "technologies": {
    "frontend": ["React", "..."],
    "backend": ["Node.js", "..."],
    "database": ["MongoDB", "..."],
    "ai_ml": ["Gemini API", "..."],
    "devops": ["Docker", "..."]
  },
  "functionalRequirements": ["User can...", "System shall..."],
  "nonFunctionalRequirements": ["Performance: <200ms latency", "Security...", "Scalability..."],
  "mainModules": [
    { "name": "Module Name", "description": "Module responsibility and components" }
  ],
  "databaseDesign": {
    "entities": [
      { "name": "User", "attributes": ["id", "email", "passwordHash"] }
    ],
    "relationships": ["User 1-to-many Projects"]
  },
  "apiDesign": [
    { "method": "POST", "endpoint": "/api/...", "description": "Purpose of route" }
  ],
  "frontendStructure": ["src/components", "src/pages", "src/hooks"],
  "backendStructure": ["controllers", "routes", "models", "services"],
  "aiComponents": ["NLP pipeline", "Prompt design constraints"],
  "securityRequirements": ["JWT auth", "Rate limiting", "Input sanitization"],
  "testingPlan": ["Unit tests with Jest", "Integration tests", "E2E tests"],
  "deploymentPlan": ["Containerize with Docker", "Deploy client to Vercel", "Deploy server to Render"],
  "futureEnhancements": ["Phase 2 feature 1", "Phase 2 feature 2"]
}`;

      const result = await model.generateContent(prompt);
      const parsed = cleanAndParseJSON(result.response.text());
      return parsed;
    } catch (err) {
      console.warn('[Gemini AI] Blueprint error, falling back to blueprint generator:', err.message);
    }
  }

  // Fallback high-quality blueprint
  return {
    projectOverview: `${project.title} is an engineering project in the ${project.domain} domain engineered with ${project.technologies.join(', ')}. It bridges modern architecture with measurable problem solving.`,
    problemStatement: `Modern applications struggle with fragmented systems and lack of intelligent automation. ${project.title} targets this bottleneck through modern software architecture.`,
    proposedSolution: `A scalable, decoupled client-server architecture integrating ${project.technologies.slice(0, 3).join(', ')} with automated processing pipelines.`,
    objectives: [
      `Implement modular, decoupled frontend and backend services`,
      `Deliver reliable data processing using ${project.technologies[0] || 'modern tech'}`,
      `Design intuitive student-friendly user interfaces with sub-second feedback`,
      `Establish automated validation and testing standards`
    ],
    technologies: {
      frontend: project.technologies.filter(t => ['React', 'Vue', 'HTML', 'CSS', 'Tailwind CSS'].includes(t)) || ['React', 'Tailwind CSS'],
      backend: project.technologies.filter(t => ['Node.js', 'Python', 'FastAPI', 'Flask', 'Express'].includes(t)) || ['Node.js', 'Express'],
      database: ['MongoDB / PostgreSQL', 'Redis'],
      ai_ml: project.technologies.filter(t => ['Gemini API', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'OpenCV'].includes(t)) || ['Gemini API'],
      devops: ['Docker', 'GitHub Actions']
    },
    functionalRequirements: (project.features || []).map(f => `System must support: ${f}`),
    nonFunctionalRequirements: [
      "Response Time: API response under 250ms for 95% of queries",
      "Scalability: Stateless backend instances ready for horizontal auto-scaling",
      "Security: OWASP Top-10 compliance with input sanitization and secure token handling",
      "Reliability: Graceful degradation with fallback systems for third-party APIs"
    ],
    mainModules: [
      { name: "Authentication & Authorization", description: "Secure user sessions with JWT tokens and role access control." },
      { name: "Core Processing Engine", description: `Executes the primary business logic for ${project.title}.` },
      { name: "Analytics & Telemetry Module", description: "Tracks performance metrics, user engagement, and system health." },
      { name: "Client Presentation Layer", description: "Responsive user experience with optimistic updates and error boundaries." }
    ],
    databaseDesign: {
      entities: [
        { name: "User", attributes: ["_id", "email", "passwordHash", "profile", "createdAt"] },
        { name: "ProjectSession", attributes: ["_id", "userId", "stateData", "status", "updatedAt"] },
        { name: "AuditLog", attributes: ["_id", "action", "timestamp", "metadata"] }
      ],
      relationships: ["User has many ProjectSessions", "ProjectSession generates AuditLogs"]
    },
    apiDesign: [
      { method: "POST", endpoint: "/api/auth/login", description: "Authenticate user and issue JWT" },
      { method: "GET", endpoint: "/api/data/records", description: "Fetch paginated data records" },
      { method: "POST", endpoint: "/api/process/run", description: "Trigger asynchronous execution pipeline" }
    ],
    frontendStructure: [
      "src/components/ (Atomic UI components)",
      "src/pages/ (Routed dashboard & feature views)",
      "src/context/ (Global application state)",
      "src/services/ (Axios HTTP client wrappers)"
    ],
    backendStructure: [
      "controllers/ (Request handlers & business dispatchers)",
      "services/ (External integrations & algorithm processing)",
      "models/ (Mongoose schemas and validation)",
      "middleware/ (JWT guards, rate limiting, error catching)"
    ],
    aiComponents: [
      "Prompt engineering with structured JSON schema constraints",
      "In-memory caching of recurring AI analysis queries",
      "Heuristic fallback mechanism ensuring 100% uptime"
    ],
    securityRequirements: [
      "Bcrypt password hashing with work factor 10+",
      "HTTP-only secure cookies or Authorization Bearer header",
      "CORS restriction to verified client origins",
      "Strict parameter whitelisting preventing injection attacks"
    ],
    testingPlan: [
      "Unit testing: Component render tests and controller method validation",
      "Integration testing: End-to-end API route responses with mock databases",
      "Manual QA: Cross-browser responsive audit (mobile, tablet, desktop)"
    ],
    deploymentPlan: [
      "Frontend hosted on Vercel or Netlify with edge caching",
      "Backend containerized using Docker on Render / AWS ECS",
      "Database hosted on MongoDB Atlas with automatic daily backups"
    ],
    futureEnhancements: [
      "Real-time multi-user collaboration via WebSockets",
      "Native mobile companion app using React Native",
      "Exportable analytics reports in PDF and Excel formats"
    ]
  };
}

/**
 * 3. Generate Development Roadmap (Section 18)
 */
async function generateRoadmap(project, userProfile = {}) {
  if (model) {
    try {
      const prompt = `You are a Senior Technical Project Manager.
Create a structured 4-week development roadmap for the engineering project: "${project.title}".
Technologies: ${project.technologies.join(', ')}

Return ONLY a valid JSON object matching:
{
  "estimatedWeeks": 4,
  "tasks": [
    {
      "id": "task_1",
      "week": 1,
      "day": "Day 1-2",
      "title": "Short Task Title",
      "description": "Clear actionable instructions of what to build and configure",
      "estimatedHours": 4,
      "dependencies": [],
      "status": "Not Started"
    }
  ]
}
Provide exactly 10 to 14 sequential tasks spanning Week 1 to Week 4.`;

      const result = await model.generateContent(prompt);
      const parsed = cleanAndParseJSON(result.response.text());
      return parsed;
    } catch (err) {
      console.warn('[Gemini AI] Roadmap generation error, using fallback roadmap:', err.message);
    }
  }

  // Fallback structured roadmap
  return {
    estimatedWeeks: 4,
    tasks: [
      {
        id: "task_1",
        week: 1,
        day: "Day 1",
        title: "Environment Setup & Architecture Design",
        description: `Initialize Git repository, configure ${project.technologies.slice(0, 2).join(' & ')} scaffolding, and define data models.`,
        estimatedHours: 4,
        dependencies: [],
        status: "Not Started"
      },
      {
        id: "task_2",
        week: 1,
        day: "Day 2-3",
        title: "Database Schema & Backend Scaffolding",
        description: "Set up MongoDB/SQL schemas, environment configurations, and core API server structure.",
        estimatedHours: 5,
        dependencies: ["task_1"],
        status: "Not Started"
      },
      {
        id: "task_3",
        week: 1,
        day: "Day 4-5",
        title: "Authentication & User Management API",
        description: "Implement JWT authentication, password hashing with bcrypt, and profile endpoints.",
        estimatedHours: 6,
        dependencies: ["task_2"],
        status: "Not Started"
      },
      {
        id: "task_4",
        week: 2,
        day: "Day 6-7",
        title: "Frontend Scaffolding & Component Design System",
        description: "Configure Tailwind CSS, reusable cards, buttons, responsive navigation, and API service wrappers.",
        estimatedHours: 5,
        dependencies: ["task_1"],
        status: "Not Started"
      },
      {
        id: "task_5",
        week: 2,
        day: "Day 8-10",
        title: "Core Business Logic & Feature Pipeline",
        description: `Build primary functionality: ${project.features[0] || 'core algorithm implementation'}.`,
        estimatedHours: 8,
        dependencies: ["task_3", "task_4"],
        status: "Not Started"
      },
      {
        id: "task_6",
        week: 3,
        day: "Day 11-13",
        title: "Secondary Feature Integrations & Processing",
        description: `Implement ${project.features[1] || 'analytics and real-time data flows'} with robust error boundaries.`,
        estimatedHours: 7,
        dependencies: ["task_5"],
        status: "Not Started"
      },
      {
        id: "task_7",
        week: 3,
        day: "Day 14-15",
        title: "Interactive Dashboard & Data Visualizations",
        description: "Integrate charts, progress metrics, status badges, and responsive tables.",
        estimatedHours: 6,
        dependencies: ["task_6"],
        status: "Not Started"
      },
      {
        id: "task_8",
        week: 4,
        day: "Day 16-17",
        title: "Unit Testing & Performance Optimization",
        description: "Write unit tests for critical functions, optimize API queries, and verify mobile responsiveness.",
        estimatedHours: 6,
        dependencies: ["task_7"],
        status: "Not Started"
      },
      {
        id: "task_9",
        week: 4,
        day: "Day 18-19",
        title: "Security Hardening & Documentation",
        description: "Configure rate limiting, sanitize inputs, write comprehensive README.md, and create architectural diagrams.",
        estimatedHours: 5,
        dependencies: ["task_8"],
        status: "Not Started"
      },
      {
        id: "task_10",
        week: 4,
        day: "Day 20",
        title: "Production Deployment & Demo Walkthrough",
        description: "Deploy to cloud hosting, verify live SSL, test demo workflows, and prepare presentation slides.",
        estimatedHours: 4,
        dependencies: ["task_9"],
        status: "Not Started"
      }
    ]
  };
}

/**
 * 4. Skill Gap Analyzer (Section 21)
 */
async function analyzeSkillGap(userSkills = [], project) {
  const userSkillNames = userSkills.map(s => (typeof s === 'string' ? s : s.name));
  const userSkillsLower = userSkillNames.map(s => s.toLowerCase());

  const haveSkills = [];
  const needSkills = [];

  for (const req of project.requiredSkills) {
    if (userSkillsLower.some(us => us.includes(req.toLowerCase()) || req.toLowerCase().includes(us))) {
      haveSkills.push(req);
    } else {
      needSkills.push(req);
    }
  }

  // Optional skills
  const bonusSkills = (project.optionalSkills || []).filter(
    opt => !userSkillsLower.includes(opt.toLowerCase())
  );

  let learningOrder = [...needSkills];
  let aiInsights = `You have strong foundations in ${haveSkills.join(', ') || 'software development'}. Focus on mastering ${needSkills.slice(0, 2).join(' and ') || 'advanced project patterns'} first.`;

  if (model && needSkills.length > 0) {
    try {
      const prompt = `A student with skills [${userSkillNames.join(', ')}] wants to build "${project.title}" requiring [${project.requiredSkills.join(', ')}].
Missing skills: [${needSkills.join(', ')}].
Provide:
1. Recommended sequential learning order (which to learn first, second, third).
2. A concise 2-sentence rationale for the order.

Return JSON:
{
  "learningOrder": ["Skill A", "Skill B"],
  "insights": "2 sentence explanation"
}`;
      const result = await model.generateContent(prompt);
      const parsed = cleanAndParseJSON(result.response.text());
      if (parsed.learningOrder) learningOrder = parsed.learningOrder;
      if (parsed.insights) aiInsights = parsed.insights;
    } catch (e) {
      // Keep deterministic order
    }
  }

  return {
    haveSkills,
    needSkills,
    bonusSkills,
    skillGapCount: needSkills.length,
    learningOrder,
    insights: aiInsights,
  };
}

/**
 * 5. Project Comparison (Section 22)
 */
async function compareProjects(projectsList, userProfile = {}) {
  const matrix = projectsList.map(p => {
    const match = calculateDeterministicMatch(userProfile, p);
    const userSkillNames = (userProfile.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
    const missing = p.requiredSkills.filter(req => !userSkillNames.some(us => us.includes(req.toLowerCase())));

    return {
      id: p._id || p.id,
      title: p.title,
      domain: p.domain,
      matchScore: match.matchScore,
      difficulty: p.difficulty,
      estimatedTime: p.estimatedTime,
      technologies: p.technologies,
      careerValue: match.careerMatch >= 90 ? 'Very High' : 'High',
      resumeValue: p.resumeValue || 'High',
      skillGapCount: missing.length,
      missingSkills: missing
    };
  });

  let recommendation = `Based on your profile, "${matrix[0]?.title}" provides the highest alignment score (${matrix[0]?.matchScore}%) with your background in ${(userProfile.skills || []).map(s => typeof s === 'string' ? s : s.name).slice(0, 3).join(', ')}.`;

  if (model) {
    try {
      const prompt = `Student Profile:
Skills: ${JSON.stringify(userProfile.skills || [])}
Career Goal: ${userProfile.careerGoal || 'Software Engineer'}
Available Time: ${userProfile.availableTime || '1 month'}

Projects being compared:
${JSON.stringify(matrix)}

Which project is best for this student? Provide an insightful, encouraging 3-paragraph comparison:
1. Clear winner recommendation with justification
2. Analysis of the runner-up alternative
3. Advice on which one will impress interviewers more for their career goal.`;

      const result = await model.generateContent(prompt);
      recommendation = result.response.text();
    } catch (e) {
      console.warn('[Gemini AI] Comparison error, using template comparison:', e.message);
    }
  }

  return {
    matrix,
    recommendation,
  };
}

/**
 * 6. Resume Value & Bullet Generator (Section 20)
 */
async function generateResumeBullet(project, userProfile = {}) {
  const stack = project.technologies.slice(0, 4).join(', ');
  let resumeBullet = `Developed ${project.title}, an end-to-end ${project.domain} system using ${stack} featuring ${project.features[0] || 'modular services'} and RESTful APIs.`;
  let justification = `High resume value because the project demonstrates modern ${stack} architecture, testing, and production-grade software engineering principles.`;

  if (model) {
    try {
      const prompt = `Generate a realistic, high-impact resume bullet point for a college student who built:
Project: "${project.title}"
Domain: ${project.domain}
Technologies: ${project.technologies.join(', ')}
Key Features: ${project.features.join('; ')}

RULES:
- Do not fabricate false metrics (like 'increased revenue by 500%' or 'used by 50,000 users') since this is a student project.
- Use the industry-standard formula: Strong Action Verb + What was built + Technologies used + Key engineering capability demonstrated.
- Also provide a 1-sentence resume value justification.

Return JSON:
{
  "resumeValue": "${project.resumeValue || 'High'}",
  "justification": "Why this project stands out to recruiters",
  "bulletPoint": "Developed..."
}`;

      const result = await model.generateContent(prompt);
      const parsed = cleanAndParseJSON(result.response.text());
      if (parsed.bulletPoint) resumeBullet = parsed.bulletPoint;
      if (parsed.justification) justification = parsed.justification;
    } catch (e) {
      // Fallback is already initialized
    }
  }

  return {
    resumeValue: project.resumeValue || 'High',
    justification,
    bulletPoint: resumeBullet,
  };
}

/**
 * 7. Contextual Project Assistant (Section 25)
 */
async function projectAssistant(project, userProfile = {}, userMessage, conversationHistory = []) {
  if (model) {
    try {
      const prompt = `You are the ProjectMatch AI Technical Mentor.
You are assisting a student working specifically on THIS project:
Project Title: "${project.title}"
Domain: ${project.domain}
Difficulty: ${project.difficulty}
Tech Stack: ${project.technologies.join(', ')}
Required Skills: ${project.requiredSkills.join(', ')}
Features: ${project.features.join('; ')}

Student Profile:
Skills: ${JSON.stringify(userProfile.skills || [])}
Career Goal: ${userProfile.careerGoal || 'Software Engineer'}

IMPORTANT RULES:
1. Stay strictly on the topic of THIS project. Do not act as a generic open-ended assistant.
2. Provide concrete, technical, and student-friendly guidance.
3. Keep code examples concise and modern.

Student Question: "${userMessage}"`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      console.warn('[Gemini AI] Project assistant error, using fallback response:', e.message);
    }
  }

  // Fallback intelligent answers for typical prompts
  const q = (userMessage || '').toLowerCase();
  if (q.includes('learn first') || q.includes('start')) {
    return `For **${project.title}**, start by setting up your local repository and mastering **${project.requiredSkills[0] || project.technologies[0]}**. Once you have basic routes and data models tested, move to **${project.technologies[1] || 'the frontend'}** before integrating advanced AI or background workers.`;
  }
  if (q.includes('database') || q.includes('schema')) {
    return `For **${project.title}**, a document-oriented database like MongoDB or relational SQL works well. Create separate collections/tables for:
1. **Users** (credentials, roles, profile)
2. **${project.title.split(' ')[0]}Entities** (primary records, metadata)
3. **Logs/Activity** (audit trails, timestamps)`;
  }
  if (q.includes('test') || q.includes('testing')) {
    return `Key testing strategies for **${project.title}**:
- **Unit Testing**: Test data transformations and validation logic with Jest or PyTest.
- **API Testing**: Verify HTTP status codes (200, 400, 401, 500) using Postman or Supertest.
- **Edge Cases**: Test empty inputs, malformed files, and network disconnect states.`;
  }
  return `Regarding **${project.title}**: To implement this feature effectively using **${project.technologies.slice(0, 3).join(', ')}**, make sure to keep your services decoupled, validate all incoming payload data, and maintain clear Git commit logs as you make progress.`;
}

/**
 * 8. AI Project Builder (Section 19)
 */
async function generateCustomProject(userIdeaPrompt, userProfile = {}) {
  if (model) {
    try {
      const prompt = `You are the AI Project Builder for ProjectMatch AI.
A student wants to generate a custom software project based on this idea:
"${userIdeaPrompt}"

Student Context:
Target Career: ${userProfile.careerGoal || 'Software Developer'}
Current Skills: ${JSON.stringify(userProfile.skills || [])}

Generate a comprehensive project specification.
Return ONLY valid JSON matching:
{
  "title": "Inspiring & descriptive title",
  "description": "Engaging 2-sentence summary",
  "domain": "Web Development / AI/ML / Cloud Computing / Cybersecurity / etc",
  "difficulty": "Easy / Medium / Hard / Advanced",
  "technologies": ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
  "requiredSkills": ["Skill 1", "Skill 2"],
  "optionalSkills": ["Skill 3"],
  "estimatedTime": "1 month",
  "projectType": "Major Project",
  "careerGoals": ["Software Developer", "Full Stack Developer"],
  "features": [
    "Feature 1 with clear scope",
    "Feature 2 with clear scope",
    "Feature 3 with clear scope",
    "Feature 4 with clear scope"
  ],
  "learningOutcomes": [
    "Outcome 1",
    "Outcome 2",
    "Outcome 3"
  ],
  "resumeValue": "High",
  "popularity": 92,
  "prerequisites": ["Prerequisite 1", "Prerequisite 2"]
}`;

      const result = await model.generateContent(prompt);
      const parsed = cleanAndParseJSON(result.response.text());
      return parsed;
    } catch (e) {
      console.warn('[Gemini AI] Custom project builder error, generating synthesized fallback:', e.message);
    }
  }

  // Fallback custom project generator
  const cleanIdea = (userIdeaPrompt || 'Modern Full Stack Application').trim();
  return {
    title: `AI-Powered ${cleanIdea.charAt(0).toUpperCase() + cleanIdea.slice(1).replace(/[^a-zA-Z0-9 ]/g, '')}`,
    description: `A modern engineering solution custom-tailored for "${cleanIdea}", integrating full-stack architecture with intelligent automation.`,
    domain: cleanIdea.toLowerCase().includes('ai') || cleanIdea.toLowerCase().includes('ml') ? 'AI/ML' : 'Web Development',
    difficulty: "Medium",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    requiredSkills: ["React", "Node.js", "JavaScript"],
    optionalSkills: ["Tailwind CSS", "MongoDB"],
    estimatedTime: "1 month",
    projectType: "Resume",
    careerGoals: [userProfile.careerGoal || "Full Stack Developer", "Software Developer"],
    features: [
      "User authentication and profile management",
      "Dynamic dashboard with real-time state updates",
      "Automated data analysis and reporting",
      "Responsive design with dark and light themes"
    ],
    learningOutcomes: [
      "Full-stack MERN engineering design patterns",
      "RESTful API design and database query optimization",
      "Interactive component engineering with Tailwind CSS"
    ],
    resumeValue: "High",
    popularity: 90,
    prerequisites: ["JavaScript fundamentals", "Basic web concepts"]
  };
}

module.exports = {
  generateRecommendations,
  generateProjectBlueprint,
  generateRoadmap,
  analyzeSkillGap,
  compareProjects,
  generateResumeBullet,
  projectAssistant,
  generateCustomProject,
  calculateDeterministicMatch
};
