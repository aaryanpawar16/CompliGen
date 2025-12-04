import React from 'react';
import { Menu } from 'lucide-react';

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="font-bold text-white text-lg">C</span>
        </div>
        <span className="font-sans font-bold text-xl tracking-tight text-white">CompliGen</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition-colors">Product</a>
        <a href="#" className="hover:text-white transition-colors">Compliance Rules</a>
        <a href="#" className="hover:text-white transition-colors">Showcase</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white text-sm font-medium hidden sm:block">Log in</button>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          Start Free
        </button>
        <button className="md:hidden text-white"><Menu size={24}/></button>
      </div>
    </div>
  </nav>
);