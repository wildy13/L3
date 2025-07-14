import * as THREE from 'three';
export declare class InputField extends THREE.Group {
    private _value;
    private _textMesh;
    private _background;
    private _maxLength;
    constructor(width?: number, height?: number, maxLength?: number);
    get value(): string;
    set value(val: string);
    append(char: string): void;
    backspace(): void;
}
