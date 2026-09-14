import React, { useState } from 'react';
import { 
  Award, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

export const ExamsView = () => {
  const [selectedExam, setSelectedExam] = useState(null);

  const exams = [
    {
      id: 'scf-diploma',
      title: "Examen Final — Diplôme Praticien SCF Algérie",
      category: "Certification Nationale",
      duration: "45 Minutes",
      questionsCount: 40,
      passingScore: 75,
      description: "Épreuve complète sur le Système Comptable Financier Algérien (Loi 07-11), les écritures du journal, le montage des états financiers (Bilan, CR) et l'inventaire.",
      reward: "Attestation Praticien SCF + 500 XP",
      difficulty: "Difficile",
      status: "Disponible"
    },
    {
      id: 'isa-audit-exam',
      title: "Examen — Audit & Commissariat aux Comptes (ISA)",
      category: "Normes ISA",
      duration: "30 Minutes",
      questionsCount: 25,
      passingScore: 70,
      description: "Évaluation sur la mise en œuvre des normes d'audit ISA 200 à 700, l'évaluation du contrôle interne et la rédaction du rapport d'audit.",
      reward: "Badge Auditeur Senior + 350 XP",
      difficulty: "Intermédiaire",
      status: "Disponible"
    },
    {
      id: 'analytique-exam',
      title: "Examen — Contrôle de Gestion & Comptabilité Analytique",
      category: "Analytique",
      duration: "30 Minutes",
      questionsCount: 25,
      passingScore: 70,
      description: "Calcul des coûts complets, coûts variables, seuil de rentabilité, imputation rationnelle et méthode ABC.",
      reward: "Badge Analyste Coûts + 300 XP",
      difficulty: "Intermédiaire",
      status: "Disponible"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs mb-2">
            🎓 Centre de Certification
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Examens Diplômants SCF & ISA</h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            Testez vos connaissances en conditions d'examen réelles et obtenez vos attestations certifiées.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <div className="text-xs font-black">
            <div>Conforme Loi 07-11</div>
            <span className="text-[10px] text-emerald-300 font-medium">Reconnu par les universités</span>
          </div>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white dark:bg-emerald-950/40 rounded-3xl p-6 border border-slate-200 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {exam.category}
                </span>
                <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {exam.difficulty}
                </span>
              </div>

              <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                {exam.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-emerald-200/80 font-medium line-clamp-3">
                {exam.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-extrabold pt-2 border-t border-slate-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-emerald-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{exam.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-emerald-300">
                  <FileText className="w-3.5 h-3.5 text-sky-500" />
                  <span>{exam.questionsCount} Questions</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-emerald-900/40">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                <span>Score requis : {exam.passingScore}%</span>
                <span>Récompense : {exam.reward}</span>
              </div>

              <button
                onClick={() => alert(`L'examen "${exam.title}" démarre en mode chrono (45 min). Préparez vos calculatrices et votre Plan Comptable !`)}
                className="w-full btn-algeria-green py-3 text-xs flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Commencer l'épreuve</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
