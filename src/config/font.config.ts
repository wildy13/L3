import { FontRegistry, FontVariant } from "../types/font.type";

function generateInterVariants(basePath: URL): FontVariant[] {
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
    ];

    return variants.map(([weight, style, filename]) => ({
        weight,
        style,
        path: new URL(`${filename}.ttf`, basePath).href,
    }));
}

const assetBase = new URL('./assets/fonts/', import.meta.url);

export const fontRegistry: FontRegistry = {
    'space-grotesk': [
        { weight: 'regular', style: 'normal', path: new URL('Space_Grotesk/static/SpaceGrotesk-Regular.ttf', assetBase).href },
        { weight: 'light', style: 'normal', path: new URL('Space_Grotesk/static/SpaceGrotesk-Light.ttf', assetBase).href },
        { weight: 'bold', style: 'normal', path: new URL('Space_Grotesk/static/SpaceGrotesk-Bold.ttf', assetBase).href },
        { weight: 'medium', style: 'normal', path: new URL('Space_Grotesk/static/SpaceGrotesk-Medium.ttf', assetBase).href },
        { weight: 'semibold', style: 'normal', path: new URL('Space_Grotesk/static/SpaceGrotesk-SemiBold.ttf', assetBase).href },
    ],
    'inter-18pt': generateInterVariants(new URL('Inter/static/Inter_18pt-', assetBase)),
    'inter-24pt': generateInterVariants(new URL('Inter/static/Inter_24pt-', assetBase)),
    'inter-28pt': generateInterVariants(new URL('Inter/static/Inter_28pt-', assetBase)),
    'roboto': [
        { weight: 'regular', style: 'normal', path: new URL('Roboto/static/Roboto-Regular.ttf', assetBase).href },
        { weight: 'bold', style: 'normal', path: new URL('Roboto/static/Roboto-Bold.ttf', assetBase).href },
        { weight: 'light', style: 'italic', path: new URL('Roboto/static/Roboto-LightItalic.ttf', assetBase).href },
    ],
    'roboto-condensed': [
        { weight: 'regular', style: 'normal', path: new URL('Roboto/static/Roboto_Condensed-Regular.ttf', assetBase).href },
        { weight: 'bold', style: 'italic', path: new URL('Roboto/static/Roboto_Condensed-BoldItalic.ttf', assetBase).href },
    ],
    'roboto-semicondensed': [
        { weight: 'regular', style: 'normal', path: new URL('Roboto/static/Roboto_SemiCondensed-Regular.ttf', assetBase).href },
    ],
};
