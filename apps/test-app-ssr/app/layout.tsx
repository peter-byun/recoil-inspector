'use client';

import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilInspector } from 'recoil-inspector';
import 'recoil-inspector/public/index.css';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <body className={inter.className}>
            <nav>
              <Link href={'/'}>/Home</Link>
              <Link href={'/buttons'}>/Buttons</Link>
              <Link href={'/cards'}>/Cards</Link>
            </nav>
            <RecoilInspector />
            {children}
          </body>
        </RecoilRoot>
      </QueryClientProvider>
    </html>
  );
}
