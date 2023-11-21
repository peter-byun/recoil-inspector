import { Group } from '@visx/group';
import { graphColors } from '../../../../../styles/colors';

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
  onMouseLeave: () => void;
}) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.y} left={node.x}>
      <rect
        height={height}
        width={width}
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
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        fill={graphColors.white}
        style={{ pointerEvents: 'none' }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}
