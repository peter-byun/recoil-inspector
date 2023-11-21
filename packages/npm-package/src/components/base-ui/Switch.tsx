import { css } from '@emotion/react';
import * as BaseSwitch from '@radix-ui/react-switch';

import { colors } from '../../styles/colors';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export const Switch = ({
  checked,
  onCheckedChange,
  label,
  className,
}: SwitchProps) => (
  <form className={className}>
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <label
        css={css`
          padding-right: 15px;
          color: white;
          font-size: 10px;
          line-height: 1;
        `}
      >
        {label}
      </label>
      <BaseSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        css={css`
          width: 42px;
          height: 23px;
          background-color: #8f8f8f;

          border-radius: 9999px;
          position: relative;
          box-shadow: 0 2px 5px #00000070;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          :focus {
            box-shadow: 0 0 0 2px ${colors.dark.focus};
          }
          &[data-state='checked'] {
            background-color: ${colors.dark.primary1};
          }
          cursor: pointer;
        `}
      >
        <BaseSwitch.Thumb
          css={css`
            display: block;

            width: 17px;
            height: 17px;
            background-color: white;
            border-radius: 9999px;
            box-shadow: 0 2px 2px black;
            transition: transform 100ms;
            transform: translateX(2px);
            will-change: transform;

            &[data-state='checked'] {
              transform: translateX(19px);
            }
          `}
        />
      </BaseSwitch.Root>
    </div>
  </form>
);
