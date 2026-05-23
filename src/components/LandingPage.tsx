import React from "react";
import { Zap, Lock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onJoin: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoin, onLogin }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Header Navigation */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="text-2xl font-black tracking-tighter text-white">
          JETPESA
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onLogin}
            className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            Login
          </button>
          <Button 
            onClick={onJoin}
            className="bg-[#00E676] hover:bg-[#00C853] text-black font-black px-6 rounded-md transition-all active:scale-95"
          >
            Join Now
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-24 text-center max-w-4xl mx-auto">
        {/* Visual Sub-header Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E676]/50 bg-[#00E676]/5">
          <span className="text-xs font-black tracking-widest text-[#00E676] uppercase">
            🚀 AFRICA'S NO. 1 INSTANT MULTIPLIER CRASH GAME
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
          Watch the Jet Fly.<br />
          Scale Your Balance.<br />
          <span className="text-zinc-500">Cash Out Before it Crashes.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium">
          Experience real-time financial tracking algorithms. Place your stakes, 
          track the explosive velocity multiplier arc, and watch profits lock up in seconds. 
          Fast payouts via Safaricom M-Pesa instantly.
        </p>

        {/* CTA Button */}
        <button 
          onClick={onJoin}
          className="bg-[#FF3D57] hover:bg-[#E91E63] text-white font-black text-xl px-12 py-5 rounded-full shadow-[0_0_30px_rgba(255,61,87,0.3)] transition-all active:scale-95 mb-20"
        >
          START EARNING INSTANTLY
        </button>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl text-left">
          <div className="flex gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
              <Zap className="text-yellow-400 w-6 h-6 fill-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-1">KES 49 Minimum</h3>
              <p className="text-zinc-500 text-sm">Start small, test your strategies, risk-free.</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00E676]/10 flex items-center justify-center">
              <Lock className="text-yellow-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#00E676] mb-1">Instant STK Push</h3>
              <p className="text-zinc-500 text-sm">Direct automated wallet funding within seconds.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
        &copy; {new Date().getFullYear()} JETPESA AFRICA • RESPONSIBLE GAMING
      </footer>
    </div>
  );
};

export default LandingPage;