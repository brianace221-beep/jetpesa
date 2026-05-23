import React, { useState, useEffect } from "react";
import { ShieldCheck, Volume2, CloudRain } from "lucide-react";
import GameCanvas from "./GameCanvas";
import HistoryBar from "./HistoryBar";
import BettingControls from "./BettingControls";
import BottomNav from "./BottomNav";
import WithdrawModal from "./WithdrawModal";
import DepositModal from "./DepositModal";
import ChatRoom from "./ChatRoom";
import LivePlayers from "./LivePlayers";
import { useGameLogic } from "../hooks/useGameLogic";
import { toast } from "sonner";
import { Switch } from "./ui/switch";

interface DashboardProps {
  onLogout: () => void;
}

export interface ActiveBet {
  amount: number;
  cashedOut: boolean;
  payout?: number;
}

interface UserData {
  realBalance: number;
  demoBalance: number;
  payoutPhone: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { status, multiplier, countdown, history } = useGameLogic();
  const [activeTab, setActiveTab] = useState<"data" | "radar" | "lobby">("radar");
  
  // Single persistence object as requested
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem('jetpesa_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          realBalance: parsed.realBalance ?? 0,
          demoBalance: parsed.demoBalance ?? 1000.00,
          payoutPhone: parsed.payoutPhone ?? ""
        };
      } catch (e) {
        return { realBalance: 0, demoBalance: 1000.00, payoutPhone: "" };
      }
    }
    return { realBalance: 0, demoBalance: 1000.00, payoutPhone: "" };
  });

  const [isDemo, setIsDemo] = useState(true);

  // Sync to LocalStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('jetpesa_user_data', JSON.stringify(userData));
  }, [userData]);

  // Modals
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  // Active Bet State (Slot-based)
  const [activeBets, setActiveBets] = useState<{ [slot: number]: ActiveBet | null }>({ 0: null, 1: null });

  const handlePlaceBet = (slot: number, amount: number) => {
    if (status !== "betting") {
      toast.error("Betting closed for this round");
      return;
    }
    
    // Insufficient Funds Validation with requested specific message
    if (!isDemo) {
      if (userData.realBalance <= 0 || amount > userData.realBalance) {
        toast.error("Insufficient funds. Please top up your real balance to place a bet.", {
          duration: 5000,
          position: "top-center",
          style: { backgroundColor: "#8B0000", color: "#FFF", border: "none" }
        });
        return;
      }
    } else {
      if (userData.demoBalance <= 0 || amount > userData.demoBalance) {
        toast.error("Insufficient demo funds. Please reset your demo balance.");
        return;
      }
    }

    // Deduct Balance
    setUserData(prev => ({
      ...prev,
      realBalance: !isDemo ? parseFloat((prev.realBalance - amount).toFixed(2)) : prev.realBalance,
      demoBalance: isDemo ? parseFloat((prev.demoBalance - amount).toFixed(2)) : prev.demoBalance
    }));

    setActiveBets(prev => ({ ...prev, [slot]: { amount, cashedOut: false } }));
    toast.success(`Bet of KES ${amount} placed!`);
  };

  const handleCashout = (slot: number) => {
    const bet = activeBets[slot];
    if (!bet || bet.cashedOut || status !== "live") return;

    const payout = parseFloat((bet.amount * multiplier).toFixed(2));
    
    // Add Payout
    setUserData(prev => ({
      ...prev,
      realBalance: !isDemo ? parseFloat((prev.realBalance + payout).toFixed(2)) : prev.realBalance,
      demoBalance: isDemo ? parseFloat((prev.demoBalance + payout).toFixed(2)) : prev.demoBalance
    }));

    setActiveBets(prev => ({ ...prev, [slot]: { ...bet, cashedOut: true, payout } }));
    toast.success(`🚀 Manual Cashout Approved! + KES ${payout.toFixed(2)}`, {
      className: "bg-[#00E676] text-white border-none font-black shadow-[0_10px_30px_rgba(0,230,118,0.4)]"
    });
  };

  const resetDemo = () => {
    setUserData(prev => ({ ...prev, demoBalance: 1000.00 }));
    toast.info("Demo balance restored to 1000.00 KES");
  };

  const handleWithdrawal = (amount: number, phone: string) => {
    setUserData(prev => ({
      ...prev,
      realBalance: parseFloat((prev.realBalance - amount).toFixed(2)),
      payoutPhone: phone
    }));
    setShowWithdraw(false);
  };

  // Reset active bets when round ends
  useEffect(() => {
    if (status === "betting") {
      setActiveBets({ 0: null, 1: null });
    }
  }, [status]);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden text-white font-sans relative">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 h-16 border-b border-zinc-900 bg-black/50 backdrop-blur-xl sticky top-0 z-[60]">
        <div className="flex items-center gap-4">
          <div className="text-xl font-black tracking-tighter text-white cursor-pointer" onClick={onLogout}>
            JETPESA
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/5 border border-[#00E676]/30">
            <ShieldCheck className="w-4 h-4 text-[#00E676]" />
            <span className="text-[10px] font-black text-[#00E676] uppercase tracking-wider">PROVABLY FAIR</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <Volume2 className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <CloudRain className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-0.5">
              {/* Clear indicator labels as requested */}
              <span className={`text-[9px] font-black uppercase tracking-widest ${isDemo ? 'text-purple-400' : 'text-zinc-500'}`}>Demo Mode</span>
              <Switch 
                checked={!isDemo} 
                onCheckedChange={(checked) => setIsDemo(!checked)}
                className="scale-75 data-[state=checked]:bg-[#00E676]"
              />
              <span className={`text-[9px] font-black uppercase tracking-widest ${!isDemo ? 'text-[#00E676]' : 'text-zinc-500'}`}>Real Mode</span>
              
              {isDemo && (
                <button 
                  onClick={resetDemo}
                  className="text-[9px] font-black text-purple-400 hover:text-purple-300 uppercase underline ml-2"
                >
                  Reset
                </button>
              )}
            </div>
            <span className={`text-sm font-black font-mono tracking-tighter leading-none ${isDemo ? 'text-purple-400' : 'text-[#00FF00]'}`}>
              {(isDemo ? userData.demoBalance : userData.realBalance).toFixed(2)} KES
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {!isDemo && (
              <button 
                onClick={() => setShowWithdraw(true)}
                className="bg-[#8B0000] hover:bg-[#A50000] text-white font-black text-[11px] px-3 h-9 rounded-md transition-all active:scale-95 border border-white/5"
              >
                WITHDRAW
              </button>
            )}
            <button 
              onClick={() => setShowDeposit(true)}
              className="bg-[#00E676] hover:bg-[#00C853] text-black font-black text-[11px] px-4 h-9 rounded-md transition-all active:scale-95 shadow-[0_0_15px_rgba(0,230,118,0.2)]"
            >
              DEPOSIT
            </button>
          </div>
        </div>
      </header>

      {/* Multiplier History Bar */}
      <HistoryBar history={history} />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col p-4 gap-4 max-w-5xl mx-auto w-full overflow-y-auto no-scrollbar">
        {activeTab === "radar" && (
          <>
            <div className="relative aspect-video md:aspect-[21/9] w-full bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl min-h-[260px]">
              <GameCanvas 
                status={status} 
                multiplier={multiplier} 
                countdown={countdown}
                hasCashedOut={Object.values(activeBets).some(b => b?.cashedOut)}
                lastWin={Object.values(activeBets).find(b => b?.cashedOut)?.payout || 0}
              />
            </div>

            <BettingControls 
              onPlaceBet={handlePlaceBet}
              onCashout={handleCashout}
              status={status}
              multiplier={multiplier}
              activeBets={activeBets}
            />
          </>
        )}

        {activeTab === "data" && (
          <LivePlayers roundStatus={status} multiplier={multiplier} />
        )}

        {activeTab === "lobby" && (
          <ChatRoom />
        )}
      </main>

      {/* Bottom Navigation Tab Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <WithdrawModal 
        isOpen={showWithdraw} 
        onClose={() => setShowWithdraw(false)} 
        balance={userData.realBalance}
        initialPhone={userData.payoutPhone}
        onWithdraw={handleWithdrawal}
      />
      
      <DepositModal 
        isOpen={showDeposit} 
        onClose={() => setShowDeposit(false)}
        onDeposit={(amount) => {
          setUserData(prev => ({ ...prev, realBalance: parseFloat((prev.realBalance + amount).toFixed(2)) }));
          setShowDeposit(false);
        }}
      />
    </div>
  );
};

export default Dashboard;