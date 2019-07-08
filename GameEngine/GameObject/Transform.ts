import { Vector3 } from "../Matrix-gl/Vector3";
import { Quaternion } from "../Matrix-gl/Quaternion";
import { GameObject } from "./GameObject";
import { ColliderComponent } from "./Components/ColliderComponent";
import { Mat4 } from "../Matrix-gl/Mat4";
import { Physics } from "../Physics/Physics";
/**
 * Transform class belongs to every GameObject and determine precisely his position,scale and rotation in the game space.
 * @returns
 */
export class Transform {
    /**
     * Position of a GameObject Transform.
     * @returns
     */

    private _position: Vector3;
    private  _origin: GameObject;

    public get position(): Vector3 {
        return this._position;
    }

    public set position(pos: Vector3) {
        let coll = this.origin.getComponentTest<ColliderComponent>(ColliderComponent);
        if (coll !== null && coll !== undefined && !coll.isTrigger) {
            if (coll.inCollitionWithSomeOne() == false) {
                let oldPost: Vector3 = this._position;
                this._position = pos;
                if (coll.inCollitionWithSomeOne()) {
                    this._position = oldPost;
                }
                else {
                    coll.onCollition = false;
                }
            }
            else {
                coll.onCollition = false;
                this._position = pos;
            }
        }
        else {
            this._position = pos;
        }
    }

    public get origin(): GameObject {
        return this._origin;
    }
   
    /**
     * Scale of a GameObject Transform.
     * @returns
     */
    public scale: Vector3;

    private _rotation: Quaternion;


    private _forward: Vector3;
    /**
     * Up vector of a GameObjects Transform.
     * @returns
     */
    private _up: Vector3;
    /**
     * Right vector of a GameObject Transform.
     * @returns
     */
    private _right: Vector3;
    
    /**
     * rotation of a GameObject in Quaternions
     * @returns
     */
    public get rotation(): Quaternion {
        return this._rotation;
    }

    public set rotation(q: Quaternion) {
        this._rotation = q;
        //let mat: Mat4 = Mat4.fromQuaternion(this._rotation);
        //this._forward = Vector3.transformMat4(this._forward, mat);
        this.reAlignForward();
    }
    /**
     * Forward vector of a GameObject Transform.
     * @returns
     */
    public get forward(): Vector3 {
        return this._forward;
    }

    public get up(): Vector3 {
        return this._up;
    }

    public set up(newup: Vector3) {
        this._up = newup;
       // this.reAlign(); up
        
    }

    public get right(): Vector3 {
        return this._right;
    }

    public set right(newright: Vector3) {
        this._right = newright;
       // this.reAlign(); right
    }

    public set forward(newForward: Vector3) {
        //console.log("forward setting :" + this.forward.toString() + " " + newForward.toString());
        this._forward = newForward;
        this.reAlignForward();
        this._rotation = Quaternion.setAxis(this._forward, this._right, this._up).normalize();
    }

    constructor(origin:GameObject,position: Vector3 = new Vector3(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1),
        lookAt: Vector3 = new Vector3(0, 0, 1), up: Vector3 = new Vector3(0, 1, 0)) {
        this._origin = origin;
        this._rotation = Quaternion.identity;
        this.position = position;
        this.scale = scale;
        this._forward = Vector3.substract(lookAt, this.position).normalize();
        this._right = Vector3.cross(this._forward, up).normalize();
        this._up = Vector3.cross(this._right, this._forward).normalize();
    }
    /**
     * ReAlign the direction vectors of the object.
     */
    public reAlignForward(): void {
        this._forward = this._forward.normalize();
        this._right = Vector3.cross(this._forward, this._up).normalize();
        this._up = Vector3.cross(this._right, this._forward).normalize();
        //fix rotation.
    }
    /**
     * Rotate the objects transform in rad angles by the X axis.
     * @param {number} rad
     */
    public rotateX(rad: number): void {
        this._rotation.rotateX(rad);
        let mat: Mat4 = Mat4.fromQuaternion(this._rotation);
        this._forward = Vector3.transformMat4(this._forward, mat);
        this._up = Vector3.transformMat4(this._up, mat);
        this.reAlignForward();
    }
    /**
     * Rotate the objects transform in rad angles by the Y axis.
     * @param {number} rad
     */
    public rotateY(rad: number): void {
        this._rotation.rotateY(rad);
        let mat: Mat4 = Mat4.fromQuaternion(this._rotation);
        this._forward = Vector3.transformMat4(this._forward, mat);
        this._up = Vector3.transformMat4(this._up, mat);
        this.reAlignForward();
    }
    /**
     * Rotate the objects transform in rad angles by the Z axis.
     * @param {number} rad
     */
    public rotateZ(rad: number): void {
        this._rotation.rotateZ(rad);
        let mat: Mat4 = Mat4.fromQuaternion(this._rotation);
        this._forward = Vector3.transformMat4(this._forward, mat);
        this._up = Vector3.transformMat4(this._up, mat);
        this.reAlignForward();
    }
}
