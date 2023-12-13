'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { RecoilRoot } from 'recoil';
import { RecoilInspector } from 'recoil-inspector';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
    </html>
  );
}
