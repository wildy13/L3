import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export class Load3DModel {
    public load(url: string, scene: THREE.Scene, onLoad: (object: THREE.Object3D) => void) {
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            const object = gltf.scene;
            scene.add(object);
            onLoad(object);
        });
    }
}   