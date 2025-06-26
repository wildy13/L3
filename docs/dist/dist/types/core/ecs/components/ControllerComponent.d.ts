import { Group, WebGLRenderer } from 'three';
import { Component } from 'ecsy';
export declare class ControllerComponent extends Component<ControllerComponent> {
    controllers: Group[];
    renderer: WebGLRenderer | any;
}
