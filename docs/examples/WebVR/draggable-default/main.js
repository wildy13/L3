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

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(this.worldPosition.x, this.worldPosition.y, -3);
        this.template.Scene.add(this.cube);

        this._HandleRegister();
    }

    _HandleRegister() {
        this.manager = new L3.Register();
        this.manager.addFeatures({
            requiredFeatures: ['draggable-default'],
            data: {
                controllers: this.template.Controllers,
                renderer: this.template.Renderer,
                draggableReturn: {
                    mesh: this.cube
                }
            }
        });
    }

    animate() {
        const delta = this.template.Clock.getDelta();
        const elapsedTime = this.template.Clock.elapsedTime;

        this.performance.update(this.template.Renderer);
        this.manager.update(delta, elapsedTime);

        this.template.render();
    }
}

const app = new App();