export const sendMessageToExtensionContentScript = ({
  action,
  payload,
}: {
  action: string;
  payload: any;
}) => {
  window.postMessage(
    {
      action,
      payload,
    },
    '*'
  );
};
