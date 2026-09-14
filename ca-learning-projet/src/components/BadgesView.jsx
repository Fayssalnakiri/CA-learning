import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { Award, Lock, CheckCircle2, Zap } from 'lucide-react';

export const BadgesView = () => {
  const [badges] = useState(() => dataService.getUserBadges());

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs mb-2">
            🎖️ Galerie des Distinctions
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Vos Badges & Succès Comptables</h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            Débloquez des insignes de spécialisation en réussissant les exercices Débit/Crédit et les évaluations d'audit.
          </p>
        </div>

        <div className="text-right bg-white/10 p-4 rounded-2xl border border-white/20">
          <div className="text-2xl font-black text-amber-400">{unlockedCount} / {badges.length}</div>
          <span className="text-[10px] font-bold text-emerald-200">Badges Débloqués</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
              badge.unlocked
                ? 'bg-white dark:bg-emerald-950/50 border-emerald-500/40 shadow-lg shadow-emerald-950/5'
                : 'bg-slate-100/60 dark:bg-emerald-950/20 border-slate-200 dark:border-emerald-950/60 opacity-70'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                  badge.unlocked ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 'bg-slate-200 text-slate-400'
                }`}>
                  {badge.unlocked ? '🏆' : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {badge.category}
                </span>
              </div>

              <div>
                <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80 font-medium mt-1">
                  {badge.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/40 flex items-center justify-between text-xs font-black">
              <span className="flex items-center gap-1 text-amber-500">
                <Zap className="w-3.5 h-3.5 fill-amber-500" /> +{badge.xpReward} XP
              </span>

              {badge.unlocked ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Débloqué
                </span>
              ) : (
                <span className="text-slate-400 font-extrabold text-[11px]">En cours</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
