import * as THREE from 'three';
import { InputField } from './InputField';

export type Mode = 'abc' | 'symbols' | 'shift';

export class Keyboard extends THREE.Mesh {
  mode: Mode = 'abc';

  private _width: number;
  private _height: number;
  private _gap: number;
  private _activeInputField?: InputField;
  public inputValues: Record<string, string> = {};
  private _keyActions: Record<string, () => void>;

  private readonly _iconMap = {
    enter: new URL('../dist/assets/images/enter.png', import.meta.url).href,
    shift: new URL('../dist/assets/images/shift.png', import.meta.url).href,
    backspace: new URL('../dist/assets/images/backspace.png', import.meta.url).href,
  } as const;

  constructor({ width = 0.25, height = 0.08, gap = 0.005 }: { width?: number; height?: number; gap?: number } = {}) {
    const geometry = new THREE.PlaneGeometry(width + 0.02, height + 0.02);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });
    super(geometry, material);

    this.rotation.x = -Math.PI / 4;
    this._width = width;
    this._height = height;
    this._gap = gap;

    this.name = 'keyboard';

    this._keyActions = {
      shift: () => {
        const isShift = this.mode !== 'shift';
        this.setUppercase(isShift);
        this._switch(isShift ? 'shift' : 'abc');
      },
      '.?123': () => this._switch('symbols'),
      ABC: () => this._switch('abc'),
      backspace: () => this._activeInputField?.backspace(),
    };

    this._build();
  }

  public setActiveInputField(input: InputField) {
    if (this._activeInputField && this._activeInputField !== input) {
      this._activeInputField.setFocus(false);
    }
    this._activeInputField = input;
    this._activeInputField?.setFocus(true);
  }

  public handleKeyPress(label: string): void {
    if (!this._activeInputField) return;

    const name = this._activeInputField.name;

    if (this._keyActions[label]) {
      this._keyActions[label]();
    } else {
      if (label === 'enter') return;
      this._activeInputField.append(label);
    }

    this.inputValues[name] = this._activeInputField.value;
  }


  private _getKeyboardLayout(mode: Mode): any[][] {
    const abcLayout = [
      [{ label: 'q' }, { label: 'w' }, { label: 'e' }, { label: 'r' }, { label: 't' }, { label: 'y' }, { label: 'u' }, { label: 'i' }, { label: 'o' }, { label: 'p' }],
      [{ label: 'a' }, { label: 's' }, { label: 'd' }, { label: 'f' }, { label: 'g' }, { label: 'h' }, { label: 'j' }, { label: 'k' }, { label: 'l' }],
      [{ label: 'shift' }, { label: 'z' }, { label: 'x' }, { label: 'c' }, { label: 'v' }, { label: 'b' }, { label: 'n' }, { label: 'm' }, { label: 'backspace' }],
      [{ label: '.?123' }, { label: ',' }, { label: ' ', width: 4 }, { label: '.' }, { label: 'enter' }],
    ];

    const shiftLayout = abcLayout.map(row =>
      row.map(key => ({ ...key, label: key.label.length === 1 ? key.label.toUpperCase() : key.label }))
    );

    const symbolLayout = [
      [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }, { label: '5' }, { label: '6' }, { label: '7' }, { label: '8' }, { label: '9' }, { label: '0' }],
      [{ label: '@' }, { label: '#' }, { label: '$' }, { label: '_' }, { label: '&' }, { label: '-' }, { label: '+' }, { label: '(' }, { label: ')' }],
      [{ label: 'shift' }, { label: '*' }, { label: '"' }, { label: "'" }, { label: ':' }, { label: ';' }, { label: '!' }, { label: '?' }, { label: 'backspace' }],
      [{ label: 'ABC' }, { label: ',' }, { label: ' ', width: 4 }, { label: '.' }, { label: 'enter' }],
    ];

    switch (mode) {
      case 'symbols': return symbolLayout;
      case 'shift': return shiftLayout;
      default: return abcLayout;
    }
  }

  private _build(): void {
    const layout = this._getKeyboardLayout(this.mode);
    const totalRows = layout.length;
    const rowHeight = (this._height - this._gap * (totalRows - 1)) / totalRows;
    const yStart = (this._height / 2) - (rowHeight / 2);

    layout.forEach((row, rowIndex) => {
      const totalUnits = row.reduce((sum, key) => sum + (key.width || 1), 0);
      const unitWidth = (this._width - (row.length - 1) * this._gap) / totalUnits;
      let xOffset = -this._width / 2;

      row.forEach(key => {
        const width = unitWidth * (key.width || 1);
        const keyMesh = this._createKeyMesh(key.label, width, rowHeight);
        if (!keyMesh) return;

        keyMesh.position.set(
          xOffset + width / 2,
          yStart - (rowHeight + this._gap) * rowIndex,
          0.001
        );

        keyMesh.name = key.label;
        keyMesh.userData.label = key.label;

        this.add(keyMesh);
        xOffset += width + this._gap;
      });
    });
  }

  private _createKeyMesh(label: string, width: number, height: number): THREE.Mesh {
    const resolutionFactor = 4;
    const canvas = document.createElement('canvas');
    canvas.width = 256 * resolutionFactor;
    canvas.height = 128 * resolutionFactor;

    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    if (label in this._iconMap) {
      const img = new Image();
      const size = 64 * resolutionFactor;
      img.src = this._iconMap[label as keyof typeof this._iconMap];
      img.onload = () => {
        ctx.drawImage(img, (canvas.width - size) / 2, (canvas.height - size) / 2, size, size);
        texture.needsUpdate = true;
      };
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${48 * resolutionFactor}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, canvas.width / 2, canvas.height / 2);
    }

    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.userData = { canvas, ctx, texture, label };
    return mesh;
  }

  private _switch(mode: Mode): void {
    if (this.mode === mode) return;

    this.mode = mode;
    const layout = this._getKeyboardLayout(mode);
    const resolutionFactor = 4;

    layout.flat().forEach((keyData, index) => {
      const mesh = this.children[index] as THREE.Mesh;
      if (!mesh) return;

      const { canvas, ctx, texture } = mesh.userData;
      const label = keyData.label;

      mesh.userData.label = label;
      mesh.name = label;

      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (label in this._iconMap) {
        const img = new Image();
        const size = 64 * resolutionFactor;
        img.src = this._iconMap[label as keyof typeof this._iconMap];
        img.onload = () => {
          ctx.drawImage(img, (canvas.width - size) / 2, (canvas.height - size) / 2, size, size);
          texture.needsUpdate = true;
        };
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${48 * resolutionFactor}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, canvas.width / 2, canvas.height / 2);
        texture.needsUpdate = true;
      }
    });
  }

  public setUppercase(enabled: boolean): void {
    const resolutionFactor = 4;
    this.children.forEach(mesh => {
      const { label, canvas, ctx, texture } = mesh.userData;
      if (['enter', 'shift', 'backspace', 'ABC', '.?123'].includes(label)) return;

      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${48 * resolutionFactor}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(enabled ? label.toUpperCase() : label.toLowerCase(), canvas.width / 2, canvas.height / 2);

      texture.needsUpdate = true;
    });
  }
}
