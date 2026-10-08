import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Map,
  ArrowLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  PlusCircle,
  FileCode2,
  Layers
} from 'lucide-react';
import { aiService, projectService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import RoadmapTimeline from '../components/RoadmapTimeline';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

const RoadmapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [roadmap, setRoadmap] = useState(null);
  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // If ID is provided, fetch or generate roadmap for that project
  useEffect(() => {
    let isMounted = true;
    const loadRoadmap = async () => {
      setLoading(true);
      try {
        if (id) {
          // Generate/Fetch roadmap for this project
          const res = await aiService.getRoadmap({ projectId: id });
          if (isMounted && res.data.success) {
            setRoadmap(res.data.roadmap);
          }
        } else {
          // No ID in URL, load all user roadmaps
          const res = await aiService.getUserRoadmaps();
          if (isMounted && res.data.success) {
            const list = res.data.roadmaps || [];
            setUserRoadmaps(list);
            if (list.length > 0) {
              setRoadmap(list[0]);
            }
          }
        }
      } catch (err) {
        toastError('Failed to load roadmap. Please try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRoadmap();
    return () => { isMounted = false; };
  }, [id]);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    if (!roadmap) return;

    // Optimistically update local state
    const updatedTasks = roadmap.tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    const completedCount = updatedTasks.filter((t) => t.status === 'Completed').length;
    const progress = Math.round((completedCount / updatedTasks.length) * 100);

    const updatedRoadmap = {
      ...roadmap,
      tasks: updatedTasks,
      completedTasks: completedCount,
      progress,
    };
    setRoadmap(updatedRoadmap);

    // If persisted in backend, sync task update
    if (roadmap._id) {
      try {
        await aiService.updateRoadmapTask(roadmap._id, taskId, newStatus);
      } catch (e) {
        console.warn('Roadmap task sync error:', e.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <Loader
          text="Generating Development Roadmap..."
          subtext="Structuring multi-week sprint milestones, dependencies, and estimated task durations"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => (id ? navigate(`/projects/${id}`) : navigate('/dashboard'))}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{id ? 'Back to Project Details' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex items-center gap-2">
          {id && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/blueprint/${id}`)}
              leftIcon={<FileCode2 className="w-4 h-4" />}
            >
              View Blueprint
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/projects')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Explore More Projects
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
          <Map className="w-3.5 h-3.5 text-amber-300" />
          <span>Actionable Engineering Roadmap</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Development Roadmap: {roadmap?.projectTitle || 'Software Project'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Break your engineering milestone into structured weekly sprints. Check off completed items as you build and commit code.
        </p>
      </div>

      {/* User Roadmaps Selector if multiple exist */}
      {!id && userRoadmaps.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {userRoadmaps.map((rm) => (
            <button
              key={rm._id}
              onClick={() => setRoadmap(rm)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                roadmap?._id === rm._id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {rm.projectTitle} ({rm.progress || 0}%)
            </button>
          ))}
        </div>
      )}

      {/* Main Roadmap Timeline Component */}
      {roadmap ? (
        <RoadmapTimeline
          roadmap={roadmap}
          onTaskStatusChange={handleTaskStatusChange}
          isEditable={true}
        />
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <p className="text-xs text-slate-500">No active roadmap found. Select a project to generate a step-by-step roadmap.</p>
          <Button variant="primary" onClick={() => navigate('/projects')}>
            Browse Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
