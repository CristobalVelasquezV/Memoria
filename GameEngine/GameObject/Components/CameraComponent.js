define(["require", "exports", "./IComponent", "../../Matrix-gl/Vector3", "../../Matrix-gl/Mat4", "../../Matrix-gl/GlMatrix", "../../Render/Render"], function (require, exports, IComponent_1, Vector3_1, Mat4_1, GlMatrix_1, Render_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CameraComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
            this.mProj = Mat4_1.Mat4.projection(GlMatrix_1.GlMatrix.toRadian(45), Render_1.Render.sceneCanvasWidth / Render_1.Render.sceneCanvasHeight, 0.1, 1000);
            this.cameraId = CameraComponent.cameraIdGenerator;
            if (CameraComponent.cameraIdGenerator == 0) {
                CameraComponent.mainCamera = this;
            }
            CameraComponent.cameraIdGenerator++;
            CameraComponent.allCameras.push(this);
        }
        getProjectionMatrix() {
            return this.mProj;
        }
        getViewMatrix() {
            let lookAt = Vector3_1.Vector3.add(this.origin.transform.position, this.origin.transform.forward);
            return Mat4_1.Mat4.lookAt(this.origin.transform.position, lookAt, this.origin.transform.up);
        }
        awake() {
        }
        start() {
        }
        update() {
        }
        destroy() {
            CameraComponent.cameraIdGenerator--;
        }
    }
    CameraComponent.cameraIdGenerator = 0;
    CameraComponent.allCameras = [];
    exports.CameraComponent = CameraComponent;
});
//# sourceMappingURL=CameraComponent.js.map