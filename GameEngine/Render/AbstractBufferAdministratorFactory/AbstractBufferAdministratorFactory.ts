import { Mesh } from "../Mesh/Mesh";
import { Material } from "../Material/Material";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export abstract class AbstractBufferAdministratorFactory {

    constructor() {

    }

    abstract getBufferAdmin(renderableComponent: RenderableComponent): AbstractBufferAdministrator;
}