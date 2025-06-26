import { ColorRepresentation, Material } from 'three'
export interface TextOptions {
    font?: string
    fontSize?: number
    fontStyle?: 'italic' | 'normal'
    fontWeight?: 'normal' | 'weight'
    lang?: string
    letterSpacing?: number
    lineHeight?: number
    maxWidth?: number
    overflowWrap?: 'normal' | 'break-word'
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    anchorX?: 'left' | 'center' | 'right' | number
    anchorY?: 'top' | 'top-baseline' | 'top-cap' | 'top-ex' | 'middle' | 'bottom' | 'bottom-baseline' | number
    color?: ColorRepresentation
    curveRadius?: number
    depthOffset?: number
    direction?: 'auto' | 'ltr' | 'rtl'
    outlineWidth?: number | string
    outlineColor?: ColorRepresentation
    outlineOpacity?: number
    outlineBlur?: number
    strokeWidth?: number | string
    strokeColor?: ColorRepresentation
    strokeOpacity?: number
    whiteSpace?: 'normal' | 'nowrap' | 'pre-wrap'
    fillOpacity?: number
    backgroundColor?: ColorRepresentation
    backgroundOpacity?: number
    padding?: number | string
    material?: Material
    sdfGlyphSize?: number
}
