import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Plus
} from 'lucide-react';
import { aiService, projectService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { DifficultyBadge, TechnologyBadge, Badge } from '../components/ui/Badge';
import MatchScore from '../components/MatchScore';

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);

  const projectIdsParam = searchParams.get('projects') || '';
  const initialIds = projectIdsParam ? projectIdsParam.split(',').filter(Boolean) : [];

  useEffect(() => {
    let isMounted = true;
    const fetchComparison = async () => {
      setLoading(true);
      try {
        const projRes = await projectService.getProjects();
        if (projRes.data.success) {
          const list = projRes.data.projects || [];
          setAllProjects(list);

          // If IDs exist, compare them; else pick top 3
          const targetIds = initialIds.length > 0 ? initialIds : list.slice(0, 3).map(p => p._id || p.id);
          if (targetIds.length > 0) {
            const compRes = await aiService.compareProjects(targetIds);
            if (isMounted && compRes.data.success) {
              setComparisonData(compRes.data.comparison);
            }
          }
        }
      } catch (err) {
        console.warn('Comparison error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchComparison();
    return () => { isMounted = false; };
  }, [projectIdsParam]);

  if (loading) {
    return (
      <div className="py-24">
        <Loader
          text="Comparing Engineering Projects..."
          subtext="Evaluating trade-offs across complexity, skill overlap, career impact, and portfolio value"
        />
      </div>
    );
  }

  const matrix = comparisonData?.matrix || [];
  const recommendation = comparisonData?.recommendation || '';

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Search</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/projects')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Another Project
          </Button>
        </div>
      </div>

      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
          <Layers className="w-3.5 h-3.5 text-amber-300" />
          <span>Side-by-Side Architectural Evaluation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Project Comparison Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Compare up to 3 candidate software projects across match percentages, skill gap sizes, required technologies, and career trajectory return.
        </p>
      </div>

      {/* AI Recommendation Box: "Which project is best for me?" */}
      {recommendation && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 border-2 border-blue-300 dark:border-blue-800 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-extrabold text-base">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Which project is best for me?</span>
          </div>
          <div className="text-xs sm:text-sm text-blue-950 dark:text-blue-100/90 leading-relaxed whitespace-pre-wrap">
            {recommendation}
          </div>
        </div>
      )}

      {/* Comparison Matrix Table */}
      {matrix.length > 0 ? (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-xs divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-5 w-44">Metric</th>
                {matrix.map((p, idx) => (
                  <th key={p.id} className="p-5 font-bold min-w-[220px]">
                    Project {idx + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Title */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Project Title
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <span
                      onClick={() => navigate(`/projects/${p.id}`)}
                      className="font-extrabold text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer block leading-snug"
                    >
                      {p.title}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Domain: {p.domain}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Match Score */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  AI Match Score
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <div className="flex items-center gap-3">
                      <MatchScore score={p.matchScore} size="sm" />
                      <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                        {p.matchScore}%
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Difficulty */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Difficulty Level
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <DifficultyBadge difficulty={p.difficulty} size="sm" />
                  </td>
                ))}
              </tr>

              {/* Estimated Time */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Duration
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5 text-slate-700 dark:text-slate-300 font-medium">
                    {p.estimatedTime}
                  </td>
                ))}
              </tr>

              {/* Technologies */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Tech Stack
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <div className="flex flex-wrap gap-1">
                      {(p.technologies || []).map((t, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Career Value */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Career Relevance
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5 font-bold text-slate-800 dark:text-slate-200">
                    {p.careerValue}
                  </td>
                ))}
              </tr>

              {/* Resume Value */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Resume Value
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <Badge variant={p.resumeValue === 'High' ? 'purple' : 'blue'} size="sm">
                      {p.resumeValue}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Skill Gap */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Skill Gap
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <div className="space-y-1">
                      <span className={`font-bold ${p.skillGapCount === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {p.skillGapCount === 0 ? 'Zero Gap (Ready!)' : `${p.skillGapCount} skills to learn`}
                      </span>
                      {p.missingSkills && p.missingSkills.length > 0 && (
                        <p className="text-[11px] text-slate-400">
                          Need: {p.missingSkills.join(', ')}
                        </p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="p-5 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/30">
                  Action
                </td>
                {matrix.map((p) => (
                  <td key={p.id} className="p-5">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/projects/${p.id}`)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      View Project
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 mb-4">No projects selected for comparison.</p>
          <Button variant="primary" onClick={() => navigate('/projects')}>Browse Projects</Button>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
