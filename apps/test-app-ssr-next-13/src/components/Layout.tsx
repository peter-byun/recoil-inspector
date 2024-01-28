import { ReactNode } from 'react';

import { RecoilRoot } from 'recoil';
import { RecoilInspector } from 'recoil-inspector';

if (process.env.NODE_ENV === 'development') {
  import('recoil-inspector/public/index.css');
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      {children}
      <RecoilInspector />
    </RecoilRoot>
  );
}
