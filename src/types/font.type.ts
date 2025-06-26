export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
export type FontStyle = 'normal' | 'italic'
export type FontFamily =
    | 'space-grotesk'
    | 'inter-18pt'
    | 'inter-24pt'
    | 'inter-28pt'
    | 'roboto'
    | 'roboto-condensed'
    | 'roboto-semicondensed'

export interface FontVariant {
    weight: FontWeight
    style: FontStyle
    path: string
}

export type FontRegistry = Record<FontFamily, FontVariant[]>