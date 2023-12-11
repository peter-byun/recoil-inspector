import { useEffect, useMemo, useState } from 'react';

import { colors } from '../../../constants/styles/colors';
import { scrollbarCss } from '../../../constants/styles/scrollbar';
import { StateChange } from 'recoil-inspector/src/types/state';
import { StateChangeHistoryItem } from './state-change-history-item/StateChangHistoryItem';
import { StateChangeForDisplay } from './state-change-history.types';
import {
  areStatesEqual,
  convertStateChangeHistoryForDisplay,
  isLeftTimeStringLessThanRight,
  mergeLeftStateChangeHistoryForDisplay,
} from './state-change-history.utils';

interface StateChangeHistoryProps {
  stateChangeHistory: StateChange[];
  maxSelectableItem: number;
  isDiffOn: boolean;
  onSelectedStateChange: (stateChange: StateChange) => void;
  onDiffStatesChange: (stateChanges: StateChange[]) => void;
}

export const StateChangeHistory = ({
  stateChangeHistory,
  isDiffOn,
  onSelectedStateChange,
  onDiffStatesChange,
}: StateChangeHistoryProps) => {
  const [stateChangeHistoryForDisplay, setStateChangeHistoryForDisplay] =
    useState<StateChangeForDisplay[]>(
      convertStateChangeHistoryForDisplay(stateChangeHistory)
    );

  const syncStateChangeHistoryForDisplayWithOriginalHistory = () => {
    const nextStateChangeHistory =
      convertStateChangeHistoryForDisplay(stateChangeHistory);

    const mergedStateChangeHistory = mergeLeftStateChangeHistoryForDisplay(
      stateChangeHistoryForDisplay,
      nextStateChangeHistory
    );

    setStateChangeHistoryForDisplay(mergedStateChangeHistory);
  };
  useEffect(() => {
    syncStateChangeHistoryForDisplayWithOriginalHistory();
  }, [stateChangeHistory]);

  const handlePressedChange = (changedState: StateChange) => () => {
    if (isDiffOn) {
      handlePressedChangeInDiffMode(changedState);

      return;
    }

    handlePressedChangeInSingleMode(changedState);
  };

  const [lastSelectedStateChange, setLastSelectedStateChange] =
    useState<StateChange>();

  const handlePressedChangeInDiffMode = (changedState: StateChange) => {
    const pressedItemsCount = stateChangeHistoryForDisplay.filter(
      (item) => item.pressed
    ).length;

    const updatedHistory = stateChangeHistoryForDisplay.map(
      (stateHistoryItem) => {
        if (!areStatesEqual(stateHistoryItem, changedState)) {
          return stateHistoryItem;
        }

        if (pressedItemsCount > 1 && !stateHistoryItem.pressed) {
          return stateHistoryItem;
        }

        return {
          ...stateHistoryItem,
          pressed: !stateHistoryItem.pressed,
        };
      }
    );

    setStateChangeHistoryForDisplay(updatedHistory);

    const selectedStates = updatedHistory.filter(
      (stateHistoryItem) => stateHistoryItem.pressed
    );
    onDiffStatesChange(selectedStates.slice(0, 2));

    setLastSelectedStateChange(changedState);
  };

  const handlePressedChangeInSingleMode = (changedState: StateChange) => {
    const updatedHistory = stateChangeHistoryForDisplay.map(
      (stateHistoryItem) => {
        if (areStatesEqual(stateHistoryItem, changedState)) {
          return { ...stateHistoryItem, pressed: true };
        } else {
          return { ...stateHistoryItem, pressed: false };
        }
      }
    );

    setStateChangeHistoryForDisplay(updatedHistory);

    onSelectedStateChange(changedState);
  };

  const unSelectAllExceptLastSelectedChange = () => {
    setStateChangeHistoryForDisplay((prevStateChangeHistoryForDisplay) => {
      return prevStateChangeHistoryForDisplay.map((stateChange) => {
        if (!lastSelectedStateChange) {
          return stateChange;
        }

        if (stateChange.id === lastSelectedStateChange.id) {
          return {
            ...stateChange,
            pressed: true,
          };
        }

        return {
          ...stateChange,
          pressed: false,
        };
      });
    });
  };
  useEffect(
    function handleDiffChange() {
      if (!isDiffOn) {
        unSelectAllExceptLastSelectedChange();
      }
    },
    [isDiffOn, setStateChangeHistoryForDisplay]
  );

  const stateChangeHistoryForDisplaySortedByChangedAtInDesc = useMemo(() => {
    return stateChangeHistoryForDisplay.sort((a, b) => {
      if (!a.changedAt || !b.changedAt) {
        return 0;
      }
      return isLeftTimeStringLessThanRight(a.changedAt, b.changedAt);
    });
  }, [stateChangeHistoryForDisplay]);

  const containerCss = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gridColumn: '1/1',
    gridRow: '1/3',
    backgroundColor: colors.dark.surface1,
    borderRadius: '5px',
    overflowY: 'auto',
    ...scrollbarCss,
  } as const;

  return (
    <section style={containerCss}>
      <h3
        style={{
          background: colors.dark.surface1,
          width: '100%',
          padding: '18px 0px',
          borderRadius: '5px',
          margin: '0px',
          fontSize: '16px',
          fontWeight: 'normal',
          textAlign: 'center',
        }}
      >
        State Change History
      </h3>
      <hr
        style={{
          width: '90%',
          margin: '0',
          height: '1px',
          border: 'none',
          background: '#f7fcff',
        }}
      />
      {stateChangeHistoryForDisplaySortedByChangedAtInDesc.map(
        (stateChange, idx) => (
          <StateChangeHistoryItem
            key={stateChange.id}
            pressed={stateChange.pressed}
            stateChange={stateChange}
            onPressedChange={handlePressedChange(stateChange)}
            isLastItem={idx === stateChangeHistoryForDisplay.length - 1}
          />
        )
      )}
    </section>
  );
};
