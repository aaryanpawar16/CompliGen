"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Layers, ChevronRight, CheckCircle2, Zap, Download, Monitor, Smartphone, Share2 } from 'lucide-react';
import { Badge } from '../shared/Badge';
import { Vortex } from '../ui/vortex';
import { toPng } from 'html-to-image';

const FORMATS = [
  { id: 'story', label: 'Instagram Story (9:16)', ratio: 'aspect-[9/16]', width: 'w-56', type: 'mobile' },
  { id: 'feed', label: 'Facebook Feed (4:5)', ratio: 'aspect-[4/5]', width: 'w-64', type: 'mobile' },
  { id: 'banner', label: 'Amazon Banner (16:9)', ratio: 'aspect-[16/9]', width: 'w-80', type: 'desktop' },
  { id: 'tiktok', label: 'TikTok (9:16)', ratio: 'aspect-[9/16]', width: 'w-56', type: 'mobile' },
];

type BentoGridProps = {
  generatedAd?: {
    image: string;
    type: string;
  };
};

export const BentoGrid = ({ generatedAd }: BentoGridProps) => {
  const [activeFormat, setActiveFormat] = useState(FORMATS[0]);
  const previewRef = useRef<HTMLDivElement>(null);
  const [localImageSrc, setLocalImageSrc] = useState<string>('');

  const adImage = generatedAd?.image || 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop';
  const adType = generatedAd?.type || 'default';

  useEffect(() => {
    const preloadImage = async () => {
      try {
        const response = await fetch(adImage);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setLocalImageSrc(objectUrl);
      } catch (error) {
        console.error("Failed to preload image for capture:", error);
        setLocalImageSrc(adImage); // Fallback to normal URL
      }
    };

    preloadImage();
  }, [adImage]);

  const handleDownload = useCallback(() => {
    if (previewRef.current === null) {
      return;
    }

    setTimeout(() => {
        toPng(previewRef.current as HTMLElement, { 
            cacheBust: true, 
            pixelRatio: 2,
            backgroundColor: 'transparent'
        })
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `compligen-ad-${adType}-${activeFormat.id}.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((err) => {
            console.error('Failed to download image', err);
        });
    }, 100);
  }, [previewRef, adType, activeFormat.id]);

  return (
    // Use Vortex as background for BentoGrid too
    <section className="bg-slate-950 border-y border-white/5 relative overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={250}
        className="flex flex-col justify-center w-full h-full py-24"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-12 flex justify-between items-end">
            <div>
                <Badge color="blue"><Layers size={12}/> The Solution</Badge>
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mt-6">One Click. Every Retailer.</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                View all features <ChevronRight size={16} />
            </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Card 1: Interactive Preview */}
            <div className="md:col-span-2 row-span-2 bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-3xl p-10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 flex flex-col">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                
                <div className="relative z-10 mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Contextual Background Gen</h3>
                <p className="text-slate-400 max-w-sm text-lg">
                    Describe a scene. Our AI generates it while respecting product scale, lighting, and retail brand guidelines automatically.
                </p>
                </div>
                
                <div className="flex-1 relative flex items-center justify-center min-h-[300px] bg-slate-950/50 rounded-2xl border border-white/5 p-8 backdrop-blur-sm">
                
                <div ref={previewRef} className={`relative transition-all duration-500 ease-spring ${activeFormat.width} ${activeFormat.ratio} bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-white/10 group/preview`}>
                    {localImageSrc && (
                        <img 
                            src={localImageSrc}
                            alt="Ad Preview"
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                    )}
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                        <div className="bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full border border-white/20">
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Sponsored</span>
                        </div>
                        <div>
                        {adType === 'watch' ? (
                            <>
                            <h4 className="text-white font-black text-3xl leading-none drop-shadow-lg mb-2">TIMELESS<br/><span className="text-amber-200">LUXURY.</span></h4>
                            <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Discover</div>
                            </>
                        ) : adType === 'shoe' ? (
                            <>
                            <h4 className="text-white font-black text-3xl leading-none drop-shadow-lg mb-2">RUN<br/><span className="text-orange-400">FASTER.</span></h4>
                            <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Shop Now</div>
                            </>
                        ) : (
                            <>
                            <h4 className="text-white font-black text-3xl leading-none drop-shadow-lg mb-2">MORNING<br/>BREW.</h4>
                            <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Shop Now</div>
                            </>
                        )}
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] z-20" data-html2canvas-ignore>
                        <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover/preview:translate-y-0 transition-transform duration-300 cursor-pointer">
                            <Download size={16} /> Download
                        </button>
                        <div className="flex gap-2 transform translate-y-4 group-hover/preview:translate-y-0 transition-transform duration-300 delay-75">
                            <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full"><Share2 size={16}/></button>
                            <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full"><Monitor size={16}/></button>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-blue-500/5 blur-3xl rounded-full"></div>
                </div>
            </div>

            {/* Card 2: Format Selector */}
            <div className="row-span-2 bg-slate-900 border border-white/10 rounded-3xl p-8 relative flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Adaptive Layouts</h3>
                <p className="text-slate-400 text-sm mb-6">Build once. Export for Stories, Feeds, and Banners instantly.</p>
                <div className="space-y-3 relative z-10 flex-1">
                {FORMATS.map((format) => (
                    <button 
                    key={format.id}
                    onClick={() => setActiveFormat(format)}
                    className={`w-full p-4 rounded-xl flex items-center justify-between border transition-all duration-200 group text-left ${
                        activeFormat.id === format.id 
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.15)]' 
                        : 'bg-black/40 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/5'
                    }`}
                    >
                    <div className="flex items-center gap-3">
                        {format.type === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                        <span className={activeFormat.id === format.id ? 'text-blue-200 font-medium' : 'text-slate-300'}>
                        {format.label}
                        </span>
                    </div>
                    {activeFormat.id === format.id && (
                        <CheckCircle2 size={16} className="text-blue-500 animate-in zoom-in duration-200" />
                    )}
                    </button>
                ))}
                </div>
            </div>

            {/* Card 3 & 4 */}
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-yellow-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500 group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                </div>
                <div>
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">Instant Audit</h3>
                <p className="text-slate-400 text-sm mt-2">Real-time claim validation against FTC & ASA guidelines.</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-green-500/30 transition-colors">
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                    <span className="text-4xl font-bold text-white group-hover:text-green-400 transition-colors">99.8%</span>
                    <span className="text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded">+12%</span>
                    </div>
                    <p className="text-slate-400 text-sm">First-pass approval rate for CompliGen assets.</p>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-green-500 w-[99.8%]"></div>
                </div>
            </div>

            </div>
        </div>
      </Vortex>
    </section>
  );
};