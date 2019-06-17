define(["require", "exports", "./AbstractProgram", "../AbstractBufferAdministratorFactory/BasicNoTextureMeshAdminFactory"], function (require, exports, AbstractProgram_1, BasicNoTextureMeshAdminFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BasicNoTextureMeshShader extends AbstractProgram_1.AbstractProgram {
        constructor(name, vertexSource, fragmentSource) {
            super(name, vertexSource, fragmentSource);
            this.factory = BasicNoTextureMeshAdminFactory_1.BasicNoTextureMeshAdminFactory.instance;
        }
        static get program() {
            if (BasicNoTextureMeshShader.instance === undefined) {
                BasicNoTextureMeshShader.instance = new BasicNoTextureMeshShader(this.shaderName, this.vertexShaderSource.join('\n'), this.fragmentShaderSource.join('\n'));
            }
            return BasicNoTextureMeshShader.instance;
        }
    }
    BasicNoTextureMeshShader.shaderName = "BasicNoTextureMeshShader";
    BasicNoTextureMeshShader.vertexShaderSource = [
        'precision mediump float;',
        'uniform mat4 mProj;',
        'uniform mat4 mView;',
        'uniform mat4 mWorld;',
        'uniform mat4 mSize;',
        'attribute vec3 vertNormal;',
        'attribute vec3 vertPosition;',
        'varying vec3 fragNormal;',
        'void main()',
        '{',
        'fragNormal=(mWorld*vec4(vertNormal,0.0)).xyz;',
        ' gl_Position = mProj * mView * mWorld* mSize* vec4(vertPosition,1.0);',
        '}'
    ];
    BasicNoTextureMeshShader.fragmentShaderSource = [
        'precision mediump float;',
        'varying vec3 fragNormal;',
        'void main()',
        '{',
        'vec3 color=fragNormal;',
        'color.x=color.x;',
        'gl_FragColor=vec4(color,1.0);',
        '}'
    ];
    exports.BasicNoTextureMeshShader = BasicNoTextureMeshShader;
});
//# sourceMappingURL=BasicNoTextureMeshShader.js.map