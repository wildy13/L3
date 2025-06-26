import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { TextHelper } from './Text';
import { ButtonHelperOptions } from 'types/button.type';

const DEFAULT_OPTIONS: ButtonHelperOptions = {
    width: 0.1 / 1.1,
    height: 0.04 / 1.1,
    backgroundColor: 0x333333,
    textColor: 0xffffff,
    fontSize: undefined,
};

interface ButtonHelperConstructorParams {
    text?: string;
    options?: Partial<ButtonHelperOptions>;
}

export class ButtonHelper extends THREE.Mesh {
    public readonly label: Text;

    constructor({ text = 'Button', options = {} }: ButtonHelperConstructorParams) {
        const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

        const geometry = new THREE.PlaneGeometry(mergedOptions.width, mergedOptions.height);
        const material = new THREE.MeshBasicMaterial({
            color: mergedOptions.backgroundColor,
            transparent: true,
        });

        super(geometry, material);

        this.label = new TextHelper().set({
            text,
            options: {
                maxWidth: mergedOptions.width,
                fontSize: mergedOptions.fontSize != undefined ? mergedOptions.fontSize : 0.015,
                color: new THREE.Color(mergedOptions.textColor),
                anchorX: 'center',
                anchorY: 'middle',
            },
        });

        this.add(this.label);
    }

    /**
     * Update the button text.
     * @param newText - The new label to display.
     */
    public setText(newText: string): void {
        this.label.text = newText;
        this.label.sync();
    }

    /**
     * Set the background color of the button.
     * @param color - The hex color value.
     */
    public setBackgroundColor(color: number): void {
        if (this.material instanceof THREE.MeshBasicMaterial) {
            this.material.color.set(color);
        }
    }

    /**
     * Set the text color of the label.
     * @param color - The hex color value.
     */
    public setTextColor(color: number): void {
        this.label.color = new THREE.Color(color);
        this.label.sync();
    }
}
