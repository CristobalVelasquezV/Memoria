define(["require", "exports", "./AbstractUniformInformation", "../gl/GLManager", "../../Scenes/SceneManager"], function (require, exports, AbstractUniformInformation_1, GLManager_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Uniform that handles AmbientLight uniform setting each frame.
     * @param {WebGLUniformLocation} location
     * @param {UniformType} type
     * @param {AbstractBufferAdministrator} bufferAdmin
     */
    class UniformAmbientLight extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
        }
        /**
         * Loads the ambient light intensity of the Scene.
         */
        loadUniform() {
            let ambient = SceneManager_1.SceneManager.actualScene.ambientLightIntencity;
            GLManager_1.gl.uniform3fv(this.location, ambient.toArray());
        }
    }
    exports.UniformAmbientLight = UniformAmbientLight;
});
//# sourceMappingURL=UniformAmbientLight.js.map