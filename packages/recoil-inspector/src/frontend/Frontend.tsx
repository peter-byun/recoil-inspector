import { useState } from 'react';

import { StateInspector } from './pages/state-inspector/StateInspector';

import { InspectorToggle } from './components/frontend/InspectorToggle';

import './styles/frontend.css';

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
    <div className="App recoil-inspector-frontend">
      <InspectorToggle onClick={toggleFrontend} />

      <StateInspector show={showFrontend} />

      <div id="portal"></div>
    </div>
  );
}
