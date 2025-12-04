"use client";

import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Smartphone, Maximize2, MousePointer2 } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { Vortex } from '@/components/ui/vortex';

export const PainSimulator = () => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    // Replaced standard section with Vortex wrapper, removed old grid background
    <section className="bg-black border-y border-white/5 relative overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={220}
        className="flex flex-col justify-center w-full h-full py-24"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <Badge color="red"><ShieldAlert size={12}/> The Problem</Badge>
            <h2 className="text-4xl font-bold text-white">Why is retail compliance so hard?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every platform has hidden rules. Hover over the phone below to find the "invisible" rejection zones.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
            
            {/* Interactive "Bad" Canvas */}
            <div className="relative w-[340px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden cursor-crosshair group select-none">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-50"></div>

              {/* Content Image Placeholder */}
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center opacity-50">
                  <span className="text-8xl opacity-10 font-black rotate-[-45deg] whitespace-nowrap">YOUR AD</span>
              </div>

              {/* Top 'Unsafe' Zone */}
              <div 
                className="absolute top-0 left-0 right-0 h-[20%] z-20 transition-all duration-300 hover:bg-red-500/80 hover:backdrop-blur-sm border-b border-red-500/0 hover:border-red-500/50 flex flex-col items-center justify-center text-center p-4"
                onMouseEnter={() => setHoveredZone('ui_overlap')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {hoveredZone === 'ui_overlap' && (
                    <div className="animate-in fade-in zoom-in duration-200">
                      <ShieldAlert className="text-white w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                      <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">REJECTED: UI Obstructed</span>
                    </div>
                )}
              </div>

              {/* Bottom 'Unsafe' Zone */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[25%] z-20 transition-all duration-300 hover:bg-red-500/80 hover:backdrop-blur-sm border-t border-red-500/0 hover:border-red-500/50 flex flex-col items-center justify-center text-center p-4"
                onMouseEnter={() => setHoveredZone('caption_bleed')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {hoveredZone === 'caption_bleed' && (
                    <div className="animate-in fade-in zoom-in duration-200">
                      <AlertTriangle className="text-white w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                      <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">REJECTED: Text Bleed</span>
                    </div>
                )}
              </div>
              
              {/* Right Edge Zone */}
              <div 
                className="absolute top-[20%] bottom-[25%] right-0 w-[15%] z-20 transition-all duration-300 hover:bg-red-500/80 hover:backdrop-blur-sm border-l border-red-500/0 hover:border-red-500/50 flex flex-col items-center justify-center"
                onMouseEnter={() => setHoveredZone('side_bleed')}
                onMouseLeave={() => setHoveredZone(null)}
              >
                  {hoveredZone === 'side_bleed' && (
                    <span className="text-white font-bold text-xs -rotate-90 whitespace-nowrap bg-black/50 px-2 py-1 rounded">CROP RISK</span>
                  )}
              </div>

              {/* The "Safe" Zone */}
              <div className="absolute top-[20%] bottom-[25%] left-0 right-[15%] flex items-center justify-center transition-all duration-300 hover:bg-green-500/20">
                {hoveredZone === null && (
                  <div className="text-center">
                      <p className="text-slate-500 text-sm mb-2 font-mono">HOVER TO INSPECT</p>
                      <MousePointer2 className="text-slate-500 mx-auto animate-bounce" />
                  </div>
                )}
                {hoveredZone === null && <div className="absolute inset-0 border-2 border-dashed border-slate-600/30 m-4 rounded"></div>}
              </div>
            </div>

            {/* Explanation Text */}
            <div className="max-w-md space-y-4">
              <div className={`p-6 rounded-xl border transition-all duration-300 ${hoveredZone === 'ui_overlap' ? 'bg-red-500/10 border-red-500/50 translate-x-2' : 'bg-slate-900/80 backdrop-blur-md border-white/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${hoveredZone === 'ui_overlap' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${hoveredZone === 'ui_overlap' ? 'text-red-400' : 'text-white'}`}>UI Clashes</h3>
                      <p className="text-slate-400 text-sm mt-1">TikTok & Reels overlay buttons, captions, and hearts here. Any text placed here causes immediate rejection.</p>
                    </div>
                  </div>
              </div>

              <div className={`p-6 rounded-xl border transition-all duration-300 ${hoveredZone === 'side_bleed' ? 'bg-red-500/10 border-red-500/50 translate-x-2' : 'bg-slate-900/80 backdrop-blur-md border-white/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${hoveredZone === 'side_bleed' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Maximize2 size={20} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${hoveredZone === 'side_bleed' ? 'text-red-400' : 'text-white'}`}>Aspect Ratio Crop</h3>
                      <p className="text-slate-400 text-sm mt-1">Different devices (iPhone vs Android) crop sides differently. What looks safe on your screen might be cut off for 40% of users.</p>
                    </div>
                  </div>
              </div>

              <div className={`p-6 rounded-xl border transition-all duration-300 ${hoveredZone === 'caption_bleed' ? 'bg-red-500/10 border-red-500/50 translate-x-2' : 'bg-slate-900/80 backdrop-blur-md border-white/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${hoveredZone === 'caption_bleed' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${hoveredZone === 'caption_bleed' ? 'text-red-400' : 'text-white'}`}>Caption Bleed</h3>
                      <p className="text-slate-400 text-sm mt-1">The bottom 20% is the "Dead Zone" for ads. This is where the platform's native caption and CTA button live.</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Vortex>
    </section>
  );
};