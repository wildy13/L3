import { Attributes, System } from 'ecsy';
export declare class InputFieldSystem extends System {
    private oldField?;
    init(attributes?: Attributes): void;
    execute(delta: number, time: number): void;
}
