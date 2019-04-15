define(["require", "exports", "./AbstractUniformInformation", "../../Matrix-gl/Mat4", "../gl/GLManager"], function (require, exports, AbstractUniformInformation_1, Mat4_1, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformWorldPosition extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
        }
        loadUniform() {
            let position = this.bufferAdmin.renderComponent.origin.transform.position;
            let mPosition = Mat4_1.Mat4.fromTranslation(position);
            GLManager_1.gl.uniformMatrix4fv(this.location, false, mPosition.getArray());
        }
    }
    exports.UniformWorldPosition = UniformWorldPosition;
});
//# sourceMappingURL=UniformWorldPosition.js.map