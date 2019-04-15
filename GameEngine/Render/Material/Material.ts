import { Texture } from "../Texture/Texture";
import { AbstractProgram } from "../AbstractProgram/AbstractProgram";
import { BasicNoTextureMeshShader } from "../AbstractProgram/BasicNoTextureMeshShader";

export class Material {

    private materialName: string
    private usedProgram: AbstractProgram;
    private usedTexture: Texture | null;
    //add color later

    public constructor(name: string, texture?: Texture, absProgram?: AbstractProgram) {
        this.materialName = name;
        if (absProgram === undefined) {
            this.usedProgram = BasicNoTextureMeshShader.program;
        }
        else {
            this.usedProgram = absProgram;
        }
        

        if (texture == undefined) {
            //add default texture pink
            this.usedTexture = null;
        }
        else {
            this.usedTexture = texture;
        } 
    }

    public get program(): AbstractProgram {
        return this.usedProgram;
    }

    public get texture(): Texture {
        return this.usedTexture;
    }

}