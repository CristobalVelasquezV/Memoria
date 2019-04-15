define(["require", "exports", "../Matrix-gl/Vector3"], function (require, exports, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Transform {
        constructor(position = new Vector3_1.Vector3(0, 0, 0), scale = new Vector3_1.Vector3(1, 1, 1), lookAt = new Vector3_1.Vector3(0, 0, 0), up = new Vector3_1.Vector3(0, 1, 0)) {
            this.position = position;
            this.scale = scale;
            this.forward = Vector3_1.Vector3.substract(lookAt, this.position).normalize();
            this.right = Vector3_1.Vector3.cross(this.forward, up).normalize();
            this.up = Vector3_1.Vector3.cross(this.right, this.forward).normalize();
        }
    }
    exports.Transform = Transform;
});
//# sourceMappingURL=Transform.js.map