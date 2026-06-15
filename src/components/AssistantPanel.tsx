import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Terminal, RefreshCw, Paperclip } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Authorized connection established. I am the Collective AI intelligent Oracle system. I have index files for all 20 divisions, synergy nodes, campus layout, and regulatory templates active in memory. Ask me any factual question about our layout, founders, budget levels, or brand constraints.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const quickCommands = [
    { label: "Analyze performance", prompt: "Explain the architecture of ZenFlow and how it acts as the central nervous system." },
    { label: "Review securty check", prompt: "How do Obsidian Arc and Juris Guard fuse in SYN-01 Sentinel Guardian? What hardware components do they use?" },
    { label: "List active phases", prompt: "Can you list all Phase 1 Synergy Nodes (Active Priority) and show their divisions and mandates?" },
    { label: "Corporate fiduciaries", prompt: "Who are the corporate fiduciaries and leads? What is Stanley Constant's veto role in Civic Core?" }
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "System timed out.");
      }

      const assistantMsg: Message = {
        role: "assistant",
        content: data.text || "I was unable to retrieve a response from the central oracle stack. Please verify your GEMINI_API_KEY.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        role: "assistant",
        content: `ALERT EXCEPTION: ${err.message || "Failed to route search payload to server."} Ensure process credentials are correct.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="w-[360px] border-l border-[#1A2540] bg-[#0A0F1E] flex flex-col justify-between shrink-0 select-none h-full relative z-20">
      {/* Dynamic Header */}
      <div className="p-4 border-b border-[#1A2540] bg-[#050A18] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9B5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9B5]"></span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-sans tracking-wide">
              Collective AI Assistant
            </h3>
            <p className="text-[8px] font-mono text-[#8B9BAE] uppercase tracking-widest mt-0.5">
              Online // Neural Agent Oracle
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                role: "assistant",
                content: "Authorized connection established. I am the Collective AI intelligent Oracle system. Clear logs successful. Ask me anything.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }}
          className="text-[#8B9BAE] hover:text-[#D4A843] transition-colors focus:outline-none"
        >
          <RefreshCw size={12} />
        </button>
      </div>

      {/* Suggestion prompt chips */}
      <div className="p-3 bg-[#0D1326]/50 border-b border-[#1A2540] space-y-1.5 shrink-0">
        <div className="text-[8px] font-mono text-[#8B9BAE] uppercase tracking-wider">
          Suggested Queries
        </div>
        <div className="grid grid-cols-1 gap-1">
          {quickCommands.map((command, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(command.prompt)}
              className="w-full text-left truncate text-[10px] font-medium text-[#D4A843] bg-[#111827] border border-[#1A2540] rounded px-2.5 py-1.5 hover:bg-[#D4A843] hover:text-[#050A18] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles size={8} className="shrink-0" />
              <span>{command.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Log */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#1A2540]"
      >
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-1.5 mb-1 select-none">
                <span className="text-[8px] font-mono text-[#8B9BAE] uppercase font-bold">
                  {isUser ? "Admin operator" : "Central Oracle"}
                </span>
                <span className="text-[8px] font-mono text-[#8B9BAE]">
                  {msg.timestamp}
                </span>
              </div>
              <div
                className={`text-xs p-3 rounded-sm leading-relaxed max-w-[90%] whitespace-pre-wrap ${
                  isUser
                    ? "bg-[#111827] text-white border border-[#1A2540] rounded-tr-none font-sans"
                    : "bg-[#0D1326] text-[#8B9BAE] border-t-2 border-t-[#D4A843] border-x border-b border-[#1A2540] rounded-tl-none font-mono"
                }`}
              >
                {/* Render clean text formatting with some basic highlights */}
                {msg.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex flex-col items-start animate-pulse">
            <span className="text-[8px] font-mono text-[#8B9BAE] uppercase mb-1">
              Oracle thinking...
            </span>
            <div className="bg-[#0D1326]/50 border border-[#1A2540] p-3 rounded text-xs text-[#D4A843] font-mono flex items-center gap-2 w-[70%]">
              <Terminal size={12} className="animate-spin" />
              <span>Decoding ledger data...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form Box */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 border-t border-[#1A2540] bg-[#050A18] space-y-2 shrink-0"
      >
        <div className="relative">
          <textarea
            id="assistant-prompt"
            rows={2}
            placeholder="Ask anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputValue);
              }
            }}
            className="w-full bg-[#111827] border border-[#1A2540] rounded p-2 text-xs text-white placeholder-[#8B9BAE] focus:outline-none focus:border-[#D4A843] resize-none pr-8"
          />
          <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5 text-[#8B9BAE]">
            <button
              type="button"
              className="hover:text-white transition-colors"
              title="Attach configuration files"
            >
              <Paperclip size={10} />
            </button>
            <button
              type="submit"
              className="text-[#D4A843] hover:text-[#00D9B5] transition-colors focus:outline-none"
              disabled={isLoading || !inputValue.trim()}
              title="Submit prompt"
            >
              <Send size={10} />
            </button>
          </div>
        </div>
        <div className="text-[8px] font-mono text-[#8B9BAE] text-center leading-normal">
          Responses generated with cinematic restraint. Zero words from banned lists are processed.
        </div>
      </form>
    </div>
  );
}
