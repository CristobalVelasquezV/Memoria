import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { Quaternion } from "../../Matrix-gl/Quaternion";
import { Mat4 } from "../../Matrix-gl/Mat4";
import { gl } from "../gl/GLManager";

export class UniformRotation extends AbstractUniformInformation {
    public constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }

    public loadUniform() {
        let rotation: Quaternion = this.bufferAdmin.renderComponent.origin.transform.rotation;
        let mRotation: Mat4 = Mat4.fromQuaternion(rotation);
        gl.uniformMatrix4fv(this.location, false, mRotation.getArray());
    }


}