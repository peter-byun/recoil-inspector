import { css } from '@emotion/react';
import { useState } from 'react';
import { FiberNode } from 'recoil-inspector';

import { colors } from '../../../styles/colors';

export const JSONItemProperties = ({ item }: { item: FiberNode }) => {
  return (
    <>
      {item &&
        Object.entries(item)
          .filter(([key]) => key !== 'children')
          .map(([key, value]) => (
            <li key={key}>
              {`${key} :`} <JSONItemPropertyValue value={value} />
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
    }
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
        .filter(([key]) => key !== 'children')
        .map(([key, { value, marker }]) => (
          <li key={key} css={getJSONItemCssByDiffMarker(marker)}>
            {`${key} :`} <JSONItemPropertyValue value={value} />
          </li>
        ))}
    </>
  );
};

type NodeValues = FiberNode[keyof FiberNode];

const JSONItemPropertyValue = ({ value }: { value: NodeValues }) => {
  const stringifiedValue = JSON.stringify(value);

  if (stringifiedValue.length < 25) {
    return <span>{stringifiedValue}</span>;
  }

  const [showFullValue, setShowFullValue] = useState<boolean>(false);

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
