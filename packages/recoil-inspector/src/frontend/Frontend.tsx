'use client';

import { useState } from 'react';

import { StateInspector } from './pages/state-inspector/StateInspector';

import { InspectorToggle } from './components/app/state-inspector/inspector-toggle/InspectorToggle';

import './styles/frontend.css';

export const FRONTEND_CONTAINER_ID = 'recoil-inspector-frontend';

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
    <div id={FRONTEND_CONTAINER_ID} className="App">
      <InspectorToggle onClick={toggleFrontend} />

      <StateInspector show={showFrontend} />
    </div>
  );
}
