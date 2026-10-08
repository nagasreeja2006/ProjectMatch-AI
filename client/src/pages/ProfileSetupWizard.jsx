import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Sparkles,
  Heart,
  Target,
  Sliders,
  Check,
  ArrowRight,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../services/api';
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

const ProfileSetupWizard = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { success, error: toastError } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    education: user?.education || 'BTech',
    year: user?.year || '3rd Year',
    branch: user?.branch || 'CSE',
    skills: user?.skills || [
      { name: 'Python', level: 'Intermediate' },
      { name: 'React', level: 'Beginner' }
    ],
    interests: user?.interests?.length ? user.interests : ['AI/ML', 'Web Development'],
    careerGoal: user?.careerGoal || 'Full Stack Developer',
    difficultyPreference: user?.difficultyPreference || 'Medium',
    availableTime: user?.availableTime || '1 month',
    projectPurpose: user?.projectPurpose || 'Resume',
  });

  const toggleInterest = (interest) => {
    setProfileData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const res = await profileService.updateProfile(profileData);
      if (res.data.success) {
        updateUser(res.data.profile);
        success('Profile configured! Loading personalized recommendations.');
        navigate('/dashboard');
      }
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Basic Info', icon: User },
    { num: 2, title: 'Skills', icon: Sparkles },
    { num: 3, title: 'Interests', icon: Heart },
    { num: 4, title: 'Career Goal', icon: Target },
    { num: 5, title: 'Preferences', icon: Sliders },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Step Stepper Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Step {currentStep} of 5</span>
          <span>{Math.round((currentStep / 5) * 100)}% Completed</span>
        </div>
        <ProgressBar progress={(currentStep / 5) * 100} showPercentage={false} size="sm" />

        <div className="grid grid-cols-5 gap-2 pt-2">
          {stepsMeta.map((s) => {
            const Icon = s.icon;
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                    : isDone
                    ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex justify-center mb-1">
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="text-[11px] truncate hidden sm:block">{s.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
        <AnimatePresence mode="wait">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Step 1 — Basic Information
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tell us about your educational background so we can recommend academically suitable projects.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Your Name"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Education Level"
                    options={EDUCATION_OPTIONS}
                    value={profileData.education}
                    onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                  />

                  <Select
                    label="Current Year"
                    options={YEAR_OPTIONS}
                    value={profileData.year}
                    onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                  />

                  <Select
                    label="Branch / Major"
                    options={BRANCH_OPTIONS}
                    value={profileData.branch}
                    onChange={(e) => setProfileData({ ...profileData, branch: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Skills */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Step 2 — Skills & Technologies
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Add programming languages and frameworks you have touched. Assign realistic proficiency levels.
                </p>
              </div>

              <SkillSelector
                selectedSkills={profileData.skills}
                onChange={(newSkills) => setProfileData({ ...profileData, skills: newSkills })}
              />
            </motion.div>
          )}

          {/* STEP 3: Interests */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Step 3 — Engineering Interests
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select the domains and technology areas you are excited to explore or build projects in.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = profileData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{interest}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Career Goal */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Step 4 — Target Career Goal
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  What job title or technical specialization are you aiming for in campus placements or internships?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAREER_GOALS.map((goal) => {
                  const isSelected = profileData.careerGoal === goal;
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setProfileData({ ...profileData, careerGoal: goal })}
                      className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="text-sm">{goal}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Preferences */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Step 5 — Preferences & Constraints
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fine-tune project difficulty, development timeline, and submission purpose.
                </p>
              </div>

              <div className="space-y-5">
                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Preferred Difficulty Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DIFFICULTY_OPTIONS.map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setProfileData({ ...profileData, difficultyPreference: diff })}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          profileData.difficultyPreference === diff
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Available Development Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {TIME_OPTIONS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setProfileData({ ...profileData, availableTime: time })}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          profileData.availableTime === time
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Purpose */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Primary Project Purpose
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PURPOSE_OPTIONS.map((purpose) => (
                      <button
                        key={purpose}
                        type="button"
                        onClick={() => setProfileData({ ...profileData, projectPurpose: purpose })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                          profileData.projectPurpose === purpose
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {purpose}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="ghost"
            size="md"
            onClick={handlePrev}
            disabled={currentStep === 1}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {currentStep === 5 ? 'Complete Profile & Match Projects' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupWizard;
