import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Time } from "../../Time/Time";
import { Engine } from "../../Engine/Engine";

export class TestComponent extends IComponent{
    constructor(go: GameObject) {
        super(go);
        go.addComponent(this);
    }
    awake(): void {
        throw new Error("Method not implemented.");
    }

    start(): void {
        let g = Gen();
        console.log("add corutine");
        Engine.addCorutine(g);
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }

    *generation(): IterableIterator<any> {
        let t: number = 5;
        let totalTime: number = 0;
        while (totalTime < t) {
            console.log("en la corutina");
            totalTime += Time.deltaTime;
            yield totalTime;
        }
        console.log("termino corrutina");
     }
 
}

function* Gen() {
    let t: number = 10000;
    let totalTime: number = 0;
    while (totalTime < t) {
        totalTime += Time.deltaTime;
        //console.log("en la corutina");
        yield;
    }
   // console.log("termino corrutina");
}