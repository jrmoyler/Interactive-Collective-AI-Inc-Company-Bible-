import React from "react";
import { Check, X, ShieldAlert, Sparkles, Wand2 } from "lucide-react";
import { BRAND_PRINCIPLES } from "../data/bibleData";

export default function BrandBrandView() {
  const brandColors = [
    { name: "Electric Teal", hex: "#00D9B5", role: "Primary Accent", desc: "Energy elements, links, active stats." },
    { name: "Neon Teal", hex: "#0AFFE4", role: "Light Indicator", desc: "Live ticks and pulsing glow endpoints." },
    { name: "Amber Gold", hex: "#D4A843", role: "Authority Gold", desc: "Single most important element weight." },
    { name: "Muted Silver", hex: "#8B9BAE", role: "Secondary Text", desc: "Supporting paragraph copy, subtitles." },
    { name: "Deep Navy", hex: "#050A18", role: "Primary Background", desc: "Full-bleed workspace canvases." },
    { name: "Obsidian Slate", hex: "#0A0F1E", role: "Elevated Background", desc: "Sidebars, rails, inputs." },
    { name: "Card Surface", hex: "#0D1326", role: "Panel Canvas", desc: "Main content panels, interactive rows." },
    { name: "Elevated Card", hex: "#111827", role: "Overlay Canvas", desc: "Popups, tooltips, select dropdowns." }
  ];

  const dosAndDonts = [
    { do: "Use approved logo files and colors", dont: "Don't stretch, skew, or distort the logo", id: "do-1" },
    { do: "Maintain clear space around the lockup", dont: "Don't change logo background colors arbitrarily", id: "do-2" },
    { do: "Ensure strong color contrast text-to-bg", dont: "Don't add arbitrary drop shadows or outer bevel frames", id: "do-3" },
    { do: "Use Electric Teal for active element ticks", dont: "Don't introduce custom gradients, purples or pinks", id: "do-4" },
    { do: "Lock the ✦ parentage star bottom-right", dont: "Don't omit, scale, or color bleed the diamond mark", id: "do-5" }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Visual Header Banner - Cover style matching Spec Image 1 */}
      <div className="relative rounded-sm border border-[#1A2540] bg-[#050A18] overflow-hidden p-8 text-center flex flex-col justify-center items-center py-16">
        {/* Glow effect vector points */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#D4A843]/5 blur-[80px]" />
        
        <span className="text-[10px] font-mono tracking-widest text-[#D4A843] uppercase font-bold mb-3">
          COLLECTIVE AI INC
        </span>
        
        <h1 className="text-4xl font-bold font-sans tracking-tight text-white mb-2 leading-none uppercase">
          Company Bible
        </h1>
        <p className="text-xs font-semibold text-[#D4A843] tracking-widest uppercase font-mono mb-6">
          The Ultimate Source of Truth — Expanded Edition
        </p>

        <div className="flex items-center gap-1.5 justify-center mb-8">
          <span className="text-xs italic text-[#8B9BAE] tracking-tight">
            "Architecting a Humane Future"
          </span>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 w-full max-w-4xl border border-[#1A2540] bg-[#0D1326] p-4 text-center font-mono">
          {[
            { tag: "20", label: "Divisions" },
            { tag: "20", label: "Digital Nodes" },
            { tag: "20", label: "Physical Nodes" },
            { tag: "600", label: "AI Agents" },
            { tag: "115", label: "Products" },
            { tag: "146", label: "Services" },
            { tag: "262", label: "Tech Tools" }
          ].map((item, idx) => (
            <div key={idx} className="p-2 border-r border-[#1A2540] last:border-0">
              <div className="text-lg font-bold text-[#D4A843]">{item.tag}</div>
              <div className="text-[8px] text-[#8B9BAE] uppercase tracking-wider mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="text-[9px] font-mono text-[#8B9BAE]/60 mt-6 mt-4">
          Columbus, Ohio | C-Corporation | ZenFlow-Powered | 600-Agent Lattice | Est. June 2026
        </div>
      </div>

      {/* Grid of Design Bible Rules and Colors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Brand principles list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#D4A843] rounded p-6">
            <h3 className="text-sm font-bold text-white font-sans tracking-wide mb-4">
              05 Brand Philosophy — 7 Core Principles
            </h3>
            
            <div className="space-y-4">
              {BRAND_PRINCIPLES.map((rule) => (
                <div key={rule.num} className="flex gap-4 border-b border-[#1A2540]/55 pb-3.5 last:border-0 last:pb-0">
                  <span className="font-mono text-xs font-bold text-[#D4A843] shrink-0">
                    {rule.num}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">
                      {rule.name}
                    </h4>
                    <p className="text-[11px] text-[#8B9BAE] mt-1 leading-normal">
                      {rule.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification parameters - DO'S & DONT'S Table */}
          <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#00D9B5] rounded p-6">
            <h3 className="text-sm font-bold text-white font-sans tracking-wide mb-4">
              09 Usage Guidelines — Validation Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-[#8B9BAE] font-sans">
                <thead>
                  <tr className="border-b border-[#1A2540] text-left">
                    <th className="py-2.5 text-xs text-[#00D9B5] font-mono uppercase tracking-wider">DO</th>
                    <th className="py-2.5 text-xs text-[#EA580C] font-mono uppercase tracking-wider pl-4">DON'T</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A2540]/50">
                  {dosAndDonts.map((row) => (
                    <tr key={row.id} className="hover:bg-[#050A18]/30 transition-colors">
                      <td className="py-2.5 pr-4 flex items-start gap-2">
                        <Check size={12} className="text-[#00D9B5] mt-0.5 shrink-0" />
                        <span>{row.do}</span>
                      </td>
                      <td className="py-2.5 pl-4 flex items-start gap-2">
                        <X size={12} className="text-[#EA580C] mt-0.5 shrink-0" />
                        <span>{row.dont}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Parenthood mark & Color system */}
        <div className="space-y-6">
          {/* Parenthood display mark card */}
          <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#D4A843] rounded p-6 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00D9B5]/5 rounded-full blur-2xl" />
            <span className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider block mb-4">
              Parenthood Mark Signature
            </span>
            
            {/* Pulsing visual star */}
            <div className="relative inline-flex mb-4">
              <Sparkles className="w-12 h-12 text-[#00D9B5] animate-pulse" />
              <div className="absolute inset-0 bg-[#00D9B5] blur-xl opacity-35 rounded-full scale-50" />
            </div>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              The 4-Point Diamond Star
            </h4>
            <p className="text-[11px] text-[#8B9BAE] leading-relaxed max-w-xs mx-auto">
              The ✦ parentage symbol provides a subtle signature anchor signifying unity, direction, and cross-portfolio governance across all Collective AI endeavors. Never scaled to be overly bold, locked strictly to corners or division logo anchors.
            </p>
          </div>

          {/* Interactive Color swatch builder */}
          <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#00D9B5] rounded p-6">
            <h3 className="text-sm font-bold text-white font-sans tracking-wide mb-3">
              04 Brand Color Spec Swatches
            </h3>
            <p className="text-[10px] text-[#8B9BAE] font-mono uppercase tracking-wider mb-4">
              60:30:10 Design Framework
            </p>

            <div className="space-y-3">
              {brandColors.map((color, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#050A18] border border-[#1A2540]/60 hover:border-[#D4A843] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-sm border border-white/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-left leading-none">
                      <div className="text-xs font-bold text-white">{color.name}</div>
                      <div className="text-[8px] font-mono text-[#8B9BAE] mt-1">{color.hex}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-[#00D9B5] px-1.5 py-0.5 rounded bg-[#00D9B5]/10 border border-[#00D9B5]/25">
                      {color.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
