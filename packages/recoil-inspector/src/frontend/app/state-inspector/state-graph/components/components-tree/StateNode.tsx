import { Group } from '@visx/group';
import { graphColors } from '../../../../../constants/styles/colors';
import { NodeText } from './node/Node';
import { calculateNodeSizeAndCenterPosition } from './node/utils/node';

type RecoilStateNodeProps = {
  node: {
    x: number;
    y: number;
    data: {
      name: string;
    };
  };
};

export function RecoilStateNode({
  node,
  onMouseEnter,
  onMouseLeave,
}: RecoilStateNodeProps & {
  onMouseEnter: (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    data: {
      x: number;
      y: number;
      data: {
        name: string;
      };
    }
  ) => void;
  onMouseLeave?: () => void;
}) {
  const { nodeWidth, nodeHeight, centerX, centerY } =
    calculateNodeSizeAndCenterPosition(node.data.name);

  return (
    <Group top={node.y} left={node.x}>
      <rect
        height={nodeHeight}
        width={nodeWidth}
        y={centerY}
        x={centerX}
        fill={graphColors.background}
        stroke={graphColors.plum}
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
