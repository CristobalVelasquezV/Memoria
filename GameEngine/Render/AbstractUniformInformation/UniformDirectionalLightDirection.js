define(["require", "exports", "./AbstractUniformInformation", "../gl/GLManager", "../../GameObject/Components/DirectionalLightComponent", "../../Matrix-gl/Vector3"], function (require, exports, AbstractUniformInformation_1, GLManager_1, DirectionalLightComponent_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformDirectionalLightDirection extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
            this.default = new Vector3_1.Vector3(1, 1, 1);
        }
        loadUniform() {
            let light = DirectionalLightComponent_1.DirectionalLightComponent.getFirstLight();
            if (light !== null && light !== undefined) {
                let direction = light.origin.transform.forward;
                GLManager_1.gl.uniform3fv(this.location, this.default.toArray());
            }
            else {
                GLManager_1.gl.uniform3fv(this.location, this.default.toArray());
            }
        }
    }
    exports.UniformDirectionalLightDirection = UniformDirectionalLightDirection;
});
//# sourceMappingURL=UniformDirectionalLightDirection.js.map