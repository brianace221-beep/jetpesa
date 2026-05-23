import React, { useState, useEffect, useRef } from "react";
import { User, CheckCircle2 } from "lucide-react";

interface Player {
  phone: string;
  stake: number;
  cashedOutAt: number | null;
}

interface DataLiveProps {
  multiplier: number;
  isRunning: boolean;
}

const DataLive: React.FC<DataLiveProps> = ({ multiplier, isRunning }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const multiplierRef = useRef(multiplier);

  // Keep multiplier ref updated to avoid re-triggering effects
  useEffect(() => {
    multiplierRef.current = multiplier;
  }, [multiplier]);

  // Generate players only when the round starts or is in betting state
  useEffect(() => {
    if (!isRunning) {
      const newPlayers = Array.from({ length: 15 }).map(() => ({
        phone: `07${Math.floor(Math.random() * 9)}***${Math.floor(100 + Math.random() * 899)}`,
        stake: [50, 100, 200, 500, 1000][Math.floor(Math.random() * 5)],
        cashedOutAt: null,
      }));
      setPlayers(newPlayers);
    }
  }, [isRunning]);

  // Simulate cashing out independently of multiplier render cycles
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setPlayers(prev => {
          // Optimization: Check if all players already cashed out to stop unnecessary updates
          if (prev.every(p => p.cashedOutAt !== null)) return prev;

          let hasChanges = false;
          const nextPlayers = prev.map(p => {
            if (!p.cashedOutAt && Math.random() < 0.05) {
              hasChanges = true;
              return { ...p, cashedOutAt: multiplierRef.current };
            }
            return p;
          });

          return hasChanges ? nextPlayers : prev;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-4 h-[300px] overflow-hidden flex flex-col">
      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 flex justify-between">
        <span>Active Players</span>
        <span className="text-[#00E676]">{players.length} online</span>
      </div>
      
      <div className="flex-grow overflow-y-auto no-scrollbar space-y-2">
        {players.map((p, i) => (
          <div 
            key={`${p.phone}-${i}`} 
            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
              p.cashedOutAt 
                ? "bg-[#00E676]/5 border-[#00E676]/20" 
                : "bg-black/40 border-zinc-800/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="w-4 h-4 text-zinc-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-300 font-mono">{p.phone}</span>
                <span className="text-[9px] font-black text-zinc-600 uppercase">STAKE: {p.stake} KES</span>
              </div>
            </div>
            
            <div className="text-right">
              {p.cashedOutAt ? (
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-[#00E676] uppercase">Cashed out</span>
                  <div className="flex items-center gap-1 text-sm font-black text-[#00E676]">
                    <CheckCircle2 className="w-3 h-3" />
                    {p.cashedOutAt.toFixed(2)}x
                  </div>
                </div>
              ) : (
                <span className="text-xs font-bold text-zinc-700">Flying...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataLive;