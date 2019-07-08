define(["require", "exports", "./IComponent"], function (require, exports, IComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CollectableComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
        }
        awake() {
        }
        start() {
        }
        update() {
        }
        destroy() {
        }
        fixedUpdate() {
            this.origin.transform.rotateY(0.02);
        }
    }
    exports.CollectableComponent = CollectableComponent;
});
//# sourceMappingURL=CollectableComponent.js.map