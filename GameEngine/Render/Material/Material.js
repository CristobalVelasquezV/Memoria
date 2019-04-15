define(["require", "exports", "../AbstractProgram/BasicNoTextureMeshShader"], function (require, exports, BasicNoTextureMeshShader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Material {
        //add color later
        constructor(name, texture, absProgram) {
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
        get program() {
            return this.usedProgram;
        }
        get texture() {
            return this.usedTexture;
        }
    }
    exports.Material = Material;
});
//# sourceMappingURL=Material.js.map