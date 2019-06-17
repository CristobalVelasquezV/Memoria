import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";

export class CameraComponent extends IComponent {


    constructor(go: GameObject) {
        super(go);
    }

    awake(): void {
        throw new Error("Method not implemented.");
    }
    start(): void {
        throw new Error("Method not implemented.");
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }


}
