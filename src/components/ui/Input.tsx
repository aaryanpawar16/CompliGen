import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export const Input = ({ className, icon, ...props }: InputProps) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-1000"></div>
      <div className={twMerge("relative bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 overflow-hidden focus-within:border-blue-500/50 transition-colors", className)}>
        {icon && <div className="pl-3 text-slate-500">{icon}</div>}
        <input 
          className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-600 font-medium"
          {...props}
        />
      </div>
    </div>
  );
};