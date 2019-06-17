define(["require", "exports", "./GlMatrix"], function (require, exports, GlMatrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     *      *Mat4 Class belongs to the mathematic library Matrix-gl, it manages 4x4 Matrices, like transformation Matrices
     *  *    Scale,World,View,Projection.
     *  *  * @param {Float32Array} array represents the 16 values of a 4x4 Matrix.
     *  *
     *      * */
    class Mat4 {
        /**Mat4 constructor initializes with a identity matrix.
         */
        constructor() {
            this.array = new Float32Array(16);
            this.array[0] = 1;
            this.array[1] = 0;
            this.array[2] = 0;
            this.array[3] = 0;
            this.array[4] = 0;
            this.array[5] = 1;
            this.array[6] = 0;
            this.array[7] = 0;
            this.array[8] = 0;
            this.array[9] = 0;
            this.array[10] = 1;
            this.array[11] = 0;
            this.array[12] = 0;
            this.array[13] = 0;
            this.array[14] = 0;
            this.array[15] = 1;
        }
        /**
         * multiply two Mat4
         * @param {Mat4} m1
         * @param {Mat4} m2
         * @returns {Mat4}
         */
        static multiply(m1, m2) {
            let ret = new Mat4();
            let out = ret.getArray();
            let a = m1.getArray();
            let b = m2.getArray();
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return ret;
        }
        /**projecion returns a projection matrix given the parameters of the projection wanted.
         *  * the objective of this transform matrix is to transform a point in 3D space in to a 2D projection.
         *
         * @param {number} fovy Vertical field of view in radians
         * @param {number} aspect Aspect ratio. typically viewport width/height
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns Mat4 with the values of the projection matrix.
         */
        static projection(fovy, aspect, near, far) {
            let arrayMat = new Mat4();
            let array = arrayMat.array;
            var f = 1.0 / Math.tan(fovy / 2), nf = 1 / (near - far);
            array[0] = f / aspect;
            array[1] = 0;
            array[2] = 0;
            array[3] = 0;
            array[4] = 0;
            array[5] = f;
            array[6] = 0;
            array[7] = 0;
            array[8] = 0;
            array[9] = 0;
            array[10] = (far + near) * nf;
            array[11] = -1;
            array[12] = 0;
            array[13] = 0;
            array[14] = (2 * far * near) * nf;
            array[15] = 0;
            arrayMat.array = array;
            return arrayMat;
        }
        /**scalarScale re-scale a Matrix by a Vector3.
         *
         * @param {Vector3} scale vector scale
         * @returns {Mat4} Re-scaled Mat4
         */
        scalarScale(scale) {
            let array = this.array;
            var x = scale.getDimensionValue(0), y = scale.getDimensionValue(1), z = scale.getDimensionValue(2);
            this.array[0] = this.array[0] * x;
            this.array[1] = this.array[1] * x;
            this.array[2] = this.array[2] * x;
            this.array[3] = this.array[3] * x;
            this.array[4] = this.array[4] * y;
            this.array[5] = this.array[5] * y;
            this.array[6] = this.array[6] * y;
            this.array[7] = this.array[7] * y;
            this.array[8] = this.array[8] * z;
            this.array[9] = this.array[9] * z;
            this.array[10] = this.array[10] * z;
            this.array[11] = this.array[11] * z;
            this.array[12] = this.array[12];
            this.array[13] = this.array[13];
            this.array[14] = this.array[14];
            this.array[15] = this.array[15];
            return this;
        }
        /**Rotate Mat4 rad angles by the axis given.
         *
         * @param {Mat4} mat
         * @param {number} rad
         * @param {Vector3} axis
         * @returns
         */
        static rotate(mat, rad, axis) {
            let matOut = new Mat4();
            let out = matOut.getArray();
            let a = mat.getArray();
            var x = axis.getDimensionValue(0), y = axis.getDimensionValue(1), z = axis.getDimensionValue(2), len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
            if (Math.abs(len) < GlMatrix_1.GlMatrix.EPSILON) {
                return mat;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) { // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return matOut;
        }
        /**orthographic creates a transformation matrix of a orthographic view of the models, objects are not seen smaller with distance.
         *
         * @param {number} left
         * @param {number} right
         * @param {number} bottom
         * @param {number} top
         * @param {number} near
         * @param {number} far
         * @returns
         */
        static orthographic(left, right, bottom, top, near, far) {
            let arrayMat = new Mat4();
            let array = arrayMat.array;
            let lr = 1.0 / (left - right);
            let bt = 1.0 / (bottom - top);
            let nf = 1.0 / (near - far);
            arrayMat.array[0] = -2.0 * lr;
            arrayMat.array[5] = -2.0 * bt;
            arrayMat.array[10] = 2.0 * nf;
            arrayMat.array[12] = (left + right) * lr;
            arrayMat.array[13] = (top + bottom) * bt;
            arrayMat.array[14] = (far + near) * nf;
            return arrayMat;
        }
        /**Returns a Mat4 that represent given scale vector.
         *
         * @param {Vector3} scale
         * @returns
         */
        static fromScaling(scale) {
            let matout = new Mat4();
            let out = matout.getArray();
            out[0] = scale.x;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = scale.y;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = scale.z;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return matout;
        }
        /**Returns a Mat4 that represents a traslation.
         *
         * @param {Vector3} positon
         * @returns
         */
        static fromTranslation(positon) {
            let mat = new Mat4();
            let out = mat.getArray();
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = positon.x;
            out[13] = positon.y;
            out[14] = positon.z;
            out[15] = 1;
            return mat;
        }
        getArray() {
            return this.array;
        }
        /**lootAt creates a Mat4 transformation matrix that represents the view of a regular camera.
         *
         * @param {Vector3} eye focus of the camera
         * @param {Vector3} center position of the camera
         * @param {Vector3} up vector of the up direction of the camera, this depends of our coordinates.
         * @returns {Mat4} View matrix.
         */
        static lookAt(eye, center, up) {
            let arrayMat = new Mat4();
            let array = arrayMat.getArray();
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye.getDimensionValue(0), eyey = eye.getDimensionValue(1), eyez = eye.getDimensionValue(2), upx = up.getDimensionValue(0), upy = up.getDimensionValue(1), upz = up.getDimensionValue(2), centerx = center.getDimensionValue(0), centery = center.getDimensionValue(1), centerz = center.getDimensionValue(2);
            if (Math.abs(eyex - centerx) < GlMatrix_1.GlMatrix.EPSILON &&
                Math.abs(eyey - centery) < GlMatrix_1.GlMatrix.EPSILON &&
                Math.abs(eyez - centerz) < GlMatrix_1.GlMatrix.EPSILON) {
                return Mat4.identity;
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            }
            else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            }
            else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }
            array[0] = x0;
            array[1] = y0;
            array[2] = z0;
            array[3] = 0;
            array[4] = x1;
            array[5] = y1;
            array[6] = z1;
            array[7] = 0;
            array[8] = x2;
            array[9] = y2;
            array[10] = z2;
            array[11] = 0;
            array[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            array[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            array[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            array[15] = 1;
            return arrayMat;
        }
        /**Creates a Mat4 that represent a rotation transform of a quaternion.
         *
         * @param {Quaternion} q
         * @returns
         */
        static fromQuaternion(q) {
            let ret = new Mat4();
            let out = ret.getArray();
            var x = q.x, y = q.y, z = q.z, w = q.w, x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, yx = y * x2, yy = y * y2, zx = z * x2, zy = z * y2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return ret;
        }
    }
    /*Identity matrix*/
    Mat4.identity = new Mat4();
    exports.Mat4 = Mat4;
});
//# sourceMappingURL=Mat4.js.map