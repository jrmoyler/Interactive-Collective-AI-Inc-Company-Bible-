import React, { useState } from "react";
import { ShoppingBag, ChevronRight, Copy, Check } from "lucide-react";
import { MERCHANDISE_CATALOG } from "../data/bibleData";

export default function MerchandiseView() {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2200);
  };

  return (
    <div className="space-y-6 select-none text-left">
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="text-[#00D9B5]" size={16} />
          <h2 className="text-base font-bold text-white font-sans uppercase tracking-tight">
            15 Division Merchandise Catalog — Glyph Forge v1.0
          </h2>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          Each division operates its own distinct merchandise aesthetics, bound strictly to assigned accent colors, taglines, and brand personality guides. Enclosures, embroidered apparel, and metal badges are manufactured in-house at Glyph Forge Works.
        </p>
      </div>

      <div className="bg-[#0D1326] border border-[#1A2540] rounded overflow-hidden">
        <div className="p-4 border-b border-[#1A2540] bg-[#050A18]/50 flex justify-between items-center">
          <span className="text-xs font-bold text-white font-sans uppercase tracking-wider">
            Brand Apparel and Accessories Lists
          </span>
          <span className="font-mono text-[9px] text-[#D4A843]">
            15 COMPOSITIONS COMPLETE
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-[#8B9BAE] font-sans">
            <thead>
              <tr className="bg-[#050A18]/20 text-[#8B9BAE] border-b border-[#1A2540] text-left">
                <th className="p-3 font-mono uppercase text-[10px]">Division Reference</th>
                <th className="p-3 font-mono uppercase text-[10px]">Hero Apparel Piece</th>
                <th className="p-3 font-mono uppercase text-[10px]">Footwear Line</th>
                <th className="p-3 font-mono uppercase text-[10px]">Key Accessories Package</th>
                <th className="p-3 text-right font-mono uppercase text-[10px]">Mock Prompt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2540]/40">
              {MERCHANDISE_CATALOG.map((item, idx) => {
                const prompt = `Generate a high-fidelity studio mockup of the Collective AI ${item.division} Hero Apparel Piece: ${item.heroApparel}. Accent color code ${item.accentHex}. Cinematic restraint styling, isolated on a deep slate obsidian background.`;
                const isCopied = copiedText === prompt;

                return (
                  <tr key={idx} className="hover:bg-[#050A18]/30 transition-colors">
                    <td className="p-3 font-semibold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: item.accentHex }} />
                      <span>{item.division}</span>
                    </td>
                    <td className="p-3 text-white font-sans font-medium">{item.heroApparel}</td>
                    <td className="p-3">{item.footwear}</td>
                    <td className="p-3 italic">{item.keyAccessories}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleCopy(prompt)}
                        className={`p-1.5 rounded transition-all focus:outline-none border ${
                          isCopied
                            ? "bg-[#00D9B5]/15 border-[#00D9B5]/30 text-[#00D9B5]"
                            : "bg-[#111827] border-[#1A2540] text-white hover:border-[#D4A843]"
                        }`}
                        title="Copy image generation prompt"
                      >
                        {isCopied ? <Check size={10} /> : <Copy size={10} />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
