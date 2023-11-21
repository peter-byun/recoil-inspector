import { Interpolation, Theme, css } from '@emotion/react';
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
}: ToggleProps) => (
  <ToggleBase.Root
    pressed={pressed}
    onPressedChange={onPressedChange}
    aria-label="Toggle"
    css={[
      pressed &&
        css`
          background-color: ${colors.dark.primary2};
        `,
      cssProp,
    ]}
  >
    {children}
  </ToggleBase.Root>
);
