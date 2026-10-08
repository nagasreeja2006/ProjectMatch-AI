import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Bookmark, ArrowRight, Sparkles, Award, Layers } from 'lucide-react';
import MatchScore from './MatchScore';
import { DifficultyBadge, TechnologyBadge, Badge } from './ui/Badge';

const ProjectCard = ({
  project,
  isSaved = false,
  onSaveToggle,
  isCompared = false,
  onCompareToggle,
  showCompare = true,
}) => {
  const navigate = useNavigate();
  const id = project._id || project.id;

  const resumeBadgeVariants = {
    High: 'purple',
    Medium: 'blue',
    Low: 'slate',
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
    >
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header Tags & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="indigo" size="xs">
              {project.domain}
            </Badge>
            <DifficultyBadge difficulty={project.difficulty} size="xs" />
            {project.resumeValue && (
              <Badge variant={resumeBadgeVariants[project.resumeValue] || 'blue'} size="xs">
                <Award className="w-3 h-3 mr-0.5" /> {project.resumeValue} Resume Value
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onSaveToggle && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveToggle(project);
                }}
                className={`p-2 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save Project'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
              </button>
            )}

            {showCompare && onCompareToggle && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareToggle(project);
                }}
                className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                  isCompared
                    ? 'bg-blue-50 text-blue-600 border-blue-300 dark:bg-blue-950/50 dark:border-blue-700'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                }`}
                title={isCompared ? 'Remove from Comparison' : 'Add to Compare'}
              >
                <Layers className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Project Title & Match Score Header */}
        <div className="flex items-start justify-between gap-4 mb-2.5">
          <h3
            onClick={() => navigate(`/projects/${id}`)}
            className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {project.title}
          </h3>

          {project.matchScore !== undefined && (
            <div className="shrink-0">
              <MatchScore score={project.matchScore} size="sm" />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        {/* Match Rationale / AI insight highlight */}
        {project.matchBreakdown?.reason && (
          <div className="mb-4 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{project.matchBreakdown.reason}</span>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {(project.technologies || []).slice(0, 4).map((tech, idx) => (
              <TechnologyBadge key={idx} technology={tech} />
            ))}
            {(project.technologies || []).length > 4 && (
              <span className="text-[10px] text-slate-400 self-center px-1 font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Info: Estimated Time & View Details CTA */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{project.estimatedTime}</span>
          </div>

          <button
            onClick={() => navigate(`/projects/${id}`)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
