export const sendMessageToFrontend = ({
  action,
  payload,
}: {
  action: string;
  payload: any;
}) => {
  if (typeof window !== 'undefined') {
    const payloadToSend = JSON.parse(cleanStringify(payload));

    window.postMessage(
      {
        action,
        payload: payloadToSend
      },
      "*"
    );
  }
};


function cleanStringify(object: any) {
  if (object && typeof object === 'object') {
      object = copyWithoutCircularReferences([object], object);
  }
  return JSON.stringify(object);

  function copyWithoutCircularReferences(references: any[], object: any) {
      var cleanObject = Array.isArray(object) ? [] : {} as any;
      Object.keys(object).forEach(function(key) {
          var value = object[key];
          if (value && typeof value === 'object') {
              if (references.indexOf(value) < 0) {
                  references.push(value);
                  cleanObject[key] = copyWithoutCircularReferences(references, value);
                  references.pop();
              } else {
                  cleanObject[key] = '###_Circular_###';
              }
          } else if (typeof value !== 'function') {
              cleanObject[key] = value;
          }
      });
      return cleanObject;
  }
}