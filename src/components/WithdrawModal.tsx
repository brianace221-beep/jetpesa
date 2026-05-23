import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  initialPhone: string;
  onWithdraw: (amount: number, phone: string) => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, balance, initialPhone, onWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(initialPhone || "");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    // Validation
    const val = parseFloat(amount);
    if (isNaN(val) || val < 10) {
      toast.error("Minimum withdrawal is 10 KES");
      return;
    }
    if (val > balance) {
      toast.error("Insufficient balance");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter a preferred phone number for payout");
      return;
    }

    setLoading(true);
    
    // Simulate API Call to Nexus Pay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onWithdraw(val, phone);
      toast.success("🚀 Withdrawal Approved! Funds sent via M-Pesa.", {
        style: { backgroundColor: "#00E676", color: "#000", fontWeight: "bold" }
      });
      setAmount("");
    } catch (e) {
      toast.error("Withdrawal failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-sm rounded-3xl p-8 outline-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[#FF3D57] text-center mb-4 uppercase tracking-tighter">
            M-Pesa B2C Withdrawal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              PREFERRED PHONE NUMBER
            </Label>
            <Input 
              placeholder="e.g. 07XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-black border-zinc-800 text-white h-12 rounded-xl focus:ring-[#FF3D57] border-none focus-visible:ring-1" 
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              WITHDRAW AMOUNT (KES)
            </Label>
            <Input 
              type="number" 
              placeholder="Min KES 10" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black border-zinc-800 text-white h-12 rounded-xl focus:ring-[#FF3D57] border-none focus-visible:ring-1" 
            />
            <div className="text-[10px] text-zinc-500 font-bold text-right uppercase tracking-wider">
              Real Balance: {balance.toFixed(2)} KES
            </div>
          </div>

          <Button 
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full bg-[#00E676] hover:bg-[#00C853] text-black font-black h-14 rounded-xl text-lg transition-all active:scale-95 shadow-[0_10px_20px_rgba(0,230,118,0.1)]"
          >
            {loading ? "PROCESSING..." : "CONFIRM CASH OUT"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;