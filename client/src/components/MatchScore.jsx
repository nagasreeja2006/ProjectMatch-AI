import React from 'react';
import { motion } from 'framer-motion';

const MatchScore = ({
  score = 85,
  size = 'md', // sm, md, lg
  showBreakdown = false,
  breakdown = null,
  label = 'Match',
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(score)));

  // SVG circular properties
  const radius = size === 'lg' ? 44 : size === 'md' ? 32 : 20;
  const stroke = size === 'lg' ? 7 : size === 'md' ? 5 : 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;
  const dimension = (radius + stroke) * 2;

  let strokeColor = '#3b82f6'; // blue
  if (clamped >= 85) strokeColor = '#10b981'; // emerald
  else if (clamped < 65) strokeColor = '#f59e0b'; // amber

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={dimension} height={dimension} className="transform -rotate-90">
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-slate-100 dark:text-slate-800"
            fill="transparent"
          />
          <motion.circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-extrabold text-slate-900 dark:text-slate-100 ${
            size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-base font-bold' : 'text-xs'
          }`}>
            {clamped}%
          </span>
          {size === 'lg' && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {label}
            </span>
          )}
        </div>
      </div>

      {showBreakdown && breakdown && (
        <div className="w-full mt-4 space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>Skill Match</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{breakdown.skillMatch || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${breakdown.skillMatch || 0}%` }} />
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>Career Match</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{breakdown.careerMatch || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${breakdown.careerMatch || 0}%` }} />
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>Difficulty Fit</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{breakdown.difficultyMatch || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${breakdown.difficultyMatch || 0}%` }} />
          </div>

          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
            <span>Time Feasibility</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{breakdown.timeMatch || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${breakdown.timeMatch || 0}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchScore;
