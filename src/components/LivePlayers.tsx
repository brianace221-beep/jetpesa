import React, { useState, useEffect } from "react";
import { GameStatus } from "../hooks/useGameLogic";

interface Player {
  id: string;
  phone: string;
  stake: number;
  cashoutPoint?: number;
  isCashedOut: boolean;
}

const LivePlayers: React.FC<{ roundStatus: GameStatus, multiplier: number }> = ({ roundStatus, multiplier }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (roundStatus === "betting") {
      // Simulate new player list for new round
      const newPlayers = Array.from({ length: 15 }).map((_, i) => ({
        id: Math.random().toString(36).substr(2, 9),
        phone: `07${Math.floor(Math.random() * 9)}***${Math.floor(100 + Math.random() * 899)}`,
        stake: [10, 20, 50, 100, 200, 500, 1000][Math.floor(Math.random() * 7)],
        isCashedOut: false
      }));
      setPlayers(newPlayers);
    }
  }, [roundStatus]);

  useEffect(() => {
    if (roundStatus === "live") {
      setPlayers(prev => prev.map(p => {
        if (!p.isCashedOut && Math.random() < 0.05 && multiplier > 1.2) {
          return { ...p, isCashedOut: true, cashoutPoint: multiplier };
        }
        return p;
      }));
    }
  }, [multiplier, roundStatus]);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-zinc-800 grid grid-cols-3 gap-4 bg-black/20">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">User</span>
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Stake</span>
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Status</span>
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar">
        {players.map((p) => (
          <div 
            key={p.id} 
            className={`grid grid-cols-3 gap-4 px-4 py-3 border-b border-zinc-800/50 transition-colors ${
              p.isCashedOut ? "bg-green-500/5" : ""
            }`}
          >
            <span className="text-xs font-bold text-zinc-300">{p.phone}</span>
            <span className="text-xs font-black text-zinc-400 text-center">{p.stake} KES</span>
            <div className="text-right">
              {p.isCashedOut ? (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="text-[9px] font-black text-green-500 uppercase">
                    Cashed @ {typeof p.cashoutPoint === 'number' ? p.cashoutPoint.toFixed(2) : '---'}x
                  </span>
                </div>
              ) : (
                <span className="text-[9px] font-black text-zinc-600 uppercase">In Flight...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-black/40 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-zinc-500 uppercase">Total Stake</span>
          <span className="text-sm font-black text-white">
            {players.reduce((acc, p) => acc + p.stake, 0).toLocaleString()} KES
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black text-zinc-500 uppercase">Active Users</span>
          <span className="text-sm font-black text-white">{players.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LivePlayers;