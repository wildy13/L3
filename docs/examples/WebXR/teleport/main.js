import * as L3 from 'l3';
import * as THREE from 'three';
import { BoxLineGeometry } from 'three/examples/jsm/Addons.js';

class App {
    _container = document.getElementById('container');

    constructor() {
        this.template = new L3.Template.XR(this._container);
        this.template.Renderer.setAnimationLoop(this.animate.bind(this));

        this.performance = new L3.PerformanceHelper();
        this._container?.appendChild(this.performance?.dom);

        this.worldPosition = new THREE.Vector3()
        this.template.Camera.getWorldPosition(this.worldPosition);

        this.room = new THREE.LineSegments(
            new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0),
            new THREE.LineBasicMaterial({ color: 0xbcbcbc })
        );

        this.template.Scene.add(this.room);

        this.marker = new THREE.Mesh(
            new THREE.CircleGeometry(0.25, 32).rotateX(- Math.PI / 2),
            new THREE.MeshBasicMaterial({ color: 0xbcbcbc })
        );

        this.template.Scene.add(this.marker);

        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(4.8, 4.8, 2, 2).rotateX(- Math.PI / 2),
            new THREE.MeshBasicMaterial({ color: 0xbcbcbc, transparent: true, opacity: 0.25 })
        );

        this.template.Scene.add(this.floor);

        this._HandleRegister();
    }

    _HandleRegister() {
        this.manager = new L3.Register();
        this.manager.addFeatures({
            requiredFeatures: ['teleport'],
            data: {
                controllers: this.template.Controllers,
                renderer: this.template.Renderer,
                teleport: {
                    player: this.template.Player,
                    marker: this.marker,
                    floor: this.floor,
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