import React from 'react';
import { CheckCircle2 } from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  variant?: 'wide' | 'tall' | 'small';
  className?: string;
};

export const FeatureCard = ({ title, description, children, variant = 'small', className = '' }: FeatureCardProps) => {
  const baseStyles = "bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 hover:border-blue-500/30";
  
  // Variant specific sizing (if handled via grid classes in parent, these might be decorative or inner layout)
  const variantStyles = {
    wide: "md:col-span-2 row-span-2 bg-gradient-to-br from-slate-900 to-black",
    tall: "row-span-2",
    small: "flex flex-col justify-between"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <h3 className={`font-bold text-white mb-2 ${variant === 'wide' ? 'text-3xl' : 'text-xl'}`}>{title}</h3>
          <p className={`text-slate-400 ${variant === 'wide' ? 'text-lg max-w-sm' : 'text-sm'}`}>{description}</p>
        </div>
        
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};