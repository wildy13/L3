import * as THREE from 'three';
export declare class InputField extends THREE.Group {
    private _value;
    private _textMesh;
    private _background;
    private _maxLength;
    private _isFocused;
    constructor(width?: number, height?: number, maxLength?: number);
    get value(): string;
    set value(val: string);
    append(char: string): void;
    backspace(): void;
    setFocus(isFocused: boolean): void;
    isFocused(): boolean;
}
