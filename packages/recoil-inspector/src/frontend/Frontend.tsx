'use client';

import { useState } from 'react';

import { StateInspector } from './app/state-inspector/StateInspector';

import { InspectorToggle } from './app/state-inspector/inspector-toggle/InspectorToggle';

export const FRONTEND_CONTAINER_ID = 'recoil-inspector-frontend';

export function Frontend() {
  const [showFrontend, setShowFrontend] = useState(false);

  const toggleFrontend = () => {
    setShowFrontend(!showFrontend);
  };

  return (
    <div id={FRONTEND_CONTAINER_ID} className="App">
      <InspectorToggle onClick={toggleFrontend} />

      <StateInspector show={showFrontend} />
    </div>
  );
}
