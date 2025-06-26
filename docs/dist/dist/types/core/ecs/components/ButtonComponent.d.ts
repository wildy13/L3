import { Component } from "ecsy";
import { Audio } from "three";
export declare class ButtonComponent extends Component<ButtonComponent> {
    currState: string;
    prevState: string;
    isScaled: boolean;
    clickSound?: Audio;
    isClickSound?: boolean;
    hoverSound?: Audio;
    isHoverSound?: boolean;
    onClick: () => void;
}
