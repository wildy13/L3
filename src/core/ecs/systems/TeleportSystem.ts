import { Attributes, System } from 'ecsy';
import { TeleportComponent } from '../components/TeleportComponent';
import { Quaternion } from 'three';

export class TeleportSystem extends System {
    init(attributes?: Attributes): void { }

    execute(delta: number, time: number): void {
        this.queries.teleport.results.forEach(entity => {
            const component = entity.getMutableComponent(TeleportComponent);

            if (!component?.baseReferenceSpace || !component?.renderer?.xr || !component?.point) return;

            switch (component?.state) {
                case 'teleport':
                    const offsetPosition = { x: - component.point?.x, y: - component.point?.y, z: - component.point?.z, w: 1 };
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
