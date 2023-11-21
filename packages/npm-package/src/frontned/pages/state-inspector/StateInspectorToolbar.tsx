import { css } from '@emotion/react';
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
      css={css`
        background-color: ${colors.dark.surface1};

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;

        grid-column: 2/2;
        grid-row: 1/1;

        padding: 15px;
        border-radius: 5px;
      `}
    >
      <label
        css={css`
          font-size: 11px;
          color: ${colors.dark.fontColor};
        `}
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
        css={css`
          margin-left: auto;
        `}
      />
    </Toolbar.Root>
  );
}
