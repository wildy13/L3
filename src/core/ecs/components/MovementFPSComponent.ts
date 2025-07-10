import { Group, Vector3 } from 'three';
import { Component, Types } from 'ecsy';

export class MovementFPSComponent extends Component<MovementFPSComponent> {
    player: Group | any = null;
}

MovementFPSComponent.schema = {
    player: { type: Types.Ref, default: null },
};
