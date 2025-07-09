import { Audio } from 'three';
import { Component, Types } from 'ecsy';

export class DraggableDefaultComponent extends Component<DraggableDefaultComponent> {
    state?: 'none' | 'attached' | 'detached' | 'to-be-attached' | 'to-be-detached' | 'to-be-draggable' = 'none';
    originalParent?: any = null;
    attachedPointer?: any = null;
    clickSound?: Audio;
    isClickSound?: boolean = false;
    hoverSound?: Audio;
    isHoverSound?: boolean = false;
}

DraggableDefaultComponent.schema = {
    state: { type: Types.String, default: 'none' },
    originalParent: { type: Types.Ref, default: null },
    attachedPointer: { type: Types.Ref, default: null },
    clickSound: { type: Types.Ref, default: null },
    isClickSound: { type: Types.Boolean, default: false },
    hoverSound: { type: Types.Ref, default: null },
    isHoverSound: { type: Types.Boolean, default: false },
};
