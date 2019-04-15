import { AbstractBufferAdministrator } from "./AbstractBufferAdministrator";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export class ShaderLineBufferAdmin extends AbstractBufferAdministrator {
    constructor(renderComp: RenderableComponent) {
        super(renderComp);
    }
}