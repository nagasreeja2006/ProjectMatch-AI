import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
  progress = 0,
  label = '',
  showPercentage = true,
  color = 'blue',
  size = 'md',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const colorVariants = {
    blue: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    green: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    purple: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium">
          {label && <span className="text-slate-600 dark:text-slate-400">{label}</span>}
          {showPercentage && <span className="text-slate-900 dark:text-slate-100 font-bold">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${colorVariants[color] || colorVariants.blue}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
