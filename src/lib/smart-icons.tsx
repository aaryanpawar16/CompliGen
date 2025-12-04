import React from 'react';
import { 
  Coffee, Watch, Headphones, ShoppingBag, 
  Package, Footprints, Glasses 
} from 'lucide-react';

export const getSmartIcon = (text: string) => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('coffee') || lowerText.includes('drink') || lowerText.includes('cup') || lowerText.includes('mug')) return <Coffee size={48} className="text-amber-200" />;
  if (lowerText.includes('watch') || lowerText.includes('clock') || lowerText.includes('time')) return <Watch size={48} className="text-slate-200" />;
  if (lowerText.includes('headphone') || lowerText.includes('music') || lowerText.includes('audio')) return <Headphones size={48} className="text-blue-200" />;
  if (lowerText.includes('shoe') || lowerText.includes('sneaker') || lowerText.includes('run')) return <Footprints size={48} className="text-orange-200" />;
  if (lowerText.includes('bag') || lowerText.includes('shop') || lowerText.includes('tot')) return <ShoppingBag size={48} className="text-pink-200" />;
  if (lowerText.includes('glass') || lowerText.includes('sun')) return <Glasses size={48} className="text-emerald-200" />;
  
  return <Package size={48} className="text-white/50" />;
};