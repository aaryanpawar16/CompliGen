"use client";

import React, { useState } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { HeroStudio } from '../components/hero/HeroStudio';
import { PainSimulator } from '../components/simulator/PainSimulator';
import { BentoGrid } from '../components/showcase/BentoGrid';
import { BackgroundLines } from '../components/ui/background-lines';

export default function Home() {
  // Shared state to sync the Hero generation with the Solution Showcase
  const [adState, setAdState] = useState({
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop',
    type: 'default' // 'default' | 'watch' | 'shoe' | 'coffee'
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      
      <HeroStudio onGenerate={(image, type) => setAdState({ image, type })} />
      
      <PainSimulator />
      
      <BentoGrid generatedAd={adState} />
      
      {/* Wraps the Footer content in the BackgroundLines component.
        We remove the previous gradient background and let the animated lines handle it.
      */}
      <BackgroundLines className="border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto text-center px-6 py-24 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Ready to stop getting rejected?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button className="bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Start Creating for Free
             </button>
             <button className="px-10 py-5 rounded-full text-lg font-bold text-white border border-white/20 hover:bg-white/5 transition-colors">
                Book a Demo
             </button>
          </div>
          <p className="mt-8 text-slate-500 text-sm">No credit card required • 50 Free generations/mo • SOC2 Compliant</p>
        </div>
      </BackgroundLines>
    </main>
  );
}