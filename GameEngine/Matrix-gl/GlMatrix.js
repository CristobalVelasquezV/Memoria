define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * GlMatrix contains constants and tool functions for the Matematic library .
     *  *
     */
    class GlMatrix {
        static toRadian(angle) {
            return angle * GlMatrix.DEGREE;
        }
    }
    GlMatrix.EPSILON = 0.000001;
    GlMatrix.DEGREE = Math.PI / 180;
    exports.GlMatrix = GlMatrix;
});
//# sourceMappingURL=GlMatrix.js.map