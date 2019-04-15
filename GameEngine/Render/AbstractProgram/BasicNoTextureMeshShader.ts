import { AbstractProgram } from "./AbstractProgram";
import { AbstractBufferAdministratorFactory } from "../AbstractBufferAdministratorFactory/AbstractBufferAdministratorFactory";
import { BasicNoTextureMeshAdminFactory } from "../AbstractBufferAdministratorFactory/BasicNoTextureMeshAdminFactory";

export class BasicNoTextureMeshShader extends AbstractProgram {
    protected shaderName: string;
    protected vertexShaderSource: string[];
    protected fragmentShaderSource: string[];
    program: AbstractProgram;


    public factory: AbstractBufferAdministratorFactory = BasicNoTextureMeshAdminFactory.instance;


    protected static instance: BasicNoTextureMeshShader;

    public static get program(): AbstractProgram {

        if (BasicNoTextureMeshShader.instance === undefined) {
            BasicNoTextureMeshShader.instance = new BasicNoTextureMeshShader(this.shaderName,
                this.vertexShaderSource.join('\n'), this.fragmentShaderSource.join('\n'));
        }
  
        return BasicNoTextureMeshShader.instance;
    }

    protected static readonly shaderName: string = "BasicNoTextureMeshShader";

    protected static readonly vertexShaderSource: string[] =
        [
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

    protected static readonly fragmentShaderSource: string[] =
        [
            'precision mediump float;',
            'varying vec3 fragNormal;',
            'void main()',
            '{',
            'vec3 color=fragNormal;',
            'color.x=-color.x;',
            'gl_FragColor=vec4(color,1.0);',
            '}'
        ];

    private constructor(name: string, vertexSource: string, fragmentSource: string) {
        super(name, vertexSource, fragmentSource);
    }
}