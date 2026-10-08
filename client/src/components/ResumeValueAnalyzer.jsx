import React, { useState, useEffect } from 'react';
import { Award, Copy, Check, Sparkles, FileText } from 'lucide-react';
import { aiService } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Badge } from './ui/Badge';
import Button from './ui/Button';

const ResumeValueAnalyzer = ({ project }) => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  useEffect(() => {
    let isMounted = true;
    const fetchResumeBullet = async () => {
      setLoading(true);
      try {
        const id = project._id || project.id;
        const res = await aiService.getResumeBullet(id);
        if (isMounted && res.data.success) {
          setResumeData(res.data.resumeAnalysis);
        }
      } catch (err) {
        console.warn('Resume bullet error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (project) {
      fetchResumeBullet();
    }
    return () => { isMounted = false; };
  }, [project]);

  const copyToClipboard = () => {
    if (!resumeData?.bulletPoint) return;
    navigator.clipboard.writeText(resumeData.bulletPoint);
    setCopied(true);
    success('Resume bullet point copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const resumeValue = resumeData?.resumeValue || project.resumeValue || 'High';
  const justification = resumeData?.justification || `High resume value because it demonstrates full-stack architecture with ${project.technologies.slice(0, 3).join(', ')}.`;
  const bulletPoint = resumeData?.bulletPoint || `Architected and deployed ${project.title}, an end-to-end ${project.domain} system using ${project.technologies.slice(0, 4).join(', ')} featuring robust error boundaries and modular REST APIs.`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Resume Value & ATS Optimization</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            How recruiters, hiring managers, and applicant tracking systems (ATS) view this project.
          </p>
        </div>

        <Badge
          variant={resumeValue === 'High' ? 'purple' : resumeValue === 'Medium' ? 'blue' : 'slate'}
          size="md"
          className="font-bold shrink-0 self-start sm:self-auto"
        >
          {resumeValue} Resume Value
        </Badge>
      </div>

      {/* Recruiter Justification */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-900 dark:text-slate-100">Why it stands out: </span>
        {justification}
      </div>

      {/* Generated Resume Bullet Point */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-500" /> Tailored Resume Bullet Point:
          </span>
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Bullet</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 font-mono text-xs leading-relaxed border border-slate-800 relative group">
          <div className="pr-8">
            • {bulletPoint}
          </div>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
          * Formatted in industry-standard Action Verb + Stack + Architecture format without false metrics.
        </p>
      </div>
    </div>
  );
};

export default ResumeValueAnalyzer;
