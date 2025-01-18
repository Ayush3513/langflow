import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { NewResearch } from "./components/NewResearch";
import YouTubeAnalysis from "./components/YouTubeAnalysis";
import { SocialListening } from "./components/SocialListening";
import { CompetitorResearch } from "./components/CompetitorResearch";
import { PainPoints } from "./components/PainPoints";
import { Trends } from "./components/Trends";
import { Analytics } from "./components/Analytics";
import { Settings } from "./components/Settings";
import { UpgradePlan } from "./components/UpgradePlan";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-research" element={<NewResearch />} />
            <Route path="/youtube" element={<YouTubeAnalysis />} />
            <Route path="/social" element={<SocialListening />} />
            <Route path="/competitor" element={<CompetitorResearch />} />
            <Route path="/pain-points" element={<PainPoints />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/upgrade" element={<UpgradePlan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
