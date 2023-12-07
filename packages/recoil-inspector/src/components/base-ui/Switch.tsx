import * as BaseSwitch from '@radix-ui/react-switch';

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
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <label
        style={{
          paddingRight: '15px',
          color: 'white',
          fontSize: '13px',
          lineHeight: '1',
        }}
      >
        {label}
      </label>
      <BaseSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        style={{
          width: '42px',
          height: '23px',
          backgroundColor: '#8f8f8f',
          borderRadius: '9999px',
          position: 'relative',
          boxShadow: '0 2px 5px #00000070',
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          cursor: 'pointer',
        }}
      >
        <BaseSwitch.Thumb
          style={{
            display: 'block',
            width: '17px',
            height: '17px',
            backgroundColor: 'white',
            borderRadius: '9999px',
            boxShadow: '0 2px 2px black',
            transition: 'transform 100ms',
            transform: 'translateX(2px)',
            willChange: 'transform',
          }}
        />
      </BaseSwitch.Root>
    </div>
  </form>
);
