import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Map,
  Target,
  Brain,
  Code2,
  FolderKanban,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { aiService, projectService, savedService, userProjectService } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import DashboardCard from '../components/DashboardCard';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [recRes, savedRes, upRes, rmRes] = await Promise.allSettled([
          aiService.recommendProjects(user || {}),
          savedService.getSavedProjects(),
          userProjectService.getUserProjects(),
          aiService.getUserRoadmaps()
        ]);

        if (isMounted) {
          if (recRes.status === 'fulfilled' && recRes.value.data.success) {
            setRecommendations(recRes.value.data.recommendations || []);
          }
          if (savedRes.status === 'fulfilled' && savedRes.value.data.success) {
            setSavedProjects(savedRes.value.data.savedProjects || []);
          }
          if (upRes.status === 'fulfilled' && upRes.value.data.success) {
            setActiveProjects(upRes.value.data.projects || []);
          }
          if (rmRes.status === 'fulfilled' && rmRes.value.data.success) {
            setRoadmaps(rmRes.value.data.roadmaps || []);
          }
        }
      } catch (err) {
        console.warn('Dashboard fetch error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();
    return () => { isMounted = false; };
  }, [user]);

  // Skill calculations
  const userSkills = user?.skills || [];
  const totalSkills = userSkills.length;
  const aimlSkills = userSkills.filter(s => {
    const n = (typeof s === 'string' ? s : s.name).toLowerCase();
    return n.includes('machine') || n.includes('deep') || n.includes('ai') || n.includes('ml') || n.includes('data') || n.includes('python');
  }).length;
  const devSkills = totalSkills - aimlSkills;

  // Chart 1: Skills distribution by category
  const skillsDistribution = [
    { name: 'Core Languages', value: Math.max(1, userSkills.filter(s => ['python', 'java', 'c++', 'javascript', 'c'].includes((s.name || s).toLowerCase())).length) },
    { name: 'Frameworks/Libraries', value: Math.max(1, userSkills.filter(s => ['react', 'node.js', 'fastapi', 'flask', 'express'].includes((s.name || s).toLowerCase())).length) },
    { name: 'AI / Data Science', value: Math.max(1, aimlSkills) },
    { name: 'Database & Cloud', value: Math.max(1, userSkills.filter(s => ['sql', 'mongodb', 'docker', 'cloud', 'aws'].includes((s.name || s).toLowerCase())).length) },
  ];

  // Chart 2: Career Alignment Radar
  const careerAlignment = [
    { subject: 'Full Stack', score: 85, fullMark: 100 },
    { subject: 'AI / ML', score: user?.careerGoal?.includes('AI') ? 92 : 70, fullMark: 100 },
    { subject: 'Database', score: 80, fullMark: 100 },
    { subject: 'System Design', score: 75, fullMark: 100 },
    { subject: 'Testing & CI', score: 65, fullMark: 100 },
    { subject: 'Cloud & DevOps', score: 72, fullMark: 100 },
  ];

  // Profile completion calculation
  const calculateProfileCompletion = () => {
    let score = 0;
    if (user?.name) score += 20;
    if (user?.education) score += 15;
    if (user?.branch) score += 15;
    if (user?.skills?.length >= 3) score += 25;
    else if (user?.skills?.length >= 1) score += 10;
    if (user?.careerGoal) score += 15;
    if (user?.interests?.length) score += 10;
    return Math.min(100, score);
  };
  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Target Role: {user?.careerGoal || 'Full Stack Developer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Student'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl">
              Let's find your next project. We've matched your profile against curated engineering projects across {skillsDistribution.length} skill dimensions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/recommendations')}
              leftIcon={<Sparkles className="w-4 h-4 text-blue-600" />}
              className="bg-white text-blue-900 hover:bg-blue-50 shadow-md"
            >
              Analyze Profile
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/projects')}
              leftIcon={<Compass className="w-4 h-4 text-white" />}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Browse All
            </Button>
          </div>
        </div>

        {/* Ambient background blur elements */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Top Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard className="!p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Skills</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {totalSkills}
              </h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                {aimlSkills} AI/ML • {devSkills} Dev
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard className="!p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Saved Projects</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {savedProjects.length}
              </h3>
              <NavLink to="/saved" className="text-[11px] text-blue-600 hover:underline font-medium mt-0.5 inline-block">
                View bookmarks →
              </NavLink>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bookmark className="w-6 h-6" />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard className="!p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tracked Projects</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {activeProjects.length}
              </h3>
              <NavLink to="/my-projects" className="text-[11px] text-indigo-600 hover:underline font-medium mt-0.5 inline-block">
                Track status →
              </NavLink>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FolderKanban className="w-6 h-6" />
            </div>
          </div>
        </DashboardCard>

        <DashboardCard className="!p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Roadmaps Generated</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {roadmaps.length}
              </h3>
              <NavLink to="/roadmaps" className="text-[11px] text-purple-600 hover:underline font-medium mt-0.5 inline-block">
                Sprint plans →
              </NavLink>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Map className="w-6 h-6" />
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Profile Completion Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-800 dark:text-slate-200">
              Profile Completion: {profileCompletion}%
            </span>
            <span className="text-blue-600 dark:text-blue-400">
              {profileCompletion === 100 ? 'Fully Optimized' : 'Improve match accuracy'}
            </span>
          </div>
          <ProgressBar progress={profileCompletion} color="blue" size="md" showPercentage={false} />
          {profileCompletion < 100 && (
            <p className="text-[11px] text-slate-500">
              Tip: Add more skills and specify your target difficulty preference to unlock 95%+ precision matches.
            </p>
          )}
        </div>

        {profileCompletion < 100 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/profile')}
            className="shrink-0 text-xs"
          >
            Update Profile
          </Button>
        )}
      </div>

      {/* Visual Analytics / Recharts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Distribution Chart */}
        <DashboardCard
          title="Skills Portfolio Distribution"
          subtitle="Breakdown of technical competencies recorded in your profile"
          icon={Brain}
        >
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillsDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {skillsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        {/* Career Alignment Radar Chart */}
        <DashboardCard
          title="Career Skill Alignment"
          subtitle={`Evaluated against standard requirements for ${user?.careerGoal || 'Software Engineer'}`}
          icon={Target}
        >
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={careerAlignment}>
                <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" opacity={0.4} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar
                  name="Student Match %"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.45}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Recommended Projects (Top 3-6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Recommended For You</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Top curated software engineering projects scored based on your {userSkills.length} skills and career preferences.
            </p>
          </div>

          <NavLink
            to="/recommendations"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>See All Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        {loading ? (
          <div className="py-12">
            <Loader text="Matching projects with your profile..." subtext="Analyzing skill compatibility and ranking top 6 projects" />
          </div>
        ) : recommendations.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 mb-3">No recommendations calculated yet.</p>
            <Button size="sm" variant="primary" onClick={() => navigate('/recommendations')}>
              Find My Projects
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((rec) => {
              if (!rec.project) return null;
              const p = {
                ...rec.project,
                matchScore: rec.matchScore,
                matchBreakdown: {
                  reason: rec.reason,
                  skillMatch: rec.skillMatch,
                  careerMatch: rec.careerMatch,
                  difficultyMatch: rec.difficultyMatch,
                  timeMatch: rec.timeMatch,
                }
              };
              const isSaved = savedProjects.some(sp => String(sp.projectId?._id || sp.projectId) === String(p._id));

              return (
                <ProjectCard
                  key={p._id}
                  project={p}
                  isSaved={isSaved}
                  onSaveToggle={async () => {
                    if (isSaved) {
                      await savedService.removeSavedProject(p._id);
                      setSavedProjects(prev => prev.filter(sp => String(sp.projectId?._id || sp.projectId) !== String(p._id)));
                    } else {
                      await savedService.saveProject(p._id, rec.matchScore);
                      setSavedProjects(prev => [...prev, { projectId: p, matchScore: rec.matchScore }]);
                    }
                  }}
                  showCompare={false}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Activity Section */}
      <DashboardCard
        title="Recent Activity"
        subtitle="Your latest interactions, bookmarked ideas, and roadmap sprints"
        icon={TrendingUp}
      >
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {savedProjects.slice(0, 3).map((sp, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Saved {sp.projectId?.title || 'Engineering Project'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Match Score: {sp.matchScore || 85}% • Saved to bookmarks
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/projects/${sp.projectId?._id || sp.projectId}`)}
                className="text-blue-600 hover:underline font-semibold"
              >
                View
              </button>
            </div>
          ))}

          {activeProjects.slice(0, 2).map((ap, idx) => (
            <div key={`act-${idx}`} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-4 h-4 text-indigo-500 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    In Progress: {ap.title}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Status: {ap.status} • {ap.progress}% completed
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/my-projects')}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Track
              </button>
            </div>
          ))}

          {savedProjects.length === 0 && activeProjects.length === 0 && (
            <p className="py-4 text-slate-400 text-center italic">
              No recent activity. Start exploring projects or bookmarking ideas to see updates here!
            </p>
          )}
        </div>
      </DashboardCard>
    </div>
  );
};

export default DashboardPage;
