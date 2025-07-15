import { Attributes, Entity, System } from 'ecsy';
import { ControllerComponent } from '../components/ControllerComponent';
import * as THREE from 'three';
import { Object3DComponent } from '../components/Object3DComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { DraggableReturnComponent } from '../components/DraggableReturnComponent';
import { DraggableDefaultComponent } from '../components/DraggableDefaultComponent';
import { MovementFPSComponent } from '../components/MovementFPSComponent';
import { TeleportComponent } from '../components/TeleportComponent';
import { KeyboardComponent } from '../components/KeyboardComponent';
import { InputField } from 'helpers/InputField';

export class ControllerSystem extends System {
    private previousButtonStates!: { left: boolean[]; right: boolean[]; };
    private inputField?: THREE.Mesh | null;

    init(attributes?: Attributes): void {
        this.previousButtonStates = {
            left: [],
            right: []
        };

        this.inputField = null;
    }

    execute(delta: number, time: number): void {
        this.queries.controllers.results.forEach(entity => {
            const components = entity.getComponent(ControllerComponent);

            if (!components) return;
            const session = components?.renderer.xr.getSession();
            const object = entity.getComponent(Object3DComponent)?.object;

            if (!session) return;

            session.inputSources.forEach((source: XRInputSource & { gamepad: Gamepad; }) => {
                components.controllers.forEach((c: THREE.Group) => {
                    const handedness = c.userData.handedness;

                    if (source.handedness !== handedness) return;
                    this._handleJoystic(source, c, entity, delta);
                    if (!object) return;
                    const intersections = this._getIntersections(c, object);

                    if (intersections.length > 0) {
                        const intersection = intersections[0];
                        if (c.userData.lineReset) c.userData.lineReset = false;
                        if (!c.userData.isHover) c.userData.isHover = true;

                        if ('gamepad' in source && source.gamepad) {
                            const gamepad = (source as XRInputSource & { gamepad: Gamepad }).gamepad;

                            this._onHover(entity, gamepad);
                            this._updateLine(c, intersection);

                            gamepad.buttons.forEach((b: GamepadButton, i: number) => {
                                this._handleButton(b, i, c, entity, intersection, gamepad, components.renderer);
                            });
                        }

                    } else {
                        if (!c.userData.lineReset) {
                            this._resetLine(c);
                            c.userData.lineReset = true;
                        }

                        this._onUnhover(entity);
                    }
                });
            });
        });
    }


    private _onHover(entity: Entity, gamepad: Gamepad) {
        if (entity.hasComponent(ButtonComponent)) {
            const component = entity.getMutableComponent(ButtonComponent);
            if (!component) return;

            if (component.currState !== 'hovered') component.currState = 'hovered';
            if (gamepad && gamepad.hapticActuators && gamepad.hapticActuators.length > 0) {
                gamepad.hapticActuators[0].pulse(.2, 40);
            }
        }

        if (entity.hasComponent(KeyboardComponent)) {
            const component = entity.getMutableComponent(KeyboardComponent);
            if (!component) return;

            if (component.state !== 'hover') component.state = 'hover';
        }
    }


    private _onUnhover(entity: Entity) {
        if (entity.hasComponent(ButtonComponent)) {
            const component = entity.getMutableComponent(ButtonComponent);
            if (!component) return;

            if (component.currState === 'hovered') component.currState = 'none';
        }

        if (entity.hasComponent(KeyboardComponent)) {
            const component = entity.getMutableComponent(KeyboardComponent);
            if (!component) return;

            if (component.state === 'hover') component.state = 'none';
        }
    }


    private _handleJoystic(source: XRInputSource, controller: THREE.Group, entity: Entity, delta: number) {

        const handedness = source.handedness;
        const gamepad = source.gamepad;

        if (!gamepad || !entity.hasComponent(MovementFPSComponent)) return;

        const component = entity.getMutableComponent(MovementFPSComponent);
        if (!component) return;

        if (handedness === 'left' && handedness === controller.userData.handedness) {
            const inputX = gamepad.axes[2];
            const inputZ = gamepad.axes[3];
            const forward = new THREE.Vector3(inputX, 0, inputZ);
            const speed = 0.025;

            if (forward.x === 0 && forward.z === 0) return
            forward.normalize();
            forward.multiplyScalar(speed);

            forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), component.player.rotation.y);

            const nextPosition = component.player.position.clone().add(forward);
            component.player.position.copy(nextPosition);

        }

        if (handedness === 'right' && handedness === controller.userData.handedness) {
            const inputX = gamepad.axes[2];
            const speed = THREE.MathUtils.degToRad(90);

            if (Math.abs(inputX) > 0.1) component.player.rotation.y -= inputX * speed * delta;

        }
    }


    private _updateLine(controller: THREE.Group, intersection: THREE.Intersection) {
        const line = controller.getObjectByName(`line-${controller.userData.handedness}`);
        if (line) line.scale.z = intersection.distance;
    }

    private _resetLine(controller: THREE.Group) {
        const line = controller.getObjectByName(`line-${controller.userData.handedness}`);
        if (line) line.scale.z = 1;
    }

    private _updateColor(controller: THREE.Group, color: number) {
        const handedness = controller.userData.handedness as 'left' | 'right';
        const line = controller.getObjectByName(`line-${handedness}`) as THREE.Line;

        if (line && line.material instanceof THREE.LineBasicMaterial) {
            line.material.color.set(color);
        }
    }

    private _handleButton(
        button: GamepadButton,
        index: number,
        controller: THREE.Group,
        entity: Entity,
        intersection: THREE.Intersection,
        gamepad: Gamepad,
        renderer: THREE.WebGLRenderer
    ) {
        const side = controller.userData.handedness as 'left' | 'right';

        if (!this.previousButtonStates[side]) {
            this.previousButtonStates[side] = [];
        }

        const wasPressed = this.previousButtonStates[side][index] || false;

        if (button.pressed) {
            this._StartTeleport(entity, intersection.point, renderer);

            if (!wasPressed) {
                this._StartAction(index, controller, entity, intersection, renderer);

                if (gamepad && gamepad.hapticActuators && gamepad.hapticActuators.length > 0) {
                    gamepad.hapticActuators[0].pulse(.5, 80);
                }
            }
        } else if (!button.pressed && wasPressed) {
            this._EndAction(index, controller, entity);
        }

        this.previousButtonStates[side][index] = button.pressed;
    }

    private _StartTeleport(entity: Entity, point: THREE.Vector3, renderer: THREE.WebGLRenderer) {

        if (entity.hasComponent(TeleportComponent)) {
            const component = entity.getMutableComponent(TeleportComponent);
            if (!component) return;

            component.point = point;
            component.renderer = renderer;
            component.baseReferenceSpace = renderer.xr.getReferenceSpace();
            component.marker?.position.copy(point);
        }
    }


    private _StartAction(index: number, controller: THREE.Group, entity: Entity, intersection: THREE.Intersection, renderer: THREE.WebGLRenderer) {
        switch (index) {
            case 0:
                this._updateColor(controller, 0x22d3ee);
                this._handleSelect(controller, entity, intersection, renderer);
                break;
            case 1:
                this._updateColor(controller, 0x22d3ee);
                this._handleSnap(controller, entity);
                break;
        }
    }

    private _EndAction(index: number, controller: THREE.Group, entity: Entity) {
        if (entity.hasComponent(ButtonComponent)) {
            const component = entity.getMutableComponent(ButtonComponent);
            if (!component) return;

            if (component.currState !== 'released') {
                component.currState = 'released';
                this._updateColor(controller, 0xffffff);
            }
        }

        if (entity.hasComponent(DraggableReturnComponent)) {
            const component = entity.getMutableComponent(DraggableReturnComponent);
            if (!component) return;

            component.state = 'to-be-detached';
            component.attachedPointer = null;
            this._updateColor(controller, 0xffffff);
        }

        if (entity.hasComponent(DraggableDefaultComponent)) {
            const component = entity.getMutableComponent(DraggableDefaultComponent);
            if (!component) return;

            component.state = 'to-be-detached';
            component.attachedPointer = null;
            this._updateColor(controller, 0xffffff);
        }

        if (entity.hasComponent(TeleportComponent)) {
            const component = entity.getMutableComponent(TeleportComponent);
            if (!component) return;

            component.state = 'teleport';
            this._updateColor(controller, 0xffffff);
        }

        if (entity.hasComponent(KeyboardComponent)) {
            const component = entity.getMutableComponent(KeyboardComponent);
            if (!component) return;

            component.state = 'none';
            component.wasPressed = false;
            this._updateColor(controller, 0xffffff);
        }
    }

    private _handleSnap(controller: THREE.Group, entity: Entity) {
        if (entity.hasComponent(DraggableReturnComponent)) {
            const draggable = entity.getMutableComponent(DraggableReturnComponent);
            if (draggable) {
                draggable.state = 'to-be-draggable';
                draggable.attachedPointer = controller;
            }
        }

        if (entity.hasComponent(DraggableDefaultComponent)) {
            const draggable = entity.getMutableComponent(DraggableDefaultComponent);
            if (draggable) {
                draggable.state = 'to-be-draggable';
                draggable.attachedPointer = controller;
            }
        }
    }

    private _handleSelect(controller: THREE.Group, entity: Entity, intersection: THREE.Intersection, renderer: THREE.WebGLRenderer) {

        if (entity.hasComponent(ButtonComponent)) {
            const component = entity.getMutableComponent(ButtonComponent);
            if (!component) return;
            if (component.currState !== 'pressed') component.currState = 'pressed';
        }

        if (entity.hasComponent(DraggableReturnComponent)) {
            const draggable = entity.getMutableComponent(DraggableReturnComponent);
            if (!draggable) return;

            draggable.state = 'to-be-attached';
            draggable.attachedPointer = controller;
        }

        if (entity.hasComponent(DraggableDefaultComponent)) {
            const component = entity.getMutableComponent(DraggableDefaultComponent);
            if (!component) return;

            component.state = 'to-be-attached';
            component.attachedPointer = controller;
        }

        if (entity.hasComponent(TeleportComponent)) {
            const component = entity.getMutableComponent(TeleportComponent);
            if (!component) return;

            component.point = intersection.point;
            component.renderer = renderer;
            component.baseReferenceSpace = renderer.xr.getReferenceSpace();
            component.marker?.position.copy(intersection.point);
        }

        if (entity.hasComponent(KeyboardComponent)) {
            const component = entity.getMutableComponent(KeyboardComponent);
            if (!component) return;

            component.state = 'pressed';
        }

        if (intersection.object.parent instanceof InputField) {
            const field = intersection.object.parent as InputField;

            // Fokus baru
            field.setFocus(true);

            // Fokus lama di-unset
            const oldField = this.inputField?.parent?.userData?.inputField;
            if (oldField && oldField !== field) {
                oldField.setFocus(false);
            }

            this.inputField = intersection.object as THREE.Mesh;

            // Loop semua keyboardEntity dan assign inputField-nya
            for (const entity of this.queries.keyboard.results) {
                const component = entity.getMutableComponent(KeyboardComponent);
                if (component) {
                    component.inputField = field;
                    component?.keyboard?.setActiveInputField(field);
                }
            }
        }

    }


    private _getIntersections(controller: THREE.Group, object: THREE.Mesh) {
        const tempMatrix = new THREE.Matrix4();
        const raycaster = new THREE.Raycaster();
        tempMatrix.identity().extractRotation(controller.matrixWorld);
        raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
        controller.updateMatrixWorld();
        return raycaster.intersectObject(object, false);
    }
}

ControllerSystem.queries = {
    controllers: {
        components: [ControllerComponent]
    },
    keyboard: {
        components: [KeyboardComponent]
    }
};