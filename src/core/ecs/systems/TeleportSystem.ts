import { Attributes, System } from 'ecsy';
import { Object3DComponent } from '../components/Object3DComponent';
import { TeleportComponent } from '../components/TeleportComponent';
import { Quaternion } from 'three';

export class TeleportSystem extends System {
    init(attributes?: Attributes): void { }

    execute(delta: number, time: number): void {
        this.queries.teleport.results.forEach(entity => {
            const component = entity.getMutableComponent(TeleportComponent);
            const object = entity.getComponent(Object3DComponent)?.object;

            switch (component?.state) {
                case 'teleport':
                    const offsetPosition = { x: - component.point.x, y: - component.point.y, z: - component.point.z, w: 1 };
                    const offsetRotation = new Quaternion();
                    const transform = new XRRigidTransform(offsetPosition, offsetRotation);
                    const teleportSpaceOffset = component.baseReferenceSpace.getOffsetReferenceSpace(transform);

                    component?.renderer?.xr?.setReferenceSpace(teleportSpaceOffset);

                    component.state = 'none';
                    break;
            }
        });
    }

}

TeleportSystem.queries = {
    teleport: {
        components: [TeleportComponent]
    }
};
