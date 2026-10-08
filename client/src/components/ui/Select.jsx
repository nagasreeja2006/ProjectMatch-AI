import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label,
  error,
  options = [],
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        <select
          ref={ref}
          id={selectId}
          className={`w-full appearance-none rounded-xl border transition-all duration-200 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-3.5 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:border-transparent ${
            error
              ? 'border-rose-400 focus:ring-rose-400/30 dark:border-rose-600'
              : 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val} className="bg-white dark:bg-slate-900">
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
