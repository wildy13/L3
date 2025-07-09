import * as L3 from 'l3';
import * as THREE from 'three';

class App {
    _container = document.getElementById('container');

    constructor() {
        this.template = new L3.Template.VR(this._container);
        this.template.Renderer.setAnimationLoop(this.animate.bind(this));

        this.performance = new L3.PerformanceHelper();
        this._container?.appendChild(this.performance?.dom);

        this.worldPosition = new THREE.Vector3()
        this.template.Camera.getWorldPosition(this.worldPosition);

        const loader = new L3.Load3DModel();
        loader.load(
            'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/refs/heads/main/2.0/Suzanne/glTF/Suzanne.gltf',
            this.template.Scene,
            (object) => {
                object.position.set(this.worldPosition.x, this.worldPosition.y, -3);
            }
        )
    }

    animate() {
        this.performance.update(this.template.Renderer);
        this.template.render();
    }
}

const app = new App();