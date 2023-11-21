import { css } from '@emotion/react';

import { colors } from '../../../styles/colors';
import { StateChange } from 'recoil-inspector/src/types/state';
import { OnPressedChange, Toggle } from '../../base-ui/Toggle';

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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
      <p
        css={css`
          margin: 0 0 0 ${TOGGLE_CONTENT_SPACING}px;
        `}
      >
        {name}{' '}
      </p>
      <p
        css={css`
          margin: 0 ${TOGGLE_CONTENT_SPACING}px 0 0;
        `}
      >
        {changedAt}
      </p>
    </Toggle>
  );
};

const TOGGLE_CONTENT_SPACING = 20;
