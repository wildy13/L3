import { Attributes, System } from 'ecsy';
import { Object3DComponent } from '../components/Object3DComponent';
import { MathUtils, Quaternion, Vector3 } from 'three';
import { DraggableDefaultComponent } from '../components/DraggableDefaultComponent';

export class DraggableDefaultSystem extends System {
    init(attributes?: Attributes): void { }

    execute(delta: number, time: number): void {
        this.queries.draggableReturn.results.forEach(entity => {
            const draggable = entity.getMutableComponent(DraggableDefaultComponent);
            const object = entity.getComponent(Object3DComponent)?.object;
           
            if (draggable?.originalParent === null) draggable.originalParent = object?.parent;
            /*         
            if (draggable?.originalPosition?.equals(new Vector3())) {
                const globalPosition = new Vector3();
                object?.updateWorldMatrix(true, true);
                object?.getWorldPosition(globalPosition);
                draggable.originalPosition = draggable.originalParent.worldToLocal(globalPosition.clone());
            }
            */

            if (draggable?.originalQuaternion?.equals(new Quaternion())) object?.quaternion.clone();

            switch (draggable?.state) {
                case 'to-be-attached':
                    draggable?.attachedPointer.attach(object);
                    draggable.state = 'attached';
                    break;
                case 'to-be-detached':
                    draggable.originalParent.attach(object);
                    draggable.state = 'detached';
                    break;
                case 'to-be-draggable':
                    if (!object?.position) break;

                    /*
                    object?.position.copy(draggable.originalPosition);
                    object?.quaternion.copy(draggable?.originalQuaternion);

                    object?.updateMatrixWorld(true);
                    */
                    object.position.z = MathUtils.damp(object?.position.z, (draggable.attachedPointer.position.z - 0.5), 0.1, 0.6);
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

DraggableDefaultSystem.queries = {
    draggableReturn: {
        components: [DraggableDefaultComponent]
    }
};
