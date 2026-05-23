import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  isSystem?: boolean;
  time: string;
}

const LobbyRoom: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: '071***882', text: 'Boom! 5x secured!', time: '12:00' },
    { id: '2', user: 'System', text: '🎉 User 071***882 just cashed out 4,500 KES!', isSystem: true, time: '12:01' },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Simulate automated system notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const phone = `07${Math.floor(Math.random() * 9)}***${Math.floor(100 + Math.random() * 899)}`;
      const amount = (Math.floor(Math.random() * 50) * 100 + 500).toLocaleString();
      const sysMsg: ChatMessage = {
        id: Date.now().toString(),
        user: 'System',
        text: `🎉 User ${phone} just cashed out ${amount} KES!`,
        isSystem: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, sysMsg].slice(-20));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg].slice(-20));
    setInput("");
  };

  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 flex flex-col h-[300px] overflow-hidden">
      <div className="p-3 border-b border-zinc-800 bg-zinc-900/60 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-zinc-500" />
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Community Lobby</span>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.isSystem ? 'items-center' : ''}`}>
            {m.isSystem ? (
              <div className="bg-purple-900/20 border border-purple-800/30 rounded-full px-4 py-1 flex items-center gap-2">
                <Bell className="w-3 h-3 text-purple-400" />
                <span className="text-[9px] font-black text-purple-200 tracking-tight italic">{m.text}</span>
              </div>
            ) : (
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-zinc-500">{m.user}</span>
                  <span className="text-[8px] font-bold text-zinc-700">{m.time}</span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-800 rounded-xl rounded-tl-none px-3 py-2 text-xs text-zinc-200">
                  {m.text}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 bg-zinc-900/60 border-t border-zinc-800">
        <div className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="bg-black border-zinc-800 text-white h-10 pr-10 text-xs focus:ring-0 focus:border-zinc-700"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyRoom;