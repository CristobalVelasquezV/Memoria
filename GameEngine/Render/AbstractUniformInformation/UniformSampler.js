define(["require", "exports", "./AbstractUniformInformation"], function (require, exports, AbstractUniformInformation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UniformSampler extends AbstractUniformInformation_1.AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            super(location, type, bufferAdmin);
        }
        loadUniform() {
            let texture = this.bufferAdmin.renderComponent.material.texture;
            if (texture !== null) {
                texture.activateAndBind();
            }
        }
    }
    exports.UniformSampler = UniformSampler;
});
//# sourceMappingURL=UniformSampler.js.map