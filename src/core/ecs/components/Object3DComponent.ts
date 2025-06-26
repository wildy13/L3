import { Component, Types } from 'ecsy';
import * as THREE from 'three';

export class Object3DComponent extends Component<Object3DComponent> {
    object: THREE.Mesh = new THREE.Mesh();
}

Object3DComponent.schema = {
    object: { type: Types.Ref, default: new THREE.Mesh() }
};
