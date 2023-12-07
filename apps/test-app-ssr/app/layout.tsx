'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { RecoilRoot } from 'recoil';
import { RecoilInspector } from 'recoil-inspector';

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
          <RecoilInspector />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
