export var gl: WebGLRenderingContext;

/**gl manager
    * @class 
    **/
export class GlManager {

    public static initialize(elementId?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement | null = document.createElement("canvas");
        let div: HTMLElement = document.getElementById("canvasDiv");

        let preGl: WebGLRenderingContext | null = canvas.getContext("webgl");
        if (preGl !== null) {
            gl = preGl;
        }
        div.appendChild(canvas);
        //document.body.appendChild(canvas);
        console.log("gl initializided");
        if (gl === undefined || gl === null) {
            throw new Error("Unable to initialize WebGl.");
        }
        console.log("gl initializided");
        return canvas;
    }
}
