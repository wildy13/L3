import { Text } from 'troika-three-text';
import { TextOptions } from '../types/text-options.type';
/**
 * A utility class for managing and creating styled 3D text using troika-three-text.
 */
export declare class TextHelper {
    readonly content: Text;
    constructor();
    /**
     * Configures and returns a styled Text instance.
     * @param params - The text string and its style options.
     * @returns Configured Text instance.
     */
    set({ text, options: { maxWidth, color, fontFamily, fontWeight, fontStyle, fontSize, anchorX, anchorY, whiteSpace, overflowWrap, direction, textAlign, lang, }, }: {
        text: string;
        options: TextOptions;
    }): Text;
    /**
     * Updates the text content.
     * @param params - New text string to update.
     */
    change({ text }: {
        text: string;
    }): void;
    /**
     * Resolves the font path based on the given family, weight, and style.
     * Logs a warning and falls back if the combination is not found.
     * @param font - Font family key.
     * @param weight - Font weight variant.
     * @param style - Font style variant.
     * @returns Resolved font path.
     */
    private _resolveFontPath;
}
