import { Group } from 'three';
import { Component } from 'ecsy';
export declare class MovementFPSComponent extends Component<MovementFPSComponent> {
    player: Group | any;
    state: 'none' | 'walk';
    axesX: number;
    axesZ: number;
    speed: number;
}
