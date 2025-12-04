"use client";

import React from 'react';
import { ShieldAlert, AlertTriangle, MousePointer2, Smartphone, Maximize2 } from 'lucide-react';

type PhoneFrameProps = {
  hoveredZone: string | null;
  setHoveredZone: (zone: string | null) => void;
};

export const PhoneFrame = ({ hoveredZone, setHoveredZone }: PhoneFrameProps) => {
  return (
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
  );
};