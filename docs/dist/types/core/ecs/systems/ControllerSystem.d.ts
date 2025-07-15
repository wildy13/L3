import { Attributes, System } from 'ecsy';
export declare class ControllerSystem extends System {
    private previousButtonStates;
    private inputField?;
    init(attributes?: Attributes): void;
    execute(delta: number, time: number): void;
    private _onHover;
    private _onUnhover;
    private _handleJoystic;
    private _updateLine;
    private _resetLine;
    private _updateColor;
    private _handleButton;
    private _StartTeleport;
    private _StartAction;
    private _EndAction;
    private _handleSnap;
    private _handleSelect;
    private _getIntersections;
}
