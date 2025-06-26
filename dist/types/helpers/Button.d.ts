import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { ButtonHelperOptions } from 'types/button.type';
interface ButtonHelperConstructorParams {
    text?: string;
    options?: Partial<ButtonHelperOptions>;
}
export declare class ButtonHelper extends THREE.Mesh {
    readonly label: Text;
    constructor({ text, options }: ButtonHelperConstructorParams);
    /**
     * Update the button text.
     * @param newText - The new label to display.
     */
    setText(newText: string): void;
    /**
     * Set the background color of the button.
     * @param color - The hex color value.
     */
    setBackgroundColor(color: number): void;
    /**
     * Set the text color of the label.
     * @param color - The hex color value.
     */
    setTextColor(color: number): void;
}
export {};
