import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, Layers } from 'lucide-react';
import { projectService, savedService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProjectGrid from '../components/ProjectGrid';
import ProjectComparisonDrawer from '../components/ProjectComparisonDrawer';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const DOMAIN_OPTIONS = [
  'All', 'AI/ML', 'Web Development', 'Mobile Development', 'Cybersecurity',
  'Data Science', 'Cloud Computing', 'IoT', 'Blockchain', 'Software Development',
  'Game Development', 'Computer Vision', 'NLP'
];

const DIFFICULTY_OPTIONS = ['All', 'Easy', 'Medium', 'Hard', 'Advanced'];

const SORT_OPTIONS = [
  { value: 'bestMatch', label: 'Best Match' },
  { value: 'popularity', label: 'Highest Popularity' },
  { value: 'difficulty', label: 'Difficulty (Easy to Advanced)' },
  { value: 'time', label: 'Estimated Duration' },
];

const FindProjectsPage = () => {
  const { user } = useAuth();
  const { success } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('bestMatch');

  const [savedProjectIds, setSavedProjectIds] = useState([]);
  const [comparedProjects, setComparedProjects] = useState([]);

  // Fetch projects and saved projects
  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      setLoading(true);
      try {
        const [projRes, savedRes] = await Promise.allSettled([
          projectService.getProjects({
            domain: domainFilter !== 'All' ? domainFilter : undefined,
            difficulty: difficultyFilter !== 'All' ? difficultyFilter : undefined,
            search: search.trim() || undefined,
            sort: sortBy
          }),
          savedService.getSavedProjects()
        ]);

        if (isMounted) {
          if (projRes.status === 'fulfilled' && projRes.value.data.success) {
            setProjects(projRes.value.data.projects || []);
          }
          if (savedRes.status === 'fulfilled' && savedRes.value.data.success) {
            const savedList = savedRes.value.data.savedProjects || [];
            setSavedProjectIds(savedList.map(sp => String(sp.projectId?._id || sp.projectId)));
          }
        }
      } catch (err) {
        console.warn('Failed to load projects:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadProjects();
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [search, domainFilter, difficultyFilter, sortBy]);

  const handleSaveToggle = async (project) => {
    const id = String(project._id || project.id);
    const isSaved = savedProjectIds.includes(id);

    try {
      if (isSaved) {
        await savedService.removeSavedProject(id);
        setSavedProjectIds(prev => prev.filter(sid => sid !== id));
        success(`Removed "${project.title}" from saved projects.`);
      } else {
        await savedService.saveProject(id, project.matchScore || 85);
        setSavedProjectIds(prev => [...prev, id]);
        success(`Saved "${project.title}" to bookmarks!`);
      }
    } catch (err) {
      console.warn('Save toggle error:', err.message);
    }
  };

  const handleCompareToggle = (project) => {
    const id = String(project._id || project.id);
    const exists = comparedProjects.some(p => String(p._id || p.id) === id);

    if (exists) {
      setComparedProjects(prev => prev.filter(p => String(p._id || p.id) !== id));
    } else {
      if (comparedProjects.length >= 3) {
        alert('You can compare a maximum of 3 projects simultaneously.');
        return;
      }
      setComparedProjects(prev => [...prev, project]);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setDomainFilter('All');
    setDifficultyFilter('All');
    setSortBy('bestMatch');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Find & Discover Projects</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Search 50+ realistic engineering project ideas spanning full-stack, AI/ML, cloud, and IoT architectures.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <span>Showing {projects.length} engineering projects</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by project name, skill (e.g. Python), technology (e.g. Docker), or domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <div className="w-full sm:w-44">
              <Select
                options={DOMAIN_OPTIONS}
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-36">
              <Select
                options={DIFFICULTY_OPTIONS}
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-44">
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(search || domainFilter !== 'All' || difficultyFilter !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Active filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium">
                "{search}"
                <button onClick={() => setSearch('')}>×</button>
              </span>
            )}
            {domainFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Domain: {domainFilter}
                <button onClick={() => setDomainFilter('All')}>×</button>
              </span>
            )}
            {difficultyFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Difficulty: {difficultyFilter}
                <button onClick={() => setDifficultyFilter('All')}>×</button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-rose-500 hover:underline ml-2"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <ProjectGrid
        projects={projects}
        isLoading={loading}
        savedProjectIds={savedProjectIds}
        onSaveToggle={handleSaveToggle}
        comparedProjectIds={comparedProjects.map(p => String(p._id || p.id))}
        onCompareToggle={handleCompareToggle}
        emptyTitle="No engineering projects match your criteria"
        emptyDescription="Try clearing your filters or searching for terms like 'React', 'Python', 'AI', or 'Cloud'."
        emptyActionLabel="Reset Filters"
        onEmptyAction={clearFilters}
      />

      {/* Multi-Project Comparison Bottom Drawer */}
      <ProjectComparisonDrawer
        selectedProjects={comparedProjects}
        onRemoveProject={(id) => setComparedProjects(prev => prev.filter(p => String(p._id || p.id) !== String(id)))}
        onClearAll={() => setComparedProjects([])}
      />
    </div>
  );
};

export default FindProjectsPage;
