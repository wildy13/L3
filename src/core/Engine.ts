import * as THREE from 'three';
import { IEngine } from '../types/engine.type';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * CreateEngine is the core WebXR engine initializer.
 * It sets up scene, camera, renderer, XR controllers, and lighting.
 */
export class CreateEngine implements IEngine {
  public readonly Player: THREE.Group;
  public readonly Scene: THREE.Scene;
  public readonly Camera: THREE.PerspectiveCamera;
  public readonly Renderer: THREE.WebGLRenderer;
  public readonly LoadingManager: THREE.LoadingManager;
  public readonly Clock: THREE.Clock;
  public readonly AudioListener: THREE.AudioListener;
  public readonly AudioLoader: THREE.AudioLoader;

  public LeftController!: THREE.Group;
  public RightController!: THREE.Group;
  public LeftControllerGrip!: THREE.Group;
  public RightControllerGrip!: THREE.Group;
  public Controllers!: THREE.Group[];

  public AmbientLight!: THREE.AmbientLight;
  public DirectionalLight!: THREE.DirectionalLight;
  public HemisphereLight!: THREE.HemisphereLight;

  constructor() {
    this.LoadingManager = new THREE.LoadingManager();
    this.Clock = new THREE.Clock();
    this.Player = new THREE.Group();
    this.Player.name = 'player';

    this.AudioListener = new THREE.AudioListener();
    this.AudioLoader = new THREE.AudioLoader(this.LoadingManager);

    this.Scene = new THREE.Scene();
    this.Scene.background = new THREE.Color(0x808080);

    this.Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.Camera.position.set(0, 1.6, 0);
    this.Camera.add(this.AudioListener);
    this.Player.add(this.Camera);

    this.Renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      depth: true,
    });

    this.Renderer.setPixelRatio(window.devicePixelRatio);
    this.Renderer.setSize(window.innerWidth, window.innerHeight);
    this.Renderer.xr.enabled = true;
    this.Renderer.localClippingEnabled = true;
    this.Renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.Renderer.outputColorSpace = THREE.SRGBColorSpace;

    window.addEventListener('resize', this._onResize);

    this._setupLighting();
    this._setupControllers();

    this.Scene.add(this.Player);
  }

  /**
   * Handles camera & renderer resizing on window resize.
   * @private
   */
  private _onResize = (): void => {
    this.Camera.aspect = window.innerWidth / window.innerHeight;
    this.Camera.updateProjectionMatrix();
    this.Renderer.setSize(window.innerWidth, window.innerHeight);
  };

  /**
   * Initializes default lighting (Hemisphere, Ambient, Directional).
   * @private
   */
  private _setupLighting(): void {
    this.HemisphereLight = new THREE.HemisphereLight(0x606060, 0x404040);
    this.Scene.add(this.HemisphereLight);

    this.AmbientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.Scene.add(this.AmbientLight);

    this.DirectionalLight = new THREE.DirectionalLight(0xffffff, 3);
    this.DirectionalLight.position.set(1, 1, 1).normalize();
    this.Scene.add(this.DirectionalLight);
  }

  /**
   * Initializes XR controllers and their models & laser pointers.
   * @private
   */
  private _setupControllers(): void {
    const gltfLoader = new GLTFLoader(this.LoadingManager);
    const modelFactory = new XRControllerModelFactory(gltfLoader);

    this.RightController = this.Renderer.xr.getController(0);
    this.LeftController = this.Renderer.xr.getController(1);

    this.LeftController.userData = { handedness: 'left', isSelecting: false };
    this.RightController.userData = { handedness: 'right', isSelecting: false };

    this.RightControllerGrip = this.Renderer.xr.getControllerGrip(0);
    this.LeftControllerGrip = this.Renderer.xr.getControllerGrip(1);

    this.RightControllerGrip.add(modelFactory.createControllerModel(this.RightControllerGrip));
    this.LeftControllerGrip.add(modelFactory.createControllerModel(this.LeftControllerGrip));

    this._addLaserPointer(this.LeftController, 'left');
    this._addLaserPointer(this.RightController, 'right');

    this.Controllers = [this.LeftController, this.RightController];

    this.Player.add(this.LeftController, this.RightController);
    this.Player.add(this.LeftControllerGrip, this.RightControllerGrip);
  }

  /**
   * Adds a laser pointer line to a controller.
   * @private
   * @param controller - Controller group to attach the line to.
   * @param side - Controller side ("left" or "right").
   */
  private _addLaserPointer(controller: THREE.Group, side: string): void {
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });

    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1),
    ]);

    const line = new THREE.Line(geometry, material);
    line.name = `line-${side}`;
    line.frustumCulled = false;

    controller.add(line);
  }

  /**
   * Sets an HDR environment map using RGBELoader and PMREM.
   * @param options - Configuration object.
   */
  public setEnv(options: {
    url: string;
    isEnv?: boolean;
    isBackground?: boolean;
    onLoaded?: (envMap: THREE.Texture) => void;
  }): void {
    const { url, isEnv = true, isBackground = false, onLoaded } = options;

    if (!url) return;

    const loader = new RGBELoader(this.LoadingManager);
    const pmrem = new THREE.PMREMGenerator(this.Renderer);
    pmrem.compileEquirectangularShader();

    loader.load(
      url,
      (texture) => {
        const envMap = pmrem.fromEquirectangular(texture).texture;

        texture.dispose();
        pmrem.dispose();

        if (isEnv) this.Scene.environment = envMap;
        if (isBackground) this.Scene.background = envMap;

        onLoaded?.(envMap);
      },
      undefined,
      (error) => {
        console.error(`[Engine] Failed to load environment: ${url}`, error);
      }
    );
  }

  /**
   * Renders the current Scene using the main Camera.
   */
  public render(): void {
    this.Renderer.render(this.Scene, this.Camera);
  }
}
