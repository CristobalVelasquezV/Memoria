define(["require", "exports", "./Vector3"], function (require, exports, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Quaternion class represents a rotation in space.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     * @returns
     */
    class Quaternion {
        constructor(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        /**
         * Quaternion Identity
         * @returns
         */
        static get identity() {
            return new Quaternion(0, 0, 0, 1);
        }
        /**
         * Quaternion to array for shaders.
         * @returns
         */
        toArray() {
            return [this.x, this.y, this.z, this.w];
        }
        /**
         * Adds this quaternion with q1.
         * @param {Quaternion} q1
         */
        add(q1) {
            this.x += q1.x;
            this.y += q1.y;
            this.z += q1.z;
            this.w += q1.w;
        }
        /**
         * Adds two Quaternions by coordinates.
         * @param {Quaternion} q1
         * @param {Quaternion} q2
         * @returns
         */
        static add(q1, q2) {
            return new Quaternion(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w);
        }
        /**
         * Multiply two quaternions.
         * @param {Quaternion} q1
         * @param {Quaternion} q2
         * @returns
         */
        static multiply(q1, q2) {
            let out = new Quaternion(0, 0, 0, 0);
            var ax = q1.x, ay = q1.y, az = q1.z, aw = q1.w, bx = q2.x, by = q2.y, bz = q2.z, bw = q2.w;
            out.x = ax * bw + aw * bx + ay * bz - az * by;
            out.y = ay * bw + aw * by + az * bx - ax * bz;
            out.z = az * bw + aw * bz + ax * by - ay * bx;
            out.w = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        }
        /**
         * Rotate a quaternion in the X axis by rad degrees.
         * @param {number} rad
         */
        rotateX(rad) {
            rad *= 0.5;
            var ax = this.x, ay = this.y, az = this.z, aw = this.w, bx = Math.sin(rad), bw = Math.cos(rad);
            this.x = ax * bw + aw * bx;
            this.y = ay * bw + az * bx;
            this.z = az * bw - ay * bx;
            this.w = aw * bw - ax * bx;
        }
        /**
         * Rotate a quaternion in the Y axis by rad degrees.
         * @param {number} rad
         */
        rotateY(rad) {
            rad *= 0.5;
            var ax = this.x, ay = this.y, az = this.z, aw = this.w, by = Math.sin(rad), bw = Math.cos(rad);
            this.x = ax * bw - az * by;
            this.y = ay * bw + aw * by;
            this.z = az * bw + ax * by;
            this.w = aw * bw - ay * by;
        }
        /**
         * Rotate a quaternion in the Z axis by rad degrees.
         * @param {number} rad
         */
        rotateZ(rad) {
            rad *= 0.5;
            var ax = this.x, ay = this.y, az = this.z, aw = this.w, bz = Math.sin(rad), bw = Math.cos(rad);
            this.x = ax * bw + ay * bz;
            this.y = ay * bw - ax * bz;
            this.z = az * bw + aw * bz;
            this.w = aw * bw - az * bz;
        }
        normalize() {
            let outQuat = new Quaternion(0, 0, 0, 0);
            var x = this.x, y = this.y, z = this.z, w = this.w;
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                outQuat.x = x * len;
                outQuat.y = y * len;
                outQuat.z = z * len;
                outQuat.w = w * len;
            }
            return outQuat;
        }
        static fromArray(arr) {
            let out = new Quaternion(arr[0], arr[1], arr[2], arr[3]);
            return out;
        }
        static setAxisAngle(q, axis, rad) {
            rad = rad * 0.5;
            var s = Math.sin(rad);
            q.x = s * axis[0];
            q.y = s * axis[1];
            q.z = s * axis[2];
            q.w = Math.cos(rad);
            return q;
        }
        static setAxis(view, right, up) {
            let newView = new Vector3_1.Vector3(-view.x, -view.y, -view.z);
            let arr = Vector3_1.Vector3.mat3(newView, right, up);
            return Quaternion.fromMat3(arr).normalize();
        }
        toString() {
            return "q x: " + this.x + "y: " + this.y + "z: " + this.z + "w: " + this.w;
        }
        static fromMat3(m) {
            let out = [0, 0, 0, 0];
            var fTrace = m[0] + m[4] + m[8];
            var fRoot;
            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            }
            else {
                // |w| <= 1/2
                var i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }
            return Quaternion.fromArray(out);
        }
        static rotationTo(a, b) {
            var tmpvec3 = new Vector3_1.Vector3(0, 0, 0);
            var xUnitVec3 = new Vector3_1.Vector3(1, 0, 0);
            var yUnitVec3 = new Vector3_1.Vector3(0, 1, 0);
            var out = new Quaternion(0, 0, 0, 0);
            var dot = Vector3_1.Vector3.dot(a, b);
            if (dot < -0.999999) {
                tmpvec3 = Vector3_1.Vector3.cross(xUnitVec3, a);
                if (tmpvec3.length() < 0.000001) {
                    tmpvec3 = Vector3_1.Vector3.cross(yUnitVec3, a);
                }
                tmpvec3.normalize();
                Quaternion.setAxisAngle(out, tmpvec3, Math.PI);
                return out;
            }
            else if (dot > 0.999999) {
                out.x = 0;
                out.y = 0;
                out.z = 0;
                out.w = 1;
                return out;
            }
            else {
                tmpvec3 = Vector3_1.Vector3.cross(a, b);
                out.x = tmpvec3.x;
                out.y = tmpvec3.y;
                out.z = tmpvec3.z;
                out.w = 1 + dot;
                return out.normalize();
            }
        }
    }
    exports.Quaternion = Quaternion;
});
//# sourceMappingURL=Quaternion.js.map