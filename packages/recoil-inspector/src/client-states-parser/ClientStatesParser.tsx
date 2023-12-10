import { useEffect } from 'react';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

import { sendMessageToFrontend } from './event-bridge';
import {
  convertFiberToDebuggerComponentTree,
  createNode,
} from './fiber-parser/fiber-parser';

/**
 * @description It should be a child component of the RecoilRoot component that you want to debug.
 * Your application's process.env.NODE_ENV value should be 'development' to enable the debugger.
 */
export default function ClientStatesParser() {
  useOnFiberRootMount({ onFiberRootUpdate: transformFiberRootToComponentTree });

  // NOTE: This part is likely going to be affected by Recoil's version updates
  useRecoilTransactionObserver_UNSTABLE(
    function transformRecoilStatesAndPassThemToExtension({ snapshot }) {
      const formattedRecoilStates: {
        key: string;
        value: any;
        stateType: string;
      }[] = [];
      for (const node of snapshot.getNodes_UNSTABLE()) {
        formattedRecoilStates.push({
          key: node.key,
          value: snapshot.getLoadable(node).getValue(),
          stateType: snapshot.getInfo_UNSTABLE(node).type,
          // NOTE: Currently the "subscribers" property of the snapshot has empty generators.
        });
      }
      window.__RECOIL_INSPECTOR_RECOIL_STATES = formattedRecoilStates;

      incrementFiberRootId();
      window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT.id =
        window.__RECOIL_INSPECTOR_FIBER_ROOT_ID;

      sendMessageToFrontend({
        action: 'extensionDataUpdated',
        payload: {
          componentTreeRoot: window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT,
          recoilStates: window.__RECOIL_INSPECTOR_RECOIL_STATES,
        },
      });
    }
  );

  return null;
}

interface UseOnFiberRootMountProps {
  onFiberRootUpdate: (fiberRoot: any) => void;
}
function useOnFiberRootMount({ onFiberRootUpdate }: UseOnFiberRootMountProps) {
  useEffect(function tabIntoReactDevToolFiberRootUpdate() {
    if (!window) {
      return;
    }

    const reactDevToolGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

    reactDevToolGlobalHook.onCommitFiberRoot = beforeCommitFiberRoot(
      reactDevToolGlobalHook.onCommitFiberRoot,
      onFiberRootUpdate
    );
  }, []);
}
function beforeCommitFiberRoot(
  onCommitFiberRoot: (...args: any) => void,
  onFiberRootUpdate: (fiberRoot: any) => void
) {
  return function recordFiberRootAndExecuteOriginalReactDevToolGlobalHook(
    ...args: any
  ) {
    const fiberRoot = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
      .getFiberRoots(1)
      .values()
      .next().value.current;
    onFiberRootUpdate(fiberRoot);

    return onCommitFiberRoot(...args);
  };
}

function transformFiberRootToComponentTree(fiberRoot: any) {
  const componentTreeRoot = createNode({
    name: 'root',
  } as any);

  convertFiberToDebuggerComponentTree(fiberRoot, componentTreeRoot);

  window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT = componentTreeRoot;
}

function incrementFiberRootId() {
  if (window.__RECOIL_INSPECTOR_FIBER_ROOT_ID === undefined) {
    window.__RECOIL_INSPECTOR_FIBER_ROOT_ID = 0;
  } else {
    window.__RECOIL_INSPECTOR_FIBER_ROOT_ID =
      window.__RECOIL_INSPECTOR_FIBER_ROOT_ID + 1;
  }
}
