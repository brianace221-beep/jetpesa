import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameState } from "./Dashboard";

interface BettingControlsProps {
  gameState: GameState;
  multiplier: number;
  onPlaceBet: (amount: number, id: number) => void;
  onCashout: (id: number) => void;
  activeBets: { id: number; amount: number; cashedOut: boolean; payout: number }[];
}

const BettingControls: React.FC<BettingControlsProps> = ({ 
  gameState, 
  multiplier, 
  onPlaceBet, 
  onCashout,
  activeBets
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BetBlock 
        id={1}
        defaultValue="10" 
        gameState={gameState}
        multiplier={multiplier}
        onPlaceBet={onPlaceBet}
        onCashout={onCashout}
        activeBet={activeBets.find(b => b.id === 1)}
      />
      <BetBlock 
        id={2}
        defaultValue="20" 
        gameState={gameState}
        multiplier={multiplier}
        onPlaceBet={onPlaceBet}
        onCashout={onCashout}
        activeBet={activeBets.find(b => b.id === 2)}
      />
    </div>
  );
};

const BetBlock = ({ 
  id, 
  defaultValue, 
  gameState, 
  multiplier, 
  onPlaceBet, 
  onCashout,
  activeBet 
}: { 
  id: number;
  defaultValue: string;
  gameState: GameState;
  multiplier: number;
  onPlaceBet: (amount: number, id: number) => void;
  onCashout: (id: number) => void;
  activeBet?: { id: number; amount: number; cashedOut: boolean; payout: number };
}) => {
  const [betAmount, setBetAmount] = React.useState(defaultValue);
  
  const canBet = gameState === "betting";
  const isLive = gameState === "live";
  
  const handleBet = () => {
    const amount = parseInt(betAmount);
    if (isNaN(amount) || amount < 10 || amount > 1000) return;
    onPlaceBet(amount, id);
  };

  const currentPayout = activeBet ? (activeBet.amount * multiplier).toFixed(2) : "0.00";

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-3">
      <div className="flex gap-2">
        <button className="flex-1 py-1.5 rounded-lg bg-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-wider hover:text-white transition-colors">
          AUTO BET
        </button>
        <button className="flex-1 py-1.5 rounded-lg bg-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-wider hover:text-white transition-colors">
          AUTO CASH
        </button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input 
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            disabled={activeBet !== undefined && !activeBet.cashedOut}
            className="bg-black border-zinc-800 text-white h-14 font-black text-xl px-4 rounded-xl focus-visible:ring-0 focus-visible:border-zinc-700 disabled:opacity-50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-600">KES</div>
        </div>
        
        {activeBet && !activeBet.cashedOut && isLive ? (
          <Button 
            onClick={() => onCashout(id)}
            className="h-14 px-8 rounded-xl font-black text-sm bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all active:scale-95 flex flex-col items-center justify-center leading-tight"
          >
            <span className="text-[10px] opacity-70">CASHOUT</span>
            <span className="text-base">{currentPayout} KES</span>
          </Button>
        ) : (
          <Button 
            onClick={handleBet}
            disabled={!canBet || activeBet !== undefined}
            className={`h-14 px-8 rounded-xl font-black text-lg transition-all active:scale-95 ${
              canBet && activeBet === undefined
                ? "bg-[#00E676] hover:bg-[#00C853] text-black shadow-[0_0_20px_rgba(0,230,118,0.2)]" 
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            {activeBet ? (activeBet.cashedOut ? "WINNER!" : "BET PLACED") : `BET ${betAmount} KES`}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {['10', '50', '100', 'MAX'].map(val => (
          <button 
            key={val} 
            disabled={activeBet !== undefined}
            onClick={() => setBetAmount(val === 'MAX' ? '1000' : val)}
            className="py-1 rounded-md bg-zinc-800/50 text-[10px] font-black text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors disabled:opacity-30"
          >
            {val === 'MAX' ? val : `+${val}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BettingControls;