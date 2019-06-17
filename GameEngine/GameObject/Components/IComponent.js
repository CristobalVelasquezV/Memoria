define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IComponent {
        /**
         * GameObject that the component belongs.
         * @returns
         */
        get origin() {
            return this.originGo;
        }
        set origin(go) {
            this.originGo = go;
        }
        constructor(go) {
            this.originGo = go;
            this.originGo.addComponent(this);
            this.enabled = true;
        }
        onCollisionEnter(other) {
        }
        onCollision(other) {
        }
        onCollisionExit(other) {
        }
        fixedUpdate() {
        }
    }
    exports.IComponent = IComponent;
});
//# sourceMappingURL=IComponent.js.map