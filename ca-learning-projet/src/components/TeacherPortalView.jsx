import React, { useState } from 'react';
import { GraduationCap, Users, BookOpen, Award, CheckCircle, BarChart3, Plus, Copy } from 'lucide-react';

export const TeacherPortalView = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Amine Benali", progress: "92%", score: "18.5/20", lastActive: "Aujourd'hui" },
    { id: 2, name: "Yasmine Mansouri", progress: "88%", score: "17.0/20", lastActive: "Hier" },
    { id: 3, name: "Karim Belkacem", progress: "76%", score: "15.5/20", lastActive: "Il y a 2 jours" },
    { id: 4, name: "Meriem Zerrouki", progress: "64%", score: "14.0/20", lastActive: "Il y a 3 jours" },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '' });
  const [addedCredentials, setAddedCredentials] = useState(null);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.firstName || !newStudent.lastName) return;

    const fullName = `${newStudent.firstName} ${newStudent.lastName}`;
    const generatedPassword = Math.random().toString(36).slice(-8) + "!";
    
    setStudents([
      {
        id: Date.now(),
        name: fullName,
        progress: "0%",
        score: "-",
        lastActive: "Jamais"
      },
      ...students
    ]);

    setAddedCredentials({
      email: newStudent.email || `${newStudent.firstName.toLowerCase()}.${newStudent.lastName.toLowerCase()}@ca-learning.dz`,
      password: generatedPassword
    });
    
    setNewStudent({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-950 text-white shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-extrabold text-xs mb-2">
            🎓 Espace Enseignant & Formateur
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Suivi des Étudiants</h1>
          <p className="text-xs text-teal-200/80 mt-1">
            Consultez les résultats aux exercices, affectez des travaux pratiques et suivez la progression de votre promotion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">48</div>
            <span className="text-xs text-slate-500 dark:text-emerald-400 font-bold">Étudiants Inscrits</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-black">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">16.2 / 20</div>
            <span className="text-xs text-slate-500 dark:text-emerald-400 font-bold">Moyenne de Promotion</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">84%</div>
            <span className="text-xs text-slate-500 dark:text-emerald-400 font-bold">Taux de Réussite</span>
          </div>
        </div>
      </div>

      {/* Student List & Add Action */}
      <div className="bg-white dark:bg-emerald-950/40 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
            Liste des Élèves de la Promotion
          </h3>
          <button 
            onClick={() => { setShowAddForm(!showAddForm); setAddedCredentials(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter un étudiant
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddStudent} className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 space-y-4">
            <h4 className="font-black text-sm text-emerald-800 dark:text-emerald-300">Nouvel Étudiant</h4>
            
            {addedCredentials ? (
              <div className="p-4 bg-white dark:bg-emerald-950 rounded-xl border border-emerald-300 dark:border-emerald-700 space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <CheckCircle className="w-5 h-5" /> Étudiant ajouté avec succès !
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Veuillez transmettre ces identifiants à l'étudiant. Le mot de passe ne s'affichera qu'une seule fois.
                </p>
                <div className="bg-slate-50 dark:bg-emerald-900/50 p-3 rounded-lg font-mono text-sm space-y-1">
                  <div><span className="text-slate-400">Email:</span> <span className="font-bold">{addedCredentials.email}</span></div>
                  <div><span className="text-slate-400">Mot de passe:</span> <span className="font-bold text-emerald-600 dark:text-emerald-400">{addedCredentials.password}</span></div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setAddedCredentials(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold"
                >
                  Ajouter un autre
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">PRÉNOM</label>
                    <input 
                      type="text" 
                      required
                      value={newStudent.firstName}
                      onChange={e => setNewStudent({...newStudent, firstName: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-950 text-xs font-semibold"
                      placeholder="Ex: Amine"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">NOM</label>
                    <input 
                      type="text" 
                      required
                      value={newStudent.lastName}
                      onChange={e => setNewStudent({...newStudent, lastName: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-950 text-xs font-semibold"
                      placeholder="Ex: Benali"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">EMAIL (Optionnel)</label>
                    <input 
                      type="email" 
                      value={newStudent.email}
                      onChange={e => setNewStudent({...newStudent, email: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-white dark:bg-emerald-950 text-xs font-semibold"
                      placeholder="Généré automatiquement si vide"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-200 dark:hover:bg-emerald-800 text-xs font-bold">Annuler</button>
                  <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md">Créer l'accès</button>
                </div>
              </>
            )}
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 uppercase text-[10px] font-black">
              <tr>
                <th className="p-3">Nom & Prénom</th>
                <th className="p-3">Progression du Cours</th>
                <th className="p-3 text-center">Note Moyenne</th>
                <th className="p-3 text-right">Dernière Connexion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/40">
              {students.map((s) => (
                <tr key={s.id} className="font-semibold">
                  <td className="p-3 text-slate-800 dark:text-slate-100 font-black">{s.name}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 dark:bg-emerald-950 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: s.progress }} />
                      </div>
                      <span className="text-emerald-600 font-black text-[11px]">{s.progress}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center font-black text-emerald-600">{s.score}</td>
                  <td className="p-3 text-right text-slate-500">{s.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
