import * as Toolbar from '@radix-ui/react-toolbar';
import { Select, SelectItem } from '../../../components/base-ui/Select';
import { Switch } from '../../../components/base-ui/Switch';
import { colors } from '../../../styles/colors';

export function StateInspectorToolbar<Item extends SelectItem>({
  items,
  selectedItem,
  onItemSelected,
  isDiffOn,
  onIsDiffOnChange,
}: {
  items: Item[];
  selectedItem: Item;
  onItemSelected: (selectedItem: Item) => void;
  isDiffOn: boolean;
  onIsDiffOnChange: (isDiffOn: boolean) => void;
}) {
  const handleSelectedItemChange = (selectedItem: Item) => {
    onItemSelected(selectedItem);
  };

  const handleDiffCheckedChange = (checked: boolean) => {
    onIsDiffOnChange(checked);
  };

  return (
    <Toolbar.Root
      aria-label="State Inspector Toolbar"
      style={{
        backgroundColor: colors.dark.surface1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '5px',
        gridColumn: '2/2',
        gridRow: '1/1',
        padding: '15px',
        borderRadius: '5px',
      }}
    >
      <label
        style={{
          fontSize: '13px',
          color: colors.dark.fontColor,
        }}
      >
        Visualization Type
      </label>
      <Select<Item>
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={handleSelectedItemChange}
        placeholder="Select the visualization type."
        disabled={isDiffOn}
      />

      <Switch
        checked={isDiffOn}
        onCheckedChange={handleDiffCheckedChange}
        label="State Diff Mode"
      />
    </Toolbar.Root>
  );
}
