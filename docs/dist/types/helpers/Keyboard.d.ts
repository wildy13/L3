import * as THREE from 'three';
import { InputField } from './InputField';
export type Mode = 'abc' | 'symbols' | 'shift';
export declare class Keyboard extends THREE.Mesh {
    mode: Mode;
    private _width;
    private _height;
    private _gap;
    private _activeInputField?;
    inputValues: Record<string, string>;
    private _keyActions;
    private readonly _iconMap;
    constructor({ width, height, gap }?: {
        width?: number;
        height?: number;
        gap?: number;
    });
    setActiveInputField(input: InputField): void;
    handleKeyPress(label: string): void;
    private _getKeyboardLayout;
    private _build;
    private _createKeyMesh;
    private _switch;
    setUppercase(enabled: boolean): void;
}
