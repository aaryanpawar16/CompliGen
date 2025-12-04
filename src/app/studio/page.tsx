"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, Layers, Image as ImageIcon, Type, Box, Download, Share2, 
  Settings, Wand2, CheckCircle2, AlertTriangle, Undo, Redo, ZoomIn, 
  ZoomOut, MousePointer2, Lock, Eye, EyeOff, MoreVertical, Monitor,
  Sparkles // New Icon
} from 'lucide-react';
import { Badge } from '../../components/shared/Badge';

// --- MOCK DATA ---
const LAYERS = [
  { id: 1, name: 'Product_Bottle.png', type: 'image', visible: true, locked: false, active: true },
  { id: 2, name: 'Headline Text', type: 'text', visible: true, locked: false, active: false, y: 80 }, // y position for simulation
  { id: 3, name: 'CTA Button', type: 'group', visible: true, locked: false, active: false, y: 500 },
  { id: 4, name: 'AI Background', type: 'bg', visible: true, locked: true, active: false },
];

export default function StudioPage() {
  const [activeTool, setActiveTool] = useState('select');
  const [layers, setLayers] = useState(LAYERS);
  const [prompt, setPrompt] = useState('Minimalist marble counter with morning sunlight');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000&auto=format&fit=crop');
  const [canvasScale, setCanvasScale] = useState(100);
  const [complianceIssues, setComplianceIssues] = useState(['Safe Zones']); // Track active issues

  const toggleLayerVisibility = (id: number) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);

    try {
      // Attempt to fetch from real API
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) throw new Error('API Request failed');

      const data = await res.json();
      
      if (data.success) {
        setGeneratedImage(data.imageUrl);
      }
    } catch (error) {
      console.error("Generation failed, switching to simulation mode", error);
      
      // FALLBACK SIMULATION: If API fails, simulate a successful generation after delay
      setTimeout(() => {
        // Use a different image to show change
        setGeneratedImage('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'); 
      }, 1500);
    } finally {
      // Always stop loading spinner
      setTimeout(() => setIsGenerating(false), 1500);
    }
  };

  // --- THE "AUTO-FIX" ALGORITHM ---
  const handleAutoFix = () => {
    // 1. Find the layer causing the issue (Simulated as "Headline Text")
    // 2. Animate it to a safe Y position (e.g., move it down from top edge)
    const newLayers = layers.map(l => {
        if (l.name === 'Headline Text') {
            return { ...l, y: 180 }; // Increased move distance for visibility
        }
        return l;
    });
    setLayers(newLayers);
    
    // 3. Clear the error after a brief delay to show the effect
    setTimeout(() => {
        setComplianceIssues([]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden font-sans">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-16 border-b border-white/10 bg-slate-900 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-4">
          <a href="/" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </a>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div>
            <h1 className="font-bold text-sm flex items-center gap-2">
              Untitled Project <span className="text-slate-500 font-normal">v1.0</span>
            </h1>
            <span className="text-xs text-slate-500">Last saved just now</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-white/5">
           <button className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Undo"><Undo size={16} /></button>
           <button className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Redo"><Redo size={16} /></button>
           <div className="h-4 w-px bg-white/10 mx-1" />
           <div className="flex items-center gap-2 px-2 text-xs font-mono text-slate-400">
             <button onClick={() => setCanvasScale(s => Math.max(10, s - 10))}><ZoomOut size={14} /></button>
             <span className="w-8 text-center">{canvasScale}%</span>
             <button onClick={() => setCanvasScale(s => Math.min(200, s + 10))}><ZoomIn size={14} /></button>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-full text-xs font-medium transition-colors ${complianceIssues.length === 0 ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
              {complianceIssues.length === 0 ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
              {complianceIssues.length === 0 ? 'Compliant' : `${complianceIssues.length} Issues`}
           </div>
           <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 flex items-center gap-2">
              <Download size={16} /> Export
           </button>
           <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
              <Share2 size={20} />
           </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR: TOOLS & ASSETS */}
        <aside className="w-72 bg-slate-900 border-r border-white/10 flex flex-col z-10">
          {/* Tool Selector */}
          <div className="flex gap-1 p-2 border-b border-white/10">
            {[
              { id: 'select', icon: MousePointer2, label: 'Select' },
              { id: 'image', icon: ImageIcon, label: 'Image' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'shape', icon: Box, label: 'Shape' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-2 rounded-lg flex-1 flex justify-center transition-colors ${
                  activeTool === tool.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                title={tool.label}
              >
                <tool.icon size={18} />
              </button>
            ))}
          </div>

          {/* AI Generator Panel */}
          <div className="p-4 border-b border-white/10 bg-slate-800/30">
            <div className="flex items-center gap-2 mb-3 text-blue-400 text-xs font-bold uppercase tracking-wider">
               <Wand2 size={12} /> Generative Fill
            </div>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 resize-none h-24 mb-3"
              placeholder="Describe background..."
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>Generate <span className="text-white/50 text-xs ml-1">(2 credits)</span></>
              )}
            </button>
          </div>

          {/* Layers Panel */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
              Layers <Layers size={14} />
            </div>
            <div className="space-y-0.5 px-2">
              {layers.map((layer) => (
                <div 
                  key={layer.id}
                  className={`flex items-center gap-3 p-2.5 rounded-lg text-sm cursor-pointer group transition-colors ${
                    layer.active ? 'bg-blue-600/20 text-blue-100' : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <button onClick={(e) => { e.stopPropagation(); toggleLayerVisibility(layer.id); }}>
                    {layer.visible ? <Eye size={14} className="text-slate-400" /> : <EyeOff size={14} className="text-slate-600" />}
                  </button>
                  <span className="flex-1 truncate select-none">{layer.name}</span>
                  {layer.locked && <Lock size={12} className="text-slate-600" />}
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded">
                    <MoreVertical size={14} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER: CANVAS AREA */}
        <main className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-8">
          {/* Canvas Background Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          {/* The Actual Canvas */}
          <div 
            className="bg-white relative shadow-2xl transition-transform duration-200 ease-out"
            style={{ 
              width: '360px', 
              height: '640px', 
              transform: `scale(${canvasScale / 100})` 
            }}
          >
            {/* Simulation of Canvas Content */}
            <div className="w-full h-full bg-slate-100 relative overflow-hidden group">
               {/* 1. Background Layer */}
               <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isGenerating ? 'blur-lg scale-105' : ''}`}
                    style={{ backgroundImage: `url(${generatedImage})` }}>
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Wand2 className="text-white animate-bounce" size={48} />
                    </div>
                  )}
               </div>

               {/* 2. Product Layer */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-transparent hover:border-blue-500 cursor-move z-10">
                  <div className="w-full h-full bg-slate-300 rounded-lg flex items-center justify-center opacity-80">
                     <span className="text-slate-500 font-bold">PRODUCT</span>
                  </div>
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border border-white rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 border border-white rounded-full"></div>
               </div>

               {/* 3. Text Layer - With Animated Position */}
               <div 
                 className="absolute left-8 right-8 border-2 border-blue-500 z-20 p-2 cursor-text transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                 style={{ top: `${layers.find(l => l.name === 'Headline Text')?.y || 80}px` }}
               >
                  <h2 className="text-4xl font-black text-white drop-shadow-lg leading-tight">
                    SUMMER <br/> SALE
                  </h2>
               </div>

               {/* 4. Safe Zone Overlay (Visual Feedback) */}
               <div className="absolute inset-0 pointer-events-none z-50">
                  <div className="absolute top-0 w-full h-[15%] bg-red-500/10 border-b border-red-500/50 flex justify-center items-end pb-1">
                    <span className="text-[10px] text-red-500 font-mono bg-white/80 px-1 rounded">DANGER ZONE</span>
                  </div>
                  <div className="absolute bottom-0 w-full h-[20%] bg-red-500/10 border-t border-red-500/50 flex justify-center pt-1">
                    <span className="text-[10px] text-red-500 font-mono bg-white/80 px-1 rounded h-fit">CAPTION AREA</span>
                  </div>
               </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: PROPERTIES */}
        <aside className="w-80 bg-slate-900 border-l border-white/10 flex flex-col z-10 overflow-y-auto">
          
          {/* Compliance Status Card */}
          <div className="p-4 border-b border-white/10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Compliance Status</h3>
            
            <div className="bg-slate-950 rounded-lg border border-white/10 p-3 space-y-3">
              <div className="flex items-center justify-between text-sm">
                 <span className="text-slate-300">Target Platform</span>
                 <div className="flex items-center gap-2">
                   <Monitor size={14} className="text-slate-500" />
                   <span className="font-medium">All Retailers</span>
                 </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                {[
                  { label: 'Contrast Ratio', status: 'pass' },
                  { label: 'Text Coverage', status: 'pass' },
                  { label: 'Prohibited Claims', status: 'pass' },
                  { 
                    label: 'Safe Zones', 
                    status: complianceIssues.includes('Safe Zones') ? 'warn' : 'pass' 
                  },
                ].map((check, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{check.label}</span>
                    {check.status === 'pass' && <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={10} /> Pass</span>}
                    {check.status === 'warn' && <span className="text-red-400 flex items-center gap-1"><AlertTriangle size={10} /> Fail</span>}
                  </div>
                ))}
              </div>

              {/* THE WINNING FEATURE: AUTO-FIX BUTTON */}
              {complianceIssues.length > 0 && (
                <button 
                  onClick={handleAutoFix}
                  className="w-full mt-2 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 animate-pulse"
                >
                  <Sparkles size={12} /> Auto-Fix Issues
                </button>
              )}
            </div>
          </div>

          {/* Properties Panel */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Properties</h3>
               <Settings size={14} className="text-slate-500" />
            </div>

            <div className="space-y-4">
              {/* Dimensions Input */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                   <label className="text-xs text-slate-400">Width</label>
                   <div className="bg-slate-950 border border-white/10 rounded px-2 py-1.5 text-sm flex justify-between text-slate-300">
                     1080 <span className="text-slate-600">px</span>
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-xs text-slate-400">Height</label>
                   <div className="bg-slate-950 border border-white/10 rounded px-2 py-1.5 text-sm flex justify-between text-slate-300">
                     1920 <span className="text-slate-600">px</span>
                   </div>
                </div>
              </div>

              {/* Opacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <label>Opacity</label>
                  <span>100%</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-blue-600 rounded-full"></div>
                </div>
              </div>

               {/* Format Selector */}
               <div className="space-y-2 pt-4 border-t border-white/5">
                  <label className="text-xs text-slate-400 block">Adapt To Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['9:16', '1:1', '16:9'].map(ratio => (
                      <button key={ratio} className={`py-1.5 text-xs rounded border ${ratio === '9:16' ? 'bg-blue-600/20 border-blue-600 text-blue-400' : 'border-white/10 hover:bg-white/5 text-slate-400'}`}>
                        {ratio}
                      </button>
                    ))}
                  </div>
               </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}