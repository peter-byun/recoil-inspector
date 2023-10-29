window.addEventListener(
  'message',
  function forwardMessageFromNpmPackageToExtensionBackground(msg) {
    console.log(
      'content-script: forwarding a message to the background script'
    );
    chrome.runtime.sendMessage(msg.data);
  }
);

const copyToClipboard = (text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

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
