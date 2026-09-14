import React, { useState } from 'react';
import { PCN_ACCOUNTS, PCN_CLASSES } from '../data/pcnAccounts';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  BookOpen,
  ArrowRightLeft,
  Scale
} from 'lucide-react';

export const SimulatorView = () => {
  const [activeTab, setActiveTab] = useState('journal');
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      debitAccount: PCN_ACCOUNTS.find((a) => a.code === '512') || PCN_ACCOUNTS[0],
      debitAmount: '500000',
      creditAccount: PCN_ACCOUNTS.find((a) => a.code === '101') || PCN_ACCOUNTS[1],
      creditAmount: '500000',
      label: "Apport initial de capital par chèque bancaire",
    },
    {
      id: 2,
      date: new Date().toISOString().split('T')[0],
      debitAccount: PCN_ACCOUNTS.find((a) => a.code === '607') || PCN_ACCOUNTS[0],
      debitAmount: '150000',
      creditAccount: PCN_ACCOUNTS.find((a) => a.code === '512') || PCN_ACCOUNTS[1],
      creditAmount: '150000',
      label: "Achat de marchandises réglé par banque",
    }
  ]);

  const [searchFilter, setSearchFilter] = useState('');
  const [showPcnModal, setShowPcnModal] = useState(false);

  // New entry form state
  const [newLabel, setNewLabel] = useState('');
  const [newDebitCode, setNewDebitCode] = useState('607');
  const [newDebitAmount, setNewDebitAmount] = useState('');
  const [newCreditCode, setNewCreditCode] = useState('512');
  const [newCreditAmount, setNewCreditAmount] = useState('');

  const totalDebit = entries.reduce((sum, e) => sum + (parseFloat(e.debitAmount) || 0), 0);
  const totalCredit = entries.reduce((sum, e) => sum + (parseFloat(e.creditAmount) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01 && totalDebit > 0;

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newDebitAmount || !newCreditAmount) return;

    const debitAcc = PCN_ACCOUNTS.find((a) => a.code === newDebitCode) || PCN_ACCOUNTS[0];
    const creditAcc = PCN_ACCOUNTS.find((a) => a.code === newCreditCode) || PCN_ACCOUNTS[1];

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      debitAccount: debitAcc,
      debitAmount: newDebitAmount,
      creditAccount: creditAcc,
      creditAmount: newCreditAmount,
      label: newLabel || `Écriture du ${debitAcc.code} au ${creditAcc.code}`,
    };

    setEntries([...entries, newEntry]);
    setNewLabel('');
    setNewDebitAmount('');
    setNewCreditAmount('');
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  // Group entries into T-Accounts for visual demonstration
  const tAccounts = {};
  entries.forEach((e) => {
    const dCode = e.debitAccount.code;
    const dName = e.debitAccount.name;
    const cCode = e.creditAccount.code;
    const cName = e.creditAccount.name;

    if (!tAccounts[dCode]) tAccounts[dCode] = { name: dName, debits: [], credits: [] };
    if (!tAccounts[cCode]) tAccounts[cCode] = { name: cName, debits: [], credits: [] };

    tAccounts[dCode].debits.push(parseFloat(e.debitAmount) || 0);
    tAccounts[cCode].credits.push(parseFloat(e.creditAmount) || 0);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs mb-2">
            🧮 Outil de Pratique SCF Algérie
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Simulateur Journal & Équilibrage Bilan</h1>
          <p className="text-xs text-emerald-200/80 mt-1">
            Saisissez vos opérations comptables, vérifiez l'égalité Débit = Crédit et visualisez les comptes en T et le Bilan.
          </p>
        </div>

        {/* Balance Status Badge */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3 shrink-0 ${
          isBalanced 
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
        }`}>
          {isBalanced ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <XCircle className="w-8 h-8 text-rose-400" />}
          <div>
            <div className="font-black text-sm">
              {isBalanced ? "ÉQUILIBRE RESPECTÉ" : "DÉSÉQUILIBRE DÉBIT/CRÉDIT"}
            </div>
            <p className="text-[11px] opacity-80">
              Débit Total : {totalDebit.toLocaleString()} DA | Crédit Total : {totalCredit.toLocaleString()} DA
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 border-b border-emerald-900/20 dark:border-emerald-800/40 pb-3">
        <button
          onClick={() => setActiveTab('journal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all ${
            activeTab === 'journal' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Livre Journal</span>
        </button>

        <button
          onClick={() => setActiveTab('t-accounts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all ${
            activeTab === 't-accounts' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Comptes en T (Grand Livre)</span>
        </button>

        <button
          onClick={() => setActiveTab('pcn')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all ${
            activeTab === 'pcn' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-950/40 text-slate-700 dark:text-emerald-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Système Comptable (SCF 7 Classes)</span>
        </button>
      </div>

      {activeTab === 'journal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Entry Form */}
          <div className="bg-white dark:bg-emerald-950/40 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
            <h3 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-600" />
              Saisir une nouvelle écriture
            </h3>

            <form onSubmit={handleAddEntry} className="space-y-3">
              <div>
                <label className="text-[11px] font-extrabold text-slate-600 dark:text-emerald-300">
                  Libellé de l'opération
                </label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Ex: Facture N° 104 Fournisseur..."
                  className="w-full mt-1 p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300">
                  COMPTE DÉBITÉ (+)
                </span>
                <select
                  value={newDebitCode}
                  onChange={(e) => setNewDebitCode(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800"
                >
                  {PCN_ACCOUNTS.map((acc) => (
                    <option key={acc.code} value={acc.code}>
                      {acc.code} - {acc.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={newDebitAmount}
                  onChange={(e) => setNewDebitAmount(e.target.value)}
                  placeholder="Montant Débit (DA)"
                  className="w-full p-2 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800"
                  required
                />
              </div>

              <div className="p-3 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-2">
                <span className="text-[11px] font-black text-sky-700 dark:text-sky-300">
                  COMPTE CRÉDITÉ (-)
                </span>
                <select
                  value={newCreditCode}
                  onChange={(e) => setNewCreditCode(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800"
                >
                  {PCN_ACCOUNTS.map((acc) => (
                    <option key={acc.code} value={acc.code}>
                      {acc.code} - {acc.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={newCreditAmount}
                  onChange={(e) => setNewCreditAmount(e.target.value)}
                  placeholder="Montant Crédit (DA)"
                  className="w-full p-2 text-xs rounded-xl bg-white dark:bg-emerald-900/80 border border-slate-200 dark:border-emerald-800"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-algeria-green py-3 text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter à la pièce comptable</span>
              </button>
            </form>
          </div>

          {/* Journal Table View */}
          <div className="lg:col-span-2 bg-white dark:bg-emerald-950/40 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 overflow-hidden">
            <h3 className="font-black text-sm text-slate-800 dark:text-slate-100 mb-4">
              Livre Journal de l'Entreprise (Loi 07-11)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-emerald-900/60 text-slate-700 dark:text-emerald-200 uppercase text-[10px] font-black">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">N° Compte & Libellé</th>
                    <th className="p-3 text-right">Débit (DA)</th>
                    <th className="p-3 text-right">Crédit (DA)</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/40">
                  {entries.map((entry) => (
                    <React.Fragment key={entry.id}>
                      {/* Debit Line */}
                      <tr className="bg-emerald-500/5 font-semibold">
                        <td className="p-3 text-slate-500">{entry.date}</td>
                        <td className="p-3">
                          <span className="font-black text-emerald-700 dark:text-emerald-300">
                            {entry.debitAccount.code}
                          </span>{' '}
                          - {entry.debitAccount.name}
                        </td>
                        <td className="p-3 text-right font-black text-emerald-600">
                          {parseFloat(entry.debitAmount).toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-slate-400">-</td>
                        <td className="p-3 text-center" rowSpan={2}>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors"
                            title="Supprimer l'écriture"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      {/* Credit Line */}
                      <tr className="bg-sky-500/5 font-semibold">
                        <td className="p-3 text-slate-400"></td>
                        <td className="p-3 pl-8">
                          <span className="font-black text-sky-700 dark:text-sky-300">
                            {entry.creditAccount.code}
                          </span>{' '}
                          - {entry.creditAccount.name}
                        </td>
                        <td className="p-3 text-right text-slate-400">-</td>
                        <td className="p-3 text-right font-black text-sky-600">
                          {parseFloat(entry.creditAmount).toLocaleString()}
                        </td>
                      </tr>
                      {/* Explanation Line */}
                      <tr className="border-b border-slate-200 dark:border-emerald-800/40 bg-slate-50/50 dark:bg-emerald-950/20">
                        <td colSpan={5} className="p-2 text-[10px] italic text-slate-500 dark:text-emerald-400/80 pl-8">
                          (Libellé : {entry.label})
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot className="bg-emerald-950 text-white font-black text-xs">
                  <tr>
                    <td colSpan={2} className="p-3">TOTAL DU JOURNAL</td>
                    <td className="p-3 text-right text-emerald-300">{totalDebit.toLocaleString()} DA</td>
                    <td className="p-3 text-right text-sky-300">{totalCredit.toLocaleString()} DA</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 't-accounts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(tAccounts).map(([code, data]) => {
            const sumDebits = data.debits.reduce((a, b) => a + b, 0);
            const sumCredits = data.credits.reduce((a, b) => a + b, 0);
            const solde = sumDebits - sumCredits;

            return (
              <div key={code} className="bg-white dark:bg-emerald-950/40 p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/60 space-y-3">
                <div className="border-b-2 border-emerald-600 pb-2 text-center">
                  <span className="font-black text-sm text-emerald-700 dark:text-emerald-300">
                    Compte {code}
                  </span>
                  <p className="text-[11px] font-bold text-slate-600 dark:text-emerald-200 truncate">
                    {data.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Debit Side */}
                  <div className="border-r border-slate-200 dark:border-emerald-800/40 pr-2 space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 block text-center">DÉBIT</span>
                    {data.debits.map((d, i) => (
                      <div key={i} className="text-emerald-700 dark:text-emerald-300 font-semibold text-right">
                        {d.toLocaleString()} DA
                      </div>
                    ))}
                  </div>

                  {/* Credit Side */}
                  <div className="pl-2 space-y-1">
                    <span className="text-[10px] font-black text-sky-600 block text-center">CRÉDIT</span>
                    {data.credits.map((c, i) => (
                      <div key={i} className="text-sky-700 dark:text-sky-300 font-semibold text-right">
                        {c.toLocaleString()} DA
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solde Summary */}
                <div className="pt-2 border-t border-slate-200 dark:border-emerald-800/40 flex justify-between items-center text-xs font-black">
                  <span>Solde:</span>
                  <span className={solde >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                    {Math.abs(solde).toLocaleString()} DA ({solde >= 0 ? 'Débiteur' : 'Créditeur'})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'pcn' && (
        <div className="bg-white dark:bg-emerald-950/40 p-5 rounded-3xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="font-black text-sm text-slate-800 dark:text-slate-100">
              Nomenclature des 7 Classes du Système Comptable Financier (SCF)
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrer les comptes..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-emerald-900/60 border border-slate-200 dark:border-emerald-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PCN_CLASSES.map((cls) => {
              const accounts = PCN_ACCOUNTS.filter(
                (a) => a.classCode === cls.code &&
                (!searchFilter || a.code.includes(searchFilter) || a.name.toLowerCase().includes(searchFilter.toLowerCase()))
              );

              return (
                <div key={cls.code} className="p-4 rounded-2xl border border-slate-200 dark:border-emerald-800/40 bg-slate-50/50 dark:bg-emerald-900/20 space-y-2">
                  <div className="font-black text-xs text-emerald-700 dark:text-emerald-300 border-b border-slate-200 dark:border-emerald-800/40 pb-1 flex items-center justify-between">
                    <span>Classe {cls.code} : {cls.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{accounts.length} comptes</span>
                  </div>
                  <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                    {accounts.map((acc) => (
                      <div key={acc.code} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-emerald-900/20">
                        <span className="font-black text-emerald-600 dark:text-emerald-400 w-12">{acc.code}</span>
                        <span className="flex-1 font-semibold text-slate-700 dark:text-emerald-200 truncate">{acc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
