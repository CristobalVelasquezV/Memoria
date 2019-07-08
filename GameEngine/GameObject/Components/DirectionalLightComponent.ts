import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Vector3 } from "../../Matrix-gl/Vector3";

export class DirectionalLightComponent extends IComponent {

    private static allLights: DirectionalLightComponent[] = [];
    private directionLightColor: Vector3;

    constructor(go: GameObject) {
        super(go);
        this.directionLightColor = new Vector3(0.9,0.9,0.9);
        DirectionalLightComponent.allLights.push(this);
    }

    public set lightColor(color: Vector3){
        this.directionLightColor = color;
    }

    public get lightColor(): Vector3 {
        return this.directionLightColor;
    }


    awake(): void {
        
    }
    start(): void {

    }
    update(): void {
        
    }
    destroy(): void {
      
    }

    public static getFirstLight(): DirectionalLightComponent | null {
        return this.allLights[0];
    }
}