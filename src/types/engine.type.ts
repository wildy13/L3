import * as THREE from 'three';

export interface IEngine {
    Player: THREE.Group,
    Scene: THREE.Scene,
    Camera: THREE.PerspectiveCamera,
    Renderer: THREE.WebGLRenderer,
    LoadingManager: THREE.LoadingManager,
    AmbientLight: THREE.AmbientLight,
    DirectionalLight: THREE.DirectionalLight,
    HemisphereLight: THREE.HemisphereLight,
    LeftController: THREE.Group,
    RightController: THREE.Group,
    Controllers: THREE.Group[],
    RightControllerGrip: THREE.Group,
    LeftControllerGrip: THREE.Group,
}