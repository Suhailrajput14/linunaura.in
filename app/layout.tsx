import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { StoreHydration } from '@/components/store/hydration-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Linunaura - Premium Bedsheets',
  description: 'Discover luxury bedsheets crafted with the finest Egyptian cotton, linen, and silk. Transform your bedroom into a sanctuary of comfort and style.',
  openGraph: {
    title: 'Linunaura - Premium Bedsheets',
    description: 'Discover luxury bedsheets crafted with the finest Egyptian cotton, linen, and silk.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <StoreHydration>
            {children}
          </StoreHydration>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
