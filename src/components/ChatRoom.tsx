import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  user: string;
  text: string;
  isSystem: boolean;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: "System", text: "Welcome to JETPESA Lobby! Play responsible.", isSystem: true },
    { id: 2, user: "User_882", text: "Anyone hit 10x today?", isSystem: false },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulated System Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const users = ["071***882", "072***456", "075***123", "070***990"];
      const amounts = ["4,500", "1,200", "8,900", "500"];
      const user = users[Math.floor(Math.random() * users.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      
      const systemMsg: Message = {
        id: Date.now(),
        user: "System",
        text: `🎉 User ${user} just cashed out ${amount} KES!`,
        isSystem: true
      };
      setMessages(prev => [...prev, systemMsg].slice(-50));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      user: "Me",
      text: input,
      isSystem: false
    };
    setMessages(prev => [...prev, newMsg].slice(-50));
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="font-black text-xs uppercase tracking-widest text-zinc-500">Community Lobby</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black text-zinc-400">1,248 ONLINE</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isSystem ? 'items-center' : 'items-start'}`}>
            {msg.isSystem ? (
              <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full">
                <p className="text-[10px] font-black text-green-500">{msg.text}</p>
              </div>
            ) : (
              <div className="max-w-[80%]">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter mb-1 block">
                  {msg.user}
                </span>
                <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none border border-zinc-700">
                  <p className="text-sm font-medium text-zinc-200">{msg.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-black/40 border-t border-zinc-800">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-black border border-zinc-800 rounded-xl h-12 px-4 pr-12 text-sm focus:outline-none focus:border-zinc-600 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;