import React from 'react';

type Size = 'sm' | 'md' | 'lg';

type SwitchProps = {
  onChange: (checked: boolean) => void;
  size: Size;
  label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

const Switch = ({
  id,
  onChange,
  size,
  label: labelText,
  ...restProps
}: SwitchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#f7fcff',
      }}
    >
      {labelText}
      <input
        type="checkbox"
        id={id}
        onChange={handleChange}
        className="switch-input"
        {...restProps}
      />
      <label htmlFor={id} className="switch-label">
        <span className="switch-circle"></span>
      </label>
    </div>
  );
};

export default Switch;
