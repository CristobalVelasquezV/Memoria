define(["require", "exports", "../gl/GLManager"], function (require, exports, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractProgram {
        constructor(name, vertexSource, fragmentSource) {
            this.attributes = {};
            this.uniforms = {};
            this.vertexSource = vertexSource;
            this.fragmentSource = fragmentSource;
            this.programName = name;
            this.vertexShader = this.loadShader(vertexSource, GLManager_1.gl.VERTEX_SHADER);
            this.fragmentShader = this.loadShader(fragmentSource, GLManager_1.gl.FRAGMENT_SHADER);
            this.GLprogram = GLManager_1.gl.createProgram();
            if (this.GLprogram !== null && this.vertexShader !== null && this.fragmentShader !== null) {
                this.compileProgram(this.vertexShader, this.fragmentShader, this.GLprogram);
            }
            else {
                throw new Error("Error creating program");
            }
            this.detectAttributes();
            this.detectUniforms();
        }
        initializedefaultPrograms() {
        }
        loadShader(source, shaderType) {
            let shader = GLManager_1.gl.createShader(shaderType);
            if (shader !== null) {
                GLManager_1.gl.shaderSource(shader, source);
                GLManager_1.gl.compileShader(shader);
                let error = GLManager_1.gl.getShaderInfoLog(shader);
                if (error !== "") {
                    throw new Error("Error compiling shader" + error);
                }
                return shader;
            }
            else {
                return null;
            }
        }
        compileProgram(vertexShader, fragmentShader, program) {
            GLManager_1.gl.attachShader(program, vertexShader);
            GLManager_1.gl.attachShader(program, fragmentShader);
            GLManager_1.gl.linkProgram(program);
            let error = GLManager_1.gl.getProgramInfoLog(program);
            if (error !== "") {
                throw new Error("Error compiling program: " + error);
            }
        }
        getProgramName() {
            return this.programName;
        }
        getProgram() {
            return this.GLprogram;
        }
        useProgram() {
            GLManager_1.gl.useProgram(this.GLprogram);
        }
        detectAttributes() {
            if (this.GLprogram != null) {
                let attributeCount = GLManager_1.gl.getProgramParameter(this.GLprogram, GLManager_1.gl.ACTIVE_ATTRIBUTES);
                for (let i = 0; i < attributeCount; i++) {
                    let attributeInfo = GLManager_1.gl.getActiveAttrib(this.GLprogram, i);
                    if (!attributeInfo) {
                        break;
                    }
                    this.attributes[attributeInfo.name] = GLManager_1.gl.getAttribLocation(this.GLprogram, attributeInfo.name);
                }
            }
            else {
                throw new Error("Null program in detect attributes.");
            }
        }
        getAttributeLocation(attributeName) {
            if (this.attributes[attributeName] === undefined) {
                console.warn("Unable to find the attribute: " + attributeName + " in shader: " + this.getProgramName());
                return -1;
            }
            return this.attributes[attributeName];
        }
        getUniformLocation(uniformName) {
            if (this.uniforms[uniformName] === undefined) {
                console.warn("Unable to find the uniform: " + uniformName + " in shader: " + this.getProgramName());
            }
            return this.uniforms[uniformName];
        }
        detectUniforms() {
            if (this.GLprogram !== null) {
                let uniformCount = GLManager_1.gl.getProgramParameter(this.GLprogram, GLManager_1.gl.ACTIVE_UNIFORMS);
                for (let i = 0; i < uniformCount; i++) {
                    let uniformInfo = GLManager_1.gl.getActiveUniform(this.GLprogram, i);
                    if (!uniformInfo) {
                        break;
                    }
                    console.log("uniform detected");
                    this.uniforms[uniformInfo.name] = GLManager_1.gl.getUniformLocation(this.GLprogram, uniformInfo.name);
                }
            }
            else {
                throw new Error("program null in detect Uniforms.");
            }
        }
    }
    AbstractProgram.shaderList = {};
    exports.AbstractProgram = AbstractProgram;
});
//# sourceMappingURL=AbstractProgram.js.map