import React from 'react';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { Trophy, Zap, Award, Flame } from 'lucide-react';

export const LeaderboardView = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-900 text-white shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs mb-2">
            🏆 Classement Hebdomadaire Algérie
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Top Étudiants & Praticiens</h1>
          <p className="text-xs text-amber-100 mt-1">
            Rejoignez l'élite des comptables algériens en accumulant des points XP à chaque leçon terminée.
          </p>
        </div>

        <Trophy className="w-16 h-16 text-amber-300 hidden sm:block shrink-0" />
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-emerald-950/40 rounded-3xl p-5 border border-slate-200 dark:border-emerald-900/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 uppercase text-[10px] font-black">
              <tr>
                <th className="p-3.5 text-center">Rang</th>
                <th className="p-3.5">Étudiant / Praticien</th>
                <th className="p-3.5">Université / Établissement</th>
                <th className="p-3.5 text-center">Série 🔥</th>
                <th className="p-3.5 text-center">Niveau</th>
                <th className="p-3.5 text-right">Points XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/40">
              {INITIAL_LEADERBOARD.map((user) => {
                const isTop3 = user.rank <= 3;
                return (
                  <tr key={user.rank} className={`hover:bg-emerald-500/5 transition-colors font-semibold ${
                    isTop3 ? 'bg-amber-500/5' : ''
                  }`}>
                    <td className="p-3.5 text-center font-black text-sm">
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{user.avatar}</span>
                        <div>
                          <div className="font-black text-slate-800 dark:text-slate-100">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-emerald-200/80 font-medium">
                      {user.university}
                    </td>
                    <td className="p-3.5 text-center font-black text-rose-500">
                      {user.streak}j
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {user.level}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      {user.xp} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
