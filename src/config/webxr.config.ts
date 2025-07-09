export const optionalFeatures: XRSessionInit['optionalFeatures'] = [
  'local-floor',
  'bounded-floor',
  'hand-tracking',
  'layers',
  'dom-overlay',
  'depth-sensing'
];

export const depthSensingConfig: XRSessionInit['depthSensing'] = {
  usagePreference: ['gpu-optimized'],
  dataFormatPreference: ['luminance-alpha', 'float32']
};
