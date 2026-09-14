import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { dataService } from '../services/dataService';
import { QuizResultModal } from './QuizResultModal';
import { PCN_ACCOUNTS } from '../data/pcnAccounts';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BookOpen, 
  ArrowRight, 
  Zap,
  Calculator,
  Clock
} from 'lucide-react';

export const LessonQuizModal = ({ lesson, onExit }) => {
  const exercises = lesson.exercises || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);
  const [openAnswer, setOpenAnswer] = useState('');

  // Debit Credit entry state
  const [debitCode, setDebitCode] = useState('607');
  const [debitAmount, setDebitAmount] = useState('');
  const [creditCode, setCreditCode] = useState('512');
  const [creditAmount, setCreditAmount] = useState('');

  const [stepState, setStepState] = useState('answering'); // 'answering' | 'correct' | 'incorrect'
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = exercises[currentIndex];
  const progressPercent = exercises.length > 0 ? Math.round(((currentIndex) / exercises.length) * 100) : 0;

  const [timeLeft, setTimeLeft] = useState(lesson.isTimed ? (lesson.timeLimit || 300) : null);

  useEffect(() => {
    if (lesson.isTimed && timeLeft > 0 && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (lesson.isTimed && timeLeft === 0 && !isFinished) {
      setIsFinished(true); // Auto finish
    }
  }, [timeLeft, lesson.isTimed, isFinished]);

  const handleVerify = () => {
    if (!currentQ) return;
    let isCorrect = false;

    if (currentQ.type === 'qcm') {
      const correctOpt = currentQ.options?.find((o) => o.is_correct);
      isCorrect = selectedOptionId === correctOpt?.id;
    } else if (currentQ.type === 'true_false') {
      isCorrect = trueFalseAnswer === currentQ.answer;
    } else if (currentQ.type === 'open') {
      isCorrect = openAnswer.trim() === String(currentQ.answer).trim();
    } else if (currentQ.type === 'accounting_entry') {
      try {
        const expected = typeof currentQ.answer === 'string' ? JSON.parse(currentQ.answer) : currentQ.answer;
        const debitMatch = debitCode === expected.debitAccount.split(' ')[0] || debitCode === expected.debitAccount.split('-')[0].trim();
        const creditMatch = creditCode === expected.creditAccount.split(' ')[0] || creditCode === expected.creditAccount.split('-')[0].trim();
        const amountMatch = parseFloat(debitAmount) === expected.debitAmount && parseFloat(creditAmount) === expected.creditAmount;
        isCorrect = debitMatch && creditMatch && amountMatch;
      } catch (e) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      setStepState('correct');
      setCorrectCount((prev) => prev + 1);
      audioService.playCorrect();
    } else {
      setStepState('incorrect');
      audioService.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setTrueFalseAnswer(null);
      setOpenAnswer('');
      setDebitAmount('');
      setCreditAmount('');
      setStepState('answering');
    } else {
      // Quiz Finished
      const finalScore = Math.round(((correctCount + (stepState === 'correct' ? 1 : 0)) / exercises.length) * 100);
      dataService.completeLesson(lesson.id, finalScore, 25);
      audioService.playSuccess();
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const finalScore = Math.round((correctCount / exercises.length) * 100);
    return (
      <QuizResultModal
        score={finalScore}
        xpEarned={25}
        totalQuestions={exercises.length}
        correctCount={correctCount}
        onContinue={onExit}
      />
    );
  }

  if (!currentQ) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#062c1d] p-6 rounded-3xl text-center space-y-4">
          <h3 className="font-black text-lg">Leçon théorique terminée !</h3>
          <button onClick={onExit} className="btn-algeria-green px-6 py-3 text-xs">Fermer</button>
        </div>
      </div>
    );
  }

  const canVerify =
    (currentQ.type === 'qcm' && selectedOptionId !== null) ||
    (currentQ.type === 'true_false' && trueFalseAnswer !== null) ||
    (currentQ.type === 'open' && openAnswer.trim() !== '') ||
    (currentQ.type === 'accounting_entry' && debitAmount !== '' && creditAmount !== '');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col justify-between animate-in fade-in">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-6 bg-white dark:bg-[#062c1d] border-b border-emerald-900/20 max-w-4xl w-full mx-auto flex items-center justify-between gap-4">
        <button
          onClick={onExit}
          className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-emerald-900/60 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xl flex items-center gap-3">
          <div className="flex-1 h-3 bg-slate-100 dark:bg-emerald-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-300">
            {currentIndex + 1} / {exercises.length}
          </span>
        </div>

        <div className="flex items-center gap-1 text-amber-500 font-black text-xs bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
          <Zap className="w-4 h-4 fill-amber-500" />
          <span>+25 XP</span>
        </div>

        {lesson.isTimed && timeLeft !== null && (
          <div className={`flex items-center gap-1 font-black text-xs px-3 py-1.5 rounded-xl border ${timeLeft < 60 ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
            <Clock className="w-4 h-4" />
            <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
        )}
      </div>

      {/* Main Question Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl w-full mx-auto space-y-6 flex flex-col justify-center">
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {currentQ.type === 'accounting_entry' ? 'Journal & Écriture Comptable' : currentQ.type === 'qcm' ? 'QCM Théorique' : 'Question Pratique'}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* QCM Type */}
        {currentQ.type === 'qcm' && (
          <div className="space-y-3">
            {currentQ.options?.map((opt) => {
              const selected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => stepState === 'answering' && setSelectedOptionId(opt.id)}
                  className={`p-4 rounded-2xl border font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                    selected
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500'
                      : 'bg-white dark:bg-emerald-950/50 border-slate-200 dark:border-emerald-900/60 hover:bg-emerald-500/5'
                  }`}
                >
                  {opt.option_text}
                </div>
              );
            })}
          </div>
        )}

        {/* True False Type */}
        {currentQ.type === 'true_false' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => stepState === 'answering' && setTrueFalseAnswer('vrai')}
              className={`p-6 rounded-3xl border font-black text-base transition-all ${
                trueFalseAnswer === 'vrai'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-white dark:bg-emerald-950/50 border-slate-200 dark:border-emerald-900/60 text-slate-800 dark:text-slate-100'
              }`}
            >
              👍 VRAI
            </button>
            <button
              onClick={() => stepState === 'answering' && setTrueFalseAnswer('faux')}
              className={`p-6 rounded-3xl border font-black text-base transition-all ${
                trueFalseAnswer === 'faux'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-lg'
                  : 'bg-white dark:bg-emerald-950/50 border-slate-200 dark:border-emerald-900/60 text-slate-800 dark:text-slate-100'
              }`}
            >
              👎 FAUX
            </button>
          </div>
        )}

        {/* Open Input Type */}
        {currentQ.type === 'open' && (
          <div>
            <input
              type="text"
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              placeholder="Saisissez la valeur exacte en DA..."
              className="w-full p-4 text-sm font-black rounded-2xl bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500"
              disabled={stepState !== 'answering'}
            />
          </div>
        )}

        {/* Accounting Entry Type */}
        {currentQ.type === 'accounting_entry' && (
          <div className="bg-white dark:bg-emerald-950/50 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300">
                1. COMPTE DÉBITÉ (+)
              </span>
              <select
                value={debitCode}
                onChange={(e) => setDebitCode(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800"
                disabled={stepState !== 'answering'}
              >
                {PCN_ACCOUNTS.map((acc) => (
                  <option key={acc.code} value={acc.code}>
                    {acc.code} - {acc.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={debitAmount}
                onChange={(e) => setDebitAmount(e.target.value)}
                placeholder="Montant Débit (DA)"
                className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800 font-bold"
                disabled={stepState !== 'answering'}
              />
            </div>

            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-2">
              <span className="text-[11px] font-black text-sky-700 dark:text-sky-300">
                2. COMPTE CRÉDITÉ (-)
              </span>
              <select
                value={creditCode}
                onChange={(e) => setCreditCode(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800"
                disabled={stepState !== 'answering'}
              >
                {PCN_ACCOUNTS.map((acc) => (
                  <option key={acc.code} value={acc.code}>
                    {acc.code} - {acc.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="Montant Crédit (DA)"
                className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800 font-bold"
                disabled={stepState !== 'answering'}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Verification Bar */}
      <div className={`p-4 sm:p-6 border-t transition-colors ${
        stepState === 'correct'
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : stepState === 'incorrect'
          ? 'bg-rose-500/10 border-rose-500/30'
          : 'bg-white dark:bg-[#062c1d] border-emerald-900/20'
      }`}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            {stepState === 'correct' && (
              <div className="flex items-start gap-3 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-base">EXCELLENT ! BONNE RÉPONSE</h4>
                  <p className="text-xs font-semibold mt-0.5">{currentQ.explanation}</p>
                </div>
              </div>
            )}

            {stepState === 'incorrect' && (
              <div className="flex items-start gap-3 text-rose-700 dark:text-rose-300">
                <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-base">PAS TOUT À FAIT...</h4>
                  <p className="text-xs font-semibold mt-0.5">{currentQ.explanation}</p>
                </div>
              </div>
            )}
          </div>

          {stepState === 'answering' ? (
            <button
              onClick={handleVerify}
              disabled={!canVerify}
              className={`w-full sm:w-auto px-10 py-3.5 text-xs ${
                canVerify
                  ? 'btn-algeria-green'
                  : 'bg-slate-200 dark:bg-emerald-950 text-slate-400 font-black rounded-2xl cursor-not-allowed border border-emerald-900'
              }`}
            >
              VÉRIFIER
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full sm:w-auto px-10 py-3.5 text-xs ${
                stepState === 'correct' ? 'btn-algeria-green' : 'btn-algeria-red'
              }`}
            >
              CONTINUER
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
