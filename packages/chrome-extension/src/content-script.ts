window.addEventListener(
  'message',
  function forwardMessageFromNpmPackageToExtensionBackground(msg) {
    console.log(
      'content-script: forwarding a message to the background script'
    );
    chrome.runtime.sendMessage(msg.data);
  }
);

chrome.runtime.onMessage.addListener(
  function forwardMessageFromExtensionFrontendToNpmPackage({ message }) {
    const { action } = message;

    console.log(
      'content-script: forwarding a message to the NPM script',
      message
    );

    switch (action) {
      case 'frontendLoaded':
        window.postMessage({ type: 'frontendLoaded', data: null }, '*');
        break;

      case 'frontendCopyToClipboardRequested':
        copyToClipboard(message.payload.text);
        break;
    }
  }
);

export {};
