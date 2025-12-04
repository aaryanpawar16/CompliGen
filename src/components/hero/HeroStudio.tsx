"use client";

import React, { useState, useEffect } from 'react';
import { Wand2, CheckCircle2, Scan, Zap, Download, RotateCcw } from 'lucide-react';
import { Badge } from '../shared/Badge';
import { getSmartIcon } from '../../lib/smart-icons';
import { getGradientFromText } from '../../lib/gradients';
import { Vortex } from '../ui/vortex';

type HeroStudioProps = {
  onGenerate?: (imageUrl: string, type: string) => void;
};

export const HeroStudio = ({ onGenerate }: HeroStudioProps) => {
  const [prompt, setPrompt] = useState('Minimalist marble counter with morning sunlight');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'generating' | 'scanning' | 'complete'>('idle');
  const [generatedBg, setGeneratedBg] = useState('from-indigo-900 to-purple-900');
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleReset = () => {
    setPrompt('');
    setIsGenerating(false);
    setProgress(0);
    setStatus('idle');
    setResultImage(null);
    setGeneratedBg('from-indigo-900 to-purple-900');
  };

  const updateParent = (img: string, type: string) => {
    if (onGenerate) onGenerate(img, type);
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setStatus('generating');
    setIsGenerating(true);
    setProgress(0);
    setResultImage(null);
    setGeneratedBg(getGradientFromText(prompt));

    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('watch') || lowerPrompt.includes('gold') || lowerPrompt.includes('luxury') || lowerPrompt.includes('time')) {
        setTimeout(() => {
            const img = 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop';
            setResultImage(img); 
            updateParent(img, 'watch');
            setProgress(100);
        }, 1500);
        return;
    }
    
    if (lowerPrompt.includes('nike') || lowerPrompt.includes('shoe') || lowerPrompt.includes('sneaker') || lowerPrompt.includes('run')) {
        setTimeout(() => {
            const img = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop';
            setResultImage(img); 
            updateParent(img, 'shoe');
            setProgress(100);
        }, 1500);
        return;
    }

    try {
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const genData = await genRes.json();
      if (genData.success) {
        setResultImage(genData.imageUrl);
        updateParent(genData.imageUrl, 'coffee'); 
        setProgress(100);
      }
    } catch (error) {
      console.error("Generation failed", error);
      const fallbackImg = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1000&auto=format&fit=crop';
      setResultImage(fallbackImg);
      updateParent(fallbackImg, 'coffee');
      setProgress(100);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'generating' && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status, progress]);

  useEffect(() => {
    if (progress >= 100 && status === 'generating') {
      setStatus('scanning');
    }
  }, [progress, status]);

  useEffect(() => {
    if (status === 'scanning') {
      const timer = setTimeout(() => {
        setStatus('complete');
        setIsGenerating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-950">
      {/* Vortex Background */}
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={500}
        baseHue={250}
        className="flex items-center justify-center w-full h-full"
        containerClassName="absolute inset-0"
      >
        {/* Empty wrapper for Vortex children constraint */}
      </Vortex>

      {/* Content on top of Vortex */}
      <div className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="space-y-8">
          <Badge color="purple"><Wand2 size={12}/> AI + Compliance Engine v2.0</Badge>
          
          <h1 className="text-5xl md:text-7xl font-sans font-bold leading-[1.1] text-white tracking-tight">
            Retail Media, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 animate-gradient">
              Without the Rejection.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
            Generate compliant ads for Amazon, Tesco, and Walmart in seconds. The first AI that knows the rules before you break them.
          </p>
          
          <div className="relative group max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-50 blur group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900 rounded-xl p-2 flex items-center gap-2 border border-slate-800">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Try: 'Iced coffee' or 'Gold watch'"
                className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-600 font-medium"
                disabled={status === 'generating' || status === 'scanning'}
              />
              
              <button 
                onClick={status === 'complete' ? handleReset : handleGenerate}
                disabled={isGenerating || status === 'scanning'}
                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  status === 'complete' 
                    ? 'bg-slate-800 text-white hover:bg-slate-700 border border-white/20' 
                    : 'bg-white text-black hover:bg-slate-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'generating' ? 'Creating...' : 
                 status === 'scanning' ? 'Scanning...' : 
                 status === 'complete' ? 'New Ad' : 'Generate'}
                
                {status === 'idle' && <Wand2 size={18} />}
                {status === 'complete' && <RotateCcw size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Tesco Approved</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Amazon Ready</span>
          </div>
        </div>

        <div className="relative perspective-1000">
          <div className={`relative z-10 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl transition-transform duration-700 ${status === 'scanning' ? 'scale-105 rotate-0' : 'rotate-[-2deg] hover:rotate-0'}`}>
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs text-slate-500 font-mono">canvas_preview.tsx</div>
            </div>

            <div className="aspect-[4/5] bg-black rounded-xl overflow-hidden relative group">
              {status === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                  <Scan size={48} className="mb-4 opacity-50" />
                  <p className="text-sm font-mono">Waiting for prompt...</p>
                </div>
              )}

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

              {(status === 'scanning' || status === 'complete') && (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${generatedBg} flex items-center justify-center transition-all duration-1000`}>
                    {resultImage ? (
                      <img src={resultImage} alt="Generated Ad" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                    )}
                  </div>

                  {status === 'complete' && resultImage && (
                    <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 animate-in fade-in duration-1000 pointer-events-none">
                      {(prompt.toLowerCase().includes('coffee') || prompt.toLowerCase().includes('latte') || prompt.toLowerCase().includes('drink')) ? (
                        <div className="transform -translate-y-12">
                          <h3 className="text-5xl font-black text-white drop-shadow-2xl leading-[0.9] tracking-tighter mb-4 text-left">
                            HELLO,<br/><span className="text-white">SUNSHINE.</span>
                          </h3>
                          <p className="text-white/90 text-sm font-medium text-left max-w-[60%] drop-shadow-md leading-relaxed">
                            The bold taste of coffee,<br/>chilled to perfection.
                          </p>
                        </div>
                      ) : (prompt.toLowerCase().includes('watch') || prompt.toLowerCase().includes('gold') || prompt.toLowerCase().includes('luxury') || prompt.toLowerCase().includes('time')) ? (
                        <div className="transform -translate-y-12 text-left">
                          <h3 className="text-5xl font-black text-white drop-shadow-2xl leading-[0.9] tracking-tighter mb-4">
                            HELLO,<br/><span className="text-amber-200">SUCCESS.</span>
                          </h3>
                          <p className="text-white/90 text-sm font-medium drop-shadow-md leading-relaxed mb-6 max-w-[80%]">
                            The timeless elegance of a gold watch, crafted for the moment.
                          </p>
                        </div>
                      ) : (prompt.toLowerCase().includes('nike') || prompt.toLowerCase().includes('shoe') || prompt.toLowerCase().includes('sneaker')) ? (
                        <div className="transform -translate-y-12 text-left">
                          <h3 className="text-5xl font-black text-white drop-shadow-2xl leading-[0.9] tracking-tighter mb-4 uppercase">
                            HELLO,<br/><span className="text-white">SUCCESS.</span>
                          </h3>
                          <p className="text-white/90 text-sm font-medium drop-shadow-md leading-relaxed mb-6 max-w-[80%]">
                            The timeless elegance of a Nike shoe, crafted for the moment.
                          </p>
                          <svg className="w-12 h-12 text-white absolute bottom-[-140px] right-0" viewBox="0 0 24 24" fill="currentColor"><path d="M21.879 10.704C18.892 10.704 15.683 11.238 12.593 12.302C7.575 14.043 2.505 16.892 2.505 16.892C2.505 16.892 7.217 17.704 12.04 15.938C15.922 14.512 21.492 10.704 21.492 10.704Z" /></svg>
                        </div>
                      ) : (
                        <div className="transform -translate-y-12 text-left">
                          <h3 className="text-5xl font-black text-white drop-shadow-2xl leading-[0.9] tracking-tighter mb-4 uppercase">
                            PURE<br/><span className="text-white/80">SIMPLICITY.</span>
                          </h3>
                          <p className="text-white/90 text-sm font-medium drop-shadow-md leading-relaxed mb-6 max-w-[80%]">
                            Premium quality designed for modern living.
                          </p>
                          <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg w-fit">
                            Shop Collection
                          </div>
                        </div>
                      )}
                    </div>
                  )}

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

                  {status === 'complete' && (
                    <div className="absolute inset-0 z-30 pointer-events-none">
                      <div className="absolute top-0 w-full h-[15%] bg-red-500/10 border-b border-red-500/30 flex items-end justify-center pb-2 opacity-30">
                         <span className="text-[10px] text-red-300 font-mono tracking-widest uppercase opacity-70">Unsafe: UI</span>
                      </div>
                      <div className="absolute bottom-0 w-full h-[20%] bg-red-500/10 border-t border-red-500/30 flex items-start justify-center pt-2 opacity-30">
                         <span className="text-[10px] text-red-300 font-mono tracking-widest uppercase opacity-70">Unsafe: Caption</span>
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
      </div>
    </section>
  );
};