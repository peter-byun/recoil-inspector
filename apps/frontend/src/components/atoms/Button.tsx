import { Interpolation, Theme, css } from '@emotion/react';

import { colors } from '../../styles/colors';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  cssProp?: Interpolation<Theme>;
  level?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  onClick,
  cssProp,
  level,
  width,
  height,
}: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      css={[
        buttonCss,
        cssProp,
        level === 'primary' ? buttonPrimaryColor : buttonSecondaryColor,
        css`
          width: ${width}px;
          height: ${height}px;
        `,
      ]}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const buttonCss = css`
  background-color: ${colors.dark.primary1};
  color: #fff;
  padding: 10px 20px;
  border-radius: 12px;

  font-weight: bold;
  font-size: 16px;
  text-align: center;

  cursor: pointer;

  transition: background-color 0.15s ease-in-out;

  box-shadow: 0 1px 5px #00000070;
`;

const buttonPrimaryColor = css`
  background-color: ${colors.dark.primary1};

  &:active {
    background-color: ${colors.dark.primary2};
  }
`;

const buttonSecondaryColor = css`
  background-color: ${colors.dark.secondary1};

  &:active {
    background-color: ${colors.dark.secondary2};
  }
`;
