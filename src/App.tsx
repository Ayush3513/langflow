import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { NewResearch } from './components/NewResearch';
import { YouTubeAnalysis } from './components/YouTubeAnalysis';
import { SocialListening } from './components/SocialListening';
import { CompetitorResearch } from './components/CompetitorResearch';
import { PainPoints } from './components/PainPoints';
import { Trends } from './components/Trends';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { UpgradePlan } from './components/UpgradePlan';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto">
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'new-research' && <NewResearch />}
        {activeSection === 'youtube' && <YouTubeAnalysis />}
        {activeSection === 'social' && <SocialListening />}
        {activeSection === 'competitor' && <CompetitorResearch />}
        {activeSection === 'pain-points' && <PainPoints />}
        {activeSection === 'trends' && <Trends />}
        {activeSection === 'analytics' && <Analytics />}
        {activeSection === 'settings' && <Settings />}
        {activeSection === 'upgrade' && <UpgradePlan />}
      </main>
    </div>
  );
}

export default App;