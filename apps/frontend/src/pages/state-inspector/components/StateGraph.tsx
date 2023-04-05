import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Node } from 'recoil-inspector';

import { StatePanelLayout } from '../../../components/molecules/StatePanelLayout';
import { RecoilStates } from '../StateInspector';
import { ComponentTree } from './components-tree/ComponentsTree';

interface StateGraphProps {
  componentTree: Node;
  recoilStates: RecoilStates;
}

const COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE = 0.6;

export const StateGraph = ({
  componentTree,
  recoilStates,
}: StateGraphProps) => {
  const [width, setWidth] = useState(
    window.innerWidth * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE
  );
  const [height, setHeight] = useState(
    window.innerHeight * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setWidth(window.innerWidth * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE);
      setHeight(window.innerHeight * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE);
    });
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <StatePanelLayout
      children={
        <ComponentTree
          treeData={componentTree}
          recoilStates={recoilStates}
          width={width}
          height={height}
        />
      }
      containerCss={css`
        grid-column: 2/2;
        grid-row: 2/2;
      `}
    />
  );
};
