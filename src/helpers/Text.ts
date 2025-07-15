import { Text } from 'troika-three-text';
import * as THREE from 'three';
import { TextOptions } from '../types/text-options.type';
import { FONT_MAP } from 'constant/font.map';



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
    options = {},
  }: {
    text: string;
    options?: Partial<TextOptions>; // <= buat optional + partial juga boleh
  }): Text {
    const {
      maxWidth = 1,
      color = new THREE.Color(0xffffff),
      font = 'space-grotesk-regular',
      fontWeight = 'normal',
      fontStyle = 'normal',
      fontSize = 0.015,
      anchorX = 'center',
      anchorY = 'top',
      whiteSpace = 'normal',
      overflowWrap = 'break-word',
      direction = 'ltr',
      textAlign = 'left',
      lang = 'en',
    } = options;

    this.content.text = text;
    this.content.fontWeight = fontWeight as 'normal' | 'bold';
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

    if (font) {
      this.content.font = FONT_MAP[font] ?? font;
    }

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
}
