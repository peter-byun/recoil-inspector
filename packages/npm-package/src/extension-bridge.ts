export const sendMessageToExtensionContentScript = ({
  action,
  payload,
}: {
  action: string;
  payload: any;
}) => {
  if (typeof window !== 'undefined') {
    window.postMessage(
      {
        action,
        payload,
      },
      '*'
    );
  }
};
