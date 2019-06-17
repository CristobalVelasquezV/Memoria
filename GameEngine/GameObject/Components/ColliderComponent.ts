import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { SceneManager } from "../../Scenes/SceneManager";


export abstract class ColliderComponent extends IComponent {

    private _isTrigger: boolean;
    private _onCollition: boolean;
    private _colliderId: number;

    private inCollition: { [id: number]: ColliderComponent } = {};

    public addCollition(collider: ColliderComponent): void {
        let coll: ColliderComponent = this.inCollition[collider.colliderId];
        if (coll === undefined || coll === null) {
            this.inCollition[collider.colliderId] = collider;
        }
    }

    public deleteCollition(collider: ColliderComponent): void {
        delete this.inCollition[collider.colliderId];
    }

    public inCollitionWith(coll: ColliderComponent): boolean {
        if (this.inCollition[coll.colliderId] !== undefined && this.inCollition[coll.colliderId] !== null) {
            return true;
        }
        return false;
    }

    public numberCollitions(): number {
        return Object.keys(this.inCollition).length;
    }


    public get onCollition(): boolean {
        return this._onCollition;
    }

    public set onCollition(collition: boolean) {
        this._onCollition = collition;
    }

    public set colliderId(id: number) {
        this._colliderId = id;
    }

    public get colliderId(): number {
        return this._colliderId;
    }

    constructor(go: GameObject) {
        super(go);
        this._isTrigger = true;
        SceneManager.actualScene.putCollider(this);
    }

    public get isTrigger(): boolean {
        return this._isTrigger;
    }

    public set isTrigger(trigger: boolean) {
        this._isTrigger = trigger;
    }

    public collide(collider: ColliderComponent): boolean {
        return false;
    }

    public destroy(): void {
       
    }

    public abstract collideWith(collider: ColliderComponent): boolean;
}