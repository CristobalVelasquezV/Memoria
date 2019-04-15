define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IComponent {
        get origin() {
            return this.originGo;
        }
        constructor(go) {
            this.originGo = go;
            this.enabled = true;
        }
    }
    exports.IComponent = IComponent;
});
//# sourceMappingURL=IComponent.js.map