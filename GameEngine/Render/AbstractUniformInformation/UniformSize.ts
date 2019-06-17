import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { Mat4 } from "../../Matrix-gl/Mat4";
import { gl } from "../gl/GLManager";

export class UniformSize extends AbstractUniformInformation {
    public constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }

    public loadUniform() {
        let mSize: Mat4 = Mat4.fromScaling(this.bufferAdmin.renderComponent.origin.transform.scale);
        gl.uniformMatrix4fv(this.location, false, mSize.getArray());
    }


}