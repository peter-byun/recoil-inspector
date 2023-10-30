export const sendMessageToExtensionContentScript = ({ action, payload, }) => {
    window.postMessage({
        action,
        payload,
    }, '*');
};
