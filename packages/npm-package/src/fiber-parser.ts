type HookTypes =
  | 'useState'
  | 'useContext'
  | 'useCallback'
  | 'useMemo'
  | 'useEffect'
  | 'useLayoutEffect';
type MemoizedState = {
  key: string | undefined;
  memoizedState: any;
  baseState: any;
  queue: any;
  baseQueue: any;
  next: MemoizedState | null;
  deps: any[] | undefined;
};
type States = any[];
type Fiber = {
  type?: string;
  elementType: {
    name: string;
  };
  memoizedState: MemoizedState;
  _debugHookTypes: HookTypes[];
  child: Fiber | null;
  sibling: Fiber | null;
};
export type Node = {
  [key: string]: any;
  name: string;
  hookTypes: HookTypes[];
  states: States;
  children: Node[];
  originalNodeData?: Fiber;
  memoizedState?: MemoizedState;
};

export type RootNode = Node & {
  id: number;
};

const STATEFUL_HOOK_NAMES = {
  USE_STATE: 'useState',
  USE_CONTEXT: 'useContext',
} as const;

const statefulHookNames: string[] = Object.values(STATEFUL_HOOK_NAMES);

const NON_USER_COMPONENT_NAMES = ['Batcher'];

export const checkIfFiberNodeIsUserComponent = (fiber: Fiber) => {
  return !NON_USER_COMPONENT_NAMES.includes(fiber.elementType.name);
};

export const checkIfFiberNodeHasState = (fiber: Fiber) => {
  const isFunction = fiber.type && typeof fiber.type === 'function';
  if (!isFunction) {
    return false;
  }

  const useStateHookFromHooks = fiber._debugHookTypes?.find((hookType) => {
    return statefulHookNames.includes(hookType);
  });

  return useStateHookFromHooks ? true : false;
};

export const checkIfFiberNodeStateIsRecoilState = (
  nextState: MemoizedState
) => {
  if (typeof nextState === 'object' && nextState.baseState === null) {
    return true;
  }

  return false;
};

export const extractLocalStatesFromFiberNode = (fiber: Fiber) => {
  const states = [];
  let nextState: MemoizedState | null = fiber.memoizedState;

  while (nextState) {
    // TODO: The check for recoil state is not working properly, so we need to fix it.
    if (
      nextState.memoizedState &&
      !nextState.memoizedState.tagName &&
      !checkIfFiberNodeStateIsRecoilState(nextState)
    ) {
      states.push(nextState.memoizedState);
    }
    nextState = nextState.next;
  }

  return states;
};

type RecoilStates = {
  key: string | undefined;
  deps: any[] | undefined;
};

const extractRecoilStatesFromMemoizedState = (
  memoizedState: Fiber['memoizedState'],
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
    extractRecoilStatesFromMemoizedState(
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
    extractRecoilStatesFromMemoizedState(
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
}: Pick<Node, 'name' | 'hookTypes' | 'memoizedState' | 'originalNodeData'> & {
  states: States;
  recoilStates: RecoilStates[];
}): Node => {
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

const isDebugging = false;

// NOTE: Fiber does not have children property. Instead, it has child and sibling properties.
// So we have to traverse the fiber using child and sibling properties, to convert it to a tree.
export const convertFiberToComponentTree = (fiber: Fiber, parentNode: Node) => {
  const isFiberNodeComponent =
    checkIfFiberNodeHasState(fiber) && checkIfFiberNodeIsUserComponent(fiber);

  const recoilStates: any[] = [];
  const memoizedStateCache: any[] = [];
  extractRecoilStatesFromMemoizedState(
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

  if (fiber.child) {
    const parentOfNextCurrentNode = currentNode ? currentNode : parentNode;
    convertFiberToComponentTree(fiber.child, parentOfNextCurrentNode);
  }

  if (fiber.sibling) {
    convertFiberToComponentTree(fiber.sibling, parentNode);
  }
};
