import { Group } from 'three';
import { Component } from 'ecsy';
export declare class MovementFPSComponent extends Component<MovementFPSComponent> {
    player: Group | any;
    axesX: number;
    axesZ: number;
    isWalking: boolean;
    isRotating: boolean;
    speed: number;
}
