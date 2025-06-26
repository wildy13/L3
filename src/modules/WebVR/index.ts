import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { optionalFeatures } from '../../config/webvr.config';
import { CreateEngine } from '../../core/Engine';

export class VR extends CreateEngine {
    constructor(container: HTMLElement){
        super();
        
        container?.appendChild(VRButton.createButton(this.Renderer, { optionalFeatures: optionalFeatures}));
    }
}