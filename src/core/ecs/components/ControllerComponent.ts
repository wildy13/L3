import { Group, WebGLRenderer } from 'three';
import { Component, Types } from 'ecsy';

export class ControllerComponent extends Component<ControllerComponent> {
    controllers: Group[] = [];
    renderer: WebGLRenderer | any = null;
}

ControllerComponent.schema = {
    controllers: { type: Types.Array, default: [] },
    renderer: { type: Types.Ref, default: null }
};
