import { FiberNode } from '../../../../../client-states-parser/fiber-parser/fiber-parser.types';
import {
  JSONItemProperties,
  JSONItemPropertiesInDiffMode,
} from './JSONItemProperties';

export const JSONItem = (item: FiberNode) => {
  if (!item) {
    return null;
  }

  return (
    <>
      <JSONItemProperties item={item} />

      {item?.children?.length ? (
        <li>
          <details>
            <summary>children</summary>
            <ul>
              {item.children.map((child, idx) => {
                return (
                  <li key={child.name + idx}>
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
export const JSONItemInDiffMode = (
  componentTreesToDiff: (FiberNode | null)[]
) => {
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
              {mergedChildren.map((mergedChild, idx) => {
                return (
                  <li key={mergedChild.name + idx}>
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

function mergeJSONItemChildrenToDiff([
  prevItem,
  nextItem,
]: (FiberNode | null)[]) {
  const mergedChildren: {
    name: string;
    prevValue: FiberNode | null;
    nextValue: FiberNode | null;
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
}
