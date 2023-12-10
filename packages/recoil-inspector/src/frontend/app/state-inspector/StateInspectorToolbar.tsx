import Select, { SelectItem } from '../../components/base/select/Select';

import Switch from '../../components/base/switch/Switch';
import { colors } from '../../constants/styles/colors';

export function StateInspectorToolbar<ItemValue>({
  items,
  selectedItem,
  onItemSelected,
  isDiffOn,
  onIsDiffOnChange,
}: {
  items: SelectItem<ItemValue>[];
  selectedItem: SelectItem<ItemValue>;
  onItemSelected: (selectedItem: SelectItem<ItemValue>) => void;
  isDiffOn: boolean;
  onIsDiffOnChange: (isDiffOn: boolean) => void;
}) {
  const handleSelectedItemChange = (selectedItem: SelectItem<ItemValue>) => {
    onItemSelected(selectedItem);
  };

  const handleDiffCheckedChange = (checked: boolean) => {
    onIsDiffOnChange(checked);
  };

  return (
    <nav
      aria-label="State Inspector Toolbar"
      style={{
        backgroundColor: colors.dark.surface1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        gridColumn: '2/2',
        gridRow: '1/1',
        padding: '15px',
        borderRadius: '5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <label
          style={{
            color: colors.dark.fontColor,
            marginRight: '5px',
          }}
        >
          · Visualization Type
        </label>
        <Select<SelectItem<ItemValue>>
          items={items}
          onItemChange={handleSelectedItemChange}
          placeholder="Select the visualization type."
          defaultSelectedItem={selectedItem}
          disabled={isDiffOn}
        />
      </div>

      <div>
        <Switch
          checked={isDiffOn}
          onChange={handleDiffCheckedChange}
          label="· State Diff Mode"
          size="sm"
        />
      </div>
    </nav>
  );
}
