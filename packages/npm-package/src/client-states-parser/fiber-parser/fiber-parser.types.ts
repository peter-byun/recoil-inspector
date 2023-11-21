export type FiberNode = {
  [key: string]: any;
  name: string;
  hookTypes: HookTypes[];
  states: States;
  children: FiberNode[];
  originalNodeData?: Fiber;
  memoizedState?: MemoizedState;
};

export type Fiber = {
  type?: string;
  elementType: {
    name: string;
  };
  memoizedState: MemoizedState;
  _debugHookTypes: HookTypes[];
  child: Fiber | null;
  sibling: Fiber | null;
};

export type HookTypes =
  | 'useState'
  | 'useContext'
  | 'useCallback'
  | 'useMemo'
  | 'useEffect'
  | 'useLayoutEffect';
export type MemoizedState = {
  key: string | undefined;
  memoizedState: any;
  baseState: any;
  queue: any;
  baseQueue: any;
  next: MemoizedState | null;
  deps: any[] | undefined;
};
export type States = any[];

export type RootNode = FiberNode & {
  id: number;
};
export type RecoilStates = {
  key: string | undefined;
  deps: any[] | undefined;
};
