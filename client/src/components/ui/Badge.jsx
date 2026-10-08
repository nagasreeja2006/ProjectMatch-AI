import React from 'react';

export const Badge = ({
  children,
  variant = 'slate',
  size = 'sm',
  className = '',
}) => {
  const variants = {
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-1 font-medium',
    md: 'text-sm px-3 py-1.5 font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export const DifficultyBadge = ({ difficulty = 'Medium', size = 'sm' }) => {
  const diff = String(difficulty).toLowerCase();
  let variant = 'slate';
  if (diff === 'easy') variant = 'green';
  else if (diff === 'medium') variant = 'blue';
  else if (diff === 'hard') variant = 'amber';
  else if (diff === 'advanced') variant = 'rose';

  return (
    <Badge variant={variant} size={size} className="capitalize font-semibold">
      <span className={`w-1.5 h-1.5 rounded-full ${
        diff === 'easy' ? 'bg-emerald-500' :
        diff === 'medium' ? 'bg-blue-500' :
        diff === 'hard' ? 'bg-amber-500' : 'bg-rose-500'
      }`} />
      {difficulty}
    </Badge>
  );
};

export const TechnologyBadge = ({ technology, onClick, removable = false, onRemove }) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-colors ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <span>{technology}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove && onRemove();
          }}
          className="text-slate-400 hover:text-rose-500 transition-colors ml-0.5"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Badge;
