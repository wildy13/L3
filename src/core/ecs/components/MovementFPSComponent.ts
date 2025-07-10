import { Group, Vector3 } from 'three';
import { Component, Types } from 'ecsy';

export class MovementFPSComponent extends Component<MovementFPSComponent> {
    player: Group | any = null;
    state: 'none' | 'walk' = 'none';
    axesX: number = 0;
    axesZ: number = 0;
    speed: number = 0.025;
}

MovementFPSComponent.schema = {
    player: { type: Types.Ref, default: null },
    state: { type: Types.String, default: 'none' },
    axesX: { type: Types.Number, default: 0 },
    axesZ: { type: Types.Number, default: 0 },
    speed: { type: Types.Number, default: 0.25 }
};
