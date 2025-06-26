import * as THREE from 'three';
/**
 * A simple on-screen performance monitor for Three.js,
 * displaying renderer stats like triangle count and draw calls.
 */
export declare class PerformanceHelper {
    readonly dom: HTMLCanvasElement;
    private readonly ctx;
    private static readonly WIDTH;
    private static readonly HEIGHT;
    constructor();
    /**
     * Updates the performance display with data from the renderer.
     * @param renderer - The Three.js WebGLRenderer instance.
     */
    update(renderer: THREE.WebGLRenderer): void;
    /**
     * Applies consistent styling to the canvas element for fixed overlay display.
     */
    private applyStyles;
}
