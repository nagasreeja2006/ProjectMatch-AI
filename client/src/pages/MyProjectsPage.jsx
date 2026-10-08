import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  Edit3,
  Map,
  Layers,
  ArrowRight
} from 'lucide-react';
import { userProjectService } from '../services/api';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { DifficultyBadge, TechnologyBadge, Badge } from '../components/ui/Badge';

const STATUS_COLUMNS = ['All', 'Idea', 'Planning', 'In Progress', 'Completed'];

const MyProjectsPage = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  // Edit / Update modal state
  const [editingProject, setEditingProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUserProjects = async () => {
    setLoading(true);
    try {
      const res = await userProjectService.getUserProjects();
      if (res.data.success) {
        setProjects(res.data.projects || []);
      }
    } catch (err) {
      toastError('Failed to load tracked projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      const res = await userProjectService.updateUserProject(projectId, { status: newStatus });
      if (res.data.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === projectId ? { ...p, status: newStatus } : p))
        );
        success(`Status updated to "${newStatus}"`);
      }
    } catch (err) {
      toastError('Failed to update project status.');
    }
  };

  const handleUpdateProgress = async (projectId, newProgress) => {
    const clamped = Math.min(100, Math.max(0, parseInt(newProgress) || 0));
    try {
      await userProjectService.updateUserProject(projectId, { progress: clamped });
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? { ...p, progress: clamped } : p))
      );
    } catch (e) {
      // ignore
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to remove this project from your tracker?')) return;
    try {
      await userProjectService.deleteUserProject(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      success('Project removed from tracker.');
    } catch (err) {
      toastError('Failed to delete project.');
    }
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      await userProjectService.updateUserProject(editingProject._id, {
        status: editingProject.status,
        progress: editingProject.progress,
        notes: editingProject.notes,
        githubUrl: editingProject.githubUrl,
      });
      setProjects((prev) =>
        prev.map((p) => (p._id === editingProject._id ? editingProject : p))
      );
      setIsEditModalOpen(false);
      success('Project details updated!');
    } catch (err) {
      toastError('Failed to save updates.');
    }
  };

  const filteredProjects = projects.filter(
    (p) => filterStatus === 'All' || p.status === filterStatus
  );

  if (loading) {
    return (
      <div className="py-24">
        <Loader text="Loading your project tracker..." subtext="Retrieving active sprint tasks and development milestones" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-indigo-500" />
            <span>My Projects & Sprint Tracker ({projects.length})</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track implementation progress across Idea, Planning, In Progress, and Completed states.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/project-builder')}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Custom Project
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {STATUS_COLUMNS.map((st) => {
          const count = st === 'All' ? projects.length : projects.filter((p) => p.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filterStatus === st ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={`No projects in "${filterStatus}" status`}
          description="Start building a project from your recommendations or design a new one using the AI Project Builder."
          actionLabel="Explore Recommended Projects"
          onAction={() => navigate('/recommendations')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => {
            const pId = p.projectId?._id || p.projectId;
            return (
              <div
                key={p._id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-colors"
              >
                <div className="space-y-3">
                  {/* Status header & Actions */}
                  <div className="flex items-center justify-between gap-3">
                    <select
                      value={p.status}
                      onChange={(e) => handleUpdateStatus(p._id, e.target.value)}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="Idea">Idea</option>
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit details & notes"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete from tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.description || 'No description provided.'}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {(p.technologies || []).slice(0, 4).map((tech, idx) => (
                      <TechnologyBadge key={idx} technology={tech} />
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-1">
                    <ProgressBar
                      progress={p.progress || 0}
                      label="Development Progress"
                      size="sm"
                      color={p.status === 'Completed' ? 'green' : 'blue'}
                    />
                  </div>

                  {/* Notes / Dates info */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Started: {new Date(p.startDate || p.createdAt).toLocaleDateString()}
                    </span>
                    {p.notes && (
                      <span className="italic truncate max-w-[180px]">Note: "{p.notes}"</span>
                    )}
                  </div>
                </div>

                {/* Footer Toolbar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {pId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/roadmap/${pId}`)}
                        leftIcon={<Map className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Sprint Roadmap
                      </Button>
                    )}
                  </div>

                  {pId && (
                    <button
                      onClick={() => navigate(`/projects/${pId}`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Project Notes & Links Modal */}
      {editingProject && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Project: ${editingProject.title}`}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSaveModal} className="space-y-4">
            <Select
              label="Status"
              options={['Idea', 'Planning', 'In Progress', 'Completed']}
              value={editingProject.status}
              onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Progress Percentage ({editingProject.progress || 0}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={editingProject.progress || 0}
                onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            <Input
              label="GitHub Repository URL"
              placeholder="https://github.com/username/project-repo"
              value={editingProject.githubUrl || ''}
              onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Sprint Notes & Key Milestones
              </label>
              <textarea
                rows={3}
                placeholder="Log blockers, completed endpoints, or next tasks..."
                value={editingProject.notes || ''}
                onChange={(e) => setEditingProject({ ...editingProject, notes: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MyProjectsPage;
