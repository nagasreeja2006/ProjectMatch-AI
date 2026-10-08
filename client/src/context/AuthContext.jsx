import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('projectmatch_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('projectmatch_token') || null);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('projectmatch_token');
      if (savedToken) {
        try {
          const res = await authService.getMe();
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('projectmatch_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session expired or token invalid:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('projectmatch_token', newToken);
        localStorage.setItem('projectmatch_user', JSON.stringify(newUser));
        success(`Welcome back, ${newUser.name}!`);
        return { success: true, user: newUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toastError(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (data) => {
    try {
      const res = await authService.register(data);
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('projectmatch_token', newToken);
        localStorage.setItem('projectmatch_user', JSON.stringify(newUser));
        success('Account created! Complete your profile to get personalized recommendations.');
        return { success: true, user: newUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toastError(msg);
      return { success: false, message: msg };
    }
  };

  const demoLogin = async () => {
    try {
      const res = await authService.demoLogin();
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('projectmatch_token', newToken);
        localStorage.setItem('projectmatch_user', JSON.stringify(newUser));
        success('Logged in as Demo Student!');
        return { success: true, user: newUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Demo login failed.';
      toastError(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('projectmatch_token');
    localStorage.removeItem('projectmatch_user');
    success('Logged out successfully.');
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem('projectmatch_user', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        demoLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
