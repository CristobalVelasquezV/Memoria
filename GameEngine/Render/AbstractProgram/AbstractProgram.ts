import { gl } from "../gl/GLManager";
import { AbstractBufferAdministratorFactory } from "../AbstractBufferAdministratorFactory/AbstractBufferAdministratorFactory";

export abstract class AbstractProgram {
    private static shaderList: { [index: number]: AbstractProgram } = {};

    private programName: string;

    private GLprogram: WebGLProgram | null;

    private vertexShader: WebGLShader | null;

    private fragmentShader: WebGLShader | null;

    private vertexSource: string;

    private fragmentSource: string;

    private attributes: { [name: string]: number } = {};

    private uniforms: { [name: string]: WebGLUniformLocation | null } = {};


    public abstract get factory(): AbstractBufferAdministratorFactory;

    protected abstract readonly shaderName: string;

    protected abstract readonly vertexShaderSource: string[];

    protected abstract readonly fragmentShaderSource: string[];

    public initializedefaultPrograms(): void {

    }

    public constructor(name: string, vertexSource: string, fragmentSource: string) {
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
        this.programName = name;
        this.vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        this.fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
        this.GLprogram = gl.createProgram();
        if (this.GLprogram!== null && this.vertexShader !== null && this.fragmentShader !== null) {
            this.compileProgram(this.vertexShader, this.fragmentShader, this.GLprogram);
        }
        else {
            throw new Error("Error creating program");
        }
        this.detectAttributes();
        this.detectUniforms();
    }

    public loadShader(source: string, shaderType: number): WebGLShader | null {
        let shader = gl.createShader(shaderType);
        if (shader !== null) {
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Error compiling shader" + error);
            }
            return shader;
        }
        else {
            return null;
        }

    }

    private compileProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader, program: WebGLProgram): void {
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        let error = gl.getProgramInfoLog(program);
        if (error !== "") {
            throw new Error("Error compiling program: " + error);
        }
    }

    public getProgramName(): string {
        return this.programName;
    }

    public getProgram(): WebGLProgram | null {
        return this.GLprogram;
    }

    public useProgram(): void {
        gl.useProgram(this.GLprogram);
    }

    private detectAttributes(): void {
        if (this.GLprogram!= null) {
            let attributeCount: number = gl.getProgramParameter(this.GLprogram, gl.ACTIVE_ATTRIBUTES);
            for (let i = 0; i < attributeCount; i++) {
                let attributeInfo: WebGLActiveInfo | null = gl.getActiveAttrib(this.GLprogram, i);
                if (!attributeInfo) {
                    break;
                }
                this.attributes[attributeInfo.name] = gl.getAttribLocation(this.GLprogram, attributeInfo.name)
            }
        }
        else {
            throw new Error("Null program in detect attributes.");
        }

    }

    public getAttributeLocation(attributeName: string): number {
        if (this.attributes[attributeName] === undefined) {
            console.warn("Unable to find the attribute: " + attributeName + " in shader: " + this.getProgramName());
            return -1;
        }
        return this.attributes[attributeName];
    }

    public getUniformLocation(uniformName: string): WebGLUniformLocation | null {
        if (this.uniforms[uniformName] === undefined) {
            console.warn("Unable to find the uniform: " + uniformName + " in shader: " + this.getProgramName());
        }
        return this.uniforms[uniformName];
    }

    private detectUniforms(): void {

        if (this.GLprogram !== null) {
            let uniformCount: number = gl.getProgramParameter(this.GLprogram, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                let uniformInfo: WebGLActiveInfo | null = gl.getActiveUniform(this.GLprogram, i);
                if (!uniformInfo) {
                    break;
                }
                console.log("uniform detected");
                this.uniforms[uniformInfo.name] = gl.getUniformLocation(this.GLprogram, uniformInfo.name)
            }
        }
        else {
            throw new Error("program null in detect Uniforms.");
        }
    }

    abstract get program(): AbstractProgram;
}