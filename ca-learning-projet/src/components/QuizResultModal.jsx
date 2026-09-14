import React from 'react';
import { Award, Zap, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

export const QuizResultModal = ({ score, xpEarned, totalQuestions, correctCount, onContinue }) => {
  const isPassed = score >= 50;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-[#062c1d] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-emerald-900/40 text-center space-y-5 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-4xl shadow-inner">
          {isPassed ? '🎉' : '📚'}
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {isPassed ? 'LEÇON RÉUSSIE !' : 'À RÉVISER...'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-emerald-300 font-bold mt-1">
            {isPassed
              ? "Félicitations ! Vous avez validé les acquis de cette leçon."
              : "Continuez de vous entraîner sur le simulateur pour perfectionner vos écritures comptables."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900/60 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 dark:text-emerald-400 font-extrabold uppercase">Score Final</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-300">{score}%</div>
            <p className="text-[10px] text-slate-400">{correctCount} / {totalQuestions} Correctes</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 dark:text-emerald-400 font-extrabold uppercase">XP Gagnés</span>
            <div className="text-xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-amber-500" /> +{xpEarned} XP
            </div>
            <p className="text-[10px] text-slate-400">Bonus Série Active</p>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full btn-algeria-green py-3.5 text-xs flex items-center justify-center gap-2"
        >
          <span>CONTINUER VERS LE TABLEAU DE BORD</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
