import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthCard from "./components/AuthCard";
import Dashboard from "./components/Dashboard";
import { Toaster } from "sonner";

type View = "landing" | "auth" | "dashboard";

function App() {
  const [view, setView] = useState<View>("landing");
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  // Handle navigation
  const navigateToAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setView("auth");
  };

  const navigateToDashboard = () => {
    setView("dashboard");
  };

  const navigateToLanding = () => {
    setView("landing");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30">
      <Toaster position="top-center" richColors />
      
      {view === "landing" && (
        <LandingPage 
          onJoin={() => navigateToAuth("register")} 
          onLogin={() => navigateToAuth("login")} 
        />
      )}

      {view === "auth" && (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
          <AuthCard 
            initialMode={authMode} 
            onSuccess={navigateToDashboard} 
            onBack={navigateToLanding}
          />
        </div>
      )}

      {view === "dashboard" && (
        <Dashboard onLogout={navigateToLanding} />
      )}
    </div>
  );
}

export default App;