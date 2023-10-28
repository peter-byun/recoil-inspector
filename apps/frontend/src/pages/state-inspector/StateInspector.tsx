import { css } from '@emotion/react';
import { Node } from '@peterbyun/recoil-inspector';
import { useMemo, useState } from 'react';

import { StateChangeHistory } from '../../components/organisms/state-change-history/StateChangeHistory';
import { VISUALIZATION_TYPES } from '../../constants/visualization';
import {
  DUMMY_RECOIL_STATES,
  DUMMY_STATE_GRAPH,
  DUMMY_STATE_GRAPH_HISTORY,
} from '../../dummy-data/state-graph';
import { useExtensionBridge } from '../../hooks/useExtensionBridge';
import { StateChange } from '../../types/state';
import { StateGraph } from './components/StateGraph';
import { StateInspectorToolbar } from './components/StateInspectorToolbar';
import { StateJSON } from './components/StateJSON';
import { StateRawData } from './components/StateRawData';

type StateGraphHistory = {
  [key: string]: Node;
};

export type RecoilStates = {
  key: string;
  value: any;
  stateType: 'atom' | 'selector';
}[];

type VisualizationTypeNames = 'JSON' | 'Graph' | 'Raw Data';
type VisualizationTypeValues = 'rawData' | 'json' | 'graph';
type VisualizationType = {
  name: VisualizationTypeNames;
  value: VisualizationTypeValues;
};

const DEBUG_MODE = window.location.port === '5173';

export const StateInspector = () => {
  const [componentTree, setComponentTree] = useState<any>(
    DEBUG_MODE ? DUMMY_STATE_GRAPH : null
  );
  const [recoilStates, setRecoilStates] = useState<any>(
    DEBUG_MODE ? DUMMY_RECOIL_STATES : null
  );
  const [stateGraphHistory, setStateGraphHistory] = useState<StateGraphHistory>(
    DEBUG_MODE ? DUMMY_STATE_GRAPH_HISTORY : {}
  );
  const stateChangeHistory = useMemo(() => {
    return Object.entries(stateGraphHistory).map(
      ([id, stateChange]: [id: string, stateChange: StateGraphHistory[0]]) => {
        return {
          id,
          name: stateChange.name,
          changedAt: stateChange.changedAt,
        };
      }
    );
  }, [stateGraphHistory]);

  useExtensionBridge({
    onDisconnectFromExtensionProcess: () => {
      // setComponentTree({});
    },
    onExtensionDataUpdated: (updatedData: any) => {
      if (!updatedData) {
        return;
      }

      setComponentTree(updatedData.componentTreeRoot);
      setRecoilStates(updatedData.recoilStates);

      setStateGraphHistory((prevStateGraphHistory) => {
        const nextStateGraphHistory = { ...prevStateGraphHistory };

        nextStateGraphHistory[updatedData.componentTreeRoot.id] = {
          ...updatedData.componentTreeRoot,
          changedAt: new Date().toLocaleTimeString(),
        };

        return nextStateGraphHistory;
      });
    },
  });

  const [selectedVisualizationType, setSelectedVisualizationType] =
    useState<VisualizationType>(VISUALIZATION_TYPES.JSON);

  const handleVisualizationTypeSelected = (
    selectedVisualizationTypeItem: VisualizationType
  ) => {
    setSelectedVisualizationType(selectedVisualizationTypeItem);
  };

  const handleSelectedStateChangeFromHistory = (stateChange: StateChange) => {
    setComponentTree(stateGraphHistory[stateChange.id]);
  };

  const [isDiffOn, setIsDiffOn] = useState<boolean>(false);

  const handleIsDiffOnChange = (checked: boolean) => {
    setIsDiffOn(checked);

    if (checked) {
      setSelectedVisualizationType(VISUALIZATION_TYPES.JSON);
    } else {
      setComponentTreesToDiff([]);

      const NEXT_COMPONENT_TREE = componentTreesToDiff[1];
      NEXT_COMPONENT_TREE && setComponentTree(NEXT_COMPONENT_TREE);
    }
  };

  const [componentTreesToDiff, setComponentTreesToDiff] = useState<Node[]>([]);

  const handleStatesToDiffChange = (stateChanges: StateChange[]) => {
    // In diff mode, we only support JSON visualization.
    setSelectedVisualizationType(VISUALIZATION_TYPES.JSON);

    setComponentTreesToDiff(
      stateChanges.map((stateChange) => stateGraphHistory[stateChange.id])
    );
  };

  const shouldShowGraph =
    selectedVisualizationType.value === VISUALIZATION_TYPES.GRAPH.value;

  return (
    <>
      <div css={layoutCss}>
        <StateChangeHistory
          stateChangeHistory={stateChangeHistory}
          maxSelectableItem={2}
          onSelectedStateChange={handleSelectedStateChangeFromHistory}
          isDiffOn={isDiffOn}
          onDiffStatesChange={handleStatesToDiffChange}
        ></StateChangeHistory>

        <StateInspectorToolbar<VisualizationType>
          items={Object.values(VISUALIZATION_TYPES)}
          selectedItem={selectedVisualizationType}
          onItemSelected={handleVisualizationTypeSelected}
          isDiffOn={isDiffOn}
          onIsDiffOnChange={handleIsDiffOnChange}
        />

        {selectedVisualizationType.value === VISUALIZATION_TYPES.JSON.value && (
          <StateJSON
            componentTree={componentTree}
            isDiffOn={isDiffOn}
            componentTreesToDiff={componentTreesToDiff}
          />
        )}
        {shouldShowGraph ? (
          <StateGraph
            componentTree={componentTree}
            recoilStates={recoilStates}
          />
        ) : null}
        {selectedVisualizationType.value ===
          VISUALIZATION_TYPES.RAW_DATA.value && (
          <StateRawData componentTree={componentTree} />
        )}
      </div>
    </>
  );
};

const layoutCss = css`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 60px 90%;
  height: 80vh;
  grid-gap: 5px;
`;
