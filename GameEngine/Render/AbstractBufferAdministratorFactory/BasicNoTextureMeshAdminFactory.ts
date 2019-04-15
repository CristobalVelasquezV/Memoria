import { AbstractBufferAdministratorFactory } from "./AbstractBufferAdministratorFactory";
import { Mesh } from "../Mesh/Mesh";
import { Material } from "../Material/Material";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { BasicNoTextureBufferAdmin } from "../AbstractBufferAdministrator/BasicNoTextureBufferAdmin";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export class BasicNoTextureMeshAdminFactory extends AbstractBufferAdministratorFactory {

    private static actualInstance: AbstractBufferAdministratorFactory;

    private constructor() {
        super();
    }
    public static get instance(): AbstractBufferAdministratorFactory {
        if (BasicNoTextureMeshAdminFactory.actualInstance === undefined) {
            BasicNoTextureMeshAdminFactory.actualInstance = new BasicNoTextureMeshAdminFactory();
        }
        return BasicNoTextureMeshAdminFactory.actualInstance;
    }


    getBufferAdmin( renderComp: RenderableComponent): AbstractBufferAdministrator {
        return new BasicNoTextureBufferAdmin(renderComp);
    }


}