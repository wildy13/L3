import * as THREE from 'three';
import { IEngine } from '../types/engine.type';
/**
 * CreateEngine is the core WebXR engine initializer.
 * It sets up scene, camera, renderer, XR controllers, and lighting.
 */
export declare class CreateEngine implements IEngine {
    readonly Player: THREE.Group;
    readonly Scene: THREE.Scene;
    readonly Camera: THREE.PerspectiveCamera;
    readonly Renderer: THREE.WebGLRenderer;
    readonly LoadingManager: THREE.LoadingManager;
    readonly Clock: THREE.Clock;
    readonly AudioListener: THREE.AudioListener;
    readonly AudioLoader: THREE.AudioLoader;
    LeftController: THREE.Group;
    RightController: THREE.Group;
    LeftControllerGrip: THREE.Group;
    RightControllerGrip: THREE.Group;
    Controllers: THREE.Group[];
    AmbientLight: THREE.AmbientLight;
    DirectionalLight: THREE.DirectionalLight;
    HemisphereLight: THREE.HemisphereLight;
    constructor();
    /**
     * Handles camera & renderer resizing on window resize.
     * @private
     */
    private _onResize;
    /**
     * Initializes default lighting (Hemisphere, Ambient, Directional).
     * @private
     */
    private _setupLighting;
    /**
     * Initializes XR controllers and their models & laser pointers.
     * @private
     */
    private _setupControllers;
    /**
     * Adds a laser pointer line to a controller.
     * @private
     * @param controller - Controller group to attach the line to.
     * @param side - Controller side ("left" or "right").
     */
    private _addLaserPointer;
    /**
     * Sets an HDR environment map using RGBELoader and PMREM.
     * @param options - Configuration object.
     */
    setEnv(options: {
        url: string;
        isEnv?: boolean;
        isBackground?: boolean;
        onLoaded?: (envMap: THREE.Texture) => void;
    }): void;
    /**
     * Renders the current Scene using the main Camera.
     */
    render(): void;
}
