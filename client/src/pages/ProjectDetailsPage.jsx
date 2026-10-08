import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Bookmark,
  Share2,
  FileCode2,
  Map,
  PlusCircle,
  Sparkles,
  Award,
  Layers,
  CheckCircle,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { projectService, savedService, userProjectService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import MatchScore from '../components/MatchScore';
import { DifficultyBadge, TechnologyBadge, Badge } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import SkillGapAnalyzer from '../components/SkillGapAnalyzer';
import ResumeValueAnalyzer from '../components/ResumeValueAnalyzer';
import ProjectChatAssistant from '../components/ProjectChatAssistant';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProject = async () => {
      setLoading(true);
      try {
        const [projRes, savedRes] = await Promise.allSettled([
          projectService.getProjectById(id),
          savedService.getSavedProjects()
        ]);

        if (isMounted) {
          if (projRes.status === 'fulfilled' && projRes.value.data.success) {
            setProject(projRes.value.data.project);
          }
          if (savedRes.status === 'fulfilled' && savedRes.value.data.success) {
            const list = savedRes.value.data.savedProjects || [];
            setIsSaved(list.some(sp => String(sp.projectId?._id || sp.projectId) === String(id)));
          }
        }
      } catch (err) {
        console.warn('Project fetch error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProject();
    return () => { isMounted = false; };
  }, [id]);

  const handleSaveToggle = async () => {
    if (!project) return;
    try {
      if (isSaved) {
        await savedService.removeSavedProject(id);
        setIsSaved(false);
        success('Removed from saved projects.');
      } else {
        await savedService.saveProject(id, project.matchScore || 85);
        setIsSaved(true);
        success('Project saved to your bookmarks!');
      }
    } catch (err) {
      toastError('Failed to update bookmark.');
    }
  };

  const handleStartProject = async () => {
    if (!project) return;
    setIsStarting(true);
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
      success(`Added "${project.title}" to My Projects tracker!`);
      navigate('/my-projects');
    } catch (err) {
      toastError('Failed to start project tracking.');
    } finally {
      setIsStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <Loader text="Loading technical project specifications..." subtext="Retrieving architecture details and compatibility scores" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Project Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The project you are looking for does not exist or was removed.</p>
        <Button variant="primary" onClick={() => navigate('/projects')}>Browse Projects</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Project Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo" size="sm">
                {project.domain}
              </Badge>
              <DifficultyBadge difficulty={project.difficulty} size="sm" />
              <Badge variant="purple" size="sm">
                <Award className="w-3.5 h-3.5 mr-1" /> {project.resumeValue || 'High'} Resume Value
              </Badge>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium ml-1">
                <Clock className="w-3.5 h-3.5" /> Est. {project.estimatedTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              {project.title}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {/* Target Career Roles */}
            {project.careerGoals && project.careerGoals.length > 0 && (
              <div className="pt-1 flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Recommended for:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.careerGoals.map((cg, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-medium">
                      {cg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Match Score Display */}
          {project.matchScore !== undefined && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col items-center justify-center shrink-0 w-full sm:w-60">
              <MatchScore
                score={project.matchScore}
                size="lg"
                showBreakdown={true}
                breakdown={project.matchBreakdown}
              />
            </div>
          )}
        </div>

        {/* Action Buttons Toolbar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/blueprint/${id}`)}
            leftIcon={<FileCode2 className="w-4 h-4 text-blue-200" />}
          >
            Generate Project Blueprint
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate(`/roadmap/${id}`)}
            leftIcon={<Map className="w-4 h-4 text-indigo-500" />}
          >
            Generate Roadmap
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleStartProject}
            isLoading={isStarting}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Start Project / Track
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleSaveToggle}
            leftIcon={<Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />}
          >
            {isSaved ? 'Saved to Bookmarks' : 'Save Project'}
          </Button>
        </div>
      </div>

      {/* Grid: Core Features & Technologies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Features */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Core Features to Build</span>
          </h3>

          <ul className="space-y-3">
            {(project.features || []).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies & Prerequisites */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Technology Stack</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {(project.technologies || []).map((tech, idx) => (
                <TechnologyBadge key={idx} technology={tech} />
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Prerequisites & Concepts
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(project.prerequisites || []).map((p, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {project.learningOutcomes && project.learningOutcomes.length > 0 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                What You Will Learn
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {project.learningOutcomes.map((lo, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{lo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Skill Gap Analyzer Component */}
      <SkillGapAnalyzer project={project} userSkills={user?.skills || []} />

      {/* Resume Value Analyzer Component */}
      <ResumeValueAnalyzer project={project} />

      {/* Contextual Technical AI Assistant */}
      <ProjectChatAssistant project={project} />
    </div>
  );
};

export default ProjectDetailsPage;
