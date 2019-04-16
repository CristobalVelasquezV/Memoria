import { Vector3 } from "../../Matrix-gl/Vector3";
import { Mat4 } from "../../Matrix-gl/Mat4";
import { Input, KeyCode } from "../../Input/Input";
import { Time } from "../../Time/Time";
import { GlMatrix } from "../../Matrix-gl/GlMatrix";
import { Render } from "../Render";

export class Camera {

    private static instanceCamera: Camera;


    private forward: Vector3;
    private up: Vector3;
    private right: Vector3;
    private position: Vector3;

    private mProj: Mat4 = Mat4.projection(GlMatrix.toRadian(45), Render.sceneCanvasWidth / Render.sceneCanvasHeight, 0.1, 1000);

    private static readonly moveForwardSpeed = 10;
    private static readonly rotationSpeed = 1;

    public static get instance(): Camera {
        return this.instanceCamera || (this.instanceCamera = new this(new Vector3(0, 0, -30), Vector3.zero, new Vector3(0, 1, 0)));
    }

    

    public static update() {

        if (Input.isKeyPressed(KeyCode.KEY_W) && !Input.isKeyPressed(KeyCode.KEY_S)) {
            Camera.instance.moveForward(Time.deltaTime / 1000* Camera.moveForwardSpeed);
        }
        if (Input.isKeyPressed(KeyCode.KEY_S) && !Input.isKeyPressed(KeyCode.KEY_W)) {
            Camera.instance.moveForward(-Time.deltaTime / 1000 * Camera.moveForwardSpeed);
        }
        if (Input.isKeyPressed(KeyCode.KEY_A) && !Input.isKeyPressed(KeyCode.KEY_D)) {
            Camera.instance.moveRight(-Time.deltaTime / 1000 * Camera.moveForwardSpeed);
        }
        if (Input.isKeyPressed(KeyCode.KEY_D) && !Input.isKeyPressed(KeyCode.KEY_A)) {
            Camera.instance.moveRight(Time.deltaTime / 1000 * Camera.moveForwardSpeed);
        }


        if (Input.isKeyPressed(KeyCode.UP_ARROW) && !Input.isKeyPressed(KeyCode.DOWN_ARROW)) {
            Camera.instance.moveUp(Time.deltaTime / 1000 * Camera.moveForwardSpeed);
        }
        if (Input.isKeyPressed(KeyCode.DOWN_ARROW) && !Input.isKeyPressed(KeyCode.UP_ARROW)) {
            Camera.instance.moveUp(-Time.deltaTime / 1000 * Camera.moveForwardSpeed);
        }
        if (Input.isKeyPressed(KeyCode.LEFT_ARROW) && !Input.isKeyPressed(KeyCode.RIGHT_ARROW)) {
            Camera.instance.rotateRight(Time.deltaTime / 1000 * Camera.rotationSpeed);
        }
        if (Input.isKeyPressed(KeyCode.RIGHT_ARROW) && !Input.isKeyPressed(KeyCode.LEFT_ARROW)) {
            Camera.instance.rotateRight(-Time.deltaTime / 1000 * Camera.rotationSpeed);
        }
    }

    private constructor(position: Vector3, lookAt: Vector3, up: Vector3) {
        this.position = position;
        this.forward = Vector3.substract(lookAt, this.position).normalize();
        this.right = Vector3.cross(this.forward, up).normalize();
        this.up = Vector3.cross(this.right, this.forward).normalize();
    }
    public getProjectionMatrix(): Mat4 {
        return this.mProj;
    }

    public getViewMatrix(): Mat4 {
        let lookAt: Vector3 = Vector3.add(this.position, this.forward);
        return Mat4.lookAt(this.position, lookAt, this.up);
    }


    public rotateRight(rad: number): void {
        let mat = Mat4.rotate(new Mat4(), rad, new Vector3(0, 1,0 ));
        this.forward = Vector3.transformMat4(this.forward, mat);
        this.reAlign();
    }


    public reAlign(): void {
        this.right = Vector3.cross(this.forward, this.up).normalize();
        this.up = Vector3.cross(this.right, this.forward).normalize();
        this.forward= this.forward.normalize();
    }

    public moveForward(dist: number): void {
        this.position.scaleAndAdd(this.forward, dist);
    }

    public moveRight(dist: number): void {
        this.position.scaleAndAdd(this.right, dist);
    }

    public moveUp(dist: number): void {
        this.position.scaleAndAdd(this.up, dist);
    }

}