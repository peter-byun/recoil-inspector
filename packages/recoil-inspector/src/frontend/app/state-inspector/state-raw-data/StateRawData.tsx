'use client';

import hljs from 'highlight.js';
import { useEffect, useRef } from 'react';
import { FiberNode } from '../../../../client-states-parser/fiber-parser/fiber-parser.types';

import { StatePanelLayout } from '../../../components/layouts/StatePanelLayout';

import { Button } from '../../../components/base/button/Button';
import { Toast } from '../../../components/base/toast/Toast';
import { FRONTEND_CONTAINER_ID } from '../../../Frontend';
import { useCopyToClipboardWithToast } from '../../../utils/copy-to-clipboard/useCopyToClipboardWithToast';
import { useToast } from '../../../components/base/toast/useToast';

interface StateRawDataProps {
  componentTree: FiberNode;
}

export const StateRawData = ({ componentTree }: StateRawDataProps) => {
  const { toast, setToast, openToast } = useToast();

  const { handleCopy } = useCopyToClipboardWithToast({
    setToast,
  });
  const handleCopyClick = () => {
    const componentTreeText = JSON.stringify(componentTree);
    handleCopy(componentTreeText);
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
            containerId={FRONTEND_CONTAINER_ID}
            toastData={{
              ...toast,
              title: 'Data Copied ✅',
            }}
            setIsToastOpen={openToast}
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
