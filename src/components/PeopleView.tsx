import React from "react";
import { Users2, Shield, Mail, Award, CheckCircle } from "lucide-react";
import { LEADERS } from "../data/bibleData";

export default function PeopleView() {
  return (
    <div className="space-y-6 select-none text-left">
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <div className="flex items-center gap-2 mb-2">
          <Users2 className="text-[#00D9B5]" size={16} />
          <h2 className="text-base font-bold text-white font-sans uppercase tracking-tight">
            02 Founders, Leadership & Governance Board
          </h2>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          The directing fiduciaries and executive architects responsible for the strategic governance of Collective AI's 20 divisions. Every leader holds assigned administrative authority and is subject to the Aegis compliance bylaws.
        </p>
      </div>

      {/* Leadership Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEADERS.map((leader, idx) => {
          const isMoyler = leader.name.toLowerCase().includes("moyler");
          const isJohnson = leader.name.toLowerCase().includes("johnson");
          const isConstant = leader.name.toLowerCase().includes("constant");

          let derivedVeto = "";
          if (isMoyler) derivedVeto = "Active Veto on corporate brand voice, media systems, and Hataalii copy validation.";
          if (isJohnson) derivedVeto = "Absolute Veto on Helios Grid (D-05) deployment without explicit CLO written authority.";
          if (isConstant) derivedVeto = "Representative democratic veto on public community guidelines inside Civic Core.";

          return (
            <div
              key={idx}
              className="bg-[#0D1326] border border-[#1A2540] rounded p-5 relative overflow-hidden flex flex-col justify-between hover:border-[#D4A843] transition-colors"
            >
              {/* Corner security clearance indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[8px] uppercase">
                <span className="px-1.5 py-0.5 rounded bg-[#111827] text-[#00D9B5] border border-[#1A2540]">
                  {leader.isFounder ? "Founder board" : "Governing board"}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#D4A843] uppercase tracking-wider block">
                    {leader.title}
                  </span>
                  <h3 className="text-base font-bold text-white font-sans mt-0.5">
                    {leader.name}
                  </h3>
                </div>

                <div className="space-y-3 font-sans text-xs text-[#8B9BAE]">
                  {derivedVeto && (
                    <div className="p-2 bg-[#EA580C]/5 border border-[#EA580C]/25 rounded-[2px] leading-relaxed text-[11px] text-[#EA580C]">
                      <span className="font-bold uppercase tracking-wide block text-[8px] text-white">VETO POWERS ACTIVE</span>
                      {derivedVeto}
                    </div>
                  )}

                  <div className="leading-normal">
                    <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-0.5">BACKGROUND SUMMARY</span>
                    <p className="text-[11px] leading-relaxed">{leader.notes}</p>
                  </div>

                  <div className="leading-tight pt-1">
                    <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-1">STRATEGIC GOVERNING SEGMENT</span>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 text-[9px] font-mono bg-[#111827] border border-[#1A2540] rounded-sm text-white">
                        {leader.domain}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A2540]/30 mt-4 flex items-center justify-between text-[9px] font-mono text-[#8B9BAE]">
                <span className="flex items-center gap-1"><Shield size={10} className="text-[#00D9B5]" /> Fiduciary Lock</span>
                <span className="uppercase text-[8px] text-[#00D9B5]">Active Registry</span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
