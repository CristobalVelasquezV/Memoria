import { AbstractUniformInformation, UniformType } from "./AbstractUniformInformation";
import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
import { gl } from "../gl/GLManager";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { SceneManager } from "../../Scenes/SceneManager";
/**
 * Uniform that handles AmbientLight uniform setting each frame.
 * @param {WebGLUniformLocation} location
 * @param {UniformType} type
 * @param {AbstractBufferAdministrator} bufferAdmin
 */
export class UniformAmbientLight extends AbstractUniformInformation {
    constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        super(location, type, bufferAdmin);
    }
    /**
     * Loads the ambient light intensity of the Scene.
     */
    public loadUniform() {
        let ambient: Vector3 = SceneManager.actualScene.ambientLightIntencity;
        gl.uniform3fv(this.location, ambient.toArray());

    }
}