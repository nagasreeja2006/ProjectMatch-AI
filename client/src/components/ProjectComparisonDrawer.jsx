import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, X, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const ProjectComparisonDrawer = ({
  selectedProjects = [],
  onRemoveProject,
  onClearAll,
}) => {
  const navigate = useNavigate();

  if (selectedProjects.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Compare Projects ({selectedProjects.length}/3)
                </span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="flex gap-2 mt-1 overflow-x-auto py-0.5">
                {selectedProjects.map((p) => {
                  const id = p._id || p.id;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 truncate max-w-[140px]"
                    >
                      <span className="truncate">{p.title}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveProject(id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const ids = selectedProjects.map((p) => p._id || p.id).join(',');
                navigate(`/compare?projects=${ids}`);
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Compare Now
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectComparisonDrawer;
