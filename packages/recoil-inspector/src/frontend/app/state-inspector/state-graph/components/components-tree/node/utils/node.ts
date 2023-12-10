const NODE_NAME_CHUNK_LENGTH = 10;

export function calculateNodeSizeAndCenterPosition(
  nodeName: string | undefined
) {
  const nonNullNodeName = nodeName ?? '';
  const nonNullableNodeNameLength = nonNullNodeName.length ?? 0;
  const circleSize =
    nonNullableNodeNameLength < NODE_NAME_CHUNK_LENGTH
      ? 40
      : nonNullableNodeNameLength + 40;

  const nodeWidth = circleSize;

  const nodeNameLines = calculateNodeNameLines(nonNullNodeName);
  const nodeHeight = Math.max(13 * nodeNameLines, 30);

  const centerX = -nodeWidth / 2;
  const centerY = -nodeHeight / 3;

  return {
    nodeWidth,
    nodeHeight,
    centerX,
    centerY,
  };
}

export function calculateNodeNameLines(
  nodeName: string,
  chunkLength: number = NODE_NAME_CHUNK_LENGTH
) {
  const nonNullableNodeName = nodeName ?? '';
  const nodeNameLines = nonNullableNodeName
    ? nonNullableNodeName.length / chunkLength
    : 1;

  return nodeNameLines;
}

export function separateNodeNameIntoLines(
  nodeName: string,
  chunkLength: number = NODE_NAME_CHUNK_LENGTH
) {
  const nonNullableNodeName = nodeName ?? '';

  const nodeNameLines = calculateNodeNameLines(nodeName, chunkLength);

  let lastNodeNameChunkIndex = 0;
  const lineSeparatedNodeName = [];

  for (let i = 0; i < nodeNameLines; i++) {
    lineSeparatedNodeName.push(
      nonNullableNodeName.slice(
        lastNodeNameChunkIndex,
        lastNodeNameChunkIndex + chunkLength
      )
    );
    lastNodeNameChunkIndex += chunkLength;
  }

  return lineSeparatedNodeName;
}
