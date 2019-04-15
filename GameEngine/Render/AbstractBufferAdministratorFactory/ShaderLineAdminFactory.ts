import { AbstractBufferAdministratorFactory } from "./AbstractBufferAdministratorFactory";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";
import { ShaderLineBufferAdmin } from "../AbstractBufferAdministrator/ShaderLineBufferAdmin";

export class ShaderLineAdminFactory extends AbstractBufferAdministratorFactory {


    private static actualInstance: AbstractBufferAdministratorFactory;

    private constructor() {
        super();
    }
    public static get instance(): AbstractBufferAdministratorFactory {
        if (ShaderLineAdminFactory.actualInstance === undefined) {
            ShaderLineAdminFactory.actualInstance = new ShaderLineAdminFactory();
        }
        return ShaderLineAdminFactory.actualInstance;
    }


    getBufferAdmin(renderComp: RenderableComponent): AbstractBufferAdministrator {
        return new ShaderLineBufferAdmin(renderComp);
    }

}