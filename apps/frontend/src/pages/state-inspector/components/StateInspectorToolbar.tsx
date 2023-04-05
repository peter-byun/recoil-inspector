import { css } from '@emotion/react';
import * as Toolbar from '@radix-ui/react-toolbar';

import { Select, SelectItem } from '../../../components/atoms/Select';
import { Switch } from '../../../components/atoms/Switch';
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
      css={css`
        background-color: ${colors.dark.surface1};

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        grid-column: 2/2;
        grid-row: 1/1;

        padding: 15px;
        border-radius: 5px;
      `}
    >
      <Select<Item>
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={handleSelectedItemChange}
        label="Visualization Type"
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
