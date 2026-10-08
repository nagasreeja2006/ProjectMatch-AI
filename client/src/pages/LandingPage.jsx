import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Cpu,
  Brain,
  Layers,
  Map,
  Wand2,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
  Compass
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import MatchScore from '../components/MatchScore';
import { DifficultyBadge } from '../components/ui/Badge';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, demoLogin } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleDemoAccess = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Sparkles,
      title: 'AI Project Matching',
      description: 'Sophisticated multi-parameter matching aligning your current skills, preferred difficulty, and target engineering careers.',
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'Skill Analysis & Gap Detection',
      description: 'Pinpoints exact missing prerequisites and organizes a sequential learning path before writing your first line of code.',
      color: 'indigo'
    },
    {
      icon: Compass,
      title: 'Personalized Recommendations',
      description: 'Tailored specifically for BTech, BCA, MCA, and college students preparing for major projects, mini projects, or hackathons.',
      color: 'emerald'
    },
    {
      icon: Map,
      title: 'Step-by-Step Roadmaps',
      description: 'Turn project ambiguity into structured week-by-week sprints with day-by-day deliverables and progress tracking.',
      color: 'purple'
    },
    {
      icon: Wand2,
      title: 'AI Project Builder',
      description: 'Convert custom ideas into complete architectural blueprints, database schemas, and modular feature roadmaps.',
      color: 'amber'
    },
    {
      icon: FileCheck,
      title: 'Resume & ATS Optimization',
      description: 'Receive verified resume bullet points and recruiters’ value assessments without fabricating unearned metrics.',
      color: 'rose'
    },
    {
      icon: Layers,
      title: 'Technology Suggestions',
      description: 'Explore modern, industry-favored stacks including React, Node.js, Python, PyTorch, MongoDB, and Cloud Native tools.',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Progress & Task Tracking',
      description: 'Manage active projects across Idea, Planning, In Progress, and Completed states with deadline accountability.',
      color: 'emerald'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Build Your Profile',
      desc: 'Specify your degree, branch, programming languages, skill proficiency levels, and dream engineering roles.'
    },
    {
      step: '02',
      title: 'Analyze Your Skills',
      desc: 'Our engine evaluates your technical portfolio, identifying strengths and growth areas against industry demands.'
    },
    {
      step: '03',
      title: 'Get AI Recommendations',
      desc: 'Receive curated engineering projects scored with multi-factor match percentages and recruiter impact ratings.'
    },
    {
      step: '04',
      title: 'Build Your Project',
      desc: 'Generate complete architectural blueprints and step-by-step development roadmaps to deliver with confidence.'
    }
  ];

  const statistics = [
    { value: '50+', label: 'Curated Engineering Projects' },
    { value: '15+', label: 'Technology Domains' },
    { value: 'Multi-Factor', label: 'AI Compatibility Engine' },
    { value: '4-Week', label: 'Actionable Roadmaps' }
  ];

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-8 pb-4">
        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>PROJECTMATCH AI — Built for College Engineers & Developers</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15]">
          Find the project that{' '}
          <span className="gradient-text">matches your skills</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AI-powered project recommendations personalized to your skills, interests, career goals, and experience level. Skip generic chatbots and get actionable architecture blueprints.
        </p>

        {/* Hero CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={handleGetStarted}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/projects')}
            leftIcon={<Compass className="w-4 h-4" />}
          >
            Explore Projects
          </Button>

          {!isAuthenticated && (
            <Button
              size="lg"
              variant="secondary"
              onClick={handleDemoAccess}
              leftIcon={<Star className="w-4 h-4 text-amber-500" />}
            >
              1-Click Demo Mode
            </Button>
          )}
        </div>

        {/* Hero Visual Mockup */}
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-3 sm:p-4 rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg text-left p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    PM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      AI Project Compatibility Studio
                    </h3>
                    <p className="text-xs text-slate-500">Live Student Profile: Python, React, SQL • Target: AI/ML Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                    High Fit (94% Compatibility)
                  </span>
                </div>
              </div>

              {/* Sample Mock Recommendation Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Top Recommendation
                    </span>
                    <DifficultyBadge difficulty="Medium" size="xs" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    AI Resume Analyzer & Job Fit Scorer
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Parses PDF resumes, extracts core technical skills using NLP, calculates cosine semantic similarity against live job descriptions, and renders interactive ATS compatibility gauges.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['React', 'Node.js', 'Python', 'FastAPI', 'Gemini API'].map((t) => (
                      <span key={t} className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                  <MatchScore
                    score={94}
                    size="lg"
                    showBreakdown={true}
                    breakdown={{ skillMatch: 92, careerMatch: 96, difficultyMatch: 95, timeMatch: 90 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Architecture Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            How ProjectMatch AI Works
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            From skill diagnosis to step-by-step development sprint execution in four cohesive steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-blue-500/40 transition-colors"
            >
              <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-blue-500/20 transition-colors block mb-3">
                {s.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Full-Stack Capabilities
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Engineered For Modern College Students
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Everything you need to select, architect, and showcase high-impact engineering projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {statistics.map((st, idx) => (
            <div key={idx} className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-300 mb-1">
                {st.value}
              </div>
              <div className="text-xs text-blue-100/80 font-medium">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center p-10 sm:p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
          Ready to begin?
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Find Your Perfect Project
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Join engineering students discovering software projects tailored to their exact skills and career aspirations.
        </p>
        <div className="pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={handleGetStarted}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Project Matching
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
