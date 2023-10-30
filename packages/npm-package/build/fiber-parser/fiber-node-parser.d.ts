import { Fiber, MemoizedState } from './fiber-parser.types';
export declare function checkIfFiberNodeIsUserComponent(fiber: Fiber): boolean;
export declare function checkIfFiberNodeHasState(fiber: Fiber): boolean;
export declare function checkIfFiberNodeStateIsRecoilState(nextState: MemoizedState): boolean;
export declare function extractLocalStatesFromFiberNode(fiber: Fiber): any[];
//# sourceMappingURL=fiber-node-parser.d.ts.map