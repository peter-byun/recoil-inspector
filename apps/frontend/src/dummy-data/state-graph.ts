import { Node } from 'recoil-inspector';

export const DUMMY_RECOIL_STATES = [
  {
    key: 'countState',
    value: 1,
    stateType: 'atom',
  },
  {
    key: 'countSecond',
    value: 3,
    stateType: 'atom',
  },
  {
    key: 'sumState',
    value: 2,
    stateType: 'atom',
  },
];

export const DUMMY_STATE_GRAPH = {
  name: 'root',
  children: [
    {
      name: 'App',
      hookTypes: ['useState'],
      children: [
        {
          name: 'RecoilRoot',
          hookTypes: ['useContext'],
          children: [
            {
              name: 'Counter',
              hookTypes: [
                'useContext',
                'useContext',
                'useEffect',
                'useRef',
                'useRef',
                'useEffect',
                'useContext',
                'useCallback',
                'useCallback',
                'useMemo',
                'useCallback',
                'useSyncExternalStore',
                'useContext',
                'useCallback',
                'useState',
              ],
              children: [],
              states: [3],
              recoilStates: DUMMY_RECOIL_STATES,
            },
            {
              name: 'LocalCounter',
              hookTypes: ['useState', 'useState'],
              children: [],
              states: [3, ''],
              recoilStates: DUMMY_RECOIL_STATES,
            },
          ],
          states: [],
        },
      ],
      states: [1],
    },
  ],
} as unknown as Node;

const randomizeStateGraph = (node: Node): Node => {
  const randomizedNode = { ...node };

  if (randomizedNode.children) {
    randomizedNode.children = randomizedNode.children.map((child) =>
      randomizeStateGraph(child)
    );
  }

  if (randomizedNode.hookTypes) {
    randomizedNode.hookTypes = randomizedNode.hookTypes.map((hookType) => {
      return Math.random() > 0.5 ? 'useState' : 'useCallback';
    });
  }

  if (randomizedNode.name) {
    randomizedNode.name =
      randomizedNode.name + Math.random().toString(36).substring(7);
  }

  if (randomizedNode.states) {
    randomizedNode.states = randomizedNode.states.map((state) => {
      if (typeof state === 'number') {
        return Math.floor(Math.random() * 10);
      }

      return state;
    });
  }

  return randomizedNode;
};

export const DUMMY_STATE_GRAPH_HISTORY: {
  [key: string]: Node;
} = {
  '1': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '2': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '3': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '4': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '5': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '6': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '7': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '8': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '9': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '10': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '11': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '12': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '13': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '14': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '15': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '16': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '17': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '18': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '19': randomizeStateGraph(DUMMY_STATE_GRAPH),
  '20': randomizeStateGraph(DUMMY_STATE_GRAPH),
} as const;
