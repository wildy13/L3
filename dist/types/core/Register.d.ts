import { World } from 'ecsy';
import { Audio, Group, Mesh, WebGLRenderer } from 'three';
/**
 * Supported feature flags.
 */
export type FeatureType = 'button' | 'keyboard';
/**
 * Configuration object passed to Register.addFeatures().
 */
export interface DataOptions {
    requiredFeatures?: FeatureType[];
    data?: {
        controllers?: Group[];
        renderer?: WebGLRenderer;
        button?: {
            mesh: Mesh;
            clickSound: Audio;
            hoverSound: Audio;
            onClick: () => void;
        };
    };
}
/**
 * ECS Register class for component/system initialization and feature-based entity setup.
 */
export declare class Register {
    world: World;
    constructor();
    /**
     * Creates and returns a new ECS entity.
     */
    createEntity(): import("ecsy")._Entity;
    /**
     * Registers and configures features into ECS.
     */
    addFeatures(options?: DataOptions): void;
    /**
     * Updates all ECS systems with delta and time.
     */
    update(delta: number, time: number): void;
    /**
     * Safely registers a component to the world if not already registered.
     */
    private _registerComponent;
    /**
     * Safely registers a system to the world if not already present.
     */
    private _registerSystem;
}
