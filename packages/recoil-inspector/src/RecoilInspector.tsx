import { lazy } from 'react';

const ClientStatesParser = lazy(() => import('./client-states-parser/ClientStatesParser'))

const Frontend = lazy(() => import('./frontned/Frontend').then(FrontendModule => {
  return {
    default: FrontendModule.Frontend
  }
}));

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
