import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Input, KeyCode } from "../../Input/Input";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { ColliderComponent } from "./ColliderComponent";
import { CollectableComponent } from "./CollectableComponent";
import { Time } from "../../Time/Time";
import { Engine } from "../../Engine/Engine";
import { SceneManager } from "../../Scenes/SceneManager";
import { Camera } from "../../Render/Camera/Camera";
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
        Engine.addCorutine(this.falling());
    }
    private totalCollectables: number = 0;
    private xAxis: number = 0;
    private yAxis: number = 0;
    private readonly finalSceneIndex: number = 1;
    private isJumping: boolean = false;
    private isFalling: boolean = false;

    private jVector: Vector3 = new Vector3(0.1, 0, 0);
    private lVector: Vector3 = new Vector3(-0.1, 0, 0);
    private iVector: Vector3 = new Vector3(0, 0, 0.1);
    private kVector: Vector3 = new Vector3(0, 0, -0.1);

    private upVector: Vector3 = new Vector3(0, 0.3, 0);
    private downVector: Vector3 = new Vector3(0, -0.1, 0);
    update(): void {
        
        if (Input.isKeyPressed(KeyCode.KEY_J)) {
            this.origin.transform.position = Vector3.add(this.origin.transform.position, this.jVector);
            this.xAxis = 1;
        }

        if (Input.isKeyPressed(KeyCode.KEY_L)) {
            this.origin.transform.position = Vector3.add(this.origin.transform.position, this.lVector);
            this.xAxis = -1;
        }
        if (Input.isKeyPressed(KeyCode.KEY_I)) {
            this.yAxis = 1;
            this.origin.transform.position = Vector3.add(this.origin.transform.position, this.iVector);
        }
        if (Input.isKeyPressed(KeyCode.KEY_K)) {
            this.yAxis = -1;
            this.origin.transform.position = Vector3.add(this.origin.transform.position, this.kVector);
        }

        if (Input.isKeyDown(KeyCode.SPACE) && this.isJumping == false) {
            Engine.addCorutine(this.jump());
        }
        

        if (!Input.isKeyPressed(KeyCode.KEY_J) && !Input.isKeyPressed(KeyCode.KEY_L) && (Input.isKeyPressed(KeyCode.KEY_I) || Input.isKeyPressed(KeyCode.KEY_K))) {
            this.xAxis = 0;
        }
        if (!Input.isKeyPressed(KeyCode.KEY_I) && !Input.isKeyPressed(KeyCode.KEY_K) && (Input.isKeyPressed(KeyCode.KEY_J) || Input.isKeyPressed(KeyCode.KEY_L))) {
            this.yAxis = 0;
        }
        let vet: Vector3 = new Vector3(this.xAxis, 0, this.yAxis);
       // this.origin.transform.forward = vet;
    }

    public onTriggerEnter(other: ColliderComponent): void {
        console.log("oncollitionEnter: " + other.origin.gameObjectName);
        let collectable: CollectableComponent = other.origin.getComponentTest<CollectableComponent>(CollectableComponent);
        if (collectable != null) {
            console.log("Its collectable!");
            this.totalCollectables++;
            GameObject.Destroy(other.origin);
            if (this.totalCollectables == 5) {
                console.log("END of Game");
                SceneManager.changeScene(this.finalSceneIndex);
                Camera.instance.setPosition(new Vector3(0, 0, -30));
            }
        }
    }

    public onTrigger(other: ColliderComponent): void {
        console.log("oncollition: "+other.origin.gameObjectName);
    }

    public onCollisionExit(other: ColliderComponent): void {
        console.log("oncollitionExit: " + other.origin.gameObjectName);
    }

    destroy(): void {
   
    }

    * jump() {
        this.isJumping = true;
        let collider: ColliderComponent = this.origin.getComponentTest<ColliderComponent>(ColliderComponent);
        let initialPos: Vector3 = this.origin.transform.position;
        while (this.origin.transform.position.y < 5 + initialPos.y) {
            this.origin.transform.position = Vector3.add(this.origin.transform.position, this.upVector);
            yield;
        }
    }

    *falling() {
        let collider: ColliderComponent = this.origin.getComponentTest<ColliderComponent>(ColliderComponent);
        while (true) {
            if (collider.onCollition || this.origin.transform.position.y <= 0.5) {
                this.isJumping = false;
            }
            else {
                this.isJumping = true;
            }
            if (!(this.origin.transform.position.y <= 0.5)) {
                this.origin.transform.position = Vector3.add(this.origin.transform.position, this.downVector);
            }
            yield;
        }
    }


}