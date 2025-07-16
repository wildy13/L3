import { Component, Types } from "ecsy";
import { InputField } from "helpers/InputField";

export class InputFieldComponent extends Component<InputFieldComponent> {
    // Field?: InputField;
    state?: 'none' | 'active';
}

InputFieldComponent.schema = {
    // Field: { type: Types.Ref, default: null },
    state: { type: Types.String, default: 'none' },
};
