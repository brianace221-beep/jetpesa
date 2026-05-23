import React, { useState } from "react";
import { X, Smartphone, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleAuthorize = () => {
    // 1. Open external link
    window.open("https://pay.makamesco-tech.co.ke/pay/uBH-TFJm8w", "_blank");
    
    // 2. Trigger parent notification
    onSuccess();
    
    // 3. Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <h2 className="text-xl font-black text-white tracking-tight uppercase">
            Safaricom M-Pesa Wire
          </h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">
            Instant Wallet Funding Gateway
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              DEPOSIT QUANTITY (KES)
            </Label>
            <div className="relative">
              <Input 
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black border-zinc-800 text-white h-12 font-black focus:ring-[#00E676] focus:border-[#00E676]"
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              M-PESA PHONE NUMBER
            </Label>
            <div className="relative">
              <Input 
                placeholder="07XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-black border-zinc-800 text-white h-12 font-black focus:ring-[#00E676] focus:border-[#00E676]"
              />
              <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
            </div>
          </div>

          <Button
            onClick={handleAuthorize}
            className="w-full h-14 rounded-xl bg-[#00E676] hover:bg-[#00C853] text-black font-black text-lg transition-all active:scale-95 shadow-[0_10px_30px_rgba(0,230,118,0.2)]"
          >
            AUTHORIZE DEPOSIT
          </Button>
          
          <p className="text-[9px] text-center text-zinc-600 font-bold uppercase tracking-widest">
            Encryption Secured By Safaricom Global
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;