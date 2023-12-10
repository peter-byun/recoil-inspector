import { useEffect, useState } from 'react';

import './select.css';

const SELECT_OPENER_CLASS_NAME = 'SELECT_OPENER_CLASS_NAME' as const;

const SELECT_BUTTON_SIZE = {
  WIDTH: '8rem',
  HEIGHT: '2rem',
};

export type SelectItem<V> = {
  name: string;
  value: V;
};

export type SelectProps<V> = {
  items: V[];
  onItemChange: (selectedValue: V) => void;
  onItemsChange?: (selectedValue: V[]) => void;
  placeholder: string;
  disabled: boolean;
  defaultSelectedItem: V;
} & React.HtmlHTMLAttributes<HTMLElement>;

function Select<V extends SelectItem<unknown>>({
  id,
  items,
  onItemChange,
  onItemsChange,
  placeholder,
  disabled,
  defaultSelectedItem,
  ...restProps
}: SelectProps<V>) {
  const [selectedItem, setSelectedItem] = useState<V>(
    defaultSelectedItem ?? items[0]
  );

  const handleOptionClick = (item: V) => {
    setSelectedItem(item);
    onItemChange(item);
  };

  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const handleSelectClick = () => {
    setSelectOpen(true);
  };

  useEffect(() => {
    function handleWindowClick(e: MouseEvent) {
      if (
        e.target instanceof HTMLElement &&
        !e.target.className.startsWith(SELECT_OPENER_CLASS_NAME)
      ) {
        setSelectOpen(false);
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleWindowClick);
    }

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [setSelectOpen]);

  return (
    <div
      style={{
        position: 'relative',
        minWidth: SELECT_BUTTON_SIZE.WIDTH,
        minHeight: SELECT_BUTTON_SIZE.HEIGHT,
      }}
      className={SELECT_OPENER_CLASS_NAME}
    >
      <div
        id={id}
        className={`${SELECT_OPENER_CLASS_NAME} select-box`}
        style={{
          animation: 'selectBoxOpenKeyframe 0.3s',
          visibility: selectOpen ? 'visible' : 'hidden',
        }}
        {...restProps}
      >
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              handleOptionClick(item);
            }}
            className="select-box-button"
          >
            {item.name}
          </button>
        ))}
      </div>

      {!selectOpen && (
        <button
          key={selectedItem.name}
          className={`${SELECT_OPENER_CLASS_NAME} select-box-button`}
          onClick={() => {
            handleSelectClick();
          }}
          style={{
            borderRadius: '5px',
            width: SELECT_BUTTON_SIZE.WIDTH,
            height: SELECT_BUTTON_SIZE.HEIGHT,
          }}
          disabled={disabled}
        >
          {selectedItem.name}
        </button>
      )}
    </div>
  );
}

export default Select;
