import React from "react";

interface HistoryBarProps {
  history: number[];
}

const HistoryBar: React.FC<HistoryBarProps> = ({ history }) => {
  const getColorClasses = (val: number) => {
    if (val >= 10) return "text-purple-400 bg-purple-900/20 border-purple-500/30";
    if (val >= 2) return "text-blue-400 bg-blue-900/20 border-blue-500/30";
    if (val <= 1.2) return "text-zinc-500 bg-zinc-900/50 border-zinc-800";
    return "text-zinc-300 bg-zinc-900/50 border-zinc-700/50";
  };

  return (
    <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-b border-zinc-900/50 bg-black/30">
      {(history || []).map((val, i) => {
        // Safeguard against non-number values in history (e.g. legacy strings in localStorage)
        const numVal = typeof val === 'number' ? val : parseFloat(String(val));
        const safeVal = isNaN(numVal) ? 1.00 : numVal;
        
        return (
          <div 
            key={i} 
            className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-black border ${getColorClasses(safeVal)} shadow-sm transition-all hover:scale-105 cursor-default`}
          >
            {safeVal.toFixed(2)}x
          </div>
        );
      })}
    </div>
  );
};

export default HistoryBar;