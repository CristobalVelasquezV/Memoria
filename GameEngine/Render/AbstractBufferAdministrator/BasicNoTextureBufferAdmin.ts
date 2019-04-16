import { AbstractBufferAdministrator } from "./AbstractBufferAdministrator";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export class BasicNoTextureBufferAdmin extends AbstractBufferAdministrator {
    constructor(renderableComponent: RenderableComponent) {
        super(renderableComponent);
    }
}