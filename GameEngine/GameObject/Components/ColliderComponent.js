define(["require", "exports", "./IComponent", "../../Scenes/SceneManager"], function (require, exports, IComponent_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ColliderComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
            this.inCollition = {};
            this._isTrigger = true;
            SceneManager_1.SceneManager.actualScene.putCollider(this);
        }
        addCollition(collider) {
            let coll = this.inCollition[collider.colliderId];
            if (coll === undefined || coll === null) {
                this.inCollition[collider.colliderId] = collider;
            }
        }
        deleteCollition(collider) {
            delete this.inCollition[collider.colliderId];
        }
        inCollitionWith(coll) {
            if (this.inCollition[coll.colliderId] !== undefined && this.inCollition[coll.colliderId] !== null) {
                return true;
            }
            return false;
        }
        numberCollitions() {
            return Object.keys(this.inCollition).length;
        }
        get onCollition() {
            return this._onCollition;
        }
        set onCollition(collition) {
            this._onCollition = collition;
        }
        set colliderId(id) {
            this._colliderId = id;
        }
        get colliderId() {
            return this._colliderId;
        }
        get isTrigger() {
            return this._isTrigger;
        }
        set isTrigger(trigger) {
            this._isTrigger = trigger;
        }
        collide(collider) {
            return false;
        }
        destroy() {
        }
    }
    exports.ColliderComponent = ColliderComponent;
});
//# sourceMappingURL=ColliderComponent.js.map