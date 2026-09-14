import React from 'react';

export const AdBanner = ({ position = 'sidebar' }) => {
  if (position === 'sidebar') {
    return (
      <div className="hidden md:block mt-2 p-3 rounded-2xl bg-slate-100 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/50 text-center relative overflow-hidden group cursor-pointer">
        <div className="absolute top-1 right-1 text-[8px] uppercase font-bold text-slate-400">Publicité</div>
        <div className="w-full h-32 bg-slate-200 dark:bg-emerald-900/60 rounded-xl flex flex-col items-center justify-center mb-2 group-hover:bg-slate-300 dark:group-hover:bg-emerald-800/60 transition-colors">
          <span className="text-2xl mb-1">📢</span>
          <span className="text-[10px] font-black text-slate-500 dark:text-emerald-400">Espace Publicitaire</span>
        </div>
        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-300">
          Devenez Premium pour masquer les publicités et débloquer les limites.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-4 p-4 rounded-3xl bg-slate-100 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-emerald-900/30 transition-colors relative">
      <div className="absolute top-2 left-3 text-[8px] uppercase font-bold text-slate-400">Publicité</div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-emerald-900/60 flex items-center justify-center text-xl">
          🚀
        </div>
        <div>
          <h4 className="font-black text-sm text-slate-700 dark:text-slate-200">Publicité Partenaire</h4>
          <p className="text-xs text-slate-500 dark:text-emerald-400/80">Découvrez nos offres exceptionnelles.</p>
        </div>
      </div>
      <button className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
        En savoir plus
      </button>
    </div>
  );
};
