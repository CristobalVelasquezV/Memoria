define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**gl manager contains the unique instance of the gl WebGlRenderingContext , and made it accesible for each class, in a bigger proyect we need one of this
     *  * for each display screen.
        * @class
        **/
    class GlManager {
        static initialize(elementId) {
            let canvas = document.createElement("canvas");
            let div = document.getElementById("canvasDiv");
            let preGl = canvas.getContext("webgl");
            if (preGl !== null) {
                exports.gl = preGl;
            }
            div.appendChild(canvas);
            //document.body.appendChild(canvas);
            console.log("gl initializided");
            if (exports.gl === undefined || exports.gl === null) {
                throw new Error("Unable to initialize WebGl.");
            }
            console.log("gl initializided");
            return canvas;
        }
    }
    exports.GlManager = GlManager;
});
//# sourceMappingURL=GLManager.js.map