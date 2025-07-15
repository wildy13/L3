import { Group, WebGLRenderer } from 'three';
import { Component, World } from 'ecsy';
export declare class ControllerComponent extends Component<ControllerComponent> {
    controllers: Group[];
    renderer: WebGLRenderer | any;
    world: World;
}
