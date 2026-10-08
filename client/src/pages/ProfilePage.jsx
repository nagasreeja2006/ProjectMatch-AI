import React, { useState, useEffect } from 'react';
import { User, Sparkles, Heart, Target, Sliders, Save, CheckCircle2, Award } from 'lucide-react';
import { profileService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import SkillSelector from '../components/SkillSelector';
import ProgressBar from '../components/ui/ProgressBar';

const BRANCH_OPTIONS = [
  'CSE', 'AIML', 'AI', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'
];

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated'];
const EDUCATION_OPTIONS = ['BTech', 'BE', 'BCA', 'MCA', 'Diploma', 'Degree', 'Other'];

const INTEREST_OPTIONS = [
  'AI/ML', 'Web Development', 'Mobile Development', 'Cybersecurity', 'Data Science',
  'Cloud Computing', 'IoT', 'Blockchain', 'Automation', 'Software Development',
  'Game Development', 'Computer Vision', 'NLP'
];

const CAREER_GOALS = [
  'Software Developer', 'AI/ML Engineer', 'Data Scientist', 'Data Analyst',
  'Cloud Engineer', 'Cybersecurity Engineer', 'Full Stack Developer',
  'Mobile Developer', 'Researcher', 'Entrepreneur'
];

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard', 'Advanced'];
const TIME_OPTIONS = ['1 week', '2 weeks', '1 month', '2-3 months', '3+ months'];
const PURPOSE_OPTIONS = [
  'College Mini Project', 'Major Project', 'Resume', 'Internship',
  'Hackathon', 'Learning', 'Startup'
];

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    education: user?.education || 'BTech',
    year: user?.year || '3rd Year',
    branch: user?.branch || 'CSE',
    skills: user?.skills || [],
    interests: user?.interests || [],
    careerGoal: user?.careerGoal || 'Full Stack Developer',
    difficultyPreference: user?.difficultyPreference || 'Medium',
    availableTime: user?.availableTime || '1 month',
    projectPurpose: user?.projectPurpose || 'Resume',
  });
  const [completion, setCompletion] = useState(85);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        if (isMounted && res.data.success) {
          const prof = res.data.profile;
          setFormData({
            name: prof.name || '',
            education: prof.education || 'BTech',
            year: prof.year || '3rd Year',
            branch: prof.branch || 'CSE',
            skills: prof.skills || [],
            interests: prof.interests || [],
            careerGoal: prof.careerGoal || 'Full Stack Developer',
            difficultyPreference: prof.difficultyPreference || 'Medium',
            availableTime: prof.availableTime || '1 month',
            projectPurpose: prof.projectPurpose || 'Resume',
          });
          setCompletion(res.data.completionPercentage || 85);
        }
      } catch (err) {
        console.warn('Profile fetch error:', err.message);
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, []);

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await profileService.updateProfile(formData);
      if (res.data.success) {
        updateUser(res.data.profile);
        setCompletion(res.data.completionPercentage);
        success('Profile updated successfully!');
      }
    } catch (err) {
      toastError('Failed to save profile updates.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header with Completion Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {formData.name || 'My Profile'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {formData.education} • {formData.branch} • {formData.year}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-60 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-400">Profile Completion</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{completion}%</span>
          </div>
          <ProgressBar progress={completion} showPercentage={false} size="md" />
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Academic & Basic Info */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <User className="w-4 h-4 text-blue-500" />
            <span>Academic Background</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Select
              label="Education Level"
              options={EDUCATION_OPTIONS}
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            />
            <Select
              label="Branch / Stream"
              options={BRANCH_OPTIONS}
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            />
            <Select
              label="Year of Study"
              options={YEAR_OPTIONS}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>
        </div>

        {/* Section 2: Technical Skills */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Technical Skills & Proficiencies</span>
          </h3>

          <SkillSelector
            selectedSkills={formData.skills}
            onChange={(newSkills) => setFormData({ ...formData, skills: newSkills })}
          />
        </div>

        {/* Section 3: Engineering Interests */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Engineering Domains of Interest</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = formData.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Target Career Goal */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Target className="w-4 h-4 text-emerald-500" />
            <span>Target Career Role</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CAREER_GOALS.map((goal) => {
              const isSelected = formData.careerGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setFormData({ ...formData, careerGoal: goal })}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Preferences */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>Project Preferences & Constraints</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Difficulty Preference"
              options={DIFFICULTY_OPTIONS}
              value={formData.difficultyPreference}
              onChange={(e) => setFormData({ ...formData, difficultyPreference: e.target.value })}
            />
            <Select
              label="Available Development Time"
              options={TIME_OPTIONS}
              value={formData.availableTime}
              onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
            />
            <Select
              label="Primary Project Purpose"
              options={PURPOSE_OPTIONS}
              value={formData.projectPurpose}
              onChange={(e) => setFormData({ ...formData, projectPurpose: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={saving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Profile Updates
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
