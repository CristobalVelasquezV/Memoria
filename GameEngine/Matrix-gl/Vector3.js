define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector3 {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        getDimensionValue(i) {
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
        static transformMat4(a, mat) {
            let out = new Vector3(0, 0, 0);
            let m = mat.getArray();
            var x = a.x, y = a.y, z = a.z, w = m[3] * x + m[7] * y + m[11] * z + m[15];
            w = w || 1.0;
            out.x = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
            out.y = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
            out.z = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
            return out;
        }
        static cross(a, b) {
            let out = new Vector3(0, 0, 0);
            out.x = a.y * b.z - a.z * b.y;
            out.y = a.z * b.x - a.x * b.z;
            out.z = a.x * b.y - a.y * b.x;
            return out;
        }
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static add(a, b) {
            let c = new Vector3(0, 0, 0);
            c.addVector(a);
            c.addVector(b);
            return c;
        }
        addVector(b) {
            this.x += b.x;
            this.y += b.y;
            this.z += b.z;
        }
        addScalar(c) {
            this.x += c;
            this.y += c;
            this.z += c;
        }
        static substract(a, b) {
            let out = a;
            a.subtractVector(b);
            return a;
        }
        subtractVector(b) {
            this.x -= b.x;
            this.y -= b.y;
            this.z -= b.z;
        }
        subtractScalar(c) {
            this.x -= c;
            this.y -= c;
            this.z -= c;
        }
        multiplyVector(b) {
            this.x *= b.x;
            this.y *= b.y;
            this.z *= b.z;
        }
        multiplyScalar(c) {
            this.x *= c;
            this.y *= c;
            this.z *= c;
        }
        divideVector(b) {
            this.x /= b.x;
            this.y /= b.y;
            this.z /= b.z;
        }
        divideScalar(c) {
            this.x /= c;
            this.y /= c;
            this.z /= c;
        }
        static lerp(out, a, b, t) {
            out.x = a.x + t * (b.x - a.x);
            out.y = a.y + t * (b.y - a.y);
            out.z = a.z + t * (b.z - a.z);
            return out;
        }
        static distance(a, b) {
            let x = b.x - a.x;
            let y = b.y - a.y;
            let z = b.z - a.z;
            return Math.sqrt(x * x + y * y + z * z);
        }
        normalize() {
            let normalized = new Vector3(0, 0, 0);
            let len = this.x * this.x + this.y * this.y + this.z * this.z;
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
        scaleAndAdd(b, c) {
            this.x = this.x + (b.x * c);
            this.y = this.y + (b.y * c);
            this.z = this.z + (b.z * c);
        }
    }
    Vector3.zero = new Vector3(0, 0, 0);
    exports.Vector3 = Vector3;
});
//# sourceMappingURL=Vector3.js.map