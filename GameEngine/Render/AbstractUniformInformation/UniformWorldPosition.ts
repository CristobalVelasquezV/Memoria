import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { Mat4 } from "../../Matrix-gl/Mat4";
import { gl } from "../gl/GLManager";

export class UniformWorldPosition extends AbstractUniformInformation {
    public constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location,type,bufferAdmin);
    }

    public loadUniform() {
        let position: Vector3 = this.bufferAdmin.renderComponent.origin.transform.position;
        let mPosition: Mat4 = Mat4.fromTranslation(position);
        gl.uniformMatrix4fv(this.location, false, mPosition.getArray());
    }


}