import { useEffect } from 'react';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

import { sendMessageToExtension } from './extension-bridge';
import { convertFiberToComponentTree, createNode } from './fiber-parser';

const beforeCommitFiberRoot = function (
  onCommitFiberRoot: (...args: any) => void,
  onFiberRootUpdate: (fiberRoot: any) => void
) {
  return function (...args: any) {
    const fiberRoot = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
      .getFiberRoots(1)
      .values()
      .next().value.current;

    onFiberRootUpdate(fiberRoot);

    return onCommitFiberRoot(...args);
  };
};

interface UseOnFiberRootMountProps {
  onFiberRootUpdate: (fiberRoot: any) => void;
}
const useOnFiberRootMount = ({
  onFiberRootUpdate,
}: UseOnFiberRootMountProps) => {
  useEffect(() => {
    if (!window) {
      return;
    }

    const reactDevToolGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

    reactDevToolGlobalHook.onCommitFiberRoot = beforeCommitFiberRoot(
      reactDevToolGlobalHook.onCommitFiberRoot,
      onFiberRootUpdate
    );
  }, []);
};

const handleFiberRootUpdate = (fiberRoot: any) => {
  const componentTreeRoot = createNode({
    name: 'root',
  } as any);

  convertFiberToComponentTree(fiberRoot, componentTreeRoot);

  window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT = componentTreeRoot;
};

function incrementFiberRootId() {
  if (window.__RECOIL_INSPECTOR_FIBER_ROOT_ID === undefined) {
    window.__RECOIL_INSPECTOR_FIBER_ROOT_ID = 0;
  } else {
    window.__RECOIL_INSPECTOR_FIBER_ROOT_ID =
      window.__RECOIL_INSPECTOR_FIBER_ROOT_ID + 1;
  }
}

export default function RecoilInspector() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  useOnFiberRootMount({ onFiberRootUpdate: handleFiberRootUpdate });

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
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

    sendMessageToExtension({
      action: 'extensionDataUpdated',
      payload: {
        componentTreeRoot: window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT,
        recoilStates: window.__RECOIL_INSPECTOR_RECOIL_STATES,
      },
    });
  });

  return null;
}

export * from './fiber-parser';
