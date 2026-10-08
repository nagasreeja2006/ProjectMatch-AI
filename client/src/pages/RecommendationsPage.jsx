import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  Award
} from 'lucide-react';
import { aiService, savedService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProjectCard from '../components/ProjectCard';
import ProjectComparisonDrawer from '../components/ProjectComparisonDrawer';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import MatchScore from '../components/MatchScore';

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProjectIds, setSavedProjectIds] = useState([]);
  const [comparedProjects, setComparedProjects] = useState([]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const [recRes, savedRes] = await Promise.allSettled([
        aiService.recommendProjects(user || {}),
        savedService.getSavedProjects()
      ]);

      if (recRes.status === 'fulfilled' && recRes.value.data.success) {
        setRecommendations(recRes.value.data.recommendations || []);
      }
      if (savedRes.status === 'fulfilled' && savedRes.value.data.success) {
        const list = savedRes.value.data.savedProjects || [];
        setSavedProjectIds(list.map(sp => String(sp.projectId?._id || sp.projectId)));
      }
    } catch (err) {
      toastError('Failed to calculate recommendations. Using deterministic match fallback.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  const handleSaveToggle = async (project) => {
    const id = String(project._id || project.id);
    const isSaved = savedProjectIds.includes(id);

    try {
      if (isSaved) {
        await savedService.removeSavedProject(id);
        setSavedProjectIds(prev => prev.filter(sid => sid !== id));
        success(`Removed "${project.title}" from saved projects.`);
      } else {
        await savedService.saveProject(id, project.matchScore || 85);
        setSavedProjectIds(prev => [...prev, id]);
        success(`Saved "${project.title}" to bookmarks!`);
      }
    } catch (err) {
      console.warn('Save toggle error:', err.message);
    }
  };

  const handleCompareToggle = (project) => {
    const id = String(project._id || project.id);
    const exists = comparedProjects.some(p => String(p._id || p.id) === id);

    if (exists) {
      setComparedProjects(prev => prev.filter(p => String(p._id || p.id) !== id));
    } else {
      if (comparedProjects.length >= 3) {
        alert('You can compare a maximum of 3 projects simultaneously.');
        return;
      }
      setComparedProjects(prev => [...prev, project]);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Multi-Dimensional Match Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Personalized Project Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Ranked specifically for your {user?.skills?.length || 0} skills, target role of{' '}
            <span className="text-white font-bold">{user?.careerGoal || 'Software Engineer'}</span>, and preferred{' '}
            <span className="text-white font-bold">{user?.difficultyPreference || 'Medium'}</span> difficulty.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={fetchRecommendations}
            isLoading={loading}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
          >
            Re-Analyze Skills
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/profile')}
            leftIcon={<Sliders className="w-4 h-4" />}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Tune Profile
          </Button>
        </div>
      </div>

      {/* Top 1 Highlight Card (if recommendations exist) */}
      {!loading && recommendations.length > 0 && recommendations[0].project && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/40 dark:border-blue-500/30 shadow-xl space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md">
            #1 Best Match
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {recommendations[0].project.domain}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500">
                  Estimated Time: {recommendations[0].project.estimatedTime}
                </span>
              </div>

              <h2
                onClick={() => navigate(`/projects/${recommendations[0].project._id || recommendations[0].project.id}`)}
                className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                {recommendations[0].project.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {recommendations[0].project.description}
              </p>

              {recommendations[0].reason && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
                  <span className="font-bold">Match Rationale: </span>
                  {recommendations[0].reason}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(recommendations[0].project.technologies || []).map((t, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shrink-0 w-full lg:w-64 text-center">
              <MatchScore
                score={recommendations[0].matchScore}
                size="lg"
                showBreakdown={true}
                breakdown={{
                  skillMatch: recommendations[0].skillMatch,
                  careerMatch: recommendations[0].careerMatch,
                  difficultyMatch: recommendations[0].difficultyMatch,
                  timeMatch: recommendations[0].timeMatch
                }}
              />
              <Button
                variant="primary"
                size="sm"
                className="mt-4 w-full"
                onClick={() => navigate(`/projects/${recommendations[0].project._id || recommendations[0].project.id}`)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Project Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations List Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            All AI Ranked Matches ({recommendations.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sorted in descending order of compatibility across skills, career trajectory, and complexity.
          </p>
        </div>
      </div>

      {/* Grid of Recommended Projects */}
      {loading ? (
        <div className="py-20">
          <Loader text="Analyzing your skills & computing recommendations..." subtext="Evaluating overlap ratio, prerequisite dependencies, and hiring demand" />
        </div>
      ) : recommendations.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 mb-3">No matching projects found. Try updating your skills profile.</p>
          <Button variant="primary" size="sm" onClick={() => navigate('/profile-setup')}>
            Complete Skills Setup
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.slice(1).map((rec) => {
            if (!rec.project) return null;
            const p = {
              ...rec.project,
              matchScore: rec.matchScore,
              matchBreakdown: {
                reason: rec.reason,
                skillMatch: rec.skillMatch,
                careerMatch: rec.careerMatch,
                difficultyMatch: rec.difficultyMatch,
                timeMatch: rec.timeMatch,
              }
            };
            const isSaved = savedProjectIds.includes(String(p._id || p.id));
            const isCompared = comparedProjects.some(cp => String(cp._id || cp.id) === String(p._id || p.id));

            return (
              <ProjectCard
                key={p._id || p.id}
                project={p}
                isSaved={isSaved}
                onSaveToggle={handleSaveToggle}
                isCompared={isCompared}
                onCompareToggle={handleCompareToggle}
                showCompare={true}
              />
            );
          })}
        </div>
      )}

      {/* Comparison Drawer */}
      <ProjectComparisonDrawer
        selectedProjects={comparedProjects}
        onRemoveProject={(id) => setComparedProjects(prev => prev.filter(p => String(p._id || p.id) !== String(id)))}
        onClearAll={() => setComparedProjects([])}
      />
    </div>
  );
};

export default RecommendationsPage;
