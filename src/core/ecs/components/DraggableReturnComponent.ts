import { Audio, Quaternion, Vector3 } from 'three';
import { Component, Types } from 'ecsy';

export class DraggableReturnComponent extends Component<DraggableReturnComponent> {
    state?: 'none' | 'attached' | 'detached' | 'to-be-attached' | 'to-be-detached' | 'to-be-draggable' = 'none';
    originalParent?: any = null;
    attachedPointer?: any = null;
    clickSound?: Audio;
    isClickSound?: boolean = false;
    hoverSound?: Audio;
    isHoverSound?: boolean = false;
    originalPosition: Vector3 = new Vector3(0, 0, 0);
    originalQuaternion: Quaternion = new Quaternion(0, 0, 0);
}

DraggableReturnComponent.schema = {
    state: { type: Types.String, default: 'none' },
    originalParent: { type: Types.Ref, default: null },
    attachedPointer: { type: Types.Ref, default: null },
    clickSound: { type: Types.Ref, default: null },
    isClickSound: { type: Types.Boolean, default: false },
    hoverSound: { type: Types.Ref, default: null },
    isHoverSound: { type: Types.Boolean, default: false },
    originalPosition: { type: Types.Ref, default: null },
    originalQuaternion: { type: Types.Ref, default: null },
};
