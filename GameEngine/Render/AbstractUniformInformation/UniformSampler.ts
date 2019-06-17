import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { UniformType, AbstractUniformInformation } from "./AbstractUniformInformation";
import { Texture } from "../Texture/Texture";

export class UniformSampler extends AbstractUniformInformation {

    public constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }

    public loadUniform() {
        let texture: Texture = this.bufferAdmin.renderComponent.material.texture;
        if (texture !== null) {
            texture.activateAndBind();
        }
    }


}