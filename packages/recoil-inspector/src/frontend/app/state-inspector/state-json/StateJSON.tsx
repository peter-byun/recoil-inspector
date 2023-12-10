import { FiberNode } from '../../../../client-states-parser/fiber-parser/fiber-parser.types';
import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';
import { JSONItem, JSONItemInDiffMode } from './components/JSONItem';

interface StateJSONProps {
  componentTree: FiberNode;
  isDiffOn: boolean;
  componentTreesToDiff: FiberNode[];
}

export const StateJSON = ({
  componentTree,
  isDiffOn,
  componentTreesToDiff,
}: StateJSONProps) => {
  return (
    <StatePanelLayout
      children={
        <ul
          style={{
            width: '95%',
            padding: '0',
          }}
        >
          {isDiffOn && componentTreesToDiff.length === 2
            ? JSONItemInDiffMode(componentTreesToDiff)
            : JSONItem(componentTree)}
        </ul>
      }
    />
  );
};
