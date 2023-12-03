import ClientStatesParser from './client-states-parser/ClientStatesParser';

import { lazy } from 'react';

const Frontend = lazy(() => import('./frontned/Frontend').then(FrontendModule => {
  return {
    default: FrontendModule.Frontend
  }
}));


// TODO: Make it tree-shakable. It should not load Frontend chunks when the debugger is not used.
/**
 * @description It should be a child component of the RecoilRoot component that you want to debug.
 * Your application's process.env.NODE_ENV value should be 'development' to enable the debugger.
 */
export function RecoilInspector({
  disabled
}: {
  disabled?: boolean
}) {
  if (process.env.NODE_ENV !== 'development' || disabled) {
    return null;
  }

  return (
    <div id="recoil-inspector-root">
      <ClientStatesParser />

      <Frontend />
    </div>
  );
}
