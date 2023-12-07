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
  onPressedChange, // isLastItem,
}: StateChangedProps) => {
  const { name, changedAt } = stateChange;

  // const cssProp = {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   padding: '13px 0',
  //   ...(isLastItem
  //     ? {}
  //     : {
  //         borderStyle: 'solid',
  //         borderColor: colors.dark.border,
  //         borderWidth: '0px 0px 1px 0px',
  //       }),
  //   textAlign: 'center',
  //   cursor: 'pointer',
  // } as const;

  return (
    <Toggle pressed={pressed} onPressedChange={onPressedChange}>
      <p
        style={{
          margin: `0 0 0 ${TOGGLE_CONTENT_SPACING}px`,
        }}
      >
        {name}{' '}
      </p>
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
