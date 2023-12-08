import { StateChange } from 'recoil-inspector/src/types/state';

import { Toggle } from '../../../../base/toggle/Toggle';
import './state-change-history-item.css';

interface StateChangedProps {
  stateChange: StateChange;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  isLastItem: boolean;
}

export const StateChangeHistoryItem = ({
  stateChange,
  onPressedChange,
}: StateChangedProps) => {
  const { name, changedAt } = stateChange;

  return (
    <Toggle onChange={onPressedChange} className="state-change-history-toggle">
      <p
        style={{
          margin: `0 0 0 ${TOGGLE_CONTENT_SPACING}px`,
        }}
      >
        {name}
      </p>
      &nbsp;
      <p
        style={{
          margin: `0 ${TOGGLE_CONTENT_SPACING}px 0 0`,
        }}
      >
        {changedAt}
      </p>
    </Toggle>
  );
};

const TOGGLE_CONTENT_SPACING = 20;
