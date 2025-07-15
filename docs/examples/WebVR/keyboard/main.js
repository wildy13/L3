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

        this.keyboard = new L3.Keyboard();
        this.keyboard.position.set(this.worldPosition.x, this.worldPosition.y, -.5);
        this.template.Scene.add(this.keyboard);

        this.usernameField = new L3.InputField();
        this.usernameField.name = 'username field';
        this.usernameField.position.set(this.worldPosition.x, this.worldPosition.y + .2, -.5)
        this.template.Scene.add(this.usernameField);

        this.passwordField = new L3.InputField();
        this.passwordField.name ='password field';
        this.passwordField.position.set(this.worldPosition.x, this.worldPosition.y + .1, -.5)
        this.template.Scene.add(this.passwordField);

        this.keyboard.setActiveInputField(this.usernameField);

        this._HandleRegister();
    }

    _HandleRegister() {
        this.manager = new L3.Register();
        this.manager.addFeatures({
            requiredFeatures: ['keyboard'],
            data: {
                controllers: this.template.Controllers,
                renderer: this.template.Renderer,
                keyboard: {
                    mesh: this.keyboard
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