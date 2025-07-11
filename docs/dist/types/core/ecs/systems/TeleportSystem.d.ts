import { Attributes, System } from 'ecsy';
export declare class TeleportSystem extends System {
    init(attributes?: Attributes): void;
    execute(delta: number, time: number): void;
}
