import * as THREE from 'three';
export declare class Load3DModel {
    load(url: string, scene: THREE.Scene, onLoad: (object: THREE.Object3D) => void): void;
}
