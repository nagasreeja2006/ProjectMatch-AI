import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { aiService } from '../services/api';
import Loader from './ui/Loader';

const SkillGapAnalyzer = ({ project, userSkills = [] }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSkillGap = async () => {
      setLoading(true);
      try {
        const id = project._id || project.id;
        const res = await aiService.getSkillGap(id, userSkills);
        if (isMounted && res.data.success) {
          setAnalysis(res.data.analysis);
        }
      } catch (err) {
        console.warn('Skill gap analysis error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (project) {
      fetchSkillGap();
    }
    return () => { isMounted = false; };
  }, [project, userSkills]);

  if (loading) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <Loader text="Analyzing skill readiness..." subtext="Evaluating skill overlap and building personalized learning path" />
      </div>
    );
  }

  if (!analysis) return null;

  const { haveSkills = [], needSkills = [], skillGapCount = 0, learningOrder = [], insights } = analysis;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Skill Gap Analysis</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare your current skill profile against the core technical prerequisites for this project.
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 shrink-0 ${
          skillGapCount === 0
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800'
            : skillGapCount <= 2
            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800'
            : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800'
        }`}>
          <span>Skill Gap:</span>
          <span className="text-sm font-extrabold">
            {skillGapCount === 0 ? 'Ready to Build!' : `${skillGapCount} skill${skillGapCount > 1 ? 's' : ''} to learn`}
          </span>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skills You Have */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Skills You Have ({haveSkills.length})
          </div>
          {haveSkills.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No matching skills identified yet.</p>
          ) : (
            <ul className="space-y-2">
              {haveSkills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[11px] font-bold shrink-0">
                    ✓
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Skills You Need */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Skills You Need ({needSkills.length})
          </div>
          {needSkills.length === 0 ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Awesome! You already meet all primary skill prerequisites.
            </p>
          ) : (
            <ul className="space-y-2">
              {needSkills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                  <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[11px] font-bold shrink-0">
                    ⚠
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recommended Learning Order */}
      {learningOrder.length > 0 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/80 dark:border-blue-900/50">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2.5">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Recommended Learning Order</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {learningOrder.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
                {idx < learningOrder.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 dark:text-blue-500" />
                )}
              </React.Fragment>
            ))}
          </div>

          {insights && (
            <p className="mt-3 text-xs text-blue-800 dark:text-blue-300/90 leading-relaxed">
              <span className="font-semibold">AI Guidance:</span> {insights}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalyzer;
