// NOTE: The content-script acts as a bridge
// between the extension(the background script, the frontend ) and the client NPM Package.

const DEBUG_MODE = false;

// NOTE: Forward messages from the NPM package
// to the Extension's Frontend and the background script.
window.addEventListener('message', (msg) => {
  DEBUG_MODE &&
    console.log(
      'Content Script: Got a message from the NPM package. Propagating it to the Chrome Runtime.',
      msg
    );

  chrome.runtime.sendMessage(msg.data);
});

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

// NOTE: The Content Script sends events from the frontend or the background script
// to the NPM package through the window object.
// The background script does not have an access to the window object.

// An example of propagating a message from the frontend to the NPM package:
// const TARGET_ORIGIN_ALL = '*';
// window.postMessage(message, TARGET_ORIGIN_ALL);
chrome.runtime.onMessage.addListener(({ message }) => {
  const { action } = message;

  console.log('content: got message from  background');

  switch (action) {
    case 'frontendLoaded':
      window.postMessage({ type: 'frontendLoaded', data: null }, '*');

      break;
    case 'frontendCopyToClipboardRequested':
      console.log(message.payload);
      copyToClipboard(message.payload.text);

      break;
  }
});

export {};
