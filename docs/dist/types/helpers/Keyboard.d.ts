import * as THREE from 'three';
export type Mode = 'abc' | 'symbols' | 'shift';
export declare class Keyboard extends THREE.Mesh {
    mode: Mode;
    private _width;
    private _height;
    private _gap;
    private _inputField?;
    private _keyActions;
    private readonly _iconMap;
    constructor({ width, height, gap }?: {
        width?: number;
        height?: number;
        gap?: number;
    });
    bindInputField(inputField: {
        append: (value: string) => void;
    }): void;
    private _getKeyboardLayout;
    private _build;
    private _createKeyMesh;
    handleKeyPress(label: string): void;
    private _switch;
    setUppercase(enabled: boolean): void;
}
