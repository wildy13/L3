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
    set({ text, options, }: {
        text: string;
        options?: Partial<TextOptions>;
    }): Text;
    /**
     * Updates the text content.
     * @param params - New text string to update.
     */
    change({ text }: {
        text: string;
    }): void;
}
