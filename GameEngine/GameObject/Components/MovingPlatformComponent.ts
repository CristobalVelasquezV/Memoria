import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { Time } from "../../Time/Time";
import { Engine } from "../../Engine/Engine";

export class MovingPlatformComponent extends IComponent{

    private initialPosition: Vector3;
    private movingTo: Vector3;

    constructor(go: GameObject, moving: Vector3) {
        super(go);
        this.initialPosition = this.origin.transform.position;
        this.movingTo = moving;
    }

    awake(): void {
        
    }
    start(): void {
        Engine.addCorutine(this.moving());
    }
    update(): void {
        
    }
    destroy(): void {
        
    }

    * moving() {
        let timeToComplete = 5000;
        let totalTime = 0;
        let t: number = 0;
        while (true) {
            t = 0;
            totalTime = 0;
            while (t <= 1) {
                this.origin.transform.position = Vector3.lerp(this.initialPosition, this.movingTo, t);
                totalTime += Time.deltaTime;
                t = totalTime / timeToComplete;
                yield;
            }
            t = 0;
            totalTime = 0;
            while (t <= 1) {
                this.origin.transform.position = Vector3.lerp(this.movingTo, this.initialPosition, t);
                totalTime += Time.deltaTime;
                t = totalTime / timeToComplete;
                yield;
            }
            yield;
        }
    }




}