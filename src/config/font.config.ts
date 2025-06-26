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
console.log(import.meta.url);
export const fontRegistry: FontRegistry = {
    'space-grotesk': [
        { weight: 'regular', style: 'normal', path: new URL('./assets/fonts/Space_Grotesk/static/SpaceGrotesk-Regular.ttf', import.meta.url).href },
        { weight: 'light', style: 'normal', path: new URL('./assets/fonts/Space_Grotesk/static/SpaceGrotesk-Light.ttf', import.meta.url).href },
        { weight: 'bold', style: 'normal', path: new URL('./assets/fonts/Space_Grotesk/static/SpaceGrotesk-Bold.ttf', import.meta.url).href },
        { weight: 'medium', style: 'normal', path: new URL('./assets/fonts/Space_Grotesk/static/SpaceGrotesk-Medium.ttf', import.meta.url).href },
        { weight: 'semibold', style: 'normal', path: new URL('./assets/fonts/Space_Grotesk/static/SpaceGrotesk-SemiBold.ttf', import.meta.url).href },
    ],
    'inter-18pt': generateInterVariants(new URL('./assets/fonts/Inter/static/Inter_18pt-', import.meta.url)),
    'inter-24pt': generateInterVariants(new URL('./assets/fonts/Inter/static/Inter_24pt-', import.meta.url)),
    'inter-28pt': generateInterVariants(new URL('./assets/fonts/Inter/static/Inter_28pt-', import.meta.url)),
    'roboto': [
        { weight: 'regular', style: 'normal', path: new URL('./assets/fonts/Roboto/static/Roboto-Regular.ttf', import.meta.url).href },
        { weight: 'bold', style: 'normal', path: new URL('./assets/fonts/Roboto/static/Roboto-Bold.ttf', import.meta.url).href },
        { weight: 'light', style: 'italic', path: new URL('./assets/fonts/Roboto/static/Roboto-LightItalic.ttf', import.meta.url).href },
    ],
    'roboto-condensed': [
        { weight: 'regular', style: 'normal', path: new URL('./assets/fonts/Roboto/static/Roboto_Condensed-Regular.ttf', import.meta.url).href },
        { weight: 'bold', style: 'italic', path: new URL('./assets/fonts/Roboto/static/Roboto_Condensed-BoldItalic.ttf', import.meta.url).href },
    ],
    'roboto-semicondensed': [
        { weight: 'regular', style: 'normal', path: new URL('./assets/fonts/Roboto/static/Roboto_SemiCondensed-Regular.ttf', import.meta.url).href },
    ],
};
