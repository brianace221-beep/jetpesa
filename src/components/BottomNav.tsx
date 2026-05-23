import React from "react";
import { BarChart3, Rocket as RocketIcon, MessageSquare } from "lucide-react";

interface BottomNavProps {
  activeTab: "data" | "radar" | "lobby";
  onTabChange: (tab: "data" | "radar" | "lobby") => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-800 px-6 flex items-center justify-around z-[70]">
      <button 
        onClick={() => onTabChange("data")}
        className="flex flex-col items-center gap-1 group"
      >
        <div className="relative">
          <BarChart3 className={`w-5 h-5 transition-colors ${activeTab === 'data' ? 'text-[#00E676]' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest ${activeTab === 'data' ? 'text-[#00E676]' : 'text-zinc-500'}`}>DATA LIVE</span>
      </button>

      <button 
        onClick={() => onTabChange("radar")}
        className="flex flex-col items-center gap-1 relative"
      >
        <div className="relative">
          <RocketIcon className={`w-6 h-6 transition-colors ${activeTab === 'radar' ? 'text-[#FF3D57] fill-[#FF3D57]/20' : 'text-zinc-500'}`} />
          {activeTab === 'radar' && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF3D57] rounded-full shadow-[0_0_10px_#FF3D57]" />
          )}
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${activeTab === 'radar' ? 'text-[#FF3D57]' : 'text-zinc-500'}`}>RADAR HUB</span>
      </button>

      <button 
        onClick={() => onTabChange("lobby")}
        className="flex flex-col items-center gap-1 group"
      >
        <div className="relative">
          <MessageSquare className={`w-5 h-5 transition-colors ${activeTab === 'lobby' ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest ${activeTab === 'lobby' ? 'text-white' : 'text-zinc-500'}`}>LOBBY ROOM</span>
      </button>
    </nav>
  );
};

export default BottomNav;