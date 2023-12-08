'use client';

import hljs from 'highlight.js';
import { useEffect, useRef, useState } from 'react';
import { FiberNode } from '../../../../client-states-parser/fiber-parser/fiber-parser.types';
import { Button } from '../../../components/base-ui/Button';
import { Toast } from '../../../components/base-ui/Toast';
import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';
import { copyToClipboard } from '../../../utils/copy-to-clipboard';

import './styles/codeblock.css';

interface StateRawDataProps {
  componentTree: FiberNode;
}

export const StateRawData = ({ componentTree }: StateRawDataProps) => {
  const [toast, setToast] = useState({
    open: false,
    text: '',
  });

  const handleCopyClick = () => {
    try {
      const componentTreeText = JSON.stringify(componentTree);

      copyToClipboard(componentTreeText);

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
      codeRef.current && hljs.highlightElement(codeRef.current);
    },
    [codeRef]
  );

  return (
    <StatePanelLayout
      children={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            height: '95%',
            padding: '10px',
          }}
        >
          <code
            ref={codeRef}
            style={{
              width: '100%',
              height: '90%',
              padding: '10px',
              borderRadius: '5px',
              overflow: 'scroll',
            }}
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
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '10%',
              margin: '10px 0 0 0',
            }}
          >
            <Button onClick={handleCopyClick}>Copy To Clipboard</Button>
          </div>
        </div>
      }
    />
  );
};
