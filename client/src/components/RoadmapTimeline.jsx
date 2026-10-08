import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, ArrowRight, PlayCircle } from 'lucide-react';
import ProgressBar from './ui/ProgressBar';

const RoadmapTimeline = ({
  roadmap,
  onTaskStatusChange,
  isEditable = true,
}) => {
  if (!roadmap || !roadmap.tasks) return null;

  const tasks = roadmap.tasks || [];
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Group tasks by week
  const weeksMap = {};
  tasks.forEach((task) => {
    const w = task.week || 1;
    if (!weeksMap[w]) weeksMap[w] = [];
    weeksMap[w].push(task);
  });

  const weekNumbers = Object.keys(weeksMap).map(Number).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* Overall Progress Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Roadmap Progress: {roadmap.projectTitle || 'Project Development'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {completedCount} of {tasks.length} tasks completed ({progressPercent}%)
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              {progressPercent}%
            </span>
          </div>
        </div>

        <ProgressBar progress={progressPercent} color="blue" size="md" showPercentage={false} />
      </div>

      {/* Week-by-Week Timeline */}
      <div className="space-y-6">
        {weekNumbers.map((weekNum) => {
          const weekTasks = weeksMap[weekNum];
          const weekCompleted = weekTasks.filter((t) => t.status === 'Completed').length;

          return (
            <div
              key={weekNum}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              {/* Week Header */}
              <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                    Week {weekNum}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {weekCompleted}/{weekTasks.length} Done
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Est. {weekTasks.reduce((acc, t) => acc + (t.estimatedHours || 0), 0)} Hours
                </div>
              </div>

              {/* Tasks List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {weekTasks.map((task) => {
                  const isDone = task.status === 'Completed';
                  const isInProg = task.status === 'In Progress';

                  return (
                    <motion.div
                      key={task.id}
                      className={`p-5 transition-colors flex items-start gap-4 ${
                        isDone
                          ? 'bg-emerald-50/20 dark:bg-emerald-950/10'
                          : isInProg
                          ? 'bg-blue-50/20 dark:bg-blue-950/10'
                          : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      {/* Checkbox / Status Circle */}
                      <button
                        type="button"
                        disabled={!isEditable}
                        onClick={() => {
                          if (!isEditable) return;
                          const nextStatus = isDone
                            ? 'Not Started'
                            : isInProg
                            ? 'Completed'
                            : 'In Progress';
                          onTaskStatusChange && onTaskStatusChange(task.id, nextStatus);
                        }}
                        className={`mt-0.5 rounded-xl p-1 transition-all ${
                          isDone
                            ? 'text-emerald-500'
                            : isInProg
                            ? 'text-blue-500'
                            : 'text-slate-300 hover:text-slate-500 dark:text-slate-700 dark:hover:text-slate-400'
                        }`}
                        title="Click to advance status"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6 fill-emerald-100 dark:fill-emerald-950" />
                        ) : isInProg ? (
                          <PlayCircle className="w-6 h-6 fill-blue-100 dark:fill-blue-950" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {task.day || `Day ${task.id}`}
                          </span>
                          <h5
                            className={`text-sm font-bold ${
                              isDone
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-slate-100'
                            }`}
                          >
                            {task.title}
                          </h5>

                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                              isDone
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                                : isInProg
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {task.status || 'Not Started'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                          {task.description}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                          {task.estimatedHours && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {task.estimatedHours} hrs
                            </span>
                          )}
                          {task.dependencies && task.dependencies.length > 0 && (
                            <span className="text-slate-400">
                              Requires: {task.dependencies.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status Selector Dropdown / Actions for direct choice */}
                      {isEditable && (
                        <div className="shrink-0 self-center">
                          <select
                            value={task.status || 'Not Started'}
                            onChange={(e) =>
                              onTaskStatusChange && onTaskStatusChange(task.id, e.target.value)
                            }
                            className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
