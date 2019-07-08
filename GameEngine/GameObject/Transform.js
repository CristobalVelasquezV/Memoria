define(["require", "exports", "../Matrix-gl/Vector3", "../Matrix-gl/Quaternion", "./Components/ColliderComponent", "../Matrix-gl/Mat4"], function (require, exports, Vector3_1, Quaternion_1, ColliderComponent_1, Mat4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Transform class belongs to every GameObject and determine precisely his position,scale and rotation in the game space.
     * @returns
     */
    class Transform {
        get position() {
            return this._position;
        }
        set position(pos) {
            let coll = this.origin.getComponentTest(ColliderComponent_1.ColliderComponent);
            if (coll !== null && coll !== undefined && !coll.isTrigger) {
                if (coll.inCollitionWithSomeOne() == false) {
                    let oldPost = this._position;
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
        get origin() {
            return this._origin;
        }
        /**
         * rotation of a GameObject in Quaternions
         * @returns
         */
        get rotation() {
            return this._rotation;
        }
        set rotation(q) {
            this._rotation = q;
            //let mat: Mat4 = Mat4.fromQuaternion(this._rotation);
            //this._forward = Vector3.transformMat4(this._forward, mat);
            this.reAlignForward();
        }
        /**
         * Forward vector of a GameObject Transform.
         * @returns
         */
        get forward() {
            return this._forward;
        }
        get up() {
            return this._up;
        }
        set up(newup) {
            this._up = newup;
            // this.reAlign(); up
        }
        get right() {
            return this._right;
        }
        set right(newright) {
            this._right = newright;
            // this.reAlign(); right
        }
        set forward(newForward) {
            //console.log("forward setting :" + this.forward.toString() + " " + newForward.toString());
            this._forward = newForward;
            this.reAlignForward();
            this._rotation = Quaternion_1.Quaternion.setAxis(this._forward, this._right, this._up).normalize();
        }
        constructor(origin, position = new Vector3_1.Vector3(0, 0, 0), scale = new Vector3_1.Vector3(1, 1, 1), lookAt = new Vector3_1.Vector3(0, 0, 1), up = new Vector3_1.Vector3(0, 1, 0)) {
            this._origin = origin;
            this._rotation = Quaternion_1.Quaternion.identity;
            this.position = position;
            this.scale = scale;
            this._forward = Vector3_1.Vector3.substract(lookAt, this.position).normalize();
            this._right = Vector3_1.Vector3.cross(this._forward, up).normalize();
            this._up = Vector3_1.Vector3.cross(this._right, this._forward).normalize();
        }
        /**
         * ReAlign the direction vectors of the object.
         */
        reAlignForward() {
            this._forward = this._forward.normalize();
            this._right = Vector3_1.Vector3.cross(this._forward, this._up).normalize();
            this._up = Vector3_1.Vector3.cross(this._right, this._forward).normalize();
            //fix rotation.
        }
        /**
         * Rotate the objects transform in rad angles by the X axis.
         * @param {number} rad
         */
        rotateX(rad) {
            this._rotation.rotateX(rad);
            let mat = Mat4_1.Mat4.fromQuaternion(this._rotation);
            this._forward = Vector3_1.Vector3.transformMat4(this._forward, mat);
            this._up = Vector3_1.Vector3.transformMat4(this._up, mat);
            this.reAlignForward();
        }
        /**
         * Rotate the objects transform in rad angles by the Y axis.
         * @param {number} rad
         */
        rotateY(rad) {
            this._rotation.rotateY(rad);
            let mat = Mat4_1.Mat4.fromQuaternion(this._rotation);
            this._forward = Vector3_1.Vector3.transformMat4(this._forward, mat);
            this._up = Vector3_1.Vector3.transformMat4(this._up, mat);
            this.reAlignForward();
        }
        /**
         * Rotate the objects transform in rad angles by the Z axis.
         * @param {number} rad
         */
        rotateZ(rad) {
            this._rotation.rotateZ(rad);
            let mat = Mat4_1.Mat4.fromQuaternion(this._rotation);
            this._forward = Vector3_1.Vector3.transformMat4(this._forward, mat);
            this._up = Vector3_1.Vector3.transformMat4(this._up, mat);
            this.reAlignForward();
        }
    }
    exports.Transform = Transform;
});
//# sourceMappingURL=Transform.js.map