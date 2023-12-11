import { StateChange } from 'recoil-inspector/src/types/state';

import { Toggle } from '../../../../components/base/toggle/Toggle';
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
  pressed,
}: StateChangedProps) => {
  const { name, changedAt } = stateChange;

  const classNames = ['state-change-history-toggle'];
  if (pressed) {
    classNames.push('pressed');
  }
  return (
    <Toggle onChange={onPressedChange} className={classNames.join(' ')}>
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
