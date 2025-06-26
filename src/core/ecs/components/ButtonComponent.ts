import { Component, Types } from "ecsy";
import { Audio } from "three";

export class ButtonComponent extends Component<ButtonComponent> {
    currState: string = 'none';
    prevState: string = 'none';
    isScaled: boolean = false;
    clickSound?: Audio;
    isClickSound?: boolean = false;
    hoverSound?: Audio;
    isHoverSound?: boolean = false;
    onClick: () => void = () => { };
}

ButtonComponent.schema = {
    currState: { type: Types.String, default: 'none' },
    prevState: { type: Types.String, default: 'none' },
    isScaled: { type: Types.Boolean, default: false },
    clickSound: { type: Types.Ref, default: null },
    isClickSound: { type: Types.Boolean, default: false },
    hoverSound: { type: Types.Ref, default: null },
    isHoverSound: { type: Types.Boolean, default: false },
    onClick: { type: Types.Ref, default: () => { } }
};
