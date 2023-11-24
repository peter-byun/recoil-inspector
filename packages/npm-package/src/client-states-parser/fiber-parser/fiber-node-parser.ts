import { Fiber, MemoizedState } from './fiber-parser.types';

const STATEFUL_HOOK_NAMES = {
  USE_STATE: 'useState',
  USE_CONTEXT: 'useContext',
} as const;

const statefulHookNames: string[] = Object.values(STATEFUL_HOOK_NAMES);

const NON_USER_COMPONENT_NAMES = [
  'Batcher',
  'Frontend',
  'StateInspector',
  'ClientStatesParser',
  'StateChangeHistory',
];

export function checkIfFiberNodeIsUserComponent(fiber: Fiber) {
  return !NON_USER_COMPONENT_NAMES.includes(fiber.elementType.name);
}

export function checkIfFiberNodeHasState(fiber: Fiber) {
  const isFunction = fiber.type && typeof fiber.type === 'function';
  if (!isFunction) {
    return false;
  }

  const useStateHookFromHooks = fiber._debugHookTypes?.find((hookType) => {
    return statefulHookNames.includes(hookType);
  });

  return useStateHookFromHooks ? true : false;
}

export function checkIfFiberNodeStateIsRecoilState(nextState: MemoizedState) {
  if (typeof nextState === 'object' && nextState.baseState === null) {
    return true;
  }

  return false;
}

export function extractLocalStatesFromFiberNode(fiber: Fiber) {
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
}
