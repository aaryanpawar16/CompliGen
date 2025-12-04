"use client";

import React from 'react';
import { Scan, Zap, CheckCircle2, Download } from 'lucide-react';
import { Badge } from '../shared/Badge';
import { getSmartIcon } from '../../lib/smart-icons';

type CanvasProps = {
  status: 'idle' | 'generating' | 'scanning' | 'complete';
  prompt: string;
  progress: number;
  generatedBg: string;
};

export const Canvas = ({ status, prompt, progress, generatedBg }: CanvasProps) => {
  return (
    <div className="relative perspective-1000 w-full max-w-md mx-auto">
      <div className={`relative z-10 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl transition-transform duration-700 ${status === 'scanning' ? 'scale-105 rotate-0' : 'rotate-[-2deg] hover:rotate-0'}`}>
        
        {/* Header Mockup */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-xs text-slate-500 font-mono">canvas_preview.tsx</div>
        </div>

        {/* The Display Area */}
        <div className="aspect-[4/5] bg-black rounded-xl overflow-hidden relative group">
          
          {/* State: Idle */}
          {status === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
              <Scan size={48} className="mb-4 opacity-50" />
              <p className="text-sm font-mono">Waiting for prompt...</p>
            </div>
          )}

          {/* State: Generating (Tiles Animation) */}
          {status === 'generating' && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-5">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className="bg-slate-800 border-[0.5px] border-slate-700/50 transition-opacity duration-300"
                   style={{ 
                     opacity: Math.random() > 0.5 ? 1 : 0.5,
                     backgroundColor: `hsl(${220 + Math.random() * 40}, 50%, ${Math.random() * 20 + 10}%)`
                   }}
                 />
               ))}
               <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="w-64 bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                    <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${progress}%` }} />
                  </div>
               </div>
            </div>
          )}

          {/* State: Scanning/Complete (Show Image) */}
          {(status === 'scanning' || status === 'complete') && (
            <>
              {/* Generated Image Layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${generatedBg} flex items-center justify-center transition-all duration-1000`}>
                <div className="absolute bottom-0 w-full h-1/2 bg-white/5 blur-3xl rounded-full translate-y-12"></div>
                <div className="relative z-10 text-center animate-in zoom-in duration-500">
                    <div className="w-40 h-52 mx-auto bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                        <div className="relative z-10 mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            {getSmartIcon(prompt)}
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Generated</span>
                    </div>
                    <h3 className="text-white font-sans text-xl font-bold mt-6 drop-shadow-lg leading-tight px-4">
                        {prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt}
                    </h3>
                </div>
              </div>

              {/* Scanning Overlay */}
              {status === 'scanning' && (
                <div className="absolute inset-0 z-20">
                  <div className="w-full h-1 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-scan relative">
                     <div className="absolute right-0 bottom-2 bg-green-500 text-black text-[10px] font-bold px-1 rounded">SCANNING</div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-green-400 text-xs px-2 py-1 rounded border border-green-500/30 flex items-center gap-2">
                    <Zap size={10} className="animate-bounce" /> Checking Contrast
                  </div>
                </div>
              )}

              {/* Safe Zones Overlay (Visible on Complete) */}
              {status === 'complete' && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                  <div className="absolute top-0 w-full h-[15%] bg-red-500/10 border-b border-red-500/30 flex items-end justify-center pb-2">
                     <span className="text-[10px] text-red-300 font-mono tracking-widest uppercase opacity-70">Unsafe: UI Overlay</span>
                  </div>
                  <div className="absolute bottom-0 w-full h-[20%] bg-red-500/10 border-t border-red-500/30 flex items-start justify-center pt-2">
                     <span className="text-[10px] text-red-300 font-mono tracking-widest uppercase opacity-70">Unsafe: Caption Zone</span>
                  </div>
                  <div className="absolute top-[15%] bottom-[20%] left-0 right-0 border-2 border-green-500/30 m-2 rounded bg-green-500/5">
                     <div className="absolute top-2 right-2">
                        <Badge color="green">PASSED</Badge>
                     </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Results Panel */}
        {status === 'complete' && (
           <div className="absolute -bottom-6 left-6 right-6 bg-slate-800/90 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col">
               <span className="text-xs text-slate-400">Compliance Score</span>
               <span className="text-green-400 font-bold flex items-center gap-1"><CheckCircle2 size={14}/> 100% Ready</span>
             </div>
             <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors">
               <Download size={18} />
             </button>
           </div>
        )}
      </div>
    </div>
  );
};