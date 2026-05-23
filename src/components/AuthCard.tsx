import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface AuthCardProps {
  initialMode: "login" | "register";
  onSuccess: () => void;
  onBack: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ initialMode, onSuccess, onBack }) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Initialize User Data on Auth
      const existingData = localStorage.getItem('jetpesa_user_data');
      let userData = {
        email: email,
        payoutPhone: phone || "07XXXXXXXX",
        realBalance: 0,
        demoBalance: 500.00
      };

      if (existingData && mode === "login") {
        try {
          userData = JSON.parse(existingData);
        } catch (e) {
          // fallback to default
        }
      } else {
        // For register or first time, save new
        localStorage.setItem('jetpesa_user_data', JSON.stringify(userData));
      }

      toast.success(mode === "login" ? "Welcome back to JETPESA!" : "Account created successfully!");
      onSuccess();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter cursor-pointer" onClick={onBack}>
            JETPESA
          </h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
            Secure High-Stakes Gateway
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-black p-1 rounded-xl mb-8">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 rounded-lg text-sm font-black transition-all ${
              mode === "login"
                ? "bg-zinc-800 text-white shadow-lg"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 rounded-lg text-sm font-black transition-all ${
              mode === "register"
                ? "bg-[#FF3D57] text-white shadow-lg"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {mode === "register" ? "EMAIL ADDRESS" : "EMAIL OR PHONE NUMBER"}
            </Label>
            <Input
              required
              type={mode === "register" ? "email" : "text"}
              placeholder={mode === "register" ? "name@example.com" : "Email or 07XXXXXXXX"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black border-zinc-800 text-white h-12 focus:ring-[#FF3D57] focus:border-[#FF3D57]"
            />
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                M-PESA NUMBER
              </Label>
              <Input
                required
                placeholder="07*** / 01***"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-black border-zinc-800 text-white h-12 focus:ring-[#FF3D57] focus:border-[#FF3D57]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              ACCOUNT SECURE PASSWORD
            </Label>
            <Input
              required
              type="password"
              placeholder="••••••••"
              className="bg-black border-zinc-800 text-white h-12 focus:ring-[#FF3D57] focus:border-[#FF3D57]"
            />
          </div>

          {/* Primary Action Button */}
          <Button
            disabled={loading}
            type="submit"
            className={`w-full h-14 rounded-xl font-black text-lg transition-all active:scale-95 ${
              mode === "register"
                ? "bg-[#FF3D57] hover:bg-[#E91E63] text-white"
                : "bg-[#00E676] hover:bg-[#00C853] text-white shadow-[0_0_20px_rgba(0,230,118,0.2)]"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                SECURELY CONNECTING...
              </span>
            ) : mode === "register" ? (
              "CREATE ACCOUNT"
            ) : (
              "SECURE LOGIN"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={onBack}
            className="text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;