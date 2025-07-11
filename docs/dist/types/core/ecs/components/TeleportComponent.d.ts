import { Component } from 'ecsy';
import * as THREE from 'three';
export declare class TeleportComponent extends Component<TeleportComponent> {
    point: THREE.Vector3;
    marker?: THREE.Mesh;
    player: THREE.Group;
    state: 'none' | 'teleport';
    baseReferenceSpace: any;
    renderer: any;
}
