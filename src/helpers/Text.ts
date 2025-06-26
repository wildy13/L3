import { Text } from 'troika-three-text';
import * as THREE from 'three';
import { FontFamily, FontStyle, FontWeight } from '../types/font.type';
import { fontRegistry } from '../config/font.config';
import { TextOptions } from '../types/text-options.type';

/**
 * A utility class for managing and creating styled 3D text using troika-three-text.
 */
export class TextHelper {
  public readonly content: Text;

  constructor() {
    this.content = new Text();
  }

  /**
   * Configures and returns a styled Text instance.
   * @param params - The text string and its style options.
   * @returns Configured Text instance.
   */
  public set({
    text,
    options: {
      maxWidth = 1,
      color = new THREE.Color(0xffffff),
      fontFamily = 'space-grotesk',
      fontWeight = 'regular',
      fontStyle = 'normal',
      fontSize = 0.015,
      anchorX = 'center',
      anchorY = 'top',
      whiteSpace = 'normal',
      overflowWrap = 'break-word',
      direction = 'ltr',
      textAlign = 'left',
      lang = 'en',
    },
  }: {
    text: string;
    options: TextOptions;
  }): Text {
    this.content.text = text;
    this.content.fontSize = fontSize;
    this.content.fontStyle = fontStyle;
    this.content.textAlign = textAlign;
    this.content.overflowWrap = overflowWrap;
    this.content.whiteSpace = whiteSpace;
    this.content.anchorX = anchorX;
    this.content.anchorY = anchorY;
    this.content.direction = direction;
    this.content.lang = lang;
    this.content.maxWidth = maxWidth * 0.9;
    this.content.color = color;

    this.content.font = this._resolveFontPath(fontFamily, fontWeight, fontStyle);

    this.content.sync();
    return this.content;
  }

  /**
   * Updates the text content.
   * @param params - New text string to update.
   */
  public change({ text }: { text: string }): void {
    this.content.text = text;
    this.content.sync();
  }

  /**
   * Resolves the font path based on the given family, weight, and style.
   * Logs a warning and falls back if the combination is not found.
   * @param font - Font family key.
   * @param weight - Font weight variant.
   * @param style - Font style variant.
   * @returns Resolved font path.
   */
  private _resolveFontPath(font: FontFamily, weight: FontWeight, style: FontStyle): string {
    const variants = fontRegistry[font];
    console.log(variants)
    if (!variants || variants.length === 0) {
      console.warn(`[TextHelper] Font family '${font}' not found in registry.`);
      return '';
    }

    const matched = variants.find(v => v.weight === weight && v.style === style);

    if (!matched) {
      console.warn(
        `[TextHelper] Variant for '${font}' with weight='${weight}' and style='${style}' not found. Using fallback.`
      );
    }

    return matched?.path ?? variants[0].path;
  }
}
