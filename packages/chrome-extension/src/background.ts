// NOTE: The background script handles the logic behind the extension.

type TabId = string;

interface Message {
  tabId?: TabId;
  action: string;
  payload?: object;
  test?: number;
}

type TabConnections = Record<TabId, any>;

const DEBUG_MODE = false;

const debugLog = (...args: any[]) => {
  DEBUG_MODE && console.log(...args);
};

chrome.storage.local.clear(function (): void {
  chrome.storage.local.get(null, function (): void {});
});

var tabConnections: TabConnections = {};
// NOTE: Handle messages from Chrome runtime.
// The content script also broadcast events from the window object of the client app.
const handleMessageFromChrome = (message: Message, port: object) => {
  debugLog('Background: Received a message from the Chrome runtime.', {
    message,
    port,
  });

  const { tabId, action } = message;

  switch (action) {
    case 'frontendLoaded':
      if (tabId) {
        tabConnections[tabId] = port;

        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (!tabs[0].id) {
              return;
            }

            chrome.tabs.sendMessage(tabs[0].id, {
              message: {
                action: 'frontendCopyToClipboardRequested',
                payload: message,
              },
            });
          }
        );
      }
      break;
    case 'frontendCopyToClipboardRequested':
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs[0].id) {
          return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {
          message: {
            action: 'frontendCopyToClipboardRequested',
            payload: message,
          },
        });
      });
      break;
    default:
      break;
  }
};

chrome.runtime.onConnect.addListener((port) => {
  debugLog('Background: Connected to the Chrome runtime');

  port.onMessage.addListener(handleMessageFromChrome);

  port.onDisconnect.addListener((port) => {
    debugLog('Background: Disconnected from Chrome runtime');

    port.onMessage.removeListener(handleMessageFromChrome);

    chrome.storage.local.clear(function (): void {
      chrome.storage.local.get(null, function (): void {});
    });
  });
});

const handleMessageFromExtensionProcess = (
  message: any,
  sender: chrome.runtime.MessageSender
) => {
  debugLog(
    'Background: Forwarding the message from the client to the frontend.'
  );

  const { action } = message;

  switch (action) {
    case 'extensionDataUpdated':
      if (sender?.tab?.id) {
        tabConnections[sender.tab.id].postMessage({
          action: 'extensionDataUpdated',
          payload: message,
        });
      }
      break;
    default:
      break;
  }
};

chrome.runtime.onMessage.addListener(handleMessageFromExtensionProcess);

// chrome.tabs.onRemoved.addListener((tabId) => {
//   // TODO: Clean up the chrome storage.
// });

export {};
