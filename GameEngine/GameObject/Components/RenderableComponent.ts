import { Mesh } from "../../Render/Mesh/Mesh";
import { GlBuffer, AttributeInformation } from "../../Render/gl/GLBuffer";
import { GameObject } from "../GameObject";
import { IComponent } from "./IComponent";
import { Render } from "../../Render/Render";
import { gl } from "../../Render/gl/GLManager";
import { JsonAsset } from "../../AssetManager/JsonAssetLoader";
import { Material } from "../../Render/Material/Material";
import { AbstractProgram } from "../../Render/AbstractProgram/AbstractProgram";
import { AbstractBufferAdministratorFactory } from "../../Render/AbstractBufferAdministratorFactory/AbstractBufferAdministratorFactory";
import { AbstractBufferAdministrator } from "../../Render/AbstractBufferAdministrator/AbstractBufferAdministrator";


export class RenderableComponent extends IComponent {

    protected enabled: boolean;
    private readonly renderableIndex: number;
    private mesh: Mesh;
    private usedMaterial: Material;
    private vertexBuffer: GlBuffer;
    private indexBuffer: GlBuffer;
    private normalsBuffer: GlBuffer;
    private textureCoordinatesBuffer: GlBuffer;
    private bufferAdmin: AbstractBufferAdministrator;

    constructor(go: GameObject,mesh: Mesh, material?: Material ) {
        super(go);
        go.addComponent(this);
        if (mesh !== undefined) {
            this.mesh = mesh;
        }
        if (material === undefined) {
            this.usedMaterial = new Material("Empty Material");
        }
        else {
            this.usedMaterial = material;
        }
        this.renderableIndex = Render.addRenderableComponent(this);
        let program: AbstractProgram = this.material.program;
        let admin: AbstractBufferAdministratorFactory = program.factory;
        this.bufferAdmin = admin.getBufferAdmin(this);
    }

    public set material(newMaterial: Material){
       this.usedMaterial = newMaterial;
    }

    public get material(): Material {
        return this.usedMaterial;
    }

 
    awake(): void {
        
    }

    start(): void {
        
    }
    update(): void {
        this.material.program.useProgram();
        this.bufferAdmin.bindBuffers();
        this.bufferAdmin.updateAllUniforms();
        this.bufferAdmin.draw();
    }
    public destroy(): void {

    }

    public get meshModel(): Mesh {
        return this.mesh;
    }

}