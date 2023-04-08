import { css } from '@emotion/react';

import { colors } from '../../../styles/colors';
import { StateChange } from '../../../types/state';
import { OnPressedChange, Toggle } from '../../atoms/Toggle';

interface StateChangedProps {
  stateChange: StateChange;
  pressed: boolean;
  onPressedChange: OnPressedChange;
  isLastItem: boolean;
}

export const StateChangeHistoryItem = ({
  stateChange,
  pressed,
  onPressedChange,
  isLastItem,
}: StateChangedProps) => {
  const { name, changedAt } = stateChange;

  return (
    <Toggle
      pressed={pressed}
      onPressedChange={onPressedChange}
      cssProp={css`
        width: 100%;
        padding: 13px 0;
        ${!isLastItem &&
        css`
          border-style: solid;
          border-color: ${colors.dark.border};
          border-width: 0px 0px 1px 0px;
        `}
        text-align: center;
        cursor: pointer;
      `}
    >
      {name} - {changedAt}
    </Toggle>
  );
};
