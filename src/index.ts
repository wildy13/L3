// Core modules and utilities
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
export const L3 = {
    Template,
    PerformanceHelper,
    Register,
    Load3DModel,
    TextHelper,
    ButtonHelper,
    Keyboard,
    InputField,
    FONT_MAP
} as const;

/**
 * Inferred type of L3, useful if you need to annotate it elsewhere.
 */
export type L3Exports = typeof L3;

/**
 * Named exports (preferred for tree-shaking and modular use).
 */
export {
    Template,
    PerformanceHelper,
    Register,
    Load3DModel,
    TextHelper,
    ButtonHelper,
    Keyboard,
    InputField,
    FONT_MAP
};
