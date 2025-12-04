import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-24 bg-gradient-to-b from-slate-950 to-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />
      <div className="max-w-4xl mx-auto text-center px-6">
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
    </footer>
  );
};