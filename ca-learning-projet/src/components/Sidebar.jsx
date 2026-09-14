import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Calculator, 
  Award, 
  Users, 
  User, 
  GraduationCap, 
  Settings, 
  FileText,
  Shield,
  Bot,
  Book
} from 'lucide-react';

export const Sidebar = ({ currentTab, onTabChange }) => {
  const { profile } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Apprendre', icon: BookOpen, badge: null },
    { id: 'pcn', label: 'Comptes de l\'SCF', icon: Calculator, badge: 'SCF' },
    { id: 'summaries', label: 'Résumés des cours', icon: Book, badge: 'Nouveau' },
    { id: 'leaderboard', label: 'Classement', icon: Users, badge: 'TOP 10' },
    { id: 'badges', label: 'Succès & Badges', icon: Award, badge: null },
    { id: 'profile', label: 'Mon Profil', icon: User, badge: null },
  ];

  if (profile.role === 'teacher' || profile.role === 'admin') {
    navItems.push({ id: 'teacher', label: 'Espace Formateur', icon: GraduationCap, badge: 'Pro' });
  }

  if (profile.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin CMS', icon: Settings, badge: 'CMS' });
  }

  return (
    <aside className="w-full md:w-64 bg-white/50 dark:bg-[#041f15]/80 backdrop-blur-md border-r border-emerald-900/10 dark:border-emerald-900/40 p-3 sm:p-4 flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-x-visible">
      <div className="hidden md:block mb-4 px-3">
        <p className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Navigation Principale
        </p>
      </div>

      <nav className="flex md:flex-col gap-1 w-full min-w-max md:min-w-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id || (currentTab === 'learn' && item.id === 'dashboard');
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer w-full text-left ${
                active
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-600 dark:text-emerald-200/80 hover:bg-emerald-950/10 dark:hover:bg-emerald-900/30'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  active ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Level Widget */}
      <div className="hidden md:block mt-auto p-4 rounded-3xl bg-gradient-to-br from-emerald-900/60 to-emerald-950 text-white border border-emerald-800/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold text-emerald-300">Niveau Comptable</span>
          <span className="text-xs font-black text-amber-400">Niveau {profile.level || 1}</span>
        </div>
        <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500" 
            style={{ width: `${Math.min(100, ((profile.xp % 200) / 200) * 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-emerald-200/70 font-semibold text-center">
          {(200 - (profile.xp % 200))} XP restants pour le Niveau suivant
        </p>
      </div>
    </aside>
  );
};
