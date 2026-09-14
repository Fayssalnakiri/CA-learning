import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Zap, 
  Award, 
  Moon, 
  Sun, 
  Search, 
  User, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Bot
} from 'lucide-react';

export const Navbar = ({ currentTab, onTabChange, searchQuery, onSearchChange, onOpenAI }) => {
  const { profile } = useAuth();
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#062c1d]/95 backdrop-blur-md border-b border-emerald-900/20 dark:border-emerald-800/40 px-4 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onTabChange('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img src="/logo.png" alt="CA Learn" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher une leçon, un compte (ex: 512, 607)..."
            className="w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-2xl bg-slate-100 dark:bg-emerald-950/60 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-emerald-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            title="Assistant IA Comptable"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">IA Comptable</span>
          </button>

          {/* XP Badge */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-black text-xs">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{profile.xp || 0} XP</span>
          </div>

          {/* Streak Days */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-black text-xs">
            <span className="text-base">🔥</span>
            <span>{profile.streak_days || 1} j</span>
          </div>

          {/* Audio Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-900/60 transition-colors"
            title={soundEnabled ? "Effets sonores activés" : "Effets sonores désactivés"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-900/60 transition-colors"
            title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Button */}
          <button
            onClick={() => onTabChange('profile')}
            className="flex items-center gap-2 p-1.5 rounded-2xl bg-emerald-950/5 dark:bg-emerald-900/40 hover:bg-emerald-900/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
              {profile.full_name?.charAt(0) || 'U'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
