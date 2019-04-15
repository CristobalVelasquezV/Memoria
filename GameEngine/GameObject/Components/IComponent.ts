import { GameObject } from "../GameObject";

export abstract class IComponent {

    protected enabled: boolean;
    private originGo: GameObject;

    public get origin(): GameObject {
        return this.originGo;
    }

    constructor(go: GameObject) {
        this.originGo = go;
        this.enabled = true;
    }

    abstract awake(): void;
    abstract start(): void;
    abstract update(): void;
    abstract destroy(): void;
}
