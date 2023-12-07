import { useState } from 'react';

import { StateInspector } from './pages/state-inspector/StateInspector';
import { RecoilInspectorLogo } from './RecoilInspectorLogo';
import { appStyle, buttonStyle } from './styles/frontend';

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
    <div className="App recoil-inspector-frontend" style={appStyle}>
      <button onClick={toggleFrontend} style={buttonStyle}>
        <RecoilInspectorLogo />
      </button>

      <StateInspector show={showFrontend} />
      <div id="portal"></div>
    </div>
  );
}
