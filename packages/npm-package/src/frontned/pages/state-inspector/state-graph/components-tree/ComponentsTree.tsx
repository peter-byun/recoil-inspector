import { css } from '@emotion/react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { MarkerArrow } from '@visx/marker';
import { Line, LinkHorizontal } from '@visx/shape';
import { Tooltip, useTooltip } from '@visx/tooltip';
import { useMemo } from 'react';
import {
  convertRecoilStatesToTreeNodes,
  findRecoilStateTreeNodeWithRecoilState,
} from '../../../../../client-states-parser/utils/components-tree';
import { ZoomContainer } from '../../../../../components/state-inspector/svg/ZoomContainer';
import { graphColors } from '../../../../../styles/colors';
import { RecoilStates } from '../../StateInspector';
import {
  HierarchyNode,
  NODE_DEFAULT_SIZE,
  Node,
  ROOT_START_X,
  TreeNode,
} from './Node';
import { RecoilStateNode } from './StateNode';
import { RecoilStateTooltip } from './Tooltips';

export type TreeProps = {
  treeData: any;
  recoilStates: RecoilStates;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const DEFAULT_MARGIN = { top: 10, left: 80, right: 80, bottom: 10 };

export function ComponentTree({
  treeData: treeDataProp,
  recoilStates,
  width = 600,
  height = 600,
  margin = DEFAULT_MARGIN,
}: TreeProps) {
  const treeData = useMemo(() => hierarchy(treeDataProp), [treeDataProp]);

  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const recoilStateNodes = useMemo(() => {
    return convertRecoilStatesToTreeNodes(recoilStates, xMax, yMax);
  }, [recoilStates]);

  // NOTE: Tooltip to show when a pointer is over a node.
  const { tooltipOpen, tooltipData, hideTooltip, showTooltip } =
    useTooltip<Pick<HierarchyNode, 'x' | 'y' | 'data'>>();

  const isTreeVisible = width > 9 && treeDataProp;

  return isTreeVisible ? (
    <ZoomContainer
      width={width}
      height={height}
      childrenOutsideOfSvg={
        tooltipOpen &&
        tooltipData && (
          <Tooltip
            top={tooltipData.x}
            left={tooltipData.y}
            css={css`
              display: grid;
              grid-template-columns: 1fr;
              grid-template-rows: repeat(auto, 1fr);
              gap: 4px;
            `}
          >
            <h3
              css={css`
                margin: 0;
              `}
            >
              {tooltipData.data.name}
            </h3>
            {tooltipData.data.recoilStates ? (
              <RecoilStateTooltip
                recoilStates={tooltipData.data.recoilStates}
                isNodeComponent={Boolean(tooltipData.data.hookTypes?.length)}
              />
            ) : (
              'No Data'
            )}
          </Tooltip>
        )
      }
    >
      <MarkerArrow id="marker-arrow" fill="#fff" refX={2} size={10} />

      {/* NOTE: The background */}
      <rect
        width={width}
        height={height}
        rx={14}
        fill={graphColors.background}
      />

      {/* NOTE: Draws the React component and state tree */}
      <Tree<TreeNode> root={treeData} size={[yMax, xMax]}>
        {(tree) => (
          <Group top={margin.top} left={margin.left}>
            {/* NOTE: Recoil state nodes */}
            {recoilStateNodes.map((state, i: number) => (
              <RecoilStateNode
                key={`node-${i}-${state.data.name}-${state.x}-${state.y}`}
                node={state}
                onMouseEnter={(_, data) => {
                  showTooltip({
                    tooltipData: {
                      ...data,
                      y: data.x + margin.left,
                      x: data.y + margin.top,
                    },
                  });
                }}
                onMouseLeave={() => hideTooltip()}
              />
            ))}

            {/* NOTE: Links between React components */}
            {tree.links().map((link, i) => {
              if (link.source.depth === 0) {
                link.source.y = ROOT_START_X;
              }

              return (
                <LinkHorizontal
                  key={`link-${i}-${link.source.id}-${link.target.id}}`}
                  data={link}
                  stroke={graphColors.lightpurple}
                  strokeWidth="1"
                  fill="none"
                />
              );
            })}

            {tree.descendants().map((node, i) => (
              <Group
                key={`node-${i}-${node.data.name}-${node.x}-${node.y}-${node.id}`}
              >
                <Node
                  key={`node-${i}-${node.data.name}-${node.x}-${node.y}-${node.id}`}
                  node={node}
                  onMouseEnter={(_, data) => {
                    showTooltip({
                      tooltipData: data,
                    });
                  }}
                  onMouseLeave={() => hideTooltip()}
                />
                {/* NOTE: Links between Recoil states and React components */}
                {node.data.recoilStates?.map((recoilState, _: number) => {
                  const recoilStatePosition = {
                    x: findRecoilStateTreeNodeWithRecoilState(
                      recoilStateNodes,
                      recoilState
                    )?.x,
                    y: findRecoilStateTreeNodeWithRecoilState(
                      recoilStateNodes,
                      recoilState
                    )?.y,
                  };

                  if (!recoilStatePosition) {
                    return null;
                  }

                  return (
                    <Line
                      key={`link-${i}-${node.data.name}-${recoilState.key}-${recoilState.value}-${node.id}`}
                      from={{
                        x: recoilStatePosition.x,
                        y: recoilStatePosition.y,
                      }}
                      to={{
                        x: node.y - NODE_DEFAULT_SIZE.WIDTH / 2,
                        y: node.x,
                      }}
                      stroke="#fff"
                      strokeWidth="0.5"
                      markerEnd="url(#marker-arrow)"
                    />
                  );
                })}
              </Group>
            ))}
          </Group>
        )}
      </Tree>
    </ZoomContainer>
  ) : null;
}
