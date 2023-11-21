import { StateChange } from 'recoil-inspector/src/types/state';
import { StateChangeForDisplay } from './state-change-history.types';

// TODO: It takes O(n2) time to compute, so we need to use the timestamps as IDs,
// or use a nano-id to make the history data Map.
export function mergeLeftStateChangeHistoryForDisplay(
  stateChangeHistoryA: StateChangeForDisplay[],
  stateChangeHistoryB: StateChangeForDisplay[]
) {
  const pressedItemsFromHistoryA = stateChangeHistoryA.filter(
    (stateChange) => stateChange.pressed
  );

  return stateChangeHistoryB.map((stateChange) => {
    for (let pressedItem of pressedItemsFromHistoryA) {
      if (areStatesEqual(stateChange, pressedItem)) {
        return {
          ...stateChange,
          pressed: pressedItem.pressed,
        };
      }
    }

    return stateChange;
  });
}

export function convertStateChangeHistoryForDisplay(
  stateChangeHistory: StateChange[]
): StateChangeForDisplay[] {
  return stateChangeHistory.map((stateChange) => {
    return {
      ...stateChange,
      pressed: false,
    };
  });
}

export function areStatesEqual(
  stateChangeA: StateChange,
  stateChangeB: StateChange
) {
  return (
    stateChangeA.id === stateChangeB.id &&
    stateChangeA.changedAt === stateChangeB.changedAt &&
    stateChangeA.name === stateChangeB.name
  );
}

export function isLeftTimeStringLessThanRight(left: string, right: string) {
  const [aHour, aMinute, aSecond] = left.split(':').map((s) => parseInt(s, 10));
  const [bHour, bMinute, bSecond] = right
    .split(':')
    .map((s) => parseInt(s, 10));

  if (aHour !== bHour) {
    return bHour - aHour;
  }

  if (aMinute !== bMinute) {
    return bMinute - aMinute;
  }

  return bSecond - aSecond;
}
