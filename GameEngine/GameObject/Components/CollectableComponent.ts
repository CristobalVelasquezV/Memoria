﻿import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";

export class CollectableComponent extends IComponent {

    public constructor(go: GameObject) {
        super(go);
    }

    awake(): void {
        
    }
    start(): void {
        
    }
    update(): void {
        
    }
    destroy(): void {
        
    }

    fixedUpdate(): void {
        this.origin.transform.rotateY(0.02);
    }


}