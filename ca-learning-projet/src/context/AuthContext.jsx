import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => dataService.getProfile());
  const [loading, setLoading] = useState(false);

  const updateProfile = (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    dataService.saveProfile(updated);
  };

  const login = (email, password, role = 'student') => {
    setLoading(true);
    setTimeout(() => {
      const newProfile = {
        ...profile,
        email,
        role,
        full_name: email.split('@')[0].toUpperCase(),
      };
      setProfile(newProfile);
      dataService.saveProfile(newProfile);
      setLoading(false);
    }, 400);
  };

  const logout = () => {
    const guestProfile = {
      id: 'u_guest',
      full_name: 'Visiteur',
      email: 'guest@ca-learning.dz',
      institution: "Université d'Alger",
      field_of_study: 'Comptabilité',
      role: 'student',
      lastActiveDate: new Date().toISOString().split('T')[0],
      level: 1,
      xp: 0,
      streak_days: 1
    };
    setProfile(guestProfile);
    dataService.saveProfile(guestProfile);
  };

  return (
    <AuthContext.Provider value={{ profile, updateProfile, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
