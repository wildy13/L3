import { Attributes, System } from 'ecsy';
import { ButtonComponent } from '../components/ButtonComponent';
import { Object3DComponent } from '../components/Object3DComponent';

export class ButtonSystem extends System {
    init(attributes?: Attributes): void { }

    execute(delta: number, time: number): void {
        this.queries.button.results.forEach(entity => {
            const button = entity.getMutableComponent(ButtonComponent);
            const object = entity.getComponent(Object3DComponent)?.object;

            switch (button?.currState) {
                case 'pressed':
                    if (typeof button.onClick === 'function') {
                        button.onClick();
                    }

                    if (!button.isClickSound) {
                        button.clickSound?.play();
                        button.isClickSound = true;
                    }
                    break;

                case 'hovered':
                    if (object && !button.isScaled) {
                        object.scale.set(1.1, 1.1, 1.1);
                        button.isScaled = true;
                    }

                    if (!button.isHoverSound) {
                        button.hoverSound?.play();
                        button.isHoverSound = true;
                    }
                    break;

                case 'released':
                    if (button.isClickSound) button.isClickSound = false;
                    break;

                default:
                    if (object && button?.isScaled) {
                        object.scale.set(1, 1, 1);
                        button.isScaled = false;
                    }

                    if(button?.isHoverSound) button.isHoverSound = false;
                    break;
            }

            if (button && button.prevState !== button.currState) {
                button.prevState = button.currState;
            }
        });
    }

}

ButtonSystem.queries = {
    button: {
        components: [ButtonComponent]
    }
};
