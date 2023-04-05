const DEBUG_MODE = false;

export const sendMessageToExtension = ({
  action,
  payload,
}: {
  action: string;
  payload: any;
}) => {
  DEBUG_MODE &&
    console.log({
      action,
      payload,
    });
  window.postMessage(
    {
      action,
      payload,
    },
    '*'
  );
};
