import {
  checkIfFiberNodeHasState,
  checkIfFiberNodeIsUserComponent,
  extractLocalStatesFromFiberNode,
} from './fiber-node-parser';
import {
  Fiber,
  FiberNode,
  MemoizedState,
  RecoilStates,
  States,
} from './fiber-parser.types';

export * from './fiber-parser.types';

const isDebugging = false;

// NOTE: Fiber does not have children property. Instead, it has child and sibling properties.
// So we have to traverse the fiber using child and sibling properties to convert it to a tree.
export const convertFiberToDebuggerComponentTree = (
  fiber: Fiber,
  parentNode: FiberNode
) => {
  const isNotDebuggerState =
    fiber.elementType?.name !== 'RecoilInspector' &&
    fiber?.stateNode?.id !== 'recoil-inspector-root';

  const isFiberNodeComponent =
    checkIfFiberNodeHasState(fiber) &&
    checkIfFiberNodeIsUserComponent(fiber) &&
    isNotDebuggerState;

  const recoilStates: any[] = [];
  const memoizedStateCache: any[] = [];
  extractRecoilStatesFromFiberMemoizedState(
    fiber.memoizedState,
    recoilStates,
    memoizedStateCache
  );

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

  if (fiber.child && isNotDebuggerState) {
    const parentOfNextCurrentNode = currentNode ? currentNode : parentNode;
    convertFiberToDebuggerComponentTree(fiber.child, parentOfNextCurrentNode);
  }

  if (fiber.sibling) {
    convertFiberToDebuggerComponentTree(fiber.sibling, parentNode);
  }
};

const extractRecoilStatesFromFiberMemoizedState = (
  memoizedState: MemoizedState,
  states: RecoilStates[],
  memoizedStateCache: any[]
) => {
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

  if (
    memoizedState.memoizedState &&
    memoizedStateCache.indexOf(memoizedState.memoizedState) === -1
  ) {
    extractRecoilStatesFromFiberMemoizedState(
      memoizedState.memoizedState,
      states,
      memoizedStateCache
    );
    memoizedStateCache.push(memoizedState.memoizedState);
  }
  if (
    memoizedState.next &&
    memoizedStateCache.indexOf(memoizedState.next) === -1
  ) {
    extractRecoilStatesFromFiberMemoizedState(
      memoizedState.next,
      states,
      memoizedStateCache
    );
    memoizedStateCache.push(memoizedState.next);
  }

  if (!memoizedState.memoizedState && !memoizedState.next) {
    return null;
  }

  return null;
};

export const createNode = ({
  name,
  hookTypes,
  originalNodeData,
  memoizedState,
  recoilStates,
  states,
}: Pick<
  FiberNode,
  'name' | 'hookTypes' | 'memoizedState' | 'originalNodeData'
> & {
  states: States;
  recoilStates: RecoilStates[];
}): FiberNode => {
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
