import { checkIfFiberNodeHasState, checkIfFiberNodeIsUserComponent, extractLocalStatesFromFiberNode, } from './fiber-node-parser';
export * from './fiber-parser.types';
const isDebugging = false;
// NOTE: Fiber does not have children property. Instead, it has child and sibling properties.
// So we have to traverse the fiber using child and sibling properties to convert it to a tree.
export const convertFiberToDebuggerComponentTree = (fiber, parentNode) => {
    const isNotDebuggerState = fiber.elementType?.name !== 'RecoilInspector';
    const isFiberNodeComponent = checkIfFiberNodeHasState(fiber) &&
        checkIfFiberNodeIsUserComponent(fiber) &&
        isNotDebuggerState;
    const recoilStates = [];
    const memoizedStateCache = [];
    extractRecoilStatesFromFiberMemoizedState(fiber.memoizedState, recoilStates, memoizedStateCache);
    const currentNode = isFiberNodeComponent
        ? createNode({
            name: fiber.elementType?.name,
            hookTypes: [...fiber._debugHookTypes],
            memoizedState: isDebugging ? { ...fiber.memoizedState } : undefined,
            states: extractLocalStatesFromFiberNode(fiber),
            recoilStates,
            originalNodeData: isDebugging ? { ...fiber } : undefined,
        })
        : null;
    if (currentNode) {
        parentNode.children.push(currentNode);
    }
    if (fiber.child) {
        const parentOfNextCurrentNode = currentNode ? currentNode : parentNode;
        convertFiberToDebuggerComponentTree(fiber.child, parentOfNextCurrentNode);
    }
    if (fiber.sibling) {
        convertFiberToDebuggerComponentTree(fiber.sibling, parentNode);
    }
};
const extractRecoilStatesFromFiberMemoizedState = (memoizedState, states, memoizedStateCache) => {
    if (!memoizedState || memoizedStateCache.indexOf(memoizedState) !== -1) {
        return null;
    }
    memoizedStateCache.push(memoizedState);
    if (memoizedState.key) {
        states.push({
            key: memoizedState.key,
            deps: memoizedState.deps || [],
        });
    }
    if (memoizedState.memoizedState &&
        memoizedStateCache.indexOf(memoizedState.memoizedState) === -1) {
        extractRecoilStatesFromFiberMemoizedState(memoizedState.memoizedState, states, memoizedStateCache);
        memoizedStateCache.push(memoizedState.memoizedState);
    }
    if (memoizedState.next &&
        memoizedStateCache.indexOf(memoizedState.next) === -1) {
        extractRecoilStatesFromFiberMemoizedState(memoizedState.next, states, memoizedStateCache);
        memoizedStateCache.push(memoizedState.next);
    }
    if (!memoizedState.memoizedState && !memoizedState.next) {
        return null;
    }
    return null;
};
export const createNode = ({ name, hookTypes, originalNodeData, memoizedState, recoilStates, states, }) => {
    const createdAt = Date.now();
    return {
        name,
        hookTypes,
        children: [],
        originalNodeData: originalNodeData ? { ...originalNodeData } : undefined,
        memoizedState,
        states,
        recoilStates,
        createdAt,
    };
};
