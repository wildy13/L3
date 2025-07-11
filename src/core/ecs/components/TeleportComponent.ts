import { Component, Types } from 'ecsy';
import * as THREE from 'three';

export class TeleportComponent extends Component<TeleportComponent> {
    point: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    marker?: THREE.Mesh;
    player: THREE.Group = new THREE.Group();
    state: 'none' | 'teleport' = 'none';
    baseReferenceSpace: any;
    renderer: any;
}

TeleportComponent.schema = {
    point: { type: Types.Ref, default: new THREE.Vector3(0, 0, 0) },
    player: { type: Types.Ref, default: new THREE.Group() },
    marker: { type: Types.Ref, default: null },
    state: { type: Types.Ref, default: 'none' },
    baseReferenceSpace: { type: Types.Ref, default: null },
    renderer: { type: Types.Ref, default: null },
};
