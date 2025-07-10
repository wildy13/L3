import { Attributes, System } from "ecsy";
import { MovementFPSComponent } from "../components/MovementFPSComponent";
import { Vector3 } from "three";


export class MovementFPSSystem extends System {
    movement: Vector3 = new Vector3();

    init(attributes?: Attributes): void {
        this.movement = new Vector3();
    }

    execute(delta: number, time: number): void {
        this.queries.movement.results.forEach(entity => {
            const component = entity.getMutableComponent(MovementFPSComponent);

            switch (component?.state) {
                case 'walk': {
                    this.movement = new Vector3(component.axesX, 0, component.axesZ);
                    this.movement.normalize();
                    this.movement.multiplyScalar(component.speed);
                    this.movement.applyAxisAngle(new Vector3(0, 1, 0), component.player.rotation.y);

                    const nextPosition = component.player.position.clone().add(this.movement);
                    component.player.position.copy(nextPosition);

                    if (Math.abs(component.axesX) > 0.1) component.player.rotation.y -= component.axesX * component.speed;
                    break;
                }

                default:
                    break;
            }
        });
    }
}

MovementFPSSystem.queries = {
    movement: {
        components: [MovementFPSComponent]
    }
}