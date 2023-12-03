import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';

import { StateChange } from 'recoil-inspector/src/types/state';
import { StateInspectorToolbar } from './StateInspectorToolbar';
import { StateGraph } from './state-graph/StateGraph';
import { StateJSON } from './state-json/StateJSON';
import { StateRawData } from './state-raw-data/StateRawData';
import { FiberNode } from '../../../client-states-parser/fiber-parser/fiber-parser.types';
import {
  DUMMY_RECOIL_STATES,
  DUMMY_STATE_GRAPH,
  DUMMY_STATE_GRAPH_HISTORY,
} from '../../dummy-data/state-graph';
import { VISUALIZATION_TYPES } from '../../../constants/visualization';
import { StateChangeHistory } from '../../../components/state-inspector/state-change-history/StateChangeHistory';

type StateGraphHistory = {
  [key: string]: FiberNode;
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

const DEBUG_MODE = false;

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

  useEffect(() => {
    function onExtensionDataUpdated(message: any) {
      if (!message || message.data.action !== 'extensionDataUpdated') {
        return;
      }

      const updatedData = message.data.payload;

      setComponentTree(updatedData.componentTreeRoot);
      setRecoilStates(updatedData.recoilStates);

      setStateGraphHistory((prevStateGraphHistory) => {
        const nextStateGraphHistory = { ...prevStateGraphHistory };

        nextStateGraphHistory[updatedData.componentTreeRoot?.id] = {
          ...updatedData.componentTreeRoot,
          changedAt: new Date().toLocaleTimeString(),
        };

        return nextStateGraphHistory;
      });
    }

    window.addEventListener('message', onExtensionDataUpdated);

    return () => {
      window.removeEventListener('message', onExtensionDataUpdated);
    };
  }, []);

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

  const [componentTreesToDiff, setComponentTreesToDiff] = useState<FiberNode[]>(
    []
  );

  const handleStatesToDiffChange = (stateChanges: StateChange[]) => {
    setSelectedVisualizationType(VISUALIZATION_TYPES.JSON);

    setComponentTreesToDiff(
      stateChanges.map((stateChange) => stateGraphHistory[stateChange?.id])
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
  position: fixed;
  left: 0;
  top: 0;

  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 60px 90%;
  height: 80vh;
  grid-gap: 5px;

  width: 100vw;
  height: 50vh;
`;
