import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { PCNDictionaryView } from './components/PCNDictionaryView';
import { CourseSummariesView } from './components/CourseSummariesView';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgesView } from './components/BadgesView';
import { ProfileView } from './components/ProfileView';
import { TeacherPortalView } from './components/TeacherPortalView';
import { AdminCMSView } from './components/AdminCMSView';
import { LessonQuizModal } from './components/LessonQuizModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { dataService } from './services/dataService';

const MainApp = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [modules, setModules] = useState(() => dataService.getModules());
  const [activeLesson, setActiveLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { profile, updateProfile } = useAuth();

  const handleStartLesson = (lesson) => {
    const today = new Date().toISOString().split('T')[0];
    let { isPremium = false, lessonsStartedToday = 0, lastActiveDate = today } = profile;
    
    if (lastActiveDate !== today) {
      lessonsStartedToday = 0;
      lastActiveDate = today;
    }

    if (!isPremium && lessonsStartedToday >= 3) {
      setShowPremiumModal(true);
      return;
    }

    updateProfile({ lessonsStartedToday: lessonsStartedToday + 1, lastActiveDate });
    setActiveLesson(lesson);
  };

  const loadModules = () => {
    try {
      const data = dataService.getModules();
      setModules(data);
    } catch (e) {
      console.error('Failed to load modules:', e);
    }
  };

  useEffect(() => {
    loadModules();
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-emerald-950/20 dark:bg-[#041f15] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Header Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAI={() => setShowAIModal(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

        <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
          {(currentTab === 'dashboard' || currentTab === 'learn') && (
            <DashboardView
              modules={modules}
              onStartLesson={handleStartLesson}
              searchQuery={searchQuery}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'pcn' && <PCNDictionaryView />}
          {currentTab === 'summaries' && <CourseSummariesView />}
          {currentTab === 'leaderboard' && <LeaderboardView />}
          {currentTab === 'badges' && <BadgesView />}
          {currentTab === 'profile' && <ProfileView />}
          {currentTab === 'teacher' && <TeacherPortalView />}
          {currentTab === 'admin' && <AdminCMSView />}
        </main>
      </div>

      <Footer />

      {/* Interactive Lesson Reader / Quiz Player Modal */}
      {activeLesson && (
        <LessonQuizModal
          lesson={activeLesson}
          onExit={() => {
            setActiveLesson(null);
            loadModules();
          }}
        />
      )}

      {/* AI Assistant Chatbot Modal */}
      {showAIModal && (
        <AIAssistantModal onClose={() => setShowAIModal(false)} />
      )}

      {/* Premium Paywall Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-emerald-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-500/30 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
              <span className="text-3xl">⭐</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">Limite journalière atteinte</h2>
            <p className="text-slate-600 dark:text-emerald-100/80 text-sm font-medium">
              Vous avez atteint votre limite de 3 leçons par jour dans la version gratuite. Passez à la version Premium pour un accès illimité à tous les cours et fonctionnalités avancées.
            </p>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-500 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-800/50 transition-colors"
              >
                Plus tard
              </button>
              <button 
                onClick={() => {
                  updateProfile({ isPremium: true });
                  setShowPremiumModal(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
              >
                Devenir Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </AuthProvider>
  );
}
