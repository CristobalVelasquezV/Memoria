define(["require", "exports", "./IComponent", "../../Render/Render", "../../Render/Material/Material"], function (require, exports, IComponent_1, Render_1, Material_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RenderableComponent extends IComponent_1.IComponent {
        constructor(go, mesh, material) {
            super(go);
            go.addComponent(this);
            if (mesh !== undefined) {
                this.mesh = mesh;
            }
            if (material === undefined) {
                this.usedMaterial = new Material_1.Material("Empty Material");
            }
            else {
                this.usedMaterial = material;
            }
            this.renderableIndex = Render_1.Render.addRenderableComponent(this);
            let program = this.material.program;
            let admin = program.factory;
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
            this.material.program.useProgram();
            this.bufferAdmin.bindBuffers();
            this.bufferAdmin.updateAllUniforms();
            this.bufferAdmin.draw();
        }
        destroy() {
        }
        get meshModel() {
            return this.mesh;
        }
    }
    exports.RenderableComponent = RenderableComponent;
});
//# sourceMappingURL=RenderableComponent.js.map