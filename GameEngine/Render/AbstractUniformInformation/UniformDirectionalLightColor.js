define(["require", "exports", "./AbstractUniformInformation", "../gl/GLManager", "../../GameObject/Components/DirectionalLightComponent", "../../Matrix-gl/Vector3"], function (require, exports, AbstractUniformInformation_1, GLManager_1, DirectionalLightComponent_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * UniformDirectionalLightColor handles the setting of the Color of the directional Light each update.
     * @param {WebGLUniformLocation} location
     * @param {UniformType} type
     * @param {AbstractBufferAdministrator} bufferAdmin
     */
    class UniformDirectionalLightColor extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
            //default Value
            this.default = new Vector3_1.Vector3(0, 0, 0);
        }
        /**
         * Loads the Directional Light Color Uniforms each frame in case that there is a DirectionalLight in the Scene, it only works with one directional
         *  * Light.
         */
        loadUniform() {
            let light = DirectionalLightComponent_1.DirectionalLightComponent.getFirstLight();
            if (light !== null && light !== undefined) {
                let color = light.lightColor;
                GLManager_1.gl.uniform3fv(this.location, color.toArray());
            }
            else {
                GLManager_1.gl.uniform3fv(this.location, this.default.toArray());
            }
        }
    }
    exports.UniformDirectionalLightColor = UniformDirectionalLightColor;
});
//# sourceMappingURL=UniformDirectionalLightColor.js.map