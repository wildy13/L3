import { Attributes, System } from 'ecsy';
import { Object3DComponent } from '../components/Object3DComponent';
import { InputFieldComponent } from '../components/InputFieldComponent';
import { InputField } from 'helpers/InputField';
import { KeyboardComponent } from '../components/KeyboardComponent';

export class InputFieldSystem extends System {
    private oldField?: InputField;

    init(attributes?: Attributes): void {

    }

    execute(delta: number, time: number): void {
        this.queries.inputField.results.forEach(entity => {
            const component = entity.getMutableComponent(InputFieldComponent);
            const object = entity.getComponent(Object3DComponent)?.object;

            switch (component?.state) {
                case 'active': {
                    if (object?.parent instanceof InputField) {
                        if (this.oldField) this.oldField.setFocus(false);

                        this.oldField = object.parent;
                        this.oldField.setFocus(true);

                        for (const entity of this.queries.keyboard.results) {
                            const component = entity.getMutableComponent(KeyboardComponent);
                            if (component) {
                                component.inputField = this.oldField;
                                component?.keyboard?.setActiveInputField(this.oldField);
                            }
                        }
                    }
                }
            }
        });
    }

}

InputFieldSystem.queries = {
    inputField: {
        components: [InputFieldComponent]
    },
    keyboard: {
        components: [KeyboardComponent]
    }
};
