import { FontRegistry, FontVariant } from "../types/font.type";

function generateInterVariants(basePath: string): FontVariant[] {
    const variants: [FontVariant['weight'], FontVariant['style'], string][] = [
        ['thin', 'normal', 'Thin'],
        ['thin', 'italic', 'ThinItalic'],
        ['extralight', 'normal', 'ExtraLight'],
        ['extralight', 'italic', 'ExtraLightItalic'],
        ['light', 'normal', 'Light'],
        ['light', 'italic', 'LightItalic'],
        ['regular', 'normal', 'Regular'],
        ['regular', 'italic', 'Italic'],
        ['medium', 'normal', 'Medium'],
        ['medium', 'italic', 'MediumItalic'],
        ['semibold', 'normal', 'SemiBold'],
        ['semibold', 'italic', 'SemiBoldItalic'],
        ['bold', 'normal', 'Bold'],
        ['bold', 'italic', 'BoldItalic'],
        ['extrabold', 'normal', 'ExtraBold'],
        ['extrabold', 'italic', 'ExtraBoldItalic'],
        ['black', 'normal', 'Black'],
        ['black', 'italic', 'BlackItalic'],
    ]

    return variants.map(([weight, style, filename]) => ({
        weight,
        style,
        path: `${basePath}${filename}.ttf`,
    }))
}

export const fontRegistry: FontRegistry = {
    'space-grotesk': [
        { weight: 'regular', style: 'normal', path: './assets/fonts/Space_Grotesk/static/SpaceGrotesk-Regular.ttf' },
        { weight: 'light', style: 'normal', path: './assets/fonts/Space_Grotesk/static/SpaceGrotesk-Light.ttf' },
        { weight: 'bold', style: 'normal', path: './assets/fonts/Space_Grotesk/static/SpaceGrotesk-Bold.ttf' },
        { weight: 'medium', style: 'normal', path: './assets/fonts/Space_Grotesk/static/SpaceGrotesk-Medium.ttf' },
        { weight: 'semibold', style: 'normal', path: './assets/fonts/Space_Grotesk/static/SpaceGrotesk-SemiBold.ttf' }
    ],
    'inter-18pt': generateInterVariants('./assets/fonts/Inter/static/Inter_18pt-'),
    'inter-24pt': generateInterVariants('./assets/fonts/Inter/static/Inter_24pt-'),
    'inter-28pt': generateInterVariants('./assets/fonts/Inter/static/Inter_28pt-'),
    'roboto': [
        { weight: 'regular', style: 'normal', path: './assets/fonts/Roboto/static/Roboto-Regular.ttf' },
        { weight: 'bold', style: 'normal', path: './assets/fonts/Roboto/static/Roboto-Bold.ttf' },
        { weight: 'light', style: 'italic', path: './assets/fonts/Roboto/static/Roboto-LightItalic.ttf' }
    ],
    'roboto-condensed': [
        { weight: 'regular', style: 'normal', path: './assets/fonts/Roboto/static/Roboto_Condensed-Regular.ttf' },
        { weight: 'bold', style: 'italic', path: './assets/fonts/Roboto/static/Roboto_Condensed-BoldItalic.ttf' }
    ],
    'roboto-semicondensed': [
        { weight: 'regular', style: 'normal', path: './assets/fonts/Roboto/static/Roboto_SemiCondensed-Regular.ttf' }
    ]
}