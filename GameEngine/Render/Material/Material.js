define(["require", "exports", "../AbstractProgram/BasicNoTextureMeshShader"], function (require, exports, BasicNoTextureMeshShader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Material {
        constructor(name, texture, absProgram) {
            this.renderComponentsUsingMat = [];
            this.materialName = name;
            if (absProgram === undefined) {
                this.usedProgram = BasicNoTextureMeshShader_1.BasicNoTextureMeshShader.program;
            }
            else {
                this.usedProgram = absProgram;
            }
            if (texture == undefined) {
                //add default texture pink
                this.usedTexture = null;
            }
            else {
                this.usedTexture = texture;
            }
        }
        addRenderComponent(render) {
            // needs id to delete later.
        }
        get program() {
            return this.usedProgram;
        }
        set program(prog) {
            this.usedProgram = prog;
        }
        get texture() {
            return this.usedTexture;
        }
    }
    exports.Material = Material;
});
//# sourceMappingURL=Material.js.map