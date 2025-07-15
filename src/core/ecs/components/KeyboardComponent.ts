import { Component, Types } from 'ecsy';
import { InputField } from 'helpers/InputField';
import { Keyboard } from 'helpers/Keyboard';

export class KeyboardComponent extends Component<KeyboardComponent> {
    state: 'none' | 'pressed' | 'hover' = 'none';
    wasPressed: boolean = false;
    inputField?: InputField;
    keyboard?: Keyboard;
}

KeyboardComponent.schema = {
    state: { type: Types.String, default: 'none' },
    wasPressed: { type: Types.Boolean, default: false },
    inputField: { type: Types.Ref, default: null },
    keyboard: { type: Types.Ref, default: null },
};
