import { Vector3 } from "../Matrix-gl/Vector3";

export class Transform {
    public position: Vector3;
    public scale: Vector3;


    private forward: Vector3;
    private up: Vector3;
    private right: Vector3;

    constructor(position: Vector3 = new Vector3(0, 0, 0), scale: Vector3 = new Vector3(1, 1, 1),
        lookAt: Vector3 = new Vector3(0, 0, 0), up: Vector3 = new Vector3(0, 1, 0)) {
        this.position = position;
        this.scale = scale;
        this.forward = Vector3.substract(lookAt, this.position).normalize();
        this.right = Vector3.cross(this.forward, up).normalize();
        this.up = Vector3.cross(this.right, this.forward).normalize();
    }

}
