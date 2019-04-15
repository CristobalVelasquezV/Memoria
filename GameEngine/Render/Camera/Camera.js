define(["require", "exports", "../../Matrix-gl/Vector3", "../../Matrix-gl/Mat4", "../../Input/Input", "../../Time/Time", "../../Matrix-gl/GlMatrix", "../Render"], function (require, exports, Vector3_1, Mat4_1, Input_1, Time_1, GlMatrix_1, Render_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Camera {
        constructor(position, lookAt, up) {
            this.mProj = Mat4_1.Mat4.projection(GlMatrix_1.GlMatrix.toRadian(45), Render_1.Render.sceneCanvasWidth / Render_1.Render.sceneCanvasHeight, 0.1, 1000);
            this.position = position;
            this.forward = Vector3_1.Vector3.substract(lookAt, this.position).normalize();
            this.right = Vector3_1.Vector3.cross(this.forward, up).normalize();
            this.up = Vector3_1.Vector3.cross(this.right, this.forward).normalize();
        }
        static get instance() {
            return this.instanceCamera || (this.instanceCamera = new this(new Vector3_1.Vector3(0, 0, -30), Vector3_1.Vector3.zero, new Vector3_1.Vector3(0, 1, 0)));
        }
        static update() {
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_W) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_S)) {
                Camera.instance.moveForward(Time_1.Time.deltaTime / 1000 * Camera.moveForwardSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_S) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_W)) {
                Camera.instance.moveForward(-Time_1.Time.deltaTime / 1000 * Camera.moveForwardSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_A) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_D)) {
                Camera.instance.moveRight(Time_1.Time.deltaTime / 1000 * Camera.moveForwardSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_D) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_A)) {
                Camera.instance.moveRight(-Time_1.Time.deltaTime / 1000 * Camera.moveForwardSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.UP_ARROW) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.DOWN_ARROW)) {
                Camera.instance.moveUp(Time_1.Time.deltaTime / 1000 * Camera.moveForwardSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.DOWN_ARROW) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.UP_ARROW)) {
                Camera.instance.moveUp(-Time_1.Time.deltaTime / 1000 * Camera.moveForwardSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.LEFT_ARROW) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.RIGHT_ARROW)) {
                Camera.instance.rotateRight(Time_1.Time.deltaTime / 1000 * Camera.rotationSpeed);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.RIGHT_ARROW) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.LEFT_ARROW)) {
                Camera.instance.rotateRight(-Time_1.Time.deltaTime / 1000 * Camera.rotationSpeed);
            }
        }
        getProjectionMatrix() {
            return this.mProj;
        }
        getViewMatrix() {
            let lookAt = Vector3_1.Vector3.add(this.position, this.forward);
            return Mat4_1.Mat4.lookAt(this.position, lookAt, this.up);
        }
        rotateRight(rad) {
            let mat = Mat4_1.Mat4.rotate(new Mat4_1.Mat4(), rad, new Vector3_1.Vector3(0, 1, 0));
            this.forward = Vector3_1.Vector3.transformMat4(this.forward, mat);
            this.reAlign();
        }
        reAlign() {
            this.right = Vector3_1.Vector3.cross(this.forward, this.up).normalize();
            this.up = Vector3_1.Vector3.cross(this.right, this.forward).normalize();
            this.forward = this.forward.normalize();
        }
        moveForward(dist) {
            this.position.scaleAndAdd(this.forward, dist);
        }
        moveRight(dist) {
            this.position.scaleAndAdd(this.right, dist);
        }
        moveUp(dist) {
            this.position.scaleAndAdd(this.up, dist);
        }
    }
    Camera.moveForwardSpeed = 10;
    Camera.rotationSpeed = 1;
    exports.Camera = Camera;
});
//# sourceMappingURL=Camera.js.map