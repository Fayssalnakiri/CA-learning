import React, { useState } from 'react';
import { Book, FileText, Download, Plus, Clock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CourseSummariesView = () => {
  const { profile } = useAuth();
  const isTeacher = profile.role === 'teacher' || profile.role === 'admin';
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for summaries
  const [summaries, setSummaries] = useState([
    {
      id: 1,
      title: "Résumé: L'entreprise et son environnement",
      author: "Pr. Amine (Expert)",
      date: "12 Sept 2026",
      module: "La comptabilité Générale",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Fiche de synthèse: La TVA (G50)",
      author: "Mme. Yasmine",
      date: "10 Sept 2026",
      module: "La comptabilité Générale",
      size: "1.1 MB"
    },
    {
      id: 3,
      title: "Schéma: L'équilibre du Bilan",
      author: "Equipe Pédagogique",
      date: "05 Sept 2026",
      module: "La comptabilité Générale",
      size: "800 KB"
    }
  ]);

  const [newSummary, setNewSummary] = useState({ title: '', module: 'La comptabilité Générale' });

  const handleAddSummary = (e) => {
    e.preventDefault();
    if (!newSummary.title) return;
    
    setSummaries([
      {
        id: Date.now(),
        title: newSummary.title,
        author: profile.full_name,
        date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
        module: newSummary.module,
        size: "1.0 MB" // Mock size
      },
      ...summaries
    ]);
    setShowAddForm(false);
    setNewSummary({ title: '', module: 'La comptabilité Générale' });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs mb-3 border border-emerald-500/30">
              <Book className="w-4 h-4" /> Ressources Pédagogiques
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Résumés des Cours
            </h1>
            <p className="text-sm text-emerald-100/80 mt-2 max-w-xl">
              Consultez et téléchargez les fiches de révision et les résumés proposés par vos professeurs pour préparer vos examens.
            </p>
          </div>
          {isTeacher && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="shrink-0 px-5 py-3 rounded-2xl bg-white text-emerald-900 font-black text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              Proposer un Résumé
            </button>
          )}
        </div>
      </div>

      {/* Add Form (Teacher only) */}
      {isTeacher && showAddForm && (
        <form onSubmit={handleAddSummary} className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 shadow-sm space-y-4">
          <h3 className="font-black text-lg text-slate-800 dark:text-emerald-100">Ajouter un nouveau résumé</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-emerald-400 mb-1">Titre du résumé</label>
              <input
                type="text"
                value={newSummary.title}
                onChange={(e) => setNewSummary({ ...newSummary, title: e.target.value })}
                placeholder="Ex: Fiche de synthèse Bilan..."
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/60 focus:outline-none focus:border-emerald-500 text-sm font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-emerald-400 mb-1">Module</label>
              <select
                value={newSummary.module}
                onChange={(e) => setNewSummary({ ...newSummary, module: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/60 focus:outline-none focus:border-emerald-500 text-sm font-semibold"
              >
                <option>La comptabilité Générale</option>
                <option>Normes Audit ISA</option>
                <option>Comptabilité Analytique</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-emerald-400 mb-1">Fichier (Simulation)</label>
            <div className="w-full p-6 border-2 border-dashed border-slate-300 dark:border-emerald-800 rounded-xl text-center text-slate-500 dark:text-emerald-400 text-sm font-bold bg-slate-50 dark:bg-emerald-900/20 cursor-pointer hover:bg-slate-100 dark:hover:bg-emerald-900/40 transition-colors">
              Cliquez ou glissez un fichier PDF ici
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddForm(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-emerald-900/50 transition-colors">
              Annuler
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-colors">
              Publier le résumé
            </button>
          </div>
        </form>
      )}

      {/* Summaries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaries.map((summary) => (
          <div key={summary.id} className="bg-white dark:bg-emerald-950/40 rounded-2xl p-5 border border-slate-200 dark:border-emerald-800/60 flex items-start gap-4 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors group cursor-pointer shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-slate-800 dark:text-slate-100 truncate text-base">{summary.title}</h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold truncate">{summary.module}</p>
              
              <div className="flex items-center gap-4 mt-3 text-[10px] font-bold text-slate-500 dark:text-emerald-300/70">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {summary.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {summary.date}</span>
                <span>{summary.size}</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-emerald-900/40 text-slate-600 dark:text-emerald-300 flex items-center justify-center shrink-0 hover:bg-emerald-600 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
