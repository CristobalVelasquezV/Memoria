import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { gl } from "../gl/GLManager";
import { DirectionalLightComponent } from "../../GameObject/Components/DirectionalLightComponent";
import { Vector3 } from "../../Matrix-gl/Vector3";

export class UniformDirectionalLightDirection extends AbstractUniformInformation {

    private readonly default: Vector3 = new Vector3(1, 1, 1);
    constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }

    public loadUniform() {
        let light: DirectionalLightComponent = DirectionalLightComponent.getFirstLight();
        if (light !== null && light !== undefined) {
            let direction: Vector3 = light.origin.transform.forward;
            gl.uniform3fv(this.location, direction.toArray());
        }
        else {
            gl.uniform3fv(this.location, this.default.toArray());
        }

    }
}