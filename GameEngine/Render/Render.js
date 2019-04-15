define(["require", "exports", "./Camera/Camera", "./gl/GLBuffer", "./gl/GLManager", "./AbstractProgram/LineShader", "../Matrix-gl/Mat4"], function (require, exports, Camera_1, GLBuffer_1, GLManager_1, LineShader_1, Mat4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Render {
        static initialize() {
            console.log("render init");
            Render.sceneCanvas = GLManager_1.GlManager.initialize();
            Render.initializeGrid();
            // Render.drawGrid(Render.gridVertices);
            GLManager_1.gl.clearColor(0, 0, 0, 1);
            GLManager_1.gl.enable(GLManager_1.gl.DEPTH_TEST);
            GLManager_1.gl.enable(GLManager_1.gl.CULL_FACE);
            GLManager_1.gl.frontFace(GLManager_1.gl.CCW);
            GLManager_1.gl.cullFace(GLManager_1.gl.BACK);
        }
        static addRenderableComponent(renderableComponent) {
            return Render.renderableComponents.push(renderableComponent);
        }
        static hasFocus() {
            //document.activeElement === Render.sceneCanvas && document.hasFocus()
            if (document.hasFocus()) {
                return true;
            }
            else {
                return false;
            }
        }
        static update() {
            Render.resize();
            GLManager_1.gl.clearColor(0.2, 0.2, 0.2, 1.0);
            GLManager_1.gl.clear(GLManager_1.gl.DEPTH_BUFFER_BIT | GLManager_1.gl.COLOR_BUFFER_BIT);
            if (Render.hasFocus()) {
                Camera_1.Camera.update();
            }
            /*Set uniforms change uniform /att to variables*/
            /*Lines Uniform*/
            //LineShader.program.useProgram();
            let mProj = Camera_1.Camera.instance.getProjectionMatrix().getArray();
            let mView = Camera_1.Camera.instance.getViewMatrix().getArray();
            //   gl.uniformMatrix4fv(Render.mProjLines, false, mProj);
            //  gl.uniformMatrix4fv(Render.mWorldLines, false, this.mWorld.getArray());
            // gl.uniformMatrix4fv(Render.mViewLines, false, mView);
            //  Render.buffer.bind();
            //Render.buffer.draw();
            /*Mesh Uniforms*/
            for (let i = 0; i < Render.renderableComponents.length; i++) {
                this.renderableComponents[i].update();
            }
        }
        static initializeGrid() {
            let verts = [], spaceBL = 2, nLines = 1000, TotalLL = 1000;
            let x1 = 0;
            const y1 = 0;
            let z1 = 0;
            let x2 = TotalLL;
            const y2 = 0;
            let z2 = 0;
            for (let i = 0; i <= nLines; i++) {
                //first point
                verts.push(x1);
                verts.push(y1);
                verts.push(z1);
                z1 = z1 + spaceBL;
                //secondPoint
                verts.push(x2);
                verts.push(y2);
                verts.push(z2);
                z2 = z2 + spaceBL;
            }
            x1 = z1 = x2 = z2 = 0;
            z2 = TotalLL;
            for (let i = 0; i <= nLines; i++) {
                //first point
                verts.push(x1);
                verts.push(y1);
                verts.push(z1);
                x1 = x1 + spaceBL;
                //secondPoint
                verts.push(x2);
                verts.push(y2);
                verts.push(z2);
                x2 = x2 + spaceBL;
            }
            Render.gridVertices = verts;
        }
        static drawGrid(vertices) {
            Render.buffer = new GLBuffer_1.GlBuffer(3, GLManager_1.gl.FLOAT, GLManager_1.gl.ARRAY_BUFFER, GLManager_1.gl.LINES);
            let postLocation = new GLBuffer_1.AttributeInformation();
            postLocation.offset = 0;
            postLocation.size = 3;
            postLocation.location = LineShader_1.LineShader.program.getAttributeLocation('vertPosition');
            Render.buffer.addAttributeLocation(postLocation);
            Render.buffer.pushBackData(vertices);
            Render.buffer.upload();
            Render.buffer.unbind();
        }
        static get sceneCanvasWidth() {
            return Render.sceneCanvas.width;
        }
        static get sceneCanvasHeight() {
            return Render.sceneCanvas.height;
        }
        static resize() {
            if (Render.sceneCanvas !== undefined) {
                Render.sceneCanvas.width = window.innerWidth;
                Render.sceneCanvas.height = window.innerHeight;
                GLManager_1.gl.viewport(0, 0, Render.sceneCanvas.width, Render.sceneCanvas.height);
                // gl.viewport(1, 0,0,-1);
            }
        }
    }
    Render.renderableComponents = [];
    Render.mWorld = new Mat4_1.Mat4();
    exports.Render = Render;
});
//# sourceMappingURL=Render.js.map