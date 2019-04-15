define(["require", "exports", "./IComponent"], function (require, exports, IComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CameraComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
        }
        awake() {
            throw new Error("Method not implemented.");
        }
        start() {
            throw new Error("Method not implemented.");
        }
        update() {
            throw new Error("Method not implemented.");
        }
        destroy() {
            throw new Error("Method not implemented.");
        }
    }
    exports.CameraComponent = CameraComponent;
});
//# sourceMappingURL=CameraComponent.js.map