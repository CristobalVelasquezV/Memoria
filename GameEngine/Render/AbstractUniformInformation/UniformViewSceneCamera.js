define(["require", "exports", "./AbstractUniformInformation", "../Camera/Camera", "../gl/GLManager"], function (require, exports, AbstractUniformInformation_1, Camera_1, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformViewSceneCamera extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
        }
        loadUniform() {
            GLManager_1.gl.uniformMatrix4fv(this.location, false, Camera_1.Camera.instance.getViewMatrix().getArray());
        }
    }
    exports.UniformViewSceneCamera = UniformViewSceneCamera;
});
//# sourceMappingURL=UniformViewSceneCamera.js.map