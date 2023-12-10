'use client';

import { useEffect, useMemo, useState } from 'react';

import { StateChange } from 'recoil-inspector/src/types/state';
import { StateInspectorToolbar } from './StateInspectorToolbar';
import { StateGraph } from './state-graph/StateGraph';
import { StateJSON } from './state-json/StateJSON';
import { StateRawData } from './state-raw-data/StateRawData';
import { FiberNode } from '../../../client-states-parser/fiber-parser/fiber-parser.types';
import { VISUALIZATION_TYPES } from '../../constants/visualization';
import { StateChangeHistory } from '../../components/app/state-inspector/state-change-history/StateChangeHistory';

type StateGraphHistory = {
  [key: string]: FiberNode;
};

type RecoilStatesHistory = {
  [key: string]: RecoilStates;
};
export type RecoilStates = {
  key: string;
  value: any;
  stateType: 'atom' | 'selector';
}[];

type VisualizationType = {
  name: VisualizationTypeNames;
  value: VisualizationTypeValues;
};
type VisualizationTypeNames = 'JSON' | 'Graph' | 'Raw Data';
type VisualizationTypeValues = 'rawData' | 'json' | 'graph';

export const StateInspector = ({ show }: { show: boolean }) => {
  const [componentTree, setComponentTree] = useState<any>(null);
  const [recoilStates, setRecoilStates] = useState<any>(null);
  const [recoilStatesHistory, setRecoilStatesHistory] =
    useState<RecoilStatesHistory>({});
  const [stateGraphHistory, setStateGraphHistory] = useState<StateGraphHistory>(
    {}
  );
  const stateChangeHistory = useMemo(() => {
    return Object.entries(stateGraphHistory)?.map(
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

      if (!updatedData.componentTreeRoot || !updatedData.recoilStates) {
        return;
      }

      setComponentTree(updatedData.componentTreeRoot);
      setRecoilStates(updatedData.recoilStates);

      setStateGraphHistory((prevStateGraphHistory) => {
        const nextHistory = { ...prevStateGraphHistory };

        nextHistory[updatedData.componentTreeRoot?.id] = {
          ...updatedData.componentTreeRoot,
          changedAt: new Date().toLocaleTimeString(),
        };

        return nextHistory;
      });
      setRecoilStatesHistory((prevRecoilStatesHistory) => {
        const nextHistory = { ...prevRecoilStatesHistory };

        nextHistory[updatedData.componentTreeRoot?.id] = [
          ...updatedData.recoilStates,
        ];

        return nextHistory;
      });
    }

    window.addEventListener('message', onExtensionDataUpdated);

    return () => {
      window.removeEventListener('message', onExtensionDataUpdated);
    };
  }, []);

  const [selectedVisualizationType, setSelectedVisualizationType] =
    useState<VisualizationType>(VISUALIZATION_TYPES.JSON);

  const handleVisualizationTypeSelected = (selectedVisualizationTypeItem: {
    name: string;
    value: string;
  }) => {
    setSelectedVisualizationType(
      selectedVisualizationTypeItem as VisualizationType
    );
  };

  const handleSelectedStateChangeFromHistory = (stateChange: StateChange) => {
    setComponentTree(stateGraphHistory[stateChange.id]);
    setRecoilStates(recoilStatesHistory[stateChange.id]);
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

  const layoutStyle = {
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'grid',
    gridTemplateColumns: '20% 80%',
    gridTemplateRows: '60px 90%',
    gridGap: '5px',
    width: '98vw',
    height: '90vh',
    margin: '5px 5px 0 5px',
  } as const;

  return (
    <div
      style={Object.assign(
        {},
        ...[layoutStyle, { visibility: show ? 'visible' : 'hidden' } as const]
      )}
    >
      <StateChangeHistory
        stateChangeHistory={stateChangeHistory}
        maxSelectableItem={2}
        onSelectedStateChange={handleSelectedStateChangeFromHistory}
        isDiffOn={isDiffOn}
        onDiffStatesChange={handleStatesToDiffChange}
      ></StateChangeHistory>

      <StateInspectorToolbar<string>
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
        <StateGraph componentTree={componentTree} recoilStates={recoilStates} />
      ) : null}
      {selectedVisualizationType.value ===
        VISUALIZATION_TYPES.RAW_DATA.value && (
        <StateRawData componentTree={componentTree} />
      )}
    </div>
  );
};
