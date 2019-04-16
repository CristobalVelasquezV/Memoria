import { Camera } from "./Camera/Camera";
import { AttributeInformation, GlBuffer } from "./gl/GLBuffer";
import { gl, GlManager } from "./gl/GLManager";
import { LineShader } from "./AbstractProgram/LineShader";
import { Mat4 } from "../Matrix-gl/Mat4";

export class Render {
    //make this class not static for multiples renders scenes split screen.
    private static sceneCanvas: HTMLCanvasElement;

    private static gridVertices: number[];
    private static buffer: GlBuffer;
    private static mWorld: Mat4 = new Mat4();
    /** Lines Shader Attributes*/
    private static mProjLines: WebGLUniformLocation | null;
    private static mWorldLines: WebGLUniformLocation | null;
    private static mViewLines: WebGLUniformLocation | null;

    public static initialize(): void {
        console.log("render init");
        Render.sceneCanvas = GlManager.initialize();
        Render.initializeGrid();

        Render.mProjLines = LineShader.program.getUniformLocation('mProj');
        Render.mWorldLines = LineShader.program.getUniformLocation('mWorld');
        Render.mViewLines = LineShader.program.getUniformLocation('mView');
        Render.drawGrid(Render.gridVertices);

        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
    }

    public static hasFocus(): boolean {
        //document.activeElement === Render.sceneCanvas && document.hasFocus()
        if (document.hasFocus()) {
            return true;
        }
        else {
            return false;
        }
    }

    public static update(): void {
        Render.resize();
        
        gl.clearColor(0.2, 0.2, 0.2, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        if (Render.hasFocus()) {
            Camera.update();
        }
        /*Set uniforms change uniform /att to variables*/
        /*Lines Uniform*/
        LineShader.program.useProgram();
        let mProj: Float32Array = Camera.instance.getProjectionMatrix().getArray();
        let mView: Float32Array = Camera.instance.getViewMatrix().getArray();
        gl.uniformMatrix4fv(Render.mProjLines, false, mProj);
        gl.uniformMatrix4fv(Render.mWorldLines, false, this.mWorld.getArray());
        gl.uniformMatrix4fv(Render.mViewLines, false, mView);
        Render.buffer.bind();
        Render.buffer.draw();
    }

    public static initializeGrid(): void {
        let verts: number[] = [],
            spaceBL: number = 2,
            nLines: number = 1000,			
            TotalLL: number = 1000;

        let x1: number = 0;
        const y1: number = 0;	
        let z1: number = 0;	

        let x2: number = TotalLL;
        const y2: number = 0;
        let z2: number = 0;	

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

        z2 = TotalLL
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

    public static drawGrid(vertices: number[]): void {
        Render.buffer = new GlBuffer(3, gl.FLOAT, gl.ARRAY_BUFFER, gl.LINES);
        let postLocation = new AttributeInformation();
        postLocation.offset = 0;
        postLocation.size = 3;
        postLocation.location = LineShader.program.getAttributeLocation('vertPosition');
        Render.buffer.addAttributeLocation(postLocation);
        Render.buffer.pushBackData(vertices);
        Render.buffer.upload();
        Render.buffer.unbind();
    }




    public static get sceneCanvasWidth(): number {
        return Render.sceneCanvas.width;
    }

    public static get sceneCanvasHeight(): number {
        return Render.sceneCanvas.height;
    }

    public static resize(): void {
        if (Render.sceneCanvas !== undefined) {
            Render.sceneCanvas.width = window.innerWidth;
            Render.sceneCanvas.height = window.innerHeight;
            gl.viewport(0, 0, Render.sceneCanvas.width, Render.sceneCanvas.height);
           // gl.viewport(1, 0,0,-1);
        }
    }
}