import { ButtonHTMLAttributes } from 'react';

import './button.css';

export const Button = ({
  onClick,
  children,
  disabled,
  className,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[className, 'button'].join(' ')}
      {...restProps}
    >
      {children}
    </button>
  );
};
