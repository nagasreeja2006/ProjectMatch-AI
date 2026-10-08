import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wand2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Bookmark,
  PlusCircle,
  Layers,
  Clock,
  CheckCircle2,
  Cpu,
  BookOpen
} from 'lucide-react';
import { aiService, savedService, userProjectService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { DifficultyBadge, TechnologyBadge, Badge } from '../components/ui/Badge';

const SAMPLE_PROMPTS = [
  'I want a Python and React project related to AI for medical diagnosis',
  'A full stack cloud monitoring dashboard with microservices in Node.js and Docker',
  'A cybersecurity intrusion detection system using machine learning and packet capture',
  'An IoT smart home energy optimizer with MQTT and React telemetry graphs',
];

const ProjectBuilderPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [prompt, setPrompt] = useState('');
  const [generatedProject, setGeneratedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tracking, setTracking] = useState(false);

  const handleGenerate = async (queryToUse) => {
    const query = queryToUse || prompt;
    if (!query || !query.trim() || loading) return;

    setLoading(true);
    try {
      const res = await aiService.buildCustomProject(query.trim());
      if (res.data.success) {
        setGeneratedProject(res.data.project);
        success('Custom engineering project synthesized successfully!');
      }
    } catch (err) {
      toastError('Failed to synthesize custom project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedProject) return;
    setSaving(true);
    try {
      success(`Saved "${generatedProject.title}" to bookmarks!`);
    } catch (e) {
      toastError('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddToMyProjects = async () => {
    if (!generatedProject) return;
    setTracking(true);
    try {
      await userProjectService.createUserProject({
        title: generatedProject.title,
        description: generatedProject.description,
        technologies: generatedProject.technologies,
        domain: generatedProject.domain,
        difficulty: generatedProject.difficulty,
        status: 'Planning',
      });
      success(`Added "${generatedProject.title}" to My Projects tracker!`);
      navigate('/my-projects');
    } catch (e) {
      toastError('Failed to start tracking project.');
    } finally {
      setTracking(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
          <Wand2 className="w-3.5 h-3.5 text-amber-300" />
          <span>AI Project Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Synthesize a Custom Engineering Project
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Describe what you want to build in plain English. The AI engine will architect a comprehensive project specification with technical stack, features, and milestones.
        </p>
      </div>

      {/* Prompt Input Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          What kind of project do you want?
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g., I want a Python and React project related to AI for medical diagnosis..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleGenerate();
            }}
            disabled={loading}
            className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />

          <Button
            variant="primary"
            size="md"
            onClick={() => handleGenerate()}
            isLoading={loading}
            disabled={!prompt.trim()}
            rightIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
            className="shrink-0"
          >
            Build Project
          </Button>
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(sp);
                  handleGenerate(sp);
                }}
                className="text-left text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                "{sp}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-16">
          <Loader
            text="Synthesizing Custom Project Architecture..."
            subtext="Generating problem statement, technology stack, feature breakdown, and implementation plan"
          />
        </div>
      )}

      {/* Generated Project Display Card */}
      {!loading && generatedProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="indigo" size="xs">
                  {generatedProject.domain}
                </Badge>
                <DifficultyBadge difficulty={generatedProject.difficulty} size="xs" />
                <Badge variant="purple" size="xs">
                  {generatedProject.resumeValue} Resume Value
                </Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium ml-1">
                  <Clock className="w-3.5 h-3.5" /> {generatedProject.estimatedTime}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {generatedProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {generatedProject.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerate()}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Regenerate
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToMyProjects}
                isLoading={tracking}
                leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              >
                Add to My Projects
              </Button>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(generatedProject.technologies || []).map((t, idx) => (
                <TechnologyBadge key={idx} technology={t} />
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Core Architectural Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(generatedProject.features || []).map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          {generatedProject.learningOutcomes && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Learning Outcomes
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {generatedProject.learningOutcomes.map((lo, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{lo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectBuilderPage;
