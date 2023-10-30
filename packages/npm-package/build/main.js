import { useEffect } from 'react';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { sendMessageToExtensionContentScript } from './extension-bridge';
import { convertFiberToDebuggerComponentTree, createNode, } from './fiber-parser/fiber-parser';
/**
 * @description It should be a child component of the RecoilRoot component that you want to debug.
 * Your application's process.env.NODE_ENV value should be 'development' to enable the debugger.
 */
export default function RecoilInspector() {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }
    useOnFiberRootMount({ onFiberRootUpdate: transformFiberRootToComponentTree });
    // NOTE: This part is likely going to be affected by Recoil's version updates
    useRecoilTransactionObserver_UNSTABLE(function transformRecoilStatesAndPassThemToExtension({ snapshot }) {
        const formattedRecoilStates = [];
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
        sendMessageToExtensionContentScript({
            action: 'extensionDataUpdated',
            payload: {
                componentTreeRoot: window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT,
                recoilStates: window.__RECOIL_INSPECTOR_RECOIL_STATES,
            },
        });
    });
    useEffect(function setupExtensionEventListenerOnMount() {
        window.addEventListener('message', (event) => {
            console.log('got a message from the extension', event.data);
            if (event.data.type === 'frontendLoaded') {
                if (window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT &&
                    window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT) {
                    console.log('sending data to the extension');
                    sendMessageToExtensionContentScript({
                        action: 'extensionDataUpdated',
                        payload: {
                            componentTreeRoot: window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT,
                            recoilStates: window.__RECOIL_INSPECTOR_RECOIL_STATES,
                        },
                    });
                }
            }
        });
    }, []);
    return null;
}
function useOnFiberRootMount({ onFiberRootUpdate }) {
    useEffect(function tabIntoReactDevToolFiberRootUpdate() {
        if (!window) {
            return;
        }
        const reactDevToolGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        reactDevToolGlobalHook.onCommitFiberRoot = beforeCommitFiberRoot(reactDevToolGlobalHook.onCommitFiberRoot, onFiberRootUpdate);
    }, []);
}
function beforeCommitFiberRoot(onCommitFiberRoot, onFiberRootUpdate) {
    return function recordFiberRootAndExecuteOriginalReactDevToolGlobalHook(...args) {
        const fiberRoot = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
            .getFiberRoots(1)
            .values()
            .next().value.current;
        onFiberRootUpdate(fiberRoot);
        return onCommitFiberRoot(...args);
    };
}
function transformFiberRootToComponentTree(fiberRoot) {
    const componentTreeRoot = createNode({
        name: 'root',
    });
    convertFiberToDebuggerComponentTree(fiberRoot, componentTreeRoot);
    window.__RECOIL_INSPECTOR_COMPONENT_TREE_ROOT = componentTreeRoot;
}
function incrementFiberRootId() {
    if (window.__RECOIL_INSPECTOR_FIBER_ROOT_ID === undefined) {
        window.__RECOIL_INSPECTOR_FIBER_ROOT_ID = 0;
    }
    else {
        window.__RECOIL_INSPECTOR_FIBER_ROOT_ID =
            window.__RECOIL_INSPECTOR_FIBER_ROOT_ID + 1;
    }
}
export * from './fiber-parser/fiber-parser';
