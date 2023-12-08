import * as Toolbar from '@radix-ui/react-toolbar';
import Select, { SelectItem } from '../../components/base-ui/select/Select';

import Switch from '../../components/base-ui/switch/Switch';
import { colors } from '../../constants/styles/colors';

type ToolBarItem = SelectItem<string>;

export function StateInspectorToolbar({
  items,
  selectedItem,
  onItemSelected,
  isDiffOn,
  onIsDiffOnChange,
}: {
  items: ToolBarItem[];
  selectedItem: ToolBarItem;
  onItemSelected: (selectedItem: ToolBarItem) => void;
  isDiffOn: boolean;
  onIsDiffOnChange: (isDiffOn: boolean) => void;
}) {
  const handleSelectedItemChange = (selectedItem: ToolBarItem) => {
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
      <Select<ToolBarItem>
        items={items}
        onItemChange={handleSelectedItemChange}
        placeholder="Select the visualization type."
        defaultSelectedItem={selectedItem}
        disabled={isDiffOn}
      />

      <Switch
        checked={isDiffOn}
        onChange={handleDiffCheckedChange}
        label="State Diff Mode"
        size="sm"
      />
    </Toolbar.Root>
  );
}
