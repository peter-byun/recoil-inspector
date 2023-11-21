import { Global, css } from '@emotion/react';

import { NavigationBar } from '../components/layouts/NavigationBar';
import { colors } from '../styles/colors';
import { StateInspector } from './pages/state-inspector/StateInspector';

export function Frontend() {
  return (
    <div className="App" css={appCss}>
      <Global styles={GlobalCss} />
      <NavigationBar />
      <StateInspector />
      <div id="portal"></div>
    </div>
  );
}

const appCss = css`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
`;

const GlobalCss = css`
  :root {
    color-scheme: light dark;
    color: ${colors.dark.fontColor};
    background-color: ${colors.dark.background};

    font-family: Roboto, Inter, Avenir, Helvetica, Arial, sans-serif;
    font-synthesis: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
  }

  /* TODO: Add light mode support */
  @media (prefers-color-scheme: light) {
    :root {
      color: rgb(24, 24, 24);
    }
  }

  button {
    all: unset;
  }
`;
