import { AbstractBufferAdministratorFactory } from "./AbstractBufferAdministratorFactory";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { TextureMeshBufferAdmin } from "../AbstractBufferAdministrator/TextureMeshBufferAdmin";

export class TextureMeshAdministratorFactory extends AbstractBufferAdministratorFactory {




    private static actualInstance: AbstractBufferAdministratorFactory;

    private constructor() {
        super();
    }
    public static get instance(): AbstractBufferAdministratorFactory {
        if (TextureMeshAdministratorFactory.actualInstance === undefined) {
            TextureMeshAdministratorFactory.actualInstance = new TextureMeshAdministratorFactory();
        }
        return TextureMeshAdministratorFactory.actualInstance;
    }


    getBufferAdmin(renderComp: RenderableComponent): AbstractBufferAdministrator {
        return new TextureMeshBufferAdmin(renderComp);
    }
    
}