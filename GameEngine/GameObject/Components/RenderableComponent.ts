import { Mesh } from "../../Render/Mesh/Mesh";
import { GameObject } from "../GameObject";
import { IComponent } from "./IComponent";
import { Material } from "../../Render/Material/Material";
import { AbstractProgram } from "../../Render/AbstractProgram/AbstractProgram";
import { AbstractBufferAdministratorFactory } from "../../Render/AbstractBufferAdministratorFactory/AbstractBufferAdministratorFactory";
import { AbstractBufferAdministrator } from "../../Render/AbstractBufferAdministrator/AbstractBufferAdministrator";


export class RenderableComponent extends IComponent {


    private mesh: Mesh;
    private usedMaterial: Material;
    private bufferAdmin: AbstractBufferAdministrator;
    private actualProgram: AbstractProgram;

    constructor(go: GameObject,mesh: Mesh, material?: Material ) {
        super(go);
        if (mesh !== undefined) {
            this.mesh = mesh;
        }
        if (material === undefined) {
            this.usedMaterial = new Material("Empty Material");
        }
        else {
            this.usedMaterial = material;
        }
        this.actualProgram = this.material.program;
        let admin: AbstractBufferAdministratorFactory = this.actualProgram.factory;
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
        if (typeof this.actualProgram !== typeof this.material.program) {
            this.actualProgram = this.material.program;
            let admin: AbstractBufferAdministratorFactory = this.actualProgram.factory;
            this.bufferAdmin = admin.getBufferAdmin(this);
        }
        this.material.program.useProgram();
        this.bufferAdmin.bindBuffers();
        this.bufferAdmin.updateAllUniforms();
        this.bufferAdmin.draw();
    }


    public destroy(): void {
        this.bufferAdmin.destroy();
    }

    public get meshModel(): Mesh {
        return this.mesh;
    }

}