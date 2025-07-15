import { Group, WebGLRenderer } from 'three';
import { Component, Types, World } from 'ecsy';

export class ControllerComponent extends Component<ControllerComponent> {
    controllers: Group[] = [];
    renderer: WebGLRenderer | any = null;
    world!: World
}

ControllerComponent.schema = {
    controllers: { type: Types.Array, default: [] },
    renderer: { type: Types.Ref, default: null },
    world: { type: Types.Ref, default: null },
};