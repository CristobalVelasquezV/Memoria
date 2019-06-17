define(["require", "exports", "./AbstractUniformInformation", "../../Matrix-gl/Mat4", "../gl/GLManager"], function (require, exports, AbstractUniformInformation_1, Mat4_1, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformRotation extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
        }
        loadUniform() {
            let rotation = this.bufferAdmin.renderComponent.origin.transform.rotation;
            let mRotation = Mat4_1.Mat4.fromQuaternion(rotation);
            GLManager_1.gl.uniformMatrix4fv(this.location, false, mRotation.getArray());
        }
    }
    exports.UniformRotation = UniformRotation;
});
//# sourceMappingURL=UniformRotation.js.map