import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-emerald-900/40 bg-[#062c1d] dark:bg-[#031710] py-4 px-6 text-center text-xs text-emerald-200/80 font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 justify-center">
          <strong className="font-black text-white">CA learning</strong>
          — Système Comptable Financier Algérien (Loi 07-11) 🇩🇿
        </span>
        <span>© 2026 CA learning. Tous droits réservés.</span>
      </div>
    </footer>
  );
};
