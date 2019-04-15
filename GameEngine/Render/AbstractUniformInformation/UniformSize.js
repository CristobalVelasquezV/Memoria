define(["require", "exports", "./AbstractUniformInformation", "../../Matrix-gl/Mat4", "../gl/GLManager"], function (require, exports, AbstractUniformInformation_1, Mat4_1, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformSize extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
        }
        loadUniform() {
            let mSize = Mat4_1.Mat4.fromScaling(this.bufferAdmin.renderComponent.origin.transform.scale);
            GLManager_1.gl.uniformMatrix4fv(this.location, false, mSize.getArray());
        }
    }
    exports.UniformSize = UniformSize;
});
//# sourceMappingURL=UniformSize.js.map