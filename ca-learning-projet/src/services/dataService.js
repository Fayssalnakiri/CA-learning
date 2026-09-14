import { INITIAL_MODULES } from '../data/modulesData';
import { BADGES } from '../data/badgesData';

const MODULES_STORAGE_KEY = 'ca_learning_modules_v1';
const PROFILE_STORAGE_KEY = 'ca_learning_profile_v1';
const BADGES_STORAGE_KEY = 'ca_learning_badges_v1';

export const dataService = {
  getModules() {
    try {
      const stored = localStorage.getItem(MODULES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read modules from localStorage:', e);
    }
    localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(INITIAL_MODULES));
    return INITIAL_MODULES;
  },

  saveModules(modules) {
    try {
      localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules));
    } catch (e) {
      console.error('Failed to save modules:', e);
    }
  },

  getProfile() {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read profile:', e);
    }

    const defaultProfile = {
      id: 'u_student_1',
      full_name: 'Étudiant SCF',
      email: 'etudiant@ca-learning.dz',
      institution: "Université d'Alger 3",
      field_of_study: 'Comptabilité & Finance',
      role: 'student',
      level: 2,
      xp: 350,
      streak_days: 5,
      last_active: new Date().toISOString()
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfile));
    return defaultProfile;
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  },

  getUserBadges() {
    try {
      const stored = localStorage.getItem(BADGES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read user badges:', e);
    }

    const defaultBadges = BADGES.map((b, idx) => ({
      ...b,
      unlocked: idx === 0,
      unlockedAt: idx === 0 ? new Date().toISOString() : null,
      progress: idx === 0 ? 1 : 0
    }));
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(defaultBadges));
    return defaultBadges;
  },

  saveUserBadges(badges) {
    try {
      localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(badges));
    } catch (e) {
      console.error('Failed to save badges:', e);
    }
  },

  completeLesson(lessonId, score, xpEarned) {
    const modules = this.getModules();
    let updated = false;

    Object.keys(modules).forEach((modKey) => {
      modules[modKey].forEach((chap) => {
        if (chap.lessons) {
          const lIdx = chap.lessons.findIndex((l) => l.id === lessonId);
          if (lIdx !== -1) {
            chap.lessons[lIdx].completed = true;
            chap.lessons[lIdx].score = Math.max(chap.lessons[lIdx].score || 0, score);

            // Unlock next lesson if available
            if (lIdx + 1 < chap.lessons.length) {
              chap.lessons[lIdx + 1].unlocked = true;
            }
            updated = true;
          }
        }
      });
    });

    if (updated) {
      this.saveModules(modules);
    }

    // Update Profile XP
    const profile = this.getProfile();
    profile.xp = (profile.xp || 0) + xpEarned;
    profile.level = Math.floor(profile.xp / 200) + 1;
    this.saveProfile(profile);

    return { modules, profile };
  }
};
