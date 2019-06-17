import { Texture } from "../Texture/Texture";
import { AbstractProgram } from "../AbstractProgram/AbstractProgram";
import { BasicNoTextureMeshShader } from "../AbstractProgram/BasicNoTextureMeshShader";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export class Material {

    private materialName: string
    private usedProgram: AbstractProgram;
    private usedTexture: Texture | null;
    private renderComponentsUsingMat: RenderableComponent[] = [];
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

    public addRenderComponent(render: RenderableComponent): void {
        // needs id to delete later.
    }

    public get program(): AbstractProgram {
        return this.usedProgram;
    }

    public set program(prog: AbstractProgram) {
        this.usedProgram = prog;
    }

    public get texture(): Texture {
        return this.usedTexture;
    }

}