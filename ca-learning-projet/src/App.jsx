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
  const { profile, updateProfile } = useAuth();

  const handleStartLesson = (lesson) => {
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
