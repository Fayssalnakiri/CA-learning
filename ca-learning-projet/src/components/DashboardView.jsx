import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdBanner } from './AdBanner';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Play, 
  Award, 
  Zap, 
  HelpCircle,
  Calculator,
  Shield,
  TrendingUp,
  Search,
  Clock
} from 'lucide-react';

export const DashboardView = ({ modules, onStartLesson, searchQuery, onNavigateTab }) => {
  const [activeModuleTab, setActiveModuleTab] = useState('mod-scf');
  const { profile } = useAuth();

  const moduleCategories = [
    { id: 'mod-scf', label: 'La comptabilité Générale', icon: Calculator, count: modules['mod-scf']?.length || 0, badge: 'Obligatoire' },
    { id: 'mod-isa', label: "Normes Audit ISA", icon: Shield, count: modules['mod-isa']?.length || 0, badge: 'Avancé' },
    { id: 'mod-analytique', label: 'Comptabilité Analytique', icon: TrendingUp, count: modules['mod-analytique']?.length || 0, badge: 'Gestion' },
  ];

  const chapters = modules[activeModuleTab] || [];

  // Filter lessons based on search query if present
  const filteredChapters = chapters.map((chap) => {
    if (!searchQuery) return chap;
    const q = searchQuery.toLowerCase();
    const matchesChap = chap.title.toLowerCase().includes(q) || chap.description.toLowerCase().includes(q);
    const filteredLessons = chap.lessons?.filter(
      (l) => l.title.toLowerCase().includes(q) || l.content.toLowerCase().includes(q)
    );
    if (matchesChap || (filteredLessons && filteredLessons.length > 0)) {
      return { ...chap, lessons: filteredLessons || chap.lessons };
    }
    return null;
  }).filter(Boolean);

  const startTimedTest = () => {
    // Generate 10 random questions from current module
    const allExercises = chapters.flatMap(chap => chap.lessons?.flatMap(l => l.exercises || []) || []);
    const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    onStartLesson({
      id: 'timed_test_' + Date.now(),
      title: 'Test Chronométré',
      content: 'Ce test est chronométré. Vous avez 5 minutes pour répondre à 10 questions aléatoires.',
      exercises: selected,
      isTimed: true,
      timeLimit: 300 // 5 minutes
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
            🇩🇿 Formation Diplômante
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Maîtrisez la Comptabilité
          </h1>
          <p className="text-sm text-emerald-100/80 font-medium leading-relaxed">
            Apprenez la tenue des journaux, l'établissement du Bilan, du Compte de Résultats et le passage des écritures Débit/Crédit en pratiquant sur 50 leçons interactives.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('pcn')}
              className="btn-algeria-green px-6 py-3 text-xs flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Comptes de l'SCF</span>
            </button>
            <button
              onClick={() => onNavigateTab('summaries')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-colors border border-white/20 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Consulter les Résumés</span>
            </button>
          </div>
        </div>
      </div>

      {!profile?.isPremium && <AdBanner position="content" />}

      {/* Module Selector Tabs and Timed Test Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/20 dark:border-emerald-800/40 pb-3">
        <div className="flex flex-wrap gap-2">
          {moduleCategories.map((tab) => {
            const Icon = tab.icon;
            const active = activeModuleTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModuleTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer ${
                  active
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200 hover:bg-emerald-500/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  active ? 'bg-white/20 text-white' : 'bg-emerald-900/20 text-emerald-600 dark:text-emerald-300'
                }`}>
                  {tab.count} Chapitres
                </span>
              </button>
            );
          })}
        </div>
        <button
          onClick={startTimedTest}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs transition-colors shadow-lg shadow-rose-500/30 shrink-0"
        >
          <Clock className="w-4 h-4" />
          Test Chronométré
        </button>
      </div>

      {/* Chapters & Lessons Accordion List */}
      <div className="space-y-6">
        {filteredChapters.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-emerald-950/30 rounded-3xl border border-slate-200 dark:border-emerald-900/40">
            <Search className="w-10 h-10 text-emerald-500 mx-auto mb-3 opacity-50" />
            <h3 className="font-black text-lg text-slate-700 dark:text-emerald-200">
              Aucune leçon ne correspond à votre recherche "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-400 mt-1">
              Essayez de rechercher par numéro de compte (ex: 512, 607, 411) ou par mot-clé (Bilan, TVA).
            </p>
          </div>
        ) : (
          filteredChapters.map((chapter, cIdx) => {
            const completedCount = chapter.lessons?.filter((l) => l.completed).length || 0;
            const totalCount = chapter.lessons?.length || 0;
            const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div
                key={chapter.id}
                className="bg-white dark:bg-emerald-950/40 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-emerald-900/60 shadow-sm space-y-4"
              >
                {/* Chapter Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-emerald-900/40 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                      Chapitre {chapter.order_number || cIdx + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
                      {chapter.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-emerald-200/80 font-medium">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Progress Ring / Percentage */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-700 dark:text-emerald-300">
                        {completedCount} / {totalCount} Complétées
                      </span>
                      <p className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                        {percent}% Reçu
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-xs">
                      {percent}%
                    </div>
                  </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {chapter.lessons?.map((lesson, lIdx) => {
                    const isUnlocked = lesson.completed || lIdx === 0 || chapter.lessons[lIdx - 1]?.completed;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => isUnlocked && onStartLesson(lesson)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                          isUnlocked
                            ? 'bg-slate-50 dark:bg-emerald-900/30 border-slate-200 dark:border-emerald-800/60 hover:scale-[1.02] cursor-pointer shadow-sm hover:border-emerald-500'
                            : 'bg-slate-100/50 dark:bg-emerald-950/20 border-slate-200/50 dark:border-emerald-950/40 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {lIdx + 1}.0
                          </span>
                          {lesson.completed ? (
                            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Fait ({lesson.score}%)
                            </span>
                          ) : isUnlocked ? (
                            <span className="flex items-center gap-1 text-[10px] font-black text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                              <Play className="w-3 h-3 fill-sky-500" /> Prêt
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 bg-slate-200 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                              <Lock className="w-3 h-3" /> Verrouillé
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 line-clamp-2">
                            {lesson.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-emerald-300/70 mt-1">
                            {lesson.exercises?.length || 20} Questions interactives
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-emerald-800/30 text-[10px] font-bold text-slate-500 dark:text-emerald-400">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-500" /> +25 XP
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 hover:underline">
                            {isUnlocked ? "Commencer →" : "Terminer précédente"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
