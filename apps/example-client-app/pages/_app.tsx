import { RecoilInspector } from '../../../packages/recoil-inspector/build';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />;
      <RecoilInspector />
    </RecoilRoot>
  );
}
