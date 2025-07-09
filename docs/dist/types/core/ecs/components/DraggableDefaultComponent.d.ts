import { Audio } from 'three';
import { Component } from 'ecsy';
export declare class DraggableDefaultComponent extends Component<DraggableDefaultComponent> {
    state?: 'none' | 'attached' | 'detached' | 'to-be-attached' | 'to-be-detached' | 'to-be-draggable';
    originalParent?: any;
    attachedPointer?: any;
    clickSound?: Audio;
    isClickSound?: boolean;
    hoverSound?: Audio;
    isHoverSound?: boolean;
}
