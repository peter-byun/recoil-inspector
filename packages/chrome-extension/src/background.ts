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
        action: 'frontendLoaded',
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
  console.log(
    'background: forwarding a message to the content-script',
    message
  );
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

chrome.runtime.onMessage.addListener(
  function handleMessageFromChromeExtensionContentScript(
    message: any,
    sender: chrome.runtime.MessageSender
  ) {
    const { action } = message;
    console.log(
      'background: passing a message from the content-script to the frontend',
      message
    );

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
  }
);

export {};
