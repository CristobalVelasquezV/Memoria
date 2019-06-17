import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { gl } from "../gl/GLManager";
import { DirectionalLightComponent } from "../../GameObject/Components/DirectionalLightComponent";
import { Vector3 } from "../../Matrix-gl/Vector3";
/**
 * UniformDirectionalLightColor handles the setting of the Color of the directional Light each update.
 * @param {WebGLUniformLocation} location
 * @param {UniformType} type
 * @param {AbstractBufferAdministrator} bufferAdmin
 */
export class UniformDirectionalLightColor extends AbstractUniformInformation {

    constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }
    //default Value
    private readonly default: Vector3 = new Vector3(0, 0, 0);
    /**
     * Loads the Directional Light Color Uniforms each frame in case that there is a DirectionalLight in the Scene, it only works with one directional
     *  * Light.
     */
    public loadUniform() {
        let light: DirectionalLightComponent = DirectionalLightComponent.getFirstLight();

        if (light !== null && light !== undefined) {
            let color: Vector3 = light.lightColor;
            gl.uniform3fv(this.location, color.toArray());
        }
        else {
            gl.uniform3fv(this.location, this.default.toArray());
        }

    }
}