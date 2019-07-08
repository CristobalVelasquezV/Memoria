import { GameObject } from "../GameObject";
import { ColliderComponent } from "./ColliderComponent";

export abstract class IComponent {
    /**
     * Component Enabled to work.
     * @returns
     */
    public enabled: boolean;

    private originGo: GameObject;
    /**
     * GameObject that the component belongs.
     * @returns
     */
    public get origin(): GameObject {
        return this.originGo;
    }

    public set origin(go: GameObject) {
        this.originGo = go;
    }

    constructor(go: GameObject) {
        this.originGo = go;
        this.originGo.addComponent(this);
        this.enabled = true;
    }
    /**Awake first call of the Game engine*/
    abstract awake(): void;
    /**Start second call of the engine every thing must be initialized by this point.*/
    abstract start(): void;
    /**Update called each frame.*/
    abstract update(): void;
    /**destroy a component could require specific code.*/
    abstract destroy(): void;

    public onTriggerEnter(other: ColliderComponent): void {

    }

    public onTrigger(other: ColliderComponent): void {

    }

    public onTriggerExit(other: ColliderComponent): void {

    }

    public fixedUpdate(): void {

    }
}
