import type { Metadata } from 'next';
import { Inter, Cabinet_Grotesk } from 'next/font/google'; // Assuming Cabinet Grotesk is available or use variable font replacement
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CompliGen | Retail Media AI',
  description: 'Generate compliant retail ads for Amazon, Tesco, and Walmart instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}