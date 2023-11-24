import { css } from '@emotion/react';
import { useState } from 'react';
import { FiberNode } from '../../../../client-states-parser/fiber-parser/fiber-parser.types';
import { colors } from '../../../../styles/colors';

export const JSONItemProperties = ({ item }: { item: FiberNode }) => {
  if (!item) {
    return null;
  }

  return (
    <>
      {item &&
        Object.entries(item)
          .filter(([key]) => key !== 'children')
          .map(([key, value], idx) => (
            <li key={key + value + idx}>
              {`${key} :`}{' '}
              <JSONItemPropertyValue value={value} key={key + value + idx} />
            </li>
          ))}
    </>
  );
};

export const JSONItemPropertiesInDiffMode = ({
  prevItem,
  nextItem,
}: {
  prevItem: FiberNode | null;
  nextItem: FiberNode | null;
}) => {
  const addedItemKeys =
    nextItem &&
    Object.keys(nextItem).filter((key) => !prevItem || !prevItem[key]);

  const removedItemKeys =
    prevItem &&
    Object.keys(prevItem).filter((key) => !nextItem || !nextItem[key]);

  const mergedItem = {
    ...prevItem,
    ...nextItem,
  };

  type JSONItemEntriesWithDiffMarkers = [
    string,
    {
      value: any;
      marker: 'added' | 'removed' | 'unchanged' | 'changed';
    },
  ][];
  const mergedItemWithDiffMarkers: JSONItemEntriesWithDiffMarkers =
    Object.entries(mergedItem).map((entry) => {
      const [key, value] = entry;

      if (addedItemKeys && addedItemKeys.includes(key)) {
        return [key, { value, marker: 'added' }];
      }
      if (removedItemKeys && removedItemKeys.includes(key)) {
        return [key, { value, marker: 'removed' }];
      }

      const hasItemChanged =
        prevItem && nextItem && prevItem[key] !== nextItem[key];
      if (hasItemChanged) {
        return [key, { value, marker: 'changed' }];
      }

      return [key, { value, marker: 'unchanged' }];
    });

  return (
    <>
      {mergedItemWithDiffMarkers
        .filter(([key]) => key && key !== 'children')
        .map(([key, { value, marker }], idx) => (
          <li
            key={`${key + value}${idx}`}
            css={getJSONItemCssByDiffMarker(marker)}
          >
            {`${key} :`}{' '}
            <JSONItemPropertyValue value={value} key={`${key + value}${idx}`} />
          </li>
        ))}
    </>
  );
};

type NodeValues = FiberNode[keyof FiberNode];
const JSONItemPropertyValue = ({ value }: { value: NodeValues }) => {
  const [showFullValue, setShowFullValue] = useState<boolean>(false);

  const stringifiedValue = JSON.stringify(value) ?? '';

  if (!stringifiedValue) {
    return null;
  }

  if (stringifiedValue.length < 25) {
    return <span>{stringifiedValue}</span>;
  }

  return (
    <>
      <div>
        {showFullValue ? stringifiedValue : stringifiedValue.slice(0, 10)}
        <button
          css={css`
            background: none;
            color: ${colors.dark.primary1};
            padding: 0;
            border: none;
            cursor: pointer;
          `}
          onClick={() => setShowFullValue((prev) => !prev)}
        >
          ...show {showFullValue ? 'less' : 'more'}
        </button>
      </div>
    </>
  );
};

const addedPropertyCss = css`
  background-color: #96ecaa;
  color: #155724;
`;
const removedPropertyCss = css`
  background-color: #ff9fc0;
  color: #721c24;
`;
const changedPropertyCss = css`
  background-color: #ffe79f;
  color: #725c1c;
`;
const getJSONItemCssByDiffMarker = (marker: string) => {
  if (marker === 'added') {
    return addedPropertyCss;
  }
  if (marker === 'removed') {
    return removedPropertyCss;
  }
  if (marker === 'changed') {
    return changedPropertyCss;
  }
  return;
};
