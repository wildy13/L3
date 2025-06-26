import * as THREE from 'three';

/**
 * A simple on-screen performance monitor for Three.js,
 * displaying renderer stats like triangle count and draw calls.
 */
export class PerformanceHelper {
  public readonly dom: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  private static readonly WIDTH = 256;
  private static readonly HEIGHT = 128;

  constructor() {
    this.dom = document.createElement('canvas');
    this.dom.width = PerformanceHelper.WIDTH;
    this.dom.height = PerformanceHelper.HEIGHT;

    const context = this.dom.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context is not supported or already initialized.');
    }
    this.ctx = context;

    this.applyStyles();
  }

  /**
   * Updates the performance display with data from the renderer.
   * @param renderer - The Three.js WebGLRenderer instance.
   */
  public update(renderer: THREE.WebGLRenderer): void {
    const info = renderer.info;

    this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '14px monospace';
    this.ctx.textBaseline = 'top';

    this.ctx.fillText('Stats', 10, 10);
    this.ctx.fillText(`Triangles: ${info.render.triangles}`, 10, 30);
    this.ctx.fillText(`Draw Calls: ${info.render.calls}`, 10, 50);
    this.ctx.fillText(`Geometries: ${info.memory.geometries}`, 10, 70);
    this.ctx.fillText(`Textures: ${info.memory.textures}`, 10, 90);
  }

  /**
   * Applies consistent styling to the canvas element for fixed overlay display.
   */
  private applyStyles(): void {
    Object.assign(this.dom.style, {
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      zIndex: '10000',
      pointerEvents: 'none',
      fontFamily: 'monospace',
      fontSize: 'clamp(10px, 1.2vw, 14px)',
      width: `${PerformanceHelper.WIDTH}px`,
      height: `${PerformanceHelper.HEIGHT}px`,
    });
  }
}
