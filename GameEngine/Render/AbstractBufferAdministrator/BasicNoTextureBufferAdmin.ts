import { AbstractBufferAdministrator } from "./AbstractBufferAdministrator";
import { Mesh } from "../Mesh/Mesh";
import { Material } from "../Material/Material";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export class BasicNoTextureBufferAdmin extends AbstractBufferAdministrator {
    constructor(renderableComponent: RenderableComponent) {
        super(renderableComponent);
    }
}