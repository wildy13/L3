import { Group, Vector3 } from 'three';
import { Component, Types } from 'ecsy';

export class MovementFPSComponent extends Component<MovementFPSComponent> {
    player: Group | any = null;
    //state: 'none' | 'walk' | 'rotation' = 'none';
    axesX: number = 0;
    axesZ: number = 0;
    isWalking: boolean = false;
    isRotating: boolean = false;
    speed: number = 0.025;
}

MovementFPSComponent.schema = {
    player: { type: Types.Ref, default: null },
    //state: { type: Types.String, default: 'none' },
    axesX: { type: Types.Number, default: 0 },
    axesZ: { type: Types.Number, default: 0 },
    isWalking: {type: Types.Boolean, default: false},
    isRotating: {type: Types.Boolean, default: false},
    speed: { type: Types.Number, default: 0.25 }
};
