'use client';

import { useEffect, useState } from 'react';
import { FiberNode } from '../../../../client-states-parser/fiber-parser/fiber-parser.types';
import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';

import { RecoilStates } from '../StateInspector';
import { ComponentTree } from './components/components-tree/ComponentsTree';

interface StateGraphProps {
  componentTree: FiberNode;
  recoilStates: RecoilStates;
}

const COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE_RATIO = 0.6;

export const StateGraph = ({
  componentTree,
  recoilStates,
}: StateGraphProps) => {
  const [width, setWidth] = useState(
    window.innerWidth * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE_RATIO
  );
  const [height, setHeight] = useState(
    window.innerHeight * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE_RATIO
  );

  useEffect(function resizeStateGraphOnWindowResize() {
    const resizeObserver = new ResizeObserver(() => {
      setWidth(window.innerWidth * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE_RATIO);
      setHeight(
        window.innerHeight * COMPONENT_TREE_SIZE_OVER_WINDOW_SIZE_RATIO
      );
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const graphDataExist = componentTree && recoilStates;

  return (
    <StatePanelLayout
      children={
        graphDataExist ? (
          <ComponentTree
            treeData={componentTree}
            recoilStates={recoilStates}
            width={width}
            height={height}
          />
        ) : null
      }
      containerCss={{
        gridColumn: '2/2',
        gridRow: '2/2',
      }}
    />
  );
};
