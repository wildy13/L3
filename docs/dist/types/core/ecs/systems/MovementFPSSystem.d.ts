import { Attributes, System } from "ecsy";
import { Vector3 } from "three";
export declare class MovementFPSSystem extends System {
    movement: Vector3;
    init(attributes?: Attributes): void;
    execute(delta: number, time: number): void;
}
