import { AbstractBufferAdministrator } from "./AbstractBufferAdministrator";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";

export class TextureMeshBufferAdmin extends AbstractBufferAdministrator{
    constructor(renderableComponent: RenderableComponent) {
        super(renderableComponent);
    }
}