define(["require", "exports", "./ColliderComponent"], function (require, exports, ColliderComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoxColliderComponent extends ColliderComponent_1.ColliderComponent {
        collideWith(colllider) {
            throw new Error("Method not implemented.");
        }
        constructor(go) {
            super(go);
            this.xSize = 1;
            this.ySize = 1;
            this.zSize = 1;
            go.addComponent(this);
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
//# sourceMappingURL=BoundingBoxComponent.js.map