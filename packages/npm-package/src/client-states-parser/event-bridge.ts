export const sendMessageToFrontend = ({
  action,
  payload,
}: {
  action: string;
  payload: any;
}) => {
  if (typeof window !== 'undefined') {
    // console.log(payload);
    window.postMessage(
      {
        action,
        payload,
      },
      '*'
    );
  }
};
