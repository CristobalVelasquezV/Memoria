define(["require", "exports", "./IComponent", "../../Render/Material/Material"], function (require, exports, IComponent_1, Material_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RenderableComponent extends IComponent_1.IComponent {
        constructor(go, mesh, material) {
            super(go);
            if (mesh !== undefined) {
                this.mesh = mesh;
            }
            if (material === undefined) {
                this.usedMaterial = new Material_1.Material("Empty Material");
            }
            else {
                this.usedMaterial = material;
            }
            this.actualProgram = this.material.program;
            let admin = this.actualProgram.factory;
            this.bufferAdmin = admin.getBufferAdmin(this);
        }
        set material(newMaterial) {
            this.usedMaterial = newMaterial;
        }
        get material() {
            return this.usedMaterial;
        }
        awake() {
        }
        start() {
        }
        update() {
            if (typeof this.actualProgram !== typeof this.material.program) {
                this.actualProgram = this.material.program;
                let admin = this.actualProgram.factory;
                this.bufferAdmin = admin.getBufferAdmin(this);
            }
            this.material.program.useProgram();
            this.bufferAdmin.bindBuffers();
            this.bufferAdmin.updateAllUniforms();
            this.bufferAdmin.draw();
        }
        destroy() {
            this.bufferAdmin.destroy();
        }
        get meshModel() {
            return this.mesh;
        }
    }
    exports.RenderableComponent = RenderableComponent;
});
//# sourceMappingURL=RenderableComponent.js.map