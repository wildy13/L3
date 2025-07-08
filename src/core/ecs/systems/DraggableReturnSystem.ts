import { Attributes, System } from 'ecsy';
import { Object3DComponent } from '../components/Object3DComponent';
import { DraggableReturnComponent } from '../components/DraggableReturnComponent';
import { MathUtils, Quaternion, Vector3 } from 'three';

export class DraggableReturnSystem extends System {
    init(attributes?: Attributes): void { }

    execute(delta: number, time: number): void {
        this.queries.draggableReturn.results.forEach(entity => {
            const draggable = entity.getMutableComponent(DraggableReturnComponent);
            const object = entity.getComponent(Object3DComponent)?.object;

            if (draggable?.originalParent === null) draggable.originalParent = object?.parent;

            if (draggable?.originalPosition?.equals(new Vector3())) {
                const globalPosition = new Vector3();
                object?.updateWorldMatrix(true, true);
                object?.getWorldPosition(globalPosition);
                draggable.originalPosition = draggable.originalParent.worldToLocal(globalPosition.clone());
            }

            if (draggable?.originalQuaternion?.equals(new Quaternion())) object?.quaternion.clone();

            switch (draggable?.state) {
                case 'to-be-attached':
                    draggable?.attachedPointer.attach(object);
                    draggable.state = 'attached';
                    break;
                case 'to-be-detached':
                    draggable.originalParent.attach(object);

                    object?.position.copy(draggable.originalPosition);
                    object?.quaternion.copy(draggable?.originalQuaternion);

                    object?.updateMatrixWorld(true);

                    draggable.state = 'detached';
                    break;
                case 'to-be-draggable':
                    if (!object?.position) break;

                    object.position.z = MathUtils.damp(object?.position.z, -0.3, 0.1, 0.6);
                    if (Math.abs(object.position.z - 0.1) < 0.01) {
                        draggable.state = 'attached';
                    }
                    break;
                default:
                    object?.scale.set(1, 1, 1);
            }
        });
    }

}

DraggableReturnSystem.queries = {
    draggableReturn: {
        components: [DraggableReturnComponent]
    }
};
