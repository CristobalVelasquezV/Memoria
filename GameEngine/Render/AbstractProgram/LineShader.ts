import { AbstractProgram } from "./AbstractProgram";
import { AbstractBufferAdministratorFactory } from "../AbstractBufferAdministratorFactory/AbstractBufferAdministratorFactory";
import { ShaderLineAdminFactory } from "../AbstractBufferAdministratorFactory/ShaderLineAdminFactory";

export class LineShader extends AbstractProgram {
    protected shaderName: string;
    protected vertexShaderSource: string[];
    protected fragmentShaderSource: string[];

    private constructor(name: string, vertexSource: string, fragmentSource: string) {
        super(name, vertexSource, fragmentSource);
    }

    public factory: AbstractBufferAdministratorFactory = ShaderLineAdminFactory.instance;

    private static instance: LineShader;
    protected static readonly shaderName: string="LineShader";
    protected static readonly vertexShaderSource: string[] = [
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
    protected static readonly fragmentShaderSource: string[] = [
        'precision mediump float;',
        '',
        'void main()',
        '{',
        'gl_FragColor=vec4(0.4,0.5,0.5,1.0);',
        '}'
    ];


    program: AbstractProgram;

    public static get program(): AbstractProgram {

        if (LineShader.instance === undefined) {
            LineShader.instance = new LineShader(this.shaderName,
                this.vertexShaderSource.join('\n'), this.fragmentShaderSource.join('\n'));
        }

        return LineShader.instance;
    }
}