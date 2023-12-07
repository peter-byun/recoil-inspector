import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as BaseSelect from '@radix-ui/react-select';

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
      <BaseSelect.Trigger>
        <BaseSelect.Value placeholder={placeholder}>
          {selectedItem ? selectedItem.name : null}
        </BaseSelect.Value>
        <BaseSelect.Icon>
          <ChevronDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Content position="popper">
        <BaseSelect.ScrollUpButton>
          <ChevronUpIcon />
        </BaseSelect.ScrollUpButton>

        <BaseSelect.Viewport style={{ padding: '5px' }}>
          <BaseSelect.Group style={{ padding: '5px' }}>
            {items.map((item) => (
              <BaseSelect.Item key={item.name} value={item.value}>
                {item.name}
              </BaseSelect.Item>
            ))}
          </BaseSelect.Group>
        </BaseSelect.Viewport>

        <BaseSelect.ScrollDownButton
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '25px',
            backgroundColor: 'white',
            color: 'black',
            cursor: 'default',
          }}
        />
      </BaseSelect.Content>
    </BaseSelect.Root>
  );
}
