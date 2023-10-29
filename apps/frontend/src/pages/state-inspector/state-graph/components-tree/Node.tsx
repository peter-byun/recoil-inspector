import { Group } from '@visx/group';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';

import { graphColors } from '../../../../styles/colors';
import { RecoilStates } from '../../StateInspector';

// NOTE: Every node of a tree has a name and a children array which may be empty.
// And the recoilStates is stored as a property named "data" in the node.
export type HierarchyNode = HierarchyPointNode<TreeNode>;
export interface TreeNode {
  [x: string]: any;
  name: string;
  children?: this[];
  recoilStates?: RecoilStates;
}

export const ROOT_START_X = 150;
export function RootNode({ node }: { node: HierarchyNode }) {
  return (
    <Group top={node.x} left={ROOT_START_X}>
      <circle r={12} fill="transparent" stroke={graphColors.blue} />
      <NodeText label={node.data.name} fill={graphColors.white}></NodeText>
    </Group>
  );
}

export const NODE_DEFAULT_SIZE = {
  WIDTH: 40,
  HEIGHT: 20,
} as const;

export function Node({
  node,
  onMouseEnter,
  onMouseLeave,
}: {
  node: HierarchyNode;
  onMouseEnter: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: HierarchyNode
  ) => void;
  onMouseLeave: () => void;
}) {
  const centerX = -NODE_DEFAULT_SIZE.WIDTH / 2;
  const centerY = -NODE_DEFAULT_SIZE.HEIGHT / 2;

  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;
  if (isParent)
    return (
      <ParentNode
        node={node}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

  return (
    <Group
      top={node.x}
      left={node.y}
      onMouseEnter={(e) => {
        onMouseEnter(e, node);
      }}
      onMouseLeave={onMouseLeave}
    >
      <rect
        width={NODE_DEFAULT_SIZE.WIDTH}
        height={NODE_DEFAULT_SIZE.HEIGHT}
        y={centerY}
        x={centerX}
        fill={graphColors.background}
        stroke={graphColors.blue}
        strokeWidth={1}
        rx={10}
      />
      <NodeText label={node.data.name} fill={graphColors.white}></NodeText>
    </Group>
  );
}

export function ParentNode({
  node,
  onMouseEnter,
  onMouseLeave,
}: {
  node: HierarchyNode;
  onMouseEnter: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: HierarchyNode
  ) => void;
  onMouseLeave: () => void;
}) {
  const centerX = -NODE_DEFAULT_SIZE.WIDTH / 2;
  const centerY = -NODE_DEFAULT_SIZE.HEIGHT / 2;

  return (
    <Group top={node.x} left={node.y}>
      <rect
        width={NODE_DEFAULT_SIZE.WIDTH}
        height={NODE_DEFAULT_SIZE.HEIGHT}
        y={centerY}
        x={centerX}
        fill={graphColors.background}
        stroke={graphColors.blue}
        strokeWidth={1}
        rx={10}
        onMouseEnter={(e) => {
          onMouseEnter(e, node);
        }}
        onMouseLeave={onMouseLeave}
      />
      <NodeText label={node.data.name} fill={graphColors.white}></NodeText>
    </Group>
  );
}

export const NodeText = ({ label, fill }: { label: string; fill: string }) => {
  return (
    <text
      dy=".33em"
      fontSize={9}
      fontFamily="Arial"
      textAnchor="middle"
      style={{ pointerEvents: 'none' }}
      fill={fill}
    >
      {label}
    </text>
  );
};
