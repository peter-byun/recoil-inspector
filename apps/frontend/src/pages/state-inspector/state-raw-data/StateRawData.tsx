import { css } from '@emotion/react';
import { Node } from '@peterbyun/recoil-inspector';
import hljs from 'highlight.js';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../../../components/base-ui/Button';
import { Toast } from '../../../components/base-ui/Toast';
import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';

interface StateRawDataProps {
  componentTree: Node;
}

export const StateRawData = ({ componentTree }: StateRawDataProps) => {
  const [toast, setToast] = useState({
    open: false,
    text: '',
  });

  const handleCopyClick = () => {
    try {
      const connectionToExtensionProcess = chrome.runtime.connect();
      const componentTreeText = JSON.stringify(componentTree);

      connectionToExtensionProcess.postMessage({
        action: 'frontendCopyToClipboardRequested',
        tabId: chrome.devtools.inspectedWindow.tabId,
        text: componentTreeText,
      });

      setToast({
        open: true,
        text: 'Successfully copied data to the clipboard',
      });
    } catch (e) {
      setToast({
        open: true,
        text: 'Failed to copy data to the clipboard',
      });
    }
  };

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
            title="Copy to clipboard"
            description={toast.text}
            open={toast.open}
            setOpen={(nextOpen) => {
              setToast({
                ...toast,
                open: nextOpen,
              });
            }}
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
