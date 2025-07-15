import { Template } from './template/index';
import { PerformanceHelper } from './helpers/Performance';
import { Register } from './core/Register';
import { TextHelper } from './helpers/Text';
import { ButtonHelper } from './helpers/Button';
import { Load3DModel } from 'core/Load3DModel';
import { Keyboard } from 'helpers/Keyboard';
import { InputField } from 'helpers/InputField';
import { FONT_MAP } from 'constant/font.map';
/**
 * Centralized export object for L3 toolkit components.
 * Useful for consumers who prefer grouped access.
 */
export declare const L3: {
    readonly Template: {
        VR: typeof import("./modules/WebVR").VR;
        XR: typeof import("./modules/WebXR").XR;
    };
    readonly PerformanceHelper: typeof PerformanceHelper;
    readonly Register: typeof Register;
    readonly Load3DModel: typeof Load3DModel;
    readonly TextHelper: typeof TextHelper;
    readonly ButtonHelper: typeof ButtonHelper;
    readonly Keyboard: typeof Keyboard;
    readonly InputField: typeof InputField;
    readonly FONT_MAP: {
        readonly 'inter-inter-italic-variablefont-opsz,wght': string;
        readonly 'inter-inter-variablefont-opsz,wght': string;
        readonly 'inter-18pt-black': string;
        readonly 'inter-18pt-blackitalic': string;
        readonly 'inter-18pt-bold': string;
        readonly 'inter-18pt-bolditalic': string;
        readonly 'inter-18pt-extrabold': string;
        readonly 'inter-18pt-extrabolditalic': string;
        readonly 'inter-18pt-extralight': string;
        readonly 'inter-18pt-extralightitalic': string;
        readonly 'inter-18pt-light': string;
        readonly 'inter-18pt-lightitalic': string;
        readonly 'inter-18pt-medium': string;
        readonly 'inter-18pt-mediumitalic': string;
        readonly 'inter-18pt-regular': string;
        readonly 'inter-18pt-semibold': string;
        readonly 'inter-18pt-semibolditalic': string;
        readonly 'space-grotesk-spacegrotesk-variablefont-wght': string;
        readonly 'space-grotesk-bold': string;
        readonly 'space-grotesk-light': string;
        readonly 'space-grotesk-medium': string;
        readonly 'space-grotesk-regular': string;
        readonly 'space-grotesk-semibold': string;
    };
};
/**
 * Inferred type of L3, useful if you need to annotate it elsewhere.
 */
export type L3Exports = typeof L3;
/**
 * Named exports (preferred for tree-shaking and modular use).
 */
export { Template, PerformanceHelper, Register, Load3DModel, TextHelper, ButtonHelper, Keyboard, InputField, FONT_MAP };
