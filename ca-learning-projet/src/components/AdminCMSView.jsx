import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { Settings, Plus, Edit, Trash2, Save, RefreshCw, CheckCircle } from 'lucide-react';

export const AdminCMSView = () => {
  const [modules, setModules] = useState(() => dataService.getModules());
  const [selectedModule, setSelectedModule] = useState('mod-scf');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'users'
  const [newUser, setNewUser] = useState({ name: '', role: 'student', email: '' });

  const chapters = modules[selectedModule] || [];

  const handleAddLesson = (chapterId) => {
    if (!newLessonTitle) return;

    const updated = { ...modules };
    const chapIndex = updated[selectedModule].findIndex((c) => c.id === chapterId);
    if (chapIndex !== -1) {
      const lessonCount = updated[selectedModule][chapIndex].lessons.length + 1;
      const newLesson = {
        id: `${chapterId}_l${lessonCount}_custom`,
        module_id: chapterId,
        title: `Leçon ${chapIndex + 1}.${lessonCount} : ${newLessonTitle}`,
        content: `### ${newLessonTitle}\nContenu personnalisé généré par l'administrateur.`,
        order_number: lessonCount,
        completed: false,
        score: 0,
        exercises: []
      };

      updated[selectedModule][chapIndex].lessons.push(newLesson);
      setModules(updated);
      dataService.saveModules(updated);
      setNewLessonTitle('');
      setSavedMessage('Nouvelle leçon ajoutée avec succès !');
      setTimeout(() => setSavedMessage(''), 2500);
    }
  };

  const handleEditLesson = (lesson) => {
    setEditingLessonId(lesson.id);
    setEditingContent(JSON.stringify(lesson.exercises || [], null, 2));
  };

  const handleSaveQuestions = (chapId, lessonId) => {
    try {
      const parsed = JSON.parse(editingContent);
      const updated = { ...modules };
      const chapIndex = updated[selectedModule].findIndex((c) => c.id === chapId);
      const lessIndex = updated[selectedModule][chapIndex].lessons.findIndex(l => l.id === lessonId);
      updated[selectedModule][chapIndex].lessons[lessIndex].exercises = parsed;
      setModules(updated);
      dataService.saveModules(updated);
      setEditingLessonId(null);
      setSavedMessage('Questions mises à jour avec succès !');
      setTimeout(() => setSavedMessage(''), 2500);
    } catch (e) {
      alert("Erreur JSON: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 font-extrabold text-xs mb-2">
            ⚙️ Administration & CMS
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Gestion Plateforme</h1>
          <p className="text-xs text-slate-300 mt-1">
            Gérez le contenu des cours et les accès utilisateurs.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-emerald-900/40 pb-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 font-black text-sm border-b-2 transition-colors ${
            activeTab === 'content' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Contenu des Cours
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-black text-sm border-b-2 transition-colors ${
            activeTab === 'users' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Utilisateurs
        </button>
      </div>

      {savedMessage && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {savedMessage}
        </div>
      )}

      {activeTab === 'content' && (
        <>
          {/* Module Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedModule('mod-scf')}
          className={`px-4 py-2 rounded-2xl font-black text-xs ${
            selectedModule === 'mod-scf' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200'
          }`}
        >
          La comptabilité Générale
        </button>
        <button
          onClick={() => setSelectedModule('mod-isa')}
          className={`px-4 py-2 rounded-2xl font-black text-xs ${
            selectedModule === 'mod-isa' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200'
          }`}
        >
          Normes ISA
        </button>
        <button
          onClick={() => setSelectedModule('mod-analytique')}
          className={`px-4 py-2 rounded-2xl font-black text-xs ${
            selectedModule === 'mod-analytique' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200'
          }`}
        >
          Analytique
        </button>
      </div>

      {/* Chapters CMS Editor */}
      <div className="space-y-4">
        {chapters.map((chap) => (
          <div key={chap.id} className="bg-white dark:bg-emerald-950/40 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
            <h3 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between">
              <span>{chap.title}</span>
              <span className="text-[11px] font-bold text-emerald-600">{chap.lessons.length} Leçons</span>
            </h3>

            <div className="space-y-2">
              {chap.lessons.map((l) => (
                <div key={l.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-emerald-900/30 font-semibold space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 dark:text-slate-200">{l.title}</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditLesson(l)}
                        className="p-1 text-slate-400 hover:text-emerald-500"
                        title="Éditer les questions"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {editingLessonId === l.id && (
                    <div className="mt-2 space-y-2">
                      <label className="text-[10px] text-emerald-600 font-bold">Éditeur de Questions (Format JSON)</label>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full h-48 p-2 text-[10px] font-mono rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-950/50"
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingLessonId(null)} className="px-3 py-1 text-xs rounded-xl bg-slate-200 text-slate-600">Annuler</button>
                        <button onClick={() => handleSaveQuestions(chap.id, l.id)} className="px-3 py-1 text-xs rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1">
                          <Save className="w-3 h-3" /> Enregistrer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Add Lesson Input */}
            <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-emerald-900/40">
                  <input
                    type="text"
                    placeholder="Titre de la nouvelle leçon..."
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    className="flex-1 p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800"
                  />
                  <button
                    onClick={() => handleAddLesson(chap.id)}
                    className="btn-algeria-green px-4 py-2.5 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}


      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-emerald-950/40 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
            <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
              Ajouter un Utilisateur
            </h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!newUser.name) return;
                setSavedMessage(`Utilisateur ${newUser.name} (${newUser.role}) ajouté !`);
                setTimeout(() => setSavedMessage(''), 2500);
                setNewUser({ name: '', role: 'student', email: '' });
              }} 
              className="grid grid-cols-1 sm:grid-cols-4 gap-4"
            >
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">NOM COMPLET</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-900/20 text-xs font-semibold"
                  placeholder="Ex: Yacine Admin"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">RÔLE</label>
                <select 
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-emerald-900/20 text-xs font-semibold"
                >
                  <option value="student">Étudiant</option>
                  <option value="teacher">Professeur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Créer
                </button>
              </div>
            </form>
          </div>
          <div className="p-4 text-center text-xs text-slate-500 dark:text-emerald-400 font-bold bg-white dark:bg-emerald-950/20 rounded-2xl border border-slate-100 dark:border-emerald-900/30">
            La liste détaillée des utilisateurs est disponible dans la base de données.
          </div>
        </div>
      )}
    </div>
  );
};
