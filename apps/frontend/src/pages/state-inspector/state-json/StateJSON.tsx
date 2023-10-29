import { css } from '@emotion/react';
import { Node } from '@peterbyun/recoil-inspector';

import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';
import { JSONItem, JSONItemInDiffMode } from './JSONItem';

interface StateJSONProps {
  componentTree: Node;
  isDiffOn: boolean;
  componentTreesToDiff: Node[];
}

export const StateJSON = ({
  componentTree,
  isDiffOn,
  componentTreesToDiff,
}: StateJSONProps) => {
  return (
    <StatePanelLayout
      children={
        <ul
          css={css`
            width: 95%;
            padding: 0;
          `}
        >
          {isDiffOn && componentTreesToDiff.length === 2
            ? JSONItemInDiffMode(componentTreesToDiff)
            : JSONItem(componentTree)}
        </ul>
      }
    />
  );
};
