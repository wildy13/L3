import { XRButton } from 'three/examples/jsm/webxr/XRButton.js';

import { depthSensingConfig, optionalFeatures } from '../../config/webxr.config';
import { CreateEngine } from '../../core/Engine';

export class XR extends CreateEngine {
    constructor(container: HTMLElement) {
        super();

        container?.appendChild(XRButton.createButton(this.Renderer, {
            'optionalFeatures': optionalFeatures,
            'depthSensing': depthSensingConfig
        }));

        if (optionalFeatures?.includes('local-floor')) {
            this.Renderer.xr.setReferenceSpaceType('local-floor');
        }
    }
}