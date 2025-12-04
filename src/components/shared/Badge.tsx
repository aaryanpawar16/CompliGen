import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  color?: 'blue' | 'red' | 'green' | 'purple';
};

export const Badge = ({ children, color = "blue" }: BadgeProps) => {
  const styles = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 w-fit ${styles[color] || styles.blue}`}>
      {children}
    </span>
  );
};