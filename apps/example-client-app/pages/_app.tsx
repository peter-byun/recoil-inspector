import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import RecoilInspector from 'recoil-inspector';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RecoilInspector />
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}
