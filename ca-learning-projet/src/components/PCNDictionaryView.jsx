import React, { useState, useMemo } from 'react';
import { Search, Book, Hash, AlignLeft } from 'lucide-react';
import { PCN_ACCOUNTS } from '../data/pcnData';

export const PCNDictionaryView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = useMemo(() => {
    if (!searchTerm) return PCN_ACCOUNTS;
    const lower = searchTerm.toLowerCase();
    return PCN_ACCOUNTS.filter(acc => 
      acc.code.includes(lower) || acc.name.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs mb-3">
            <Book className="w-4 h-4" /> Dictionnaire
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">Comptes de l'SCF</h1>
          <p className="text-sm text-emerald-100 mt-2 max-w-2xl">
            Recherchez rapidement un compte par son numéro (ex: 512) ou par son intitulé (ex: Banque) selon le Système Comptable Financier.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 dark:text-emerald-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Entrez un code ou un nom de compte..."
          className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-800/60 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm text-lg"
        />
      </div>

      {/* Results List */}
      <div className="bg-white dark:bg-emerald-950/40 rounded-3xl border border-slate-200 dark:border-emerald-800/60 shadow-sm overflow-hidden">
        {filteredAccounts.length === 0 ? (
          <div className="p-10 text-center text-slate-500 dark:text-emerald-400">
            Aucun compte ne correspond à votre recherche.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-emerald-900/40">
            {filteredAccounts.map((account) => (
              <div key={account.code} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-emerald-900/20 transition-colors">
                <div className="w-16 h-12 bg-emerald-100 dark:bg-emerald-900/60 rounded-xl flex items-center justify-center font-black text-emerald-700 dark:text-emerald-300 text-lg shrink-0">
                  {account.code}
                </div>
                <div className="flex-1 font-bold text-slate-700 dark:text-slate-200 text-sm sm:text-base">
                  {account.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
