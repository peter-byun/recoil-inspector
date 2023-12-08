'use client';

import { lazy } from 'react';

const ClientStatesParser = lazy(
  () => import('./client-states-parser/ClientStatesParser')
);

const Frontend = lazy(() =>
  import('./frontend/Frontend').then((FrontendModule) => {
    return {
      default: FrontendModule.Frontend,
    };
  })
);

type RecoilInspectorProps = {
  enabled?: boolean;
};

/**
 * @description It should be a child component of the RecoilRoot component that you want to debug.
 * Your application's process.env.NODE_ENV value should be 'development' to enable the debugger.
 */
export function RecoilInspector({ enabled = true }: RecoilInspectorProps) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!enabled) {
    return;
  }

  return (
    <div id="recoil-inspector-root">
      <ClientStatesParser />
      <Frontend />
    </div>
  );
}
