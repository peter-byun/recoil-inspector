import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as BaseSelect from '@radix-ui/react-select';

import { colors } from '../../styles/colors';

export interface SelectItem {
  name: string;
  value: string;
}

interface SelectProps<Item extends SelectItem> {
  items: Item[];
  selectedItem: Item | undefined;
  onSelectedItemChange: (selectedItem: Item) => void;
  placeholder: string;
  disabled?: boolean;
}

export function Select<Item extends SelectItem>({
  items,
  selectedItem,
  onSelectedItemChange,
  placeholder,
  disabled,
}: SelectProps<Item>) {
  const handleSelectedItemChange = (selectedItemValue: Item['value']) => {
    const nextSelectedItem = items.find(
      (item) => item.value === selectedItemValue
    );
    nextSelectedItem && onSelectedItemChange(nextSelectedItem);
  };

  return (
    <BaseSelect.Root
      value={selectedItem?.value}
      onValueChange={handleSelectedItemChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <BaseSelect.Value placeholder={placeholder}>
          {selectedItem ? selectedItem.name : null}
        </BaseSelect.Value>
        <BaseSelect.Icon>
          <ChevronDownIcon />
        </BaseSelect.Icon>
      </SelectTrigger>

      <BaseSelect.Content
        position="popper"
        css={css`
          overflow: hidden;
          background-color: white;
          border-radius: 6px;
          box-shadow:
            0px 10px 38px -10px rgba(22, 23, 24, 0.35),
            0px 10px 20px -15px rgba(22, 23, 24, 0.2);
          z-index: 1;
        `}
      >
        <BaseSelect.ScrollUpButton>
          <ChevronUpIcon />
        </BaseSelect.ScrollUpButton>

        <BaseSelect.Viewport
          css={css`
            padding: 5px;
          `}
        >
          <BaseSelect.Group
            css={css`
              padding: 5px;
            `}
          >
            {items.map((item) => (
              <Option key={item.name} value={item.value}>
                {item.name}
              </Option>
            ))}
          </BaseSelect.Group>
        </BaseSelect.Viewport>

        <BaseSelect.ScrollDownButton
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 25px;
            background-color: white;
            color: black;
            cursor: default;
          `}
        />
      </BaseSelect.Content>
    </BaseSelect.Root>
  );
}

const SelectTrigger = styled(BaseSelect.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 11px;
  line-height: 1;
  height: 25px;
  gap: 5px;
  background-color: white;
  color: black;
  box-shadow: 0 2px 5px #00000070;

  &:hover {
    background-color: #d2d2d2;
  }
  &:focus {
    box-shadow: 0 0 0 2px ${colors.dark.focus};
  }
  &[data-placeholder] {
    color: gray;
  }
`;

const Option = styled(BaseSelect.Item)`
  position: relative;
  color: black;
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  padding: 0 0 0 5px;
  border-radius: 3px;

  font-size: 10px;

  user-select: none;
  line-height: 1;

  &[data-disabled] {
    color: gray;
    pointer-events: none;
  }
  &[data-highlighted] {
    background-color: ${colors.dark.primary1};
    color: #eaecff;
    outline: none;
  }
`;
