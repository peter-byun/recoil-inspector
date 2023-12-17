'use client';

import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { MarkerArrow } from '@visx/marker';
import { Line, LinkHorizontal } from '@visx/shape';
import { useTooltip } from '@visx/tooltip';
import { useMemo, useState } from 'react';
import {
  convertRecoilStatesToTreeNodes,
  findRecoilStateTreeNodeWithRecoilState,
} from '../../../../../../client-states-parser/utils/components-tree';
import { ZoomContainer } from '../zoom-container/ZoomContainer';
import { graphColors } from '../../../../../constants/styles/colors';
import { RecoilStates } from '../../../StateInspector';
import { HierarchyNode, Node, ROOT_START_X, TreeNode } from './node/Node';
import { RecoilStateNode } from './StateNode';
import { NodeStatusTooltip } from '../node-status-tooltip/NodeStatusTooltip';
import { Button } from '../../../../../components/base/button/Button';
import { useToast } from '../../../../../components/base/toast/useToast';
import { Toast } from '../../../../../components/base/toast/Toast';
import { FRONTEND_CONTAINER_ID } from '../../../../../Frontend';
import { useCopyToClipboardWithToast } from '../../../../../utils/copy-to-clipboard/useCopyToClipboardWithToast';

export type TreeProps = {
  treeData: any;
  recoilStates: RecoilStates;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const DEFAULT_MARGIN = { top: 10, left: 80, right: 80, bottom: 10 };

type NodesToFilter = string[];

function filterNodesFromTree(treeData: TreeNode, nodesToFilter: NodesToFilter) {
  if (!treeData) {
    return treeData;
  }
  if (!treeData.children) {
    return treeData;
  }

  for (let nodeIdx in treeData.children) {
    console.log({ nodesToFilter });
    if (
      Array.isArray(nodesToFilter) &&
      nodesToFilter.includes(treeData.children[nodeIdx].name)
    ) {
      delete treeData.children[nodeIdx];
    } else {
      filterNodesFromTree(treeData.children[nodeIdx], nodesToFilter);
    }
  }

  const hasEmptyChildren = !treeData.children.find((node) => node);
  if (hasEmptyChildren) {
    delete treeData.children;
  }

  return treeData;
}

export function ComponentTree({
  treeData: treeDataProp,
  recoilStates,
  width = 1200,
  height = 1200,
  margin = DEFAULT_MARGIN,
}: TreeProps) {
  const [nodesToFilter, setNodesToFilter] = useState<string[]>([]);
  const treeData = useMemo(() => {
    const treeDataPropClone = structuredClone(treeDataProp);
    const filteredNodesFromTree = filterNodesFromTree(
      treeDataPropClone,
      nodesToFilter
    );

    return hierarchy(filteredNodesFromTree);
  }, [treeDataProp, nodesToFilter]);

  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const recoilStateNodes = useMemo(() => {
    return convertRecoilStatesToTreeNodes(recoilStates, xMax, yMax);
  }, [recoilStates]);

  // NOTE: Tooltip to show when a pointer is over a node.
  const { tooltipData, showTooltip } =
    useTooltip<Pick<HierarchyNode, 'x' | 'y' | 'data'>>();

  const { toast, setToast, openToast } = useToast();
  const { handleCopy } = useCopyToClipboardWithToast({
    setToast,
  });
  const handleCopyClick = () => {
    const nodeDataText = JSON.stringify(tooltipData?.data);
    handleCopy(nodeDataText);
  };

  const isTreeVisible = width > 9 && treeDataProp;

  return (
    <>
      <Toast
        containerId={FRONTEND_CONTAINER_ID}
        toastData={{
          ...toast,
          title: 'Data Copied ✅',
        }}
        setIsToastOpen={openToast}
      />

      {isTreeVisible && treeData ? (
        <ZoomContainer
          width={width}
          height={height}
          childrenOutsideOfSvg={
            <>
              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: '5px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '5px',
                  }}
                >
                  <h2
                    style={{
                      width: '100%',
                      margin: 0,
                    }}
                  >
                    Node Data
                  </h2>
                  <NodeStatusTooltip
                    name={tooltipData?.data.name}
                    hookTypes={tooltipData?.data.hookTypes}
                    recoilStates={tooltipData?.data.recoilStates}
                  />
                  <Button
                    onClick={() => {
                      handleCopyClick();
                    }}
                  >
                    Copy To Clipboard
                  </Button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '5px',
                  }}
                >
                  <h2
                    style={{
                      width: '100%',
                      margin: 0,
                    }}
                  >
                    Hide Nodes
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      gap: '5px',
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (tooltipData?.data) {
                          setNodesToFilter([
                            ...nodesToFilter,
                            tooltipData?.data.name,
                          ]);
                        }
                      }}
                      style={{
                        width: '100%',
                      }}
                    >
                      Hide This Node
                    </Button>
                    <Button
                      onClick={() => {
                        setNodesToFilter([]);
                      }}
                      style={{
                        width: '100%',
                      }}
                    >
                      Reset Nodes
                    </Button>
                  </div>
                </div>
              </section>
            </>
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
          <Tree<TreeNode>
            root={treeData}
            size={[yMax, xMax]}
            nodeSize={[25, 30]}
          >
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
                            x: node.y - 50 / 2,
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
      ) : null}
    </>
  );
}
