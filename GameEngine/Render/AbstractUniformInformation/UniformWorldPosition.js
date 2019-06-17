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
            let rotation = this.bufferAdmin.renderComponent.origin.transform.rotation;
            if (this.bufferAdmin.renderComponent.origin.gameObjectName == "go2") {
                //console.log(position.toString());
                //console.log(rotation.toString());
            }
            let mRotation = Mat4_1.Mat4.fromQuaternion(rotation);
            mPosition = Mat4_1.Mat4.multiply(mPosition, mRotation);
            GLManager_1.gl.uniformMatrix4fv(this.location, false, mPosition.getArray());
        }
    }
    exports.UniformWorldPosition = UniformWorldPosition;
});
//# sourceMappingURL=UniformWorldPosition.js.map