import { Template } from './template/index';
import { PerformanceHelper } from './helpers/Performance';
import { Register } from './core/Register';
import { TextHelper } from './helpers/Text';
import { ButtonHelper } from './helpers/Button';
import { Load3DModel } from 'core/Load3DModel';
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
};
/**
 * Inferred type of L3, useful if you need to annotate it elsewhere.
 */
export type L3Exports = typeof L3;
/**
 * Named exports (preferred for tree-shaking and modular use).
 */
export { Template, PerformanceHelper, Register, Load3DModel, TextHelper, ButtonHelper };
