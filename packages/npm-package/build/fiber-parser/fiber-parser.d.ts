import { Fiber, FiberNode, RecoilStates, States } from './fiber-parser.types';
export * from './fiber-parser.types';
export declare const convertFiberToDebuggerComponentTree: (fiber: Fiber, parentNode: FiberNode) => void;
export declare const createNode: ({ name, hookTypes, originalNodeData, memoizedState, recoilStates, states, }: Pick<FiberNode, "name" | "hookTypes" | "originalNodeData" | "memoizedState"> & {
    states: States;
    recoilStates: RecoilStates[];
}) => FiberNode;
//# sourceMappingURL=fiber-parser.d.ts.map