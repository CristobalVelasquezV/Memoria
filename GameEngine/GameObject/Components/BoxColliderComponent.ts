import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { ColliderComponent } from "./ColliderComponent";

export class BoxColliderComponent extends ColliderComponent {



    public collideWith(collider: ColliderComponent): boolean {
        if (collider instanceof BoxColliderComponent) {
            return this.collideBetweenBoxColliders(collider);
        }
    }

    public collideBetweenBoxColliders(collider: BoxColliderComponent): boolean {
        let aX: number = this.origin.transform.position.x;
        let aY: number = this.origin.transform.position.y;
        let aZ: number = this.origin.transform.position.z;

        let bX: number = collider.origin.transform.position.x;
        let bY: number = collider.origin.transform.position.y;
        let bZ: number = collider.origin.transform.position.z;

        //check the X axis
        if (Math.abs(aX - bX) < this.xSize  + collider.xSize ) {
            //check the Y axis
            if (Math.abs(aY - bY) < this.ySize  + collider.ySize ) {
                //check the Z axis
                if (Math.abs(aZ - bZ) < this.zSize + collider.zSize) {
                    return true;
                }
            }
        }
        return false;
    }

    onCollisionEnter(other: ColliderComponent): void {

    }

    private _xSize: number;
    private _ySize: number;
    private _zSize: number;


    public constructor(go: GameObject) {
        super(go);
        this.xSize = 1;
        this.ySize = 1;
        this.zSize = 1;
    }



    public get xSize(): number {
        return this._xSize
    }

    public get ySize(): number {
        return this._ySize
    }

    public get zSize(): number {
        return this._zSize
    }

    public set xSize(size: number) {
        this._xSize = size;
    }

    public set ySize(size: number) {
        this._ySize = size;
    }

    public set zSize(size: number) {
        this._zSize = size;
    }

    public collide(collider: ColliderComponent): boolean {
        if (collider instanceof BoxColliderComponent) {
            return collider.collideWith(this);
        }
        //other colliders
    }



    awake(): void {

    }

    start(): void {

    }
    update(): void {

    }
    destroy(): void {

    }


}