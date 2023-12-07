import { RecoilStates } from '../../frontend/pages/state-inspector/StateInspector';

export const convertRecoilStatesToTreeNodes = (
  recoilStates: RecoilStates,
  _: number,
  yMax: number
) => {
  return recoilStates.map((state: RecoilStates[0], i: number) => {
    const halfOfStatesCount = Math.floor(recoilStates.length / 2);
    const NODE_GAP = 40;
    const yAxisMidPoint = yMax / 2 - halfOfStatesCount * NODE_GAP;

    const node = {
      x: -50,
      y: yAxisMidPoint + i * NODE_GAP,
      data: {
        name: state.key,
        recoilStates: [state],
      },
    };

    return node;
  });
};

type RecoilStateTreeNode = ReturnType<typeof convertRecoilStatesToTreeNodes>[0];

export const findRecoilStateTreeNodeWithRecoilState = (
  recoilStateNodes: RecoilStateTreeNode[],
  recoilState: RecoilStates[0]
) => {
  const selectedRecoilState = recoilStateNodes.find(
    (state: any) => state.data.name === recoilState.key
  );

  if (!selectedRecoilState) {
    return null;
  }

  return {
    x: selectedRecoilState.x,
    y: selectedRecoilState.y,
    data: {
      name: selectedRecoilState.data.name,
    },
  };
};
