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

        this._HandleTexts();
        this._HandleButtons();
        this._HandleSounds();
        this._HandleRegister();
    }

    _HandleTexts() {
        const TextHelper = new L3.TextHelper();
        this.text = TextHelper.set({
            text: `Hello world — meet the Space Grotesk font!`,
            options: {
                font: 'inter-18pt-black' // default space-grotesk-regular
            }
        });
        this.text.position.set(this.worldPosition.x, this.worldPosition.y, -0.5);
        this.template.Scene.add(this.text);
    }

    _HandleButtons() {
        this.button = new L3.ButtonHelper(
            {
                text: 'Click Me',
                options: {
                    backgroundColor: 0x222244,
                    textColor: 0xffff00,
                }
            }
        );
        this.button.name = 'button click me';
        this.button.position.set(this.worldPosition.x, this.worldPosition.y - .1, -.5);
        this.template.Scene.add(this.button);
    }

    _HandleSounds() {
        this.buttonClickSound = new THREE.Audio(this.template.AudioListener);
        this.buttonHoverSound = new THREE.Audio(this.template.AudioListener);
        this.template.AudioLoader.load(
            '../../../dist/assets/audios/button-click.mp3',
            (buffer) => {
                this.buttonClickSound.setBuffer(buffer);
                this.buttonClickSound.setVolume(2.5);
            }
        );

        this.template.AudioLoader.load(
            '../../../dist/assets/audios/button-hover.ogg',
            (buffer) => {
                this.buttonHoverSound.setBuffer(buffer);
                this.buttonHoverSound.setVolume(2.5);
            }
        );

    }

    _HandleRegister() {
        this.manager = new L3.Register();
        this.manager.addFeatures({
            requiredFeatures: ['button'],
            data: {
                controllers: this.template.Controllers,
                renderer: this.template.Renderer,
                button: {
                    mesh: this.button,
                    clickSound: this.buttonClickSound,
                    hoverSound: this.buttonHoverSound,
                    onClick: () => {
                        this.text.text = 'Results of Click Me Button!';
                        this.text.sync();
                    }
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