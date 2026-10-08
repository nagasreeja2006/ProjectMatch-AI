import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, Map, PlusCircle, Clock, Calendar } from 'lucide-react';
import { savedService, userProjectService } from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import MatchScore from '../components/MatchScore';
import { DifficultyBadge, TechnologyBadge, Badge } from '../components/ui/Badge';

const SavedProjectsPage = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [savedProjects, setSavedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await savedService.getSavedProjects();
      if (res.data.success) {
        setSavedProjects(res.data.savedProjects || []);
      }
    } catch (err) {
      toastError('Failed to load saved projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleRemove = async (projectId) => {
    try {
      await savedService.removeSavedProject(projectId);
      setSavedProjects((prev) =>
        prev.filter((sp) => String(sp.projectId?._id || sp.projectId) !== String(projectId))
      );
      success('Project removed from saved list.');
    } catch (err) {
      toastError('Failed to remove saved project.');
    }
  };

  const handleStartProject = async (project) => {
    try {
      await userProjectService.createUserProject({
        projectId: project._id || project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        domain: project.domain,
        difficulty: project.difficulty,
        status: 'Planning',
      });
      success(`Started "${project.title}"! Added to My Projects.`);
      navigate('/my-projects');
    } catch (err) {
      toastError('Failed to start project tracking.');
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <Loader text="Loading your saved projects..." subtext="Retrieving bookmarked project ideas" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>Saved Projects ({savedProjects.length})</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Projects you bookmarked to review, start building, or generate roadmaps for.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => navigate('/projects')}>
          Discover More Projects
        </Button>
      </div>

      {savedProjects.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved projects yet"
          description="Click the bookmark icon on any project card to save it here for quick access."
          actionLabel="Explore Projects"
          onAction={() => navigate('/projects')}
        />
      ) : (
        <div className="space-y-4">
          {savedProjects.map((sp) => {
            const project = sp.projectId;
            if (!project) return null;
            const pId = project._id || project.id;

            return (
              <div
                key={sp._id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/40 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="indigo" size="xs">
                      {project.domain}
                    </Badge>
                    <DifficultyBadge difficulty={project.difficulty} size="xs" />
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {project.estimatedTime}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 ml-2">
                      <Calendar className="w-3.5 h-3.5" /> Saved on {new Date(sp.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/projects/${pId}`)}
                    className="text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {(project.technologies || []).slice(0, 5).map((t, idx) => (
                      <TechnologyBadge key={idx} technology={t} />
                    ))}
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <div className="text-center pr-2 hidden sm:block">
                    <MatchScore score={sp.matchScore || 85} size="sm" />
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                      Match Fit
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartProject(project)}
                      leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                    >
                      Start Project
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/roadmap/${pId}`)}
                      leftIcon={<Map className="w-3.5 h-3.5" />}
                    >
                      Roadmap
                    </Button>

                    <button
                      onClick={() => handleRemove(pId)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedProjectsPage;
