import { Component } from 'ecsy';
export declare class KeyboardComponent extends Component<KeyboardComponent> {
    state: 'none' | 'pressed' | 'hover';
    wasPressed: boolean;
}
