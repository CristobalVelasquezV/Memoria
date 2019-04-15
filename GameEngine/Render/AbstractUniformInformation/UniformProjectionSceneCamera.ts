import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { Camera } from "../Camera/Camera";
import { gl } from "../gl/GLManager";

export class UniformProjectionSceneCamera extends AbstractUniformInformation {

    constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }

    public loadUniform() {
        gl.uniformMatrix4fv(this.location, false, Camera.instance.getProjectionMatrix().getArray());     
    }
}