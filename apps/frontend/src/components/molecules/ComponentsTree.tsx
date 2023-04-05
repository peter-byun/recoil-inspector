import { css } from '@emotion/react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { MarkerArrow } from '@visx/marker';
import { Line, LinkHorizontal } from '@visx/shape';
import { Tooltip, useTooltip } from '@visx/tooltip';
import { useMemo } from 'react';

import { RecoilStates } from '../../pages/state-inspector/StateInspector';
import {
  convertRecoilStatesToTreeNodes,
  findRecoilStateTreeNodeWithRecoilState,
} from '../../utils/components-tree';
import { ZoomContainer } from '../organisms/svg/ZoomContainer';

const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const lightpurple = '#374469';
const violet = '#5b247a';
const plum = '#c63af9';
const white = '#ffffff';
export const background = '#272b4d';

interface TreeNode {
  name: string;
  children?: this[];
  recoilStates?: RecoilStates;
}

// NOTE: Every node of a tree has a name and a children array whichi may be empty.
// But recoilStates is stored in the data property of the node.
type HierarchyNode = HierarchyPointNode<TreeNode>;

const NodeText = ({ label, fill }: { label: string; fill: string }) => {
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

const ROOT_START_X = 75;

function RootNode({ node }: { node: HierarchyNode }) {
  return (
    <Group top={node.x} left={ROOT_START_X}>
      <circle r={12} fill="transparent" stroke={blue} />
      <NodeText label={node.data.name} fill={white}></NodeText>
    </Group>
  );
}

const NODE_DEFAULT_SIZE = {
  WIDTH: 40,
  HEIGHT: 20,
} as const;

function Node({
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
        fill={background}
        stroke={blue}
        strokeWidth={1}
        rx={10}
      />
      <NodeText label={node.data.name} fill={white}></NodeText>
    </Group>
  );
}

function ParentNode({
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
        fill={background}
        stroke={blue}
        strokeWidth={1}
        rx={10}
        onMouseEnter={(e) => {
          onMouseEnter(e, node);
        }}
        onMouseLeave={onMouseLeave}
      />
      <NodeText label={node.data.name} fill={white}></NodeText>
    </Group>
  );
}

type RecoilStateNodeProps = {
  node: {
    x: number;
    y: number;
    data: {
      name: string;
    };
  };
};

function RecoilStateNode({
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
        fill={background}
        stroke={plum}
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
        fill={white}
        style={{ pointerEvents: 'none' }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

export type TreeProps = {
  treeData: any;
  recoilStates: RecoilStates;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const DEFAULT_MARGIN = { top: 10, left: 80, right: 80, bottom: 10 };

function RecoilStateTooltip({ recoilStates }: { recoilStates: RecoilStates }) {
  return (
    <>
      {recoilStates.map((recoilState, idx, totalRecoilStates) => {
        const isLastProperty: boolean = idx === totalRecoilStates.length - 1;

        return (
          <>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                ${isLastProperty &&
                css`
                  margin-bottom: 4px;
                `}
              `}
            >
              <span>
                {recoilState.key} : <strong> {recoilState.value}</strong>
              </span>
              <span>
                State Type : <strong> {recoilState.stateType}</strong>
              </span>
            </div>
            {!isLastProperty && (
              <hr
                css={css`
                  width: 100%;
                  margin: 0;
                `}
              />
            )}
          </>
        );
      })}
    </>
  );
}

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

  const isTreeVisible = width > 9 && treeDataProp;

  const recoilStateNodes = useMemo(() => {
    return convertRecoilStatesToTreeNodes(recoilStates, xMax, yMax);
  }, [recoilStates]);

  const { tooltipOpen, tooltipData, hideTooltip, showTooltip } =
    useTooltip<Pick<HierarchyNode, 'x' | 'y' | 'data'>>();

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
      <rect width={width} height={height} rx={14} fill={background} />

      <Tree<TreeNode> root={treeData} size={[yMax, xMax]}>
        {(tree) => (
          <Group top={margin.top} left={margin.left}>
            {recoilStateNodes.map((state, i: number) => (
              <RecoilStateNode
                key={`node-${i}`}
                node={state}
                onMouseEnter={(event, data) => {
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

            {tree.links().map((link, i) => {
              if (link.source.depth === 0) {
                link.source.y = ROOT_START_X;
              }

              return (
                <LinkHorizontal
                  key={`link-${i}`}
                  data={link}
                  stroke={lightpurple}
                  strokeWidth="1"
                  fill="none"
                />
              );
            })}

            {tree.descendants().map((node, i) => (
              <>
                <Node
                  key={`node-${i}`}
                  node={node}
                  onMouseEnter={(event, data) => {
                    showTooltip({
                      tooltipData: data,
                    });
                  }}
                  onMouseLeave={() => hideTooltip()}
                />

                {node.data.recoilStates?.map((recoilState, idx: number) => {
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
                      key={`link-${i}-${idx}`}
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
              </>
            ))}
          </Group>
        )}
      </Tree>
    </ZoomContainer>
  ) : null;
}
