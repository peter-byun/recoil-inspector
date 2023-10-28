import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';

import { colors } from '../../../styles/colors';
import { scrollbarCss } from '../../../styles/scrollbar';
import { StateChange } from '../../../types/state';
import { StateChangeHistoryItem } from './StateChangHistoryItem';
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
  maxSelectableItem = 1,
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

  const handlePressedChange =
    (changedState: StateChange) => (pressed: boolean) => {
      if (isDiffOn) {
        handlePressedChangeInDiffMode(changedState, pressed);

        return;
      }

      handlePressedChangeInSingleMode(changedState);
    };

  const pressedItemsCount = useMemo<number>(() => {
    return stateChangeHistoryForDisplay.filter(
      (stateChange) => stateChange.pressed
    ).length;
  }, [stateChangeHistoryForDisplay]);

  const [lastSelectedStateChange, setLastSelectedStateChange] =
    useState<StateChange>();

  const handlePressedChangeInDiffMode = (
    changedState: StateChange,
    pressed: boolean
  ) => {
    const updatedHistory = stateChangeHistoryForDisplay.map(
      (stateHistoryItem) => {
        if (!areStatesEqual(stateHistoryItem, changedState)) {
          return stateHistoryItem;
        }

        if (stateHistoryItem.pressed) {
          return stateHistoryItem;
        }

        if (pressedItemsCount < maxSelectableItem) {
          return {
            ...stateHistoryItem,
            pressed,
          };
        }

        return stateHistoryItem;
      }
    );

    setStateChangeHistoryForDisplay(updatedHistory);

    const selectedStates = updatedHistory.filter(
      (stateHistoryItem) => stateHistoryItem.pressed
    );
    onDiffStatesChange(selectedStates);

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
  useEffect(() => {
    if (!isDiffOn) {
      unSelectAllExceptLastSelectedChange();
    }
  }, [isDiffOn, setStateChangeHistoryForDisplay]);

  const stateChangeHistoryForDisplaySortedByChangedAtInDesc = useMemo(() => {
    return stateChangeHistoryForDisplay.sort((a, b) => {
      if (!a.changedAt || !b.changedAt) {
        return 0;
      }
      return isLeftTimeStringLessThanRight(a.changedAt, b.changedAt);
    });
  }, [stateChangeHistoryForDisplay]);

  return (
    <section css={containerCss}>
      <h3
        css={css`
          background: ${colors.dark.surface1};
          position: sticky;
          top: 0;
          width: 100%;
          padding: 20px 0px;
          border-bottom: 1px solid ${colors.dark.border};
          border-width: 0px 0px 1px 0px;
          margin: 0px;
          font-size: 16px;
          text-align: center;
        `}
      >
        State Change History
      </h3>
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

const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  grid-column: 1/1;
  grid-row: 1/3;

  background-color: ${colors.dark.surface1};
  border-radius: 5px;

  overflow-y: scroll;

  ${scrollbarCss}
`;
