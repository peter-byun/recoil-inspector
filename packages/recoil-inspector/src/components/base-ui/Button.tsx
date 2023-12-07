interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  level?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick }: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return <button onClick={handleClick}>{children}</button>;
};
