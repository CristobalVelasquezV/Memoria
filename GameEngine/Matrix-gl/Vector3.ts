import { Mat4 } from "./Mat4";

export class Vector3 {

    public x: number;
    public y: number;
    public z: number;

    public static readonly zero: Vector3 = new Vector3(0, 0, 0);


    public getDimensionValue(i: number): number {
        switch (i) {
            case 0: {
                return this.x;

            }
            case 1: {
                return this.y;

            }

            case 2:
                return this.z;

            default:
                console.error("vector 3 error");
                return -1;
        }
    }

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static transformMat4(a: Vector3, mat: Mat4): Vector3 {
        let out: Vector3 = new Vector3(0, 0, 0);
        let m: Float32Array = mat.getArray();
        var x = a.x, y = a.y, z = a.z,
            w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1.0;
        out.x = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out.y = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out.z = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
    }

    public static cross(a: Vector3, b: Vector3): Vector3 {
        let out: Vector3 = new Vector3(0, 0, 0);
        out.x = a.y * b.z - a.z * b.y;
        out.y = a.z * b.x - a.x * b.z;
        out.z = a.x * b.y - a.y * b.x;
        return out;
    }

    public set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public static add(a: Vector3, b: Vector3): Vector3 {
        let c: Vector3 = new Vector3(0, 0, 0);
        c.addVector(a);
        c.addVector(b);
        return c;
    }


    public addVector(b: Vector3): void {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
    }

    public addScalar(c: number): void {
        this.x += c;
        this.y += c;
        this.z += c;
    }
    public static substract(a: Vector3, b: Vector3): Vector3 {
        let out: Vector3 = a;
        a.subtractVector(b);
        return a;
    }

    public subtractVector(b: Vector3): void {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
    }

    public subtractScalar(c: number): void {
        this.x -= c;
        this.y -= c;
        this.z -= c;
    }

    public multiplyVector(b: Vector3): void {
        this.x *= b.x;
        this.y *= b.y;
        this.z *= b.z;
    }

    public multiplyScalar(c: number): void {
        this.x *= c;
        this.y *= c;
        this.z *= c;
    }

    public divideVector(b: Vector3): void {
        this.x /= b.x;
        this.y /= b.y;
        this.z /= b.z;
    }
    public divideScalar(c: number): void {
        this.x /= c;
        this.y /= c;
        this.z /= c;
    }

    public static lerp(out: Vector3, a: Vector3, b: Vector3, t: number): Vector3 {
        out.x = a.x + t * (b.x - a.x);
        out.y = a.y + t * (b.y - a.y);
        out.z = a.z + t * (b.z - a.z);
        return out;
    }

    public static distance(a: Vector3, b: Vector3): number {
        let x = b.x - a.x;
        let y = b.y - a.y;
        let z = b.z - a.z;
        return Math.sqrt(x * x + y * y + z * z);
    }



    public normalize(): Vector3 {
        let normalized: Vector3 = new Vector3(0, 0, 0);
        let len: number = this.x * this.x + this.y * this.y + this.z * this.z;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            normalized.x = this.x * len;
            normalized.y = this.y * len;
            normalized.z = this.z * len;
        }
        return normalized;
    }


    /**
     * 
     * @param {Vector3} b
     * @param {number} c
     */
    public scaleAndAdd(b: Vector3, c: number): void {
        this.x = this.x + (b.x * c);
        this.y = this.y + (b.y * c);
        this.z = this.z + (b.z * c);
    }


}