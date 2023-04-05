import { useEffect } from 'react';

type MessagePayload = Record<string, unknown>;

export const useExtensionBridge = ({
  onExtensionDataUpdated,
  onDisconnectFromExtensionProcess,
}: {
  onExtensionDataUpdated: (extensionData: unknown) => void;
  onDisconnectFromExtensionProcess: () => void;
}) => {
  const setupExtensionProcessEventListeners = () => {
    const connectionToExtensionProcess = chrome.runtime.connect();
    connectionToExtensionProcess.postMessage({
      action: 'frontendLoaded',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    connectionToExtensionProcess.onMessage.addListener(
      (message: {
        action: string;
        payload: MessagePayload;
        sourceTab: number;
      }) => {
        const { action, payload } = message;

        switch (action) {
          case 'extensionDataUpdated': {
            onExtensionDataUpdated(payload.payload);

            break;
          }
          default:
        }
      }
    );

    connectionToExtensionProcess.onDisconnect.addListener(() => {
      onDisconnectFromExtensionProcess();
    });
  };

  useEffect(() => {
    if (!chrome?.runtime) {
      console.error(
        'The Chrome runtime does not exist. Aborting the connection to the Chrome runtime.'
      );
      return;
    }

    setupExtensionProcessEventListeners();
  }, []);
};
