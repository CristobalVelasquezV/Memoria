import { AbstractProgram } from "./AbstractProgram";
import { AbstractBufferAdministratorFactory } from "../AbstractBufferAdministratorFactory/AbstractBufferAdministratorFactory";
import { TextureMeshAdministratorFactory } from "../AbstractBufferAdministratorFactory/TextureMeshAdministratorFactory";

export class TextureMeshShader extends AbstractProgram {
    protected shaderName: string;
    protected vertexShaderSource: string[];
    protected fragmentShaderSource: string[];
    public factory: AbstractBufferAdministratorFactory = TextureMeshAdministratorFactory.instance;
    protected static instance: TextureMeshShader;
    protected static shaderName: string = "TextureMeshShader";
    protected static readonly vertexShaderSource: string[] =
        [
            'precision mediump float;',
            'uniform mat4 mProj;',
            'uniform mat4 mView;',
            'uniform mat4 mWorld;',
            'uniform mat4 mSize;',
            'attribute vec3 vertNormal;',
            'attribute vec3 vertPosition;',
            'attribute vec2 vertTexCoord;',
            'varying vec3 fragNormal;',
            'varying vec2 fragTexCoord;',
            'void main()',
            '{',
            'fragNormal=(mWorld*vec4(vertNormal,0.0)).xyz;',
            'fragTexCoord = vertTexCoord;',
            ' gl_Position = mProj * mView * mWorld* mSize* vec4(vertPosition,1.0);',
            '}'
        ];

    protected static readonly fragmentShaderSource: string[] =
        [
            'precision mediump float;',
            'varying vec3 fragNormal;',
            'uniform sampler2D sampler;',
            'varying vec2 fragTexCoord;',
            'uniform vec3 directionalLightDirection;',
            'uniform vec3 directionalLightColor;',
            'uniform vec3 ambientLight;',
            'void main()',
            '{',
            'vec3 lightDirectionNormilized=normalize(directionalLightDirection);',
            'vec3 lightIntencity=ambientLight+directionalLightColor*max(dot(fragNormal,lightDirectionNormilized),0.0);',
            'vec4 texel=texture2D(sampler, fragTexCoord);',
            'gl_FragColor=vec4(texel.rgb*lightIntencity,texel.a);',
            '}'
        ];
    public static get program(): AbstractProgram {

        if (TextureMeshShader.instance === undefined) {
            TextureMeshShader.instance = new TextureMeshShader(this.shaderName,
                this.vertexShaderSource.join('\n'), this.fragmentShaderSource.join('\n'));
        }

        return TextureMeshShader.instance;
    }

    program: AbstractProgram;

    constructor(name: string, vertexSource: string, fragmentSource: string) {
        super(name, vertexSource, fragmentSource);
    }

}