import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, GraduationCap, Save, Shield, CheckCircle } from 'lucide-react';

export const ProfileView = () => {
  const { profile, updateProfile, logout } = useAuth();

  const [fullName, setFullName] = useState(profile.full_name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [institution, setInstitution] = useState(profile.institution || '');
  const [fieldOfStudy, setFieldOfStudy] = useState(profile.field_of_study || '');
  const [role, setRole] = useState(profile.role || 'student');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      email,
      institution,
      field_of_study: fieldOfStudy,
      role
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-xl flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 font-black text-2xl flex items-center justify-center text-white border-2 border-white/20">
          {fullName.charAt(0) || 'U'}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black">{fullName || 'Étudiant'}</h1>
          <p className="text-xs text-emerald-200">{email} • {institution}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-emerald-950/40 p-6 rounded-3xl border border-slate-200 dark:border-emerald-900/60 shadow-sm space-y-6">
        <h2 className="font-black text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-600" />
          Informations de votre Profil
        </h2>

        {saved && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Profil mis à jour avec succès !
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-emerald-300">
                Nom complet
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 p-3 text-xs rounded-2xl bg-slate-100 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-emerald-300">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 text-xs rounded-2xl bg-slate-100 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-emerald-300">
                Université / Établissement
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full mt-1 p-3 text-xs rounded-2xl bg-slate-100 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-emerald-300">
                Spécialité / Filière
              </label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                className="w-full mt-1 p-3 text-xs rounded-2xl bg-slate-100 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700 dark:text-emerald-300">
              Rôle de l'utilisateur
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-3 text-xs rounded-2xl bg-slate-100 dark:bg-emerald-900/50 border border-slate-200 dark:border-emerald-800 font-bold"
            >
              <option value="student">Étudiant / Praticien</option>
              <option value="teacher">Formateur / Enseignant</option>
              <option value="admin">Administrateur Système</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              type="submit"
              className="btn-algeria-green px-6 py-3 text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Enregistrer les modifications
            </button>

            <button
              type="button"
              onClick={logout}
              className="btn-algeria-red px-5 py-3 text-xs"
            >
              Se déconnecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
