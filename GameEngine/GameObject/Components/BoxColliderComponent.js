define(["require", "exports", "./ColliderComponent"], function (require, exports, ColliderComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoxColliderComponent extends ColliderComponent_1.ColliderComponent {
        collideWith(collider) {
            if (collider instanceof BoxColliderComponent) {
                return this.collideBetweenBoxColliders(collider);
            }
        }
        collideBetweenBoxColliders(collider) {
            let aX = this.origin.transform.position.x;
            let aY = this.origin.transform.position.y;
            let aZ = this.origin.transform.position.z;
            let bX = collider.origin.transform.position.x;
            let bY = collider.origin.transform.position.y;
            let bZ = collider.origin.transform.position.z;
            //check the X axis
            if (Math.abs(aX - bX) < this.xSize + collider.xSize) {
                //check the Y axis
                if (Math.abs(aY - bY) < this.ySize + collider.ySize) {
                    //check the Z axis
                    if (Math.abs(aZ - bZ) < this.zSize + collider.zSize) {
                        return true;
                    }
                }
            }
            return false;
        }
        onCollisionEnter(other) {
        }
        constructor(go) {
            super(go);
            this.xSize = 1;
            this.ySize = 1;
            this.zSize = 1;
        }
        get xSize() {
            return this._xSize;
        }
        get ySize() {
            return this._ySize;
        }
        get zSize() {
            return this._zSize;
        }
        set xSize(size) {
            this._xSize = size;
        }
        set ySize(size) {
            this._ySize = size;
        }
        set zSize(size) {
            this._zSize = size;
        }
        collide(collider) {
            if (collider instanceof BoxColliderComponent) {
                return collider.collideWith(this);
            }
            //other colliders
        }
        awake() {
        }
        start() {
        }
        update() {
        }
        destroy() {
        }
    }
    exports.BoxColliderComponent = BoxColliderComponent;
});
//# sourceMappingURL=BoxColliderComponent.js.map