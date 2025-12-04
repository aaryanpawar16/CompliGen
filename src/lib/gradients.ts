export const getGradientFromText = (text: string) => {
  // Simple hashing function to deterministically pick a color based on input
  const hash = text.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  
  const colors = [
    'from-orange-500/20 to-purple-900',
    'from-blue-500/20 to-indigo-900',
    'from-emerald-500/20 to-teal-900',
    'from-pink-500/20 to-rose-900',
    'from-amber-500/20 to-orange-900',
    'from-violet-500/20 to-fuchsia-900',
    'from-cyan-500/20 to-blue-900',
  ];
  
  return colors[hash % colors.length];
};