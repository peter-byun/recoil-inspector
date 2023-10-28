type TabId = string;

interface Message {
  tabId?: TabId;
  action: string;
  payload?: object;
  test?: number;
}

type TabConnections = Record<TabId, any>;

var tabConnections: TabConnections = {};

const handleMessageFromChromeExtensionFrontEnd = (
  message: Message,
  port: object
) => {
  const { tabId, action } = message;

  if (tabId) {
    tabConnections[tabId] = port;
  }

  switch (action) {
    case 'frontendLoaded':
      forwardMessageFromExtensionFrontendToContentScript({
        action: 'frontendCopyToClipboardRequested',
        payload: message,
      });
      break;
    case 'frontendCopyToClipboardRequested':
      forwardMessageFromExtensionFrontendToContentScript({
        action: 'frontendCopyToClipboardRequested',
        payload: message,
      });
      break;
    default:
      break;
  }
};
function forwardMessageFromExtensionFrontendToContentScript(message: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!tabs[0].id) {
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, {
      message,
    });
  });
}

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(handleMessageFromChromeExtensionFrontEnd);

  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(handleMessageFromChromeExtensionFrontEnd);

    chrome.storage.local.clear(function (): void {
      chrome.storage.local.get(null, function (): void {});
    });
  });
});

const handleMessageFromChromeExtensionContentScript = (
  message: any,
  sender: chrome.runtime.MessageSender
) => {
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

chrome.runtime.onMessage.addListener(
  handleMessageFromChromeExtensionContentScript
);

export {};
