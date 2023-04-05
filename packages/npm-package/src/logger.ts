export class RecoilInspectorError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    const RecoilInspectorMessage = `Recoil Inspector: ${message}`;
    super(RecoilInspectorMessage, options);
  }
}
