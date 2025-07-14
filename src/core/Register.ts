import { World } from 'ecsy';
import {
    ComponentConstructor,
    Component,
    SystemConstructor,
    System
} from 'ecsy';
import * as THREE from 'three';
import { ControllerComponent } from './ecs/components/ControllerComponent';
import { ControllerSystem } from './ecs/systems/ControllerSystem';
import { Object3DComponent } from './ecs/components/Object3DComponent';
import { ButtonComponent } from './ecs/components/ButtonComponent';
import { ButtonSystem } from './ecs/systems/ButtonSystem';
import { Audio, Group, Mesh, Object3D, Vector3, WebGLRenderer } from 'three';
import { DraggableReturnComponent } from './ecs/components/DraggableReturnComponent';
import { DraggableReturnSystem } from './ecs/systems/DraggableReturnSystem';
import { DraggableDefaultComponent } from './ecs/components/DraggableDefaultComponent';
import { DraggableDefaultSystem } from './ecs/systems/DraggableDefaultSystem';
import { MovementFPSComponent } from './ecs/components/MovementFPSComponent';
import { TeleportComponent } from './ecs/components/TeleportComponent';
import { TeleportSystem } from './ecs/systems/TeleportSystem';
import { KeyboardComponent } from './ecs/components/KeyboardComponent';
import { KeyboardSystem } from './ecs/systems/KeyboardSystem';


/**
 * Supported feature flags.
 */
export type FeatureType = 'button' | 'keyboard' | 'draggable-return' | 'draggable-default' | 'movement' | 'teleport';

/**
 * Configuration object passed to Register.addFeatures().
 */
export interface DataOptions {
    requiredFeatures?: FeatureType[];
    data?: {
        controllers?: Group[];
        renderer?: WebGLRenderer;
        draggableReturn?: {
            mesh: Mesh;
            clickSound?: Audio;
            hoverSound?: Audio;
        };
        draggableDefault?: {
            mesh: Mesh;
            clickSound?: Audio;
            hoverSound?: Audio;
        };
        button?: {
            mesh: Mesh;
            clickSound?: Audio;
            hoverSound?: Audio;
            onClick: () => void;
        };
        movement?: {
            player: Group;
        },
        teleport: {
            floor: Mesh;
            point: Vector3;
            player: Group;
            marker: Mesh;
        },
        keyboard: {
            mesh: Mesh
        }
    };
}

/**
 * ECS Register class for component/system initialization and feature-based entity setup.
 */
export class Register {
    public world: World;

    constructor() {
        this.world = new World();

        this._registerComponent(Object3DComponent);
        this._registerComponent(ControllerComponent);
        this._registerComponent(ButtonComponent);
        this._registerComponent(DraggableReturnComponent);
        this._registerComponent(DraggableDefaultComponent);
        this._registerComponent(MovementFPSComponent);
        this._registerComponent(TeleportComponent);
        this._registerComponent(KeyboardComponent);

        this._registerSystem(ControllerSystem);
        this._registerSystem(ButtonSystem);
        this._registerSystem(DraggableReturnSystem);
        this._registerSystem(DraggableDefaultSystem);
        this._registerSystem(TeleportSystem);
        this._registerSystem(KeyboardSystem);
    }

    /**
     * Creates and returns a new ECS entity.
     */
    public createEntity() {
        return this.world.createEntity();
    }

    /**
     * Registers and configures features into ECS.
     */
    public addFeatures(options: DataOptions = {}): void {
        const { requiredFeatures = [], data } = options;

        for (const feature of requiredFeatures) {
            switch (feature) {
                case 'button': {
                    if (
                        !data?.renderer ||
                        !data.controllers ||
                        !data.button?.mesh ||
                        !data.button.clickSound ||
                        !data.button.hoverSound ||
                        !data.button.onClick
                    ) {
                        console.warn('[Register] Incomplete data provided for "button" feature.');
                        break;
                    }

                    const entity = this.createEntity();

                    entity.addComponent(ControllerComponent, {
                        controllers: data.controllers,
                        renderer: data.renderer,
                    });

                    entity.addComponent(Object3DComponent, {
                        object: data.button.mesh,
                    });

                    entity.addComponent(ButtonComponent, {
                        clickSound: data.button.clickSound,
                        hoverSound: data.button.hoverSound,
                        onClick: data.button.onClick,
                    });

                    break;
                }

                case 'keyboard': {
                    options.data?.keyboard.mesh.children.forEach(child => {
                        if (child instanceof THREE.Mesh) {
                            if (child.isMesh) {
                                const entity = this.createEntity();
                                entity.addComponent(ControllerComponent, {
                                    controllers: data?.controllers,
                                    renderer: data?.renderer,
                                });
                                entity.addComponent(Object3DComponent, { object: child });
                                entity.addComponent(KeyboardComponent);
                            }
                        }
                    });
                    break;
                }

                case 'draggable-return': {
                    const entity = this.createEntity();
                    entity.addComponent(ControllerComponent, {
                        controllers: data?.controllers,
                        renderer: data?.renderer,
                    });
                    entity.addComponent(Object3DComponent, { object: data?.draggableReturn?.mesh });
                    entity.addComponent(DraggableReturnComponent);
                    break;
                }

                case 'draggable-default': {
                    const entity = this.createEntity();
                    entity.addComponent(ControllerComponent, {
                        controllers: data?.controllers,
                        renderer: data?.renderer,
                    });
                    entity.addComponent(Object3DComponent, { object: data?.draggableReturn?.mesh });
                    entity.addComponent(DraggableDefaultComponent);
                }

                case 'movement': {
                    const entity = this.createEntity();
                    entity.addComponent(ControllerComponent, {
                        controllers: data?.controllers,
                        renderer: data?.renderer,
                    });
                    entity.addComponent(MovementFPSComponent, { player: data?.movement?.player })
                    break;
                }

                case 'teleport': {
                    const entity = this.createEntity();
                    entity.addComponent(ControllerComponent, {
                        controllers: data?.controllers,
                        renderer: data?.renderer,
                    });
                    entity.addComponent(Object3DComponent, { object: data?.teleport?.floor });
                    entity.addComponent(TeleportComponent, {
                        point: data?.teleport?.point,
                        player: data?.teleport?.player,
                        marker: data?.teleport?.marker,
                    });
                    break;
                }
                default: {
                    console.warn(`[Register] Unknown feature: "${feature}"`);
                }
            }
        }
    }

    /**
     * Updates all ECS systems with delta and time.
     */
    public update(delta: number, time: number): void {
        this.world.execute(delta, time);
    }

    /**
     * Safely registers a component to the world if not already registered.
     */
    private _registerComponent(component: ComponentConstructor<Component<unknown>>): void {
        if (!this.world.hasRegisteredComponent(component)) {
            this.world.registerComponent(component);
        }
    }

    /**
     * Safely registers a system to the world if not already present.
     */
    private _registerSystem(system: SystemConstructor<System>): void {
        if (!this.world.getSystem(system)) {
            this.world.registerSystem(system);
        }
    }
}
