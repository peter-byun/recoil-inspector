import { Group } from '@visx/group';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { graphColors } from '../../../../../../constants/styles/colors';

import { RecoilStates } from '../../../../StateInspector';
import {
  separateNodeNameIntoLines,
  calculateNodeSizeAndCenterPosition,
} from './utils/node';

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
  const { nodeWidth, nodeHeight, centerX, centerY } =
    calculateNodeSizeAndCenterPosition(node.data.name);

  return (
    <Group top={node.x} left={ROOT_START_X}>
      <rect
        width={nodeWidth}
        height={nodeHeight}
        y={centerY}
        x={centerX}
        fill={graphColors.background}
        stroke={graphColors.blue}
        strokeWidth={1}
        rx={12}
      />
      <NodeText label={node.data.name} fill={graphColors.white}></NodeText>
    </Group>
  );
}

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
  onMouseLeave?: () => void;
}) {
  if (!node.data.name) {
    return null;
  }

  const { nodeWidth, nodeHeight, centerX, centerY } =
    calculateNodeSizeAndCenterPosition(node.data.name);

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
        width={nodeWidth}
        height={nodeHeight}
        y={centerY}
        x={centerX}
        fill={graphColors.background}
        stroke={graphColors.blue}
        strokeWidth={1}
        rx={12}
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
  onMouseLeave?: () => void;
}) {
  const { nodeWidth, nodeHeight, centerX, centerY } =
    calculateNodeSizeAndCenterPosition(node.data.name);

  return (
    <Group top={node.x} left={node.y}>
      <rect
        width={nodeWidth}
        height={nodeHeight}
        y={centerY}
        x={centerX}
        fill={graphColors.background}
        stroke={graphColors.blue}
        strokeWidth={1}
        rx={12}
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
  const lineSeparatedNodeName = separateNodeNameIntoLines(label);

  return (
    <text
      dy="0"
      fontSize={9}
      fontFamily="Arial"
      textAnchor="middle"
      style={{ pointerEvents: 'none' }}
      fill={fill}
    >
      {lineSeparatedNodeName.map((labelChunk, idx) => (
        <tspan x="0" dy={idx === 0 ? 0 : 7} key={idx}>
          {labelChunk}
        </tspan>
      ))}
    </text>
  );
};
