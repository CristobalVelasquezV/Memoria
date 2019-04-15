define(["require", "exports", "./AbstractProgram", "../AbstractBufferAdministratorFactory/ShaderLineAdminFactory"], function (require, exports, AbstractProgram_1, ShaderLineAdminFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LineShader extends AbstractProgram_1.AbstractProgram {
        constructor(name, vertexSource, fragmentSource) {
            super(name, vertexSource, fragmentSource);
            this.factory = ShaderLineAdminFactory_1.ShaderLineAdminFactory.instance;
        }
        static get program() {
            if (LineShader.instance === undefined) {
                LineShader.instance = new LineShader(this.shaderName, this.vertexShaderSource.join('\n'), this.fragmentShaderSource.join('\n'));
            }
            return LineShader.instance;
        }
    }
    LineShader.shaderName = "LineShader";
    LineShader.vertexShaderSource = [
        'precision mediump float;',
        'uniform mat4 mProj;',
        'uniform mat4 mView;',
        'uniform mat4 mWorld;',
        'attribute vec3 vertPosition;',
        'void main()',
        '{',
        ' gl_Position =   mProj * mView * mWorld*vec4(vertPosition,1.0);',
        '}'
    ];
    LineShader.fragmentShaderSource = [
        'precision mediump float;',
        '',
        'void main()',
        '{',
        'gl_FragColor=vec4(0.4,0.5,0.5,1.0);',
        '}'
    ];
    exports.LineShader = LineShader;
});
//# sourceMappingURL=LineShader.js.map