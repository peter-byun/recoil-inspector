import { Global, css } from '@emotion/react';
import { useState } from 'react';

import { NavigationBar } from '../components/layouts/NavigationBar';
import { colors } from '../styles/colors';
import { StateInspector } from './pages/state-inspector/StateInspector';
import RecoilInspectorLogo from '../../public/recoil-inspector-logo.svg';

export function Frontend() {
  const [showFrontend, setShowFrontend] = useState(false);
  const toggleFrontend = () => {
    if (!showFrontend) {
      window.postMessage({
        type: 'frontendLoaded',
      });
    }

    setShowFrontend(!showFrontend);
  };

  return (
    <div className="App" css={appCss}>
      <Global styles={GlobalCss} />
      <NavigationBar />
      <button
        onClick={() => {
          toggleFrontend();
        }}
        css={css`
          position: fixed;
          left: 0;
          bottom: 0;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          padding: 4px;

          border: none;
          border-radius: 50%;
          outline: none;
          appearance: none;
          &:active,
          &:focus {
            outline: none;
          }
          transition: box-shadow 0.2s ease-out;
          &:hover {
            cursor: pointer;
            box-shadow: 2px 2px 5px 1px #181818d6;
          }
        `}
      >
        <img
          src={RecoilInspectorLogo}
          alt="RecoilInspectorLogo"
          width={50}
          height={50}
        />
      </button>

      {showFrontend ? <StateInspector /> : null}
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
