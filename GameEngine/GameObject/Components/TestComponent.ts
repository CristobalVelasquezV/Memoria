import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Time } from "../../Time/Time";
import { Engine } from "../../Engine/Engine";
import { SceneManager } from "../../Scenes/SceneManager";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { ColliderComponent } from "./ColliderComponent";

export class TestComponent extends IComponent{

    public cube: GameObject;
    public finalposition: Vector3 = new Vector3(10, 10, 10);
    constructor(go: GameObject) {
        super(go);
    }
    awake(): void {
        this.cube = SceneManager.actualScene.getGameObject("cube");
    }

    start(): void {
        let g = this.Gen();
        console.log("add corutine");
        Engine.addCorutine(g);
    }
    update(): void {
      
    }
    destroy(): void {
        throw new Error("Method not implemented.");
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

