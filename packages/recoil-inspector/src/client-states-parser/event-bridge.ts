export const sendMessageToFrontend = ({
  action,
  payload,
}: {
  action: string;
  payload: any;
}) => {
  if (typeof window !== 'undefined') {
    let payloadToSend = {}

    try {
      payloadToSend = JSON.parse(JSON.stringify(payload))
    } catch(e) {
        const payloadWithoutCircularProperties = replaceCircularPropertiesWithText(payload)
        payloadToSend = JSON.parse(JSON.stringify(payloadWithoutCircularProperties))
    }

    window.postMessage(
      {
        action,
        payload: payloadToSend,
      },
      '*'
    );
  }
};

function replaceCircularPropertiesWithText(obj: any) {
  const propertyNames = Object.getOwnPropertyNames(obj);

  for (let propertyName of propertyNames) {
    if (obj[propertyName] && typeof obj[propertyName] === 'object') {
      if (obj[propertyName] === obj) {
        obj[propertyName] = '[Circular]';
      } else {
        replaceCircularPropertiesWithText(obj[propertyName]);
      }
    }
  }

}
