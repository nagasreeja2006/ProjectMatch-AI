import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileSetupWizard from './pages/ProfileSetupWizard';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FindProjectsPage from './pages/FindProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import BlueprintPage from './pages/BlueprintPage';
import RoadmapPage from './pages/RoadmapPage';
import ProjectBuilderPage from './pages/ProjectBuilderPage';
import ComparePage from './pages/ComparePage';
import SavedProjectsPage from './pages/SavedProjectsPage';
import MyProjectsPage from './pages/MyProjectsPage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Pages without dashboard sidebar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <ProfileSetupWizard />
          </ProtectedRoute>
        }
      />

      {/* Authenticated Dashboard / Application Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/projects" element={<FindProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/blueprint/:id" element={<BlueprintPage />} />
        <Route path="/roadmaps" element={<RoadmapPage />} />
        <Route path="/roadmap/:id" element={<RoadmapPage />} />
        <Route path="/project-builder" element={<ProjectBuilderPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <MyProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
