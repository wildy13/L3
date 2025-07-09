import { Attributes, System } from 'ecsy';
export declare class ControllerSystem extends System {
    previousButtonStates: {
        left: boolean[];
        right: boolean[];
    };
    init(attributes?: Attributes): void;
    execute(delta: number, time: number): void;
    private _updateLine;
    private _resetLine;
    private _updateColor;
    private _handleButton;
    private _StartAction;
    private _EndAction;
    private _handleSnap;
    private _handleSelect;
    private _onHover;
    private _onUnhover;
    private _getIntersections;
}
