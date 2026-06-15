import React, { useState, useEffect } from "react";
import { Search, Bell, Shield, ArrowUpRight, Menu, MessageSquare } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenDeployModal: () => void;
  onToggleCommandRail?: () => void;
  onToggleAssistantPanel?: () => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  onOpenDeployModal,
  onToggleCommandRail,
  onToggleAssistantPanel
}: HeaderProps) {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (num: number) => num.toString().padStart(2, "0");
      const hrs = pad(now.getUTCHours());
      const mins = pad(now.getUTCMinutes());
      const secs = pad(now.getUTCSeconds());
      setUtcTime(`${hrs}:${mins}:${secs} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-[#1A2540] bg-[#050A18]/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-30 select-none">
      
      {/* Brand & Emblem Logo with Mobile Menu Trigger */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Sidebar Hamburger Trigger */}
        <button
          onClick={onToggleCommandRail}
          className="lg:hidden p-2 rounded-sm bg-[#0D1326] border border-[#1A2540] text-white hover:border-[#D4A843] hover:text-[#D4A843] transition-colors focus:outline-none"
          title="Toggle Navigation Menu"
        >
          <Menu size={16} />
        </button>

        {/* Rounded neural emblem */}
        <div className="relative w-8 h-8 rounded-full bg-[#0D1326] border border-[#D4A843] flex items-center justify-center overflow-hidden shrink-0">
          <Shield className="w-5 h-5 text-[#00D9B5]" />
          {/* Pulsing glow point */}
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0AFFE4] animate-ping" />
        </div>
        
        <div className="hidden xs:block">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-xs font-bold font-sans tracking-wider text-white">
              COLLECTIVE AI INC
            </span>
            <span className="text-[10px] text-[#D4A843]">✦</span>
          </div>
          <div className="text-[8px] font-mono text-[#8B9BAE] tracking-widest uppercase">
            Architecting a humane future
          </div>
        </div>
      </div>

      {/* Global Interactive Search Input - slightly optimized for mobile screens */}
      <div className="flex-1 max-w-xs md:max-w-md mx-2 sm:mx-6 relative">
        <label htmlFor="global-search" className="sr-only">Search across systems, data, and people...</label>
        <Search className="absolute left-2.5 sm:left-3 top-2.5 text-[#8B9BAE]" size={13} />
        <input
          id="global-search"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 bg-[#111827] border border-[#1A2540] rounded pl-8 sm:pl-9 pr-4 text-xs text-white placeholder-[#8B9BAE] focus:outline-none focus:border-[#D4A843] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-2 text-[10px] font-mono text-[#D4A843] hover:underline"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Operations Panel / Telemetry Metrics */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {/* Pulse Operational Widget */}
        <div className="hidden md:flex items-center gap-2 pr-2 border-r border-[#1A2540]/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9B5] opacity-75 animate-bounce"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9B5]"></span>
          </span>
          <span className="text-[10px] font-mono font-medium text-[#00D9B5] tracking-tight uppercase">
            ACTIVE LATTICE
          </span>
        </div>

        {/* Live Clock UTC */}
        <div className="font-mono text-xs text-[#8B9BAE] hidden lg:block">
          {utcTime || "00:00:00 UTC"}
        </div>

        {/* Top Deploy CTA, matching buttons specification */}
        <button
          onClick={onOpenDeployModal}
          className="bg-[#D4A843] text-[#050A18] text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-[2px] tracking-tight hover:bg-[#C9963F] transition-all flex items-center gap-1 shrink-0"
        >
          <span className="hidden sm:inline">DEPLOY MODEL</span>
          <span className="sm:hidden">DEPLOY</span>
          <ArrowUpRight size={12} strokeWidth={2.5} />
        </button>

        {/* Micro-Menu Group for Mobile Assistant and Notifications */}
        <div className="flex items-center gap-2 sm:gap-3 border-l border-[#1A2540] pl-2 sm:pl-4">
          
          {/* Mobile Assistant Trigger */}
          <button
            onClick={onToggleAssistantPanel}
            className="xl:hidden p-2 rounded-sm bg-[#0D1326] border border-[#1A2540] text-white hover:border-[#D4A843] hover:text-[#D4A843] transition-colors relative focus:outline-none"
            title="AI Chat Assistant"
          >
            <MessageSquare size={14} className="text-[#00D9B5]" />
            <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#EA580C]" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded border border-[#1A2540] bg-[#111827] flex items-center justify-center font-mono text-[9px] sm:text-[10px] text-[#00D9B5] font-bold">
              AM
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-[10px] font-bold text-white font-sans leading-none">
                Ava Morgan
              </div>
              <div className="text-[8px] font-mono text-[#8B9BAE] uppercase tracking-wider mt-0.5">
                Platform Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
