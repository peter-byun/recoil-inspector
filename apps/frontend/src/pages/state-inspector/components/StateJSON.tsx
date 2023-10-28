import { css } from '@emotion/react';
import { Node } from '@peterbyun/recoil-inspector';
import { useState } from 'react';

import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';
import { colors } from '../../../styles/colors';

type NodeValues = Node[keyof Node];

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

const JSONItemProperties = ({ item }: { item: Node }) => {
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

type JSONItemEntriesWithDiffMarkers = [
  string,
  {
    value: any;
    marker: 'added' | 'removed' | 'unchanged' | 'changed';
  }
][];

const JSONItemPropertiesInDiffMode = ({
  prevItem,
  nextItem,
}: {
  prevItem: Node | null;
  nextItem: Node | null;
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

const mergeJSONItemChildrenToDiff = ([prevItem, nextItem]: (Node | null)[]) => {
  const mergedChildren: {
    name: string;
    prevValue: Node | null;
    nextValue: Node | null;
  }[] = [];

  prevItem?.children?.forEach((prevChild) => {
    const isChildDeleted =
      nextItem?.children?.find((child) => child.name === prevChild.name) ===
      undefined;

    if (isChildDeleted) {
      mergedChildren.push({
        name: prevChild.name,
        prevValue: prevChild,
        nextValue: null,
      });
    }
  });

  nextItem?.children?.forEach((nextChild) => {
    const isChildAdded =
      prevItem?.children?.find((child) => child.name === nextChild.name) ===
      undefined;

    if (isChildAdded) {
      mergedChildren.push({
        name: nextChild.name,
        prevValue: null,
        nextValue: nextChild,
      });
    } else {
      mergedChildren.push({
        name: nextChild.name,
        prevValue: nextChild,
        nextValue: nextChild,
      });
    }
  });

  return mergedChildren;
};

const JSONItemInDiffMode = (componentTreesToDiff: (Node | null)[]) => {
  const [prevItem, nextItem] = componentTreesToDiff;

  const childrenExist = prevItem?.children || nextItem?.children;
  const mergedChildren = mergeJSONItemChildrenToDiff(componentTreesToDiff);
  const showChildrenDiff = childrenExist && mergedChildren.length;

  return (
    <>
      <JSONItemPropertiesInDiffMode prevItem={prevItem} nextItem={nextItem} />

      {showChildrenDiff ? (
        <li>
          <details>
            <summary>children</summary>
            <ul>
              {mergedChildren.map((mergedChild) => {
                return (
                  <li key={mergedChild.name}>
                    <ul>
                      {JSONItemInDiffMode([
                        mergedChild.prevValue,
                        mergedChild.nextValue,
                      ])}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </details>
        </li>
      ) : null}
    </>
  );
};

const JSONItem = (item: Node) => {
  return (
    <>
      <JSONItemProperties item={item} />

      {item?.children?.length ? (
        <li>
          <details>
            <summary>children</summary>
            <ul>
              {item.children.map((child) => {
                return (
                  <li key={child.name}>
                    <ul>{JSONItem(child)}</ul>
                  </li>
                );
              })}
            </ul>
          </details>
        </li>
      ) : null}
    </>
  );
};

interface StateJSONProps {
  componentTree: Node;
  isDiffOn: boolean;
  componentTreesToDiff: Node[];
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
          css={css`
            width: 95%;
            padding: 0;
          `}
        >
          {isDiffOn && componentTreesToDiff.length === 2
            ? JSONItemInDiffMode(componentTreesToDiff)
            : JSONItem(componentTree)}
        </ul>
      }
    />
  );
};
