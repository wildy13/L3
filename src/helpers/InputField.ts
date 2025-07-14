import { Text } from 'troika-three-text';
import * as THREE from 'three';

export class InputField extends THREE.Group {
    private _value = '';
    private _textMesh: Text;
    private _background: THREE.Mesh;
    private _maxLength: number;

    constructor(width = 0.25, height = 0.08, maxLength = 100) {
        super();

        this._maxLength = maxLength;

        // Background
        const bgGeometry = new THREE.PlaneGeometry(width, height);
        const bgMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
        this._background = new THREE.Mesh(bgGeometry, bgMaterial);
        this.add(this._background);

        // TextMesh
        this._textMesh = new Text();
        this._textMesh.text = '';
        this._textMesh.fontSize = height * .4;
        this._textMesh.color = 0xffffff;
        this._textMesh.anchorX = 'left';
        this._textMesh.anchorY = 'middle';
        this._textMesh.position.set(-width / 2 + 0.05, 0, 0.01);
        this._textMesh.sync(); // initial sync

        this.add(this._textMesh);

        this.name = 'InputField';
    }

    public get value(): string {
        return this._value;
    }

    public set value(val: string) {
        this._value = val.slice(0, this._maxLength);
        this._textMesh.text = this._value;
        this._textMesh.sync();
    }

    public append(char: string) {
        if (this._value.length < this._maxLength) {
            this._value += char;
            this._textMesh.text = this._value;
            this._textMesh.sync();
        }
    }

    public backspace() {
        this._value = this._value.slice(0, -1);
        this._textMesh.text = this._value;
        this._textMesh.sync();
    }
}
