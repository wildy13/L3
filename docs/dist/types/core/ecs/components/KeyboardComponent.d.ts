import { Component } from 'ecsy';
import { InputField } from 'helpers/InputField';
import { Keyboard } from 'helpers/Keyboard';
export declare class KeyboardComponent extends Component<KeyboardComponent> {
    state: 'none' | 'pressed' | 'hover';
    wasPressed: boolean;
    inputField?: InputField;
    keyboard?: Keyboard;
}
