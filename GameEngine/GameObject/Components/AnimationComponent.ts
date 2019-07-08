import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Time } from "../../Time/Time";
import { Engine } from "../../Engine/Engine";
import { SceneManager } from "../../Scenes/SceneManager";
import { Vector3 } from "../../Matrix-gl/Vector3";

export class AnimationComponent extends IComponent{
    public finalposition: Vector3 = new Vector3(10, 10, 10);
    constructor(go: GameObject) {
        super(go);
    }
    awake(): void {

    }

    start(): void {
        let g = this.Gen();
        Engine.addCorutine(g);
    }
    update(): void {
      
    }
    destroy(): void {
    }


    * Gen() {
    let t: number = 10000;
    let totalTime: number = 0;
        while (totalTime < t) {
            this.origin.transform.position.addVector(new Vector3(0.01, 0.01, 0.01));
            this.origin.transform.rotateY(0.01);
        totalTime += Time.deltaTime;
        yield;
    }
    console.log("termino corrutina");
}
 
}

