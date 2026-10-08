import React from 'react';

const SkillBadge = ({
  skill,
  level = 'Intermediate',
  onRemove,
  clickable = false,
  onClick,
  className = '',
}) => {
  const name = typeof skill === 'object' ? skill.name : skill;
  const currentLevel = typeof skill === 'object' ? skill.level || level : level;

  const levelColors = {
    Beginner: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    Intermediate: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    Advanced: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };

  return (
    <span
      onClick={clickable ? onClick : undefined}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
        levelColors[currentLevel] || levelColors.Intermediate
      } ${clickable ? 'cursor-pointer hover:shadow-sm' : ''} ${className}`}
    >
      <span className="font-semibold">{name}</span>
      {currentLevel && (
        <span className="text-[10px] opacity-75 font-normal">
          ({currentLevel})
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          className="ml-1 text-slate-400 hover:text-rose-500 rounded-full w-4 h-4 inline-flex items-center justify-center transition-colors"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default SkillBadge;
