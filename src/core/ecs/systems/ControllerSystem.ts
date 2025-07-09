import { Attributes, Entity, System } from 'ecsy';
import { ControllerComponent } from '../components/ControllerComponent';
import * as THREE from 'three';
import { Object3DComponent } from '../components/Object3DComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { DraggableReturnComponent } from '../components/DraggableReturnComponent';
import { DraggableDefaultComponent } from '../components/DraggableDefaultComponent';

export class ControllerSystem extends System {
    previousButtonStates!: { left: boolean[]; right: boolean[]; };
    init(attributes?: Attributes): void {
        this.previousButtonStates = {
            left: [],
            right: []
        };
    }

    execute(delta: number, time: number): void {
        this.queries.controllers.results.forEach(entity => {
            const components = entity.getComponent(ControllerComponent);

            if (!components) return;
            const session = components?.renderer.xr.getSession();
            const object = entity.getComponent(Object3DComponent)?.object;

            if (!session) return;
            if (!object) {
                console.error("object is not defined.");
                return;
            }

            session.inputSources.forEach((source: XRInputSource & { gamepad: Gamepad; }) => {
                components.controllers.forEach((c: THREE.Group) => {
                    const handedness = c.userData.handedness;
                    if (source.handedness !== handedness) return;

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
                                this._handleButton(b, i, c, entity, intersection, gamepad);
                            });
                        }

                    } else {
                        if (!c.userData.lineReset) {
                            this._resetLine(c);
                            c.userData.lineReset = true;
                        }

                        if (c.userData.isHover && entity.hasComponent(ButtonComponent)) {
                            this._onUnhover(entity);
                        }
                    }
                });
            });

        });
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
        gamepad: Gamepad
    ) {
        const side = controller.userData.handedness as 'left' | 'right';

        if (!this.previousButtonStates[side]) {
            this.previousButtonStates[side] = [];
        }

        const wasPressed = this.previousButtonStates[side][index] || false;

        if (button.pressed && !wasPressed) {
            this._StartAction(index, controller, entity, intersection);

            if (gamepad && gamepad.hapticActuators && gamepad.hapticActuators.length > 0) {
                gamepad.hapticActuators[0].pulse(.5, 80);
            }
        } else if (!button.pressed && wasPressed) {
            this._EndAction(index, controller, entity);
        }

        this.previousButtonStates[side][index] = button.pressed;
    }


    private _StartAction(index: number, controller: THREE.Group, entity: Entity, intersection: THREE.Intersection) {
        if (index === 0) {
            this._updateColor(controller, 0x22d3ee);
            this._handleSelect(controller, entity);
        }
    }

    private _EndAction(index: number, controller: THREE.Group, entity: Entity) {
        controller.userData.selected = false;

        if (entity.hasComponent(ButtonComponent)) {
            const button = entity.getMutableComponent(ButtonComponent);
            if (button && button.currState !== 'released') {
                button.currState = 'released';
                this._updateColor(controller, 0xffffff);
            }
        }

        if (entity.hasComponent(DraggableReturnComponent)) {
            const draggable = entity.getMutableComponent(DraggableReturnComponent);
            if (draggable) {
                draggable.state = 'to-be-detached';
                draggable.attachedPointer = null;
                this._updateColor(controller, 0xffffff);
            }
        }

        if (entity.hasComponent(DraggableDefaultComponent)) {
            const draggable = entity.getMutableComponent(DraggableDefaultComponent);
            if (draggable) {
                draggable.state = 'to-be-detached';
                draggable.attachedPointer = null;
                this._updateColor(controller, 0xffffff);
            }
        }
    }

    private _handleSelect(controller: THREE.Group, entity: Entity) {
        if (entity.hasComponent(ButtonComponent)) {
            const button = entity.getMutableComponent(ButtonComponent);
            if (button && button.currState !== 'pressed') {
                button.currState = 'pressed';
            }
            controller.userData.selected = true;
        }

        if (entity.hasComponent(DraggableReturnComponent)) {
            const draggable = entity.getMutableComponent(DraggableReturnComponent);
            if (draggable) {
                draggable.state = 'to-be-attached';
                draggable.attachedPointer = controller;
            }
        }

        if (entity.hasComponent(DraggableDefaultComponent)) {
            const draggable = entity.getMutableComponent(DraggableDefaultComponent);
            if (draggable) {
                draggable.state = 'to-be-attached';
                draggable.attachedPointer = controller;
            }
        }
    }

    private _onHover(entity: Entity, gamepad: Gamepad) {
        if (!entity.hasComponent(ButtonComponent)) return;

        const button = entity.getMutableComponent(ButtonComponent);

        if (!button) return;

        if (button.currState !== 'hovered') {
            button.currState = 'hovered';

            if (gamepad && gamepad.hapticActuators && gamepad.hapticActuators.length > 0) {
                gamepad.hapticActuators[0].pulse(.2, 40);
            }
        }
    }

    private _onUnhover(entity: Entity) {
        const button = entity.getMutableComponent(ButtonComponent);
        if (button && button.currState === 'hovered') {
            button.currState = 'none';
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
    }
};