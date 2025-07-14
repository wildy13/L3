import { Attributes, System } from 'ecsy';
import { Object3DComponent } from '../components/Object3DComponent';
import { KeyboardComponent } from '../components/KeyboardComponent';
import { Keyboard } from 'helpers/Keyboard';

export class KeyboardSystem extends System {
    init(attributes?: Attributes): void { }

    execute(delta: number, time: number): void {
        this.queries.keyboard.results.forEach(entity => {
            const keyboard = entity.getMutableComponent(KeyboardComponent);
            const object = entity.getComponent(Object3DComponent)?.object;

            switch (keyboard?.state) {
                case 'pressed': {
                    if (!keyboard.wasPressed) {
                        keyboard.wasPressed = true;
                        if (object?.parent instanceof Keyboard) {
                            object.parent.handleKeyPress(object.userData.label);
                        }
                    }
                    break;
                }

                case 'hover': {
                    if (object && object.scale.x !== 1.2) {
                        object.scale.set(1.2, 1.2, 1.2);
                    }
                    break;
                }

                default: {
                    if (object && object.scale.x !== 1) {
                        object.scale.set(1, 1, 1);
                    }
                }
            }
        });
    }

}

KeyboardSystem.queries = {
    keyboard: {
        components: [KeyboardComponent]
    }
};
