# ProjectMatch AI 🚀
### AI-Powered Engineering & Software Project Discovery Engine

**ProjectMatch AI** is a production-quality SaaS web platform engineered to help college, BTech, BCA, MCA, and engineering students discover, architect, and execute the ideal software projects tailored specifically to their skills, career goals, difficulty preferences, and development timelines.

Unlike generic conversational chatbots, ProjectMatch AI follows a dedicated engineering pipeline:
```
Student Profile → Skill Analysis → Project Matching → Personalized Recommendations → Technical Blueprint → Development Roadmap → Sprint Tracking
```

---

## 🌟 Key Features

1. **AI Project Matching Engine**:
   - Multi-factor compatibility calculation: Skill compatibility (40%), Interest alignment (20%), Career relevance (20%), Difficulty suitability (10%), and Time feasibility (10%).
   - Generates actionable match percentages with clear breakdown gauges and recruiter insights.
   - Built with Google Gemini API and a reliable deterministic fallback matching algorithm for 100% continuous uptime.

2. **Skill Gap Analyzer**:
   - Compares student skill profiles against project prerequisites.
   - Displays skills you have (✓) vs. skills you need (⚠) with exact gap counts.
   - Prescribes an optimal step-by-step learning sequence before you write your first line of code.

3. **Technical Project Blueprint Generator**:
   - Generates an exhaustive 16-module architectural blueprint including:
     - Executive Overview & Problem Statement
     - Functional & Non-Functional Requirements (SLAs, latency limits)
     - Core Modules & Architecture
     - Database Schemas (Entities, Attributes, Relationships)
     - REST API Specifications (HTTP methods, endpoints, payloads)
     - Security, Testing Strategies, and Cloud Deployment topology.
   - One-click export to Markdown or JSON.

4. **Interactive Development Roadmap & Sprint Tracker**:
   - Generates multi-week sprints with day-by-day task deliverables, estimated hours, and dependency graphs.
   - Interactive task checklists with `Not Started`, `In Progress`, and `Completed` statuses.
   - Live completion progress calculation synced directly to database storage.

5. **AI Project Builder**:
   - Freeform idea prompt input (e.g. *"I want a Python and React project related to AI for medical diagnosis"*).
   - Instant synthesis of custom project specifications, modular architecture, and implementation plans.

6. **Side-by-Side Project Comparison**:
   - Compare up to 3 candidate software projects simultaneously.
   - Evaluates complexity, required skills, duration, resume value, and skill gaps in a structured matrix.
   - Contextual AI evaluation answering: *"Which project is best for me?"*

7. **Resume & ATS Optimization Analyzer**:
   - Evaluates project resume impact (Low, Medium, High).
   - Generates professional resume bullet points adhering to industry-standard Action-Verb + Stack + Architecture formulas without unverified claims.

8. **Contextual Technical AI Assistant**:
   - A dedicated project mentor strictly bounded to the selected project's architectural context.
   - Solves concrete questions: database design, test coverage, code structure, and prerequisite guidance.

9. **Pre-Seeded Engineering Database**:
   - Over 50+ realistic, industry-relevant projects across 12+ domains (AI/ML, NLP, Computer Vision, Full-Stack, Cloud Native, Cybersecurity, IoT, Blockchain, Game Development).

10. **Modern SaaS UI/UX**:
    - Complete Dark and Light theme modes.
    - Responsive mobile navigation and drawer layouts.
    - Glassmorphism effects and Framer Motion micro-interactions.
    - Interactive Recharts analytics (Skills Distribution, Career Alignment Radars).
    - 1-Click Demo Student access with pre-configured profile.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom glassmorphism and dark mode
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Axios with interceptors

### Backend
- **Runtime**: Node.js (v18+) & Express.js
- **Architecture**: Modular Controller-Service-Repository pattern
- **Database**: MongoDB with Mongoose (with automated embedded In-Memory fallback store)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt password hashing
- **Security**: Helmet, CORS, Express Rate Limiting, Input Validation
- **AI Integration**: Google Gemini API via official `@google/generative-ai` with Zod schema validation

---

## 📂 Project Structure

```
projectmatch-ai/
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # Reusable Button, Input, Select, Modal, Loader, Badge, ProgressBar
│   │   │   ├── MatchScore.jsx    # Circular score indicator and multi-factor breakdown gauges
│   │   │   ├── SkillBadge.jsx
│   │   │   ├── SkillSelector.jsx # Search, tag, and proficiency picker
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectGrid.jsx
│   │   │   ├── ProjectComparisonDrawer.jsx
│   │   │   ├── SkillGapAnalyzer.jsx
│   │   │   ├── ResumeValueAnalyzer.jsx
│   │   │   ├── ProjectChatAssistant.jsx
│   │   │   ├── RoadmapTimeline.jsx
│   │   │   └── DashboardCard.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProfileSetupWizard.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── FindProjectsPage.jsx
│   │   │   ├── ProjectDetailsPage.jsx
│   │   │   ├── RecommendationsPage.jsx
│   │   │   ├── BlueprintPage.jsx
│   │   │   ├── RoadmapPage.jsx
│   │   │   ├── ProjectBuilderPage.jsx
│   │   │   ├── ComparePage.jsx
│   │   │   ├── SavedProjectsPage.jsx
│   │   │   ├── MyProjectsPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js                 # Database connection with graceful fallback detection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── projectController.js
│   │   ├── savedController.js
│   │   ├── userProjectController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── SavedProject.js
│   │   ├── UserProject.js
│   │   ├── Roadmap.js
│   │   └── RecommendationHistory.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── savedRoutes.js
│   │   ├── userProjectRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   ├── geminiService.js      # Gemini API SDK, Zod schemas & deterministic fallbacks
│   │   ├── dbService.js          # Unified DB adapter
│   │   └── inMemoryStore.js      # Embedded in-memory store for zero-config run
│   ├── seed/
│   │   ├── seedData.js           # 52 realistic engineering projects
│   │   └── seedProjects.js       # MongoDB seeding script
│   ├── server.js
│   └── package.json
│
├── .env
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

---

## ⚡ Quick Start & Installation

### 1. Clone or Open the Workspace
```bash
cd "c:\Users\puliv\OneDrive\Desktop\projectmatch AI"
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Review your `.env` configuration:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/projectmatch_ai
JWT_SECRET=projectmatch_ai_super_secret_jwt_key_2026_dev
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Note on Zero-Configuration:**
> - If `GEMINI_API_KEY` is not provided, the platform operates in **Smart Fallback Mode** using our deterministic weighted matching algorithm.
> - If MongoDB is not running locally, the server automatically boots an **Embedded In-Memory Store** with all 52 projects pre-loaded so all features work immediately out of the box!

### 3. Install All Dependencies
```bash
npm run install:all
```
*(Or install separately: `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

### 4. (Optional) Seed MongoDB
If using an external MongoDB Atlas cluster or local MongoDB service:
```bash
npm run seed
```

### 5. Start Frontend and Backend Concurrently
From the root directory:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Testing with Demo Mode

To evaluate the application instantly without filling out forms:
1. Navigate to [http://localhost:5173](http://localhost:5173).
2. Click **"1-Click Demo Mode"** in the top navigation bar or login screen.
3. Automatically logs in as **Demo Student**:
   - **Skills**: Python (Advanced), React (Intermediate), SQL (Intermediate), Machine Learning (Intermediate)
   - **Interests**: AI/ML, Web Development, Data Science
   - **Target Career**: AI/ML Engineer
   - **Preferred Difficulty**: Medium
   - **Available Time**: 1 month

---

## 📡 API Reference

### Authentication
- `POST /api/auth/register` — Create a new student account
- `POST /api/auth/login` — Sign in and issue JWT
- `POST /api/auth/demo-login` — 1-click Demo Student login
- `GET /api/auth/me` — Retrieve authenticated user profile

### Projects
- `GET /api/projects` — Browse projects with domain, difficulty, and keyword search
- `GET /api/projects/:id` — Retrieve single project with personalized compatibility scoring
- `POST /api/projects` — Add custom project

### AI Services
- `POST /api/ai/recommend-projects` — Compute multi-factor personalized match recommendations
- `POST /api/ai/project-blueprint` — Generate 16-section technical project blueprint
- `POST /api/ai/roadmap` — Generate multi-week development roadmap
- `POST /api/ai/skill-gap` — Calculate missing skills and recommended learning order
- `POST /api/ai/compare` — Compare up to 3 candidate projects side-by-side
- `POST /api/ai/resume-bullet` — Generate realistic, uninflated ATS resume bullet point
- `POST /api/ai/project-assistant` — Contextual AI mentor for selected project
- `POST /api/ai/project-builder` — Synthesize custom project specification from natural language prompt
- `GET /api/ai/roadmaps` — Retrieve user's active roadmaps
- `PUT /api/ai/roadmaps/:id/task` — Update task status (`Not Started`, `In Progress`, `Completed`)

### Tracked & Saved Projects
- `GET /api/saved` — List user's bookmarked projects
- `POST /api/saved/:projectId` — Bookmark a project
- `DELETE /api/saved/:projectId` — Remove bookmark
- `GET /api/my-projects` — List tracked projects in Idea, Planning, In Progress, Completed states
- `POST /api/my-projects` — Start tracking a project
- `PUT /api/my-projects/:id` — Update progress, notes, or status
- `DELETE /api/my-projects/:id` — Remove tracked project

---

## 🔒 Security Best Practices

1. **Private Keys & Environment Variables**:
   - Gemini API keys, JWT secrets, and database URIs reside exclusively on the Node.js backend.
   - `.env` is explicitly ignored in `.gitignore`.
2. **AI Code Safety**:
   - AI outputs are structured JSON responses strictly validated using `Zod` schemas before rendering.
   - AI responses are never directly executed as shell or system commands.
3. **API Rate Limiting**:
   - Express rate limiter safeguards AI generation endpoints against abusive requests.
4. **Header Protection**:
   - Helmet middleware applies strict HTTP security headers.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

i am sreeja