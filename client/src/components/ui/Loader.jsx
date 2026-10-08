import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu } from 'lucide-react';

const Loader = ({
  text = 'Loading...',
  subtext = 'Please wait a moment while we process your request',
  fullScreen = false,
  variant = 'ai'
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto">
      <div className="relative mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-2 border-dashed border-blue-500/60 dark:border-blue-400/60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white"
          >
            {variant === 'ai' ? (
              <Sparkles className="w-5 h-5 animate-pulse" />
            ) : variant === 'brain' ? (
              <Brain className="w-5 h-5 animate-pulse" />
            ) : (
              <Cpu className="w-5 h-5 animate-pulse" />
            )}
          </motion.div>
        </div>
      </div>
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">{text}</h4>
      {subtext && <p className="text-xs text-slate-500 dark:text-slate-400">{subtext}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
