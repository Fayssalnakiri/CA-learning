import React, { useState } from 'react';
import { askAIAssistant } from '../services/aiService';
import { Bot, Send, X, Sparkles, User } from 'lucide-react';

export const AIAssistantModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Bonjour ! Je suis l'**IA Comptable Algérienne (SCF - Loi 07-11)**. Posez-moi vos questions sur le Bilan, la TVA G50, les écritures Débit/Crédit ou les normes ISA !"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    const response = await askAIAssistant(currentInput);
    setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-[#062c1d] max-w-xl w-full h-[600px] rounded-3xl border border-emerald-900/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-black text-sm">IA Comptable Algérienne</h3>
              <p className="text-[10px] text-emerald-200">Assistant virtuel SCF & Normes ISA 🇩🇿</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-emerald-950/40 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-3.5 rounded-2xl max-w-[80%] font-medium leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-emerald-900/60 text-slate-800 dark:text-emerald-100 border border-slate-200 dark:border-emerald-800/60 rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>L'IA analyse le Système Comptable Financier...</span>
            </div>
          )}
        </div>

        {/* Footer Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#062c1d] border-t border-slate-200 dark:border-emerald-900/40 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question comptable..."
            className="flex-1 p-3 text-xs rounded-2xl bg-slate-100 dark:bg-emerald-950/60 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-algeria-green p-3 text-xs flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
