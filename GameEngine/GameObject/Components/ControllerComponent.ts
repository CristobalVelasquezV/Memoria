import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Input, KeyCode } from "../../Input/Input";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { ColliderComponent } from "./ColliderComponent";
import { CollectableComponent } from "./CollectableComponent";
import { Time } from "../../Time/Time";
import { Engine } from "../../Engine/Engine";
/**
 * Test Component for moving a GameObject
 * @param {GameObject} go
 */
export class ControllerComponent extends IComponent {

    constructor(go: GameObject) {
        super(go);
    }
    awake(): void {

    }
    start(): void {

    }
    private totalCollectables: number = 0;
    private xAxis: number = 0;
    private yAxis: number = 0;
    private isJumping: boolean = false;
    update(): void {
        if (Input.isKeyPressed(KeyCode.KEY_J)) {
            this.origin.transform.position.addVector(new Vector3(0.1, 0, 0));
            this.xAxis = 1;
        }

        if (Input.isKeyPressed(KeyCode.KEY_L)) {
            this.origin.transform.position.addVector(new Vector3(-0.1, 0, 0));
            this.xAxis = -1;
        }
        if (Input.isKeyPressed(KeyCode.KEY_I)) {
            this.yAxis = 1;
            this.origin.transform.position.addVector(new Vector3(0, 0, 0.1));
        }
        if (Input.isKeyPressed(KeyCode.KEY_K)) {
            this.yAxis = 1;
            this.origin.transform.position.addVector(new Vector3(0, 0, -0.1));
        }

        if (Input.isKeyDown(KeyCode.SPACE) && this.isJumping == false) {
            console.log("add jump corutine");
            Engine.addCorutine(this.Gen());
        }
        

        if (!Input.isKeyPressed(KeyCode.KEY_J) && !Input.isKeyPressed(KeyCode.KEY_L) && (Input.isKeyPressed(KeyCode.KEY_I) || Input.isKeyPressed(KeyCode.KEY_K))) {
            this.xAxis = 0;
        }
        if (!Input.isKeyPressed(KeyCode.KEY_I) && !Input.isKeyPressed(KeyCode.KEY_K) && (Input.isKeyPressed(KeyCode.KEY_J) || Input.isKeyPressed(KeyCode.KEY_L))) {
            this.yAxis = 90;
        }
        let vet: Vector3 = new Vector3(this.xAxis, 0, this.yAxis);
        this.origin.transform.forward = vet;
    }

    public onCollisionEnter(other: ColliderComponent): void {
        console.log("oncollitionEnter: " + other.origin.gameObjectName);
        let collectable: CollectableComponent = other.origin.getComponentTest<CollectableComponent>(CollectableComponent);
        if (collectable != null) {
            console.log("Its collectable!");
            this.totalCollectables++;
        }
    }

    public onCollision(other: ColliderComponent): void {
        //console.log("oncollition: "+other.origin.gameObjectName);
    }

    public onCollisionExit(other: ColliderComponent): void {
        //console.log("oncollitionExit: " + other.origin.gameObjectName);
    }

    destroy(): void {
   
    }

    * Gen() {
        this.isJumping = true;
        let initialPos: Vector3 = this.origin.transform.position;
        console.log("in jumping corutine");
        while ( this.origin.transform.position.y < 5) {
            this.origin.transform.position.addVector(new Vector3(0, 0.1, 0));
            yield;
        }
        while (this.origin.transform.position.y > 0) {
            this.origin.transform.position.addVector(new Vector3(0, -0.1, 0));
            yield;
        }
        this.isJumping = false;
    }


}