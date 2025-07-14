import { Component, Types } from 'ecsy';
export class KeyboardComponent extends Component<KeyboardComponent> {
    state: 'none' | 'pressed' | 'hover' = 'none';
    wasPressed: boolean = false;
}

KeyboardComponent.schema = {
    state: { type: Types.String, default: 'none' },
    wasPressed: { type: Types.Boolean, default: false }
};
