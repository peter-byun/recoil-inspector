import { Interpolation, Theme } from '@emotion/react';
import * as ToggleBase from '@radix-ui/react-toggle';
import { ReactNode } from 'react';

import { colors } from '../../styles/colors';

export type OnPressedChange = (isToggleOn: boolean) => void;

interface ToggleProps {
  pressed: boolean;
  onPressedChange: OnPressedChange;
  children: ReactNode;
  cssProp?: Interpolation<Theme>;
}
export const Toggle = ({
  pressed,
  onPressedChange,
  children,
  cssProp,
}: ToggleProps) => {
  const conditionalStyles = [
    pressed && {
      backgroundColor: colors.dark.primary2,
    },
    cssProp,
  ];

  return (
    <ToggleBase.Root
      pressed={pressed}
      onPressedChange={onPressedChange}
      aria-label="Toggle"
      style={Object.assign({}, ...conditionalStyles)}
    >
      {children}
    </ToggleBase.Root>
  );
};
