import React from "react";
import { Rocket as RocketIcon } from "lucide-react";
import { GameState } from "./Dashboard";

interface GameCanvasProps {
  state: GameState;
  multiplier: number;
  countdown: number;
  winAmount: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ state, multiplier }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Static Multiplier Content */}
      <div className="relative z-10 text-center select-none">
        <div className="text-7xl md:text-9xl font-black text-white tracking-tighter">
          {multiplier.toFixed(2)}x
        </div>
      </div>

      {/* Static Path Animation */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <svg className="w-full h-full overflow-visible">
          <path
            d="M 0 350 Q 250 300, 600 150"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3D57" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF3D57" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute bottom-[20%] left-[60%] -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            <div className="relative bg-zinc-800 p-2 rounded-xl border border-white/20 shadow-2xl">
              <RocketIcon className="w-10 h-10 text-white fill-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCanvas;