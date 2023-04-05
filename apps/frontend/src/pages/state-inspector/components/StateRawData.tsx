import { css } from '@emotion/react';
import hljs from 'highlight.js';
import { useEffect, useRef, useState } from 'react';
import { Node } from 'recoil-inspector';

import { Button } from '../../../components/atoms/Button';
import { Toast } from '../../../components/atoms/Toast';
import { StatePanelLayout } from '../../../components/molecules/StatePanelLayout';

interface StateRawDataProps {
  componentTree: Node;
}

export const StateRawData = ({ componentTree }: StateRawDataProps) => {
  const handleCopyClick = () => {
    const connectionToExtensionProcess = chrome.runtime.connect();

    connectionToExtensionProcess.postMessage({
      action: 'frontendCopyToClipboardRequested',
      tabId: chrome.devtools.inspectedWindow.tabId,
      text: JSON.stringify(componentTree),
    });

    setIsCopyToClipboardToastOpen(true);
  };

  const [isCopyToClipboardToastOpen, setIsCopyToClipboardToastOpen] =
    useState(false);

  const codeRef = useRef<HTMLDivElement>(null);
  useEffect(
    function highlightSyntax() {
      window && codeRef.current && hljs.highlightElement(codeRef.current);
    },
    [codeRef]
  );

  return (
    <StatePanelLayout
      children={
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 100%;
            padding: 10px;
          `}
        >
          <code
            ref={codeRef}
            css={css`
              width: 100%;
              height: 90%;
              padding: 10px;
              border-radius: 5px;
              overflow: scroll;
            `}
          >
            {JSON.stringify(componentTree)}
          </code>

          <Toast
            title="Copied to clipboard"
            description="The state raw data has been copied to your clipboard."
            open={isCopyToClipboardToastOpen}
            setOpen={setIsCopyToClipboardToastOpen}
          />
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 10%;
            `}
          >
            <Button onClick={handleCopyClick}>Copy To Clipboard</Button>
          </div>
        </div>
      }
    />
  );
};
