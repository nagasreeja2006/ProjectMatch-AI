import React, { useState } from 'react';
import { Plus, Check, Search, Sparkles } from 'lucide-react';
import SkillBadge from './SkillBadge';
import Input from './ui/Input';
import Button from './ui/Button';

const POPULAR_SKILLS = [
  'Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript', 'React', 'Node.js',
  'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'Machine Learning', 'Deep Learning',
  'Data Science', 'Cloud', 'AWS', 'Docker', 'Cybersecurity', 'NLP', 'Computer Vision',
  'FastAPI', 'Flask', 'Express', 'Tailwind CSS', 'Next.js', 'Blockchain', 'Solidity'
];

const SkillSelector = ({ selectedSkills = [], onChange }) => {
  const [search, setSearch] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');

  const selectedNames = selectedSkills.map(s => (typeof s === 'string' ? s : s.name).toLowerCase());

  const handleAddSkill = (name, level = selectedLevel) => {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    if (selectedNames.includes(cleanName.toLowerCase())) return;

    const updated = [...selectedSkills, { name: cleanName, level }];
    onChange(updated);
    setSearch('');
    setCustomSkill('');
  };

  const handleRemoveSkill = (nameToRemove) => {
    const updated = selectedSkills.filter(
      s => (typeof s === 'string' ? s : s.name).toLowerCase() !== nameToRemove.toLowerCase()
    );
    onChange(updated);
  };

  const filteredPopular = POPULAR_SKILLS.filter(
    s => s.toLowerCase().includes(search.toLowerCase()) && !selectedNames.includes(s.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Selected Skills */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Your Skills ({selectedSkills.length})
        </label>
        {selectedSkills.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
            No skills selected yet. Choose from the suggestions below or add your own.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            {selectedSkills.map((s, idx) => (
              <SkillBadge
                key={idx}
                skill={s}
                onRemove={handleRemoveSkill}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Custom Skill & Level Picker */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search or type a custom skill (e.g. Flutter, PyTorch)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(search);
                }
              }}
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-medium">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    selectedLevel === lvl
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {search && !POPULAR_SKILLS.some(s => s.toLowerCase() === search.toLowerCase()) && (
              <Button
                type="button"
                size="sm"
                variant="primary"
                onClick={() => handleAddSkill(search)}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add
              </Button>
            )}
          </div>
        </div>

        {/* Quick Suggestions */}
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider mb-2 block flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Popular Skills (Click to add):
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {filteredPopular.slice(0, 16).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSkill(skill)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <Plus className="w-3 h-3 opacity-60" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSelector;
