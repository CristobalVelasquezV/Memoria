import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";
/**
 * Abstract Uniform Class handle the uniform setting each frame of the game for each Renderable Object, the abstract method loadUniform must 
 *  * Load the uniform that the class handle.
 *  *  
 * @param {WebGLUniformLocation} location
 * @param {UniformType} type
 * @param {AbstractBufferAdministrator} bufferAdmin
 * @returns
 */
export abstract class AbstractUniformInformation {

    public constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        this._location = location;
        this._type = type;
        this._bufferAdmin = bufferAdmin;
    }

    protected _location: WebGLUniformLocation;
    protected _type: UniformType;
    protected _bufferAdmin: AbstractBufferAdministrator;
    /**
     * Location of the Uniform.
     * @returns
     */
    public get location() {
        return this._location;
    }
    /**
     * Type of the uniform in glsl type lenguaje.
     * @returns
     */
    public get type() {
        return this._type;
    }
    /**
     * The buffer Administrator that this uniform belongs.
     * @returns
     */
    public get bufferAdmin() {
        return this._bufferAdmin;
    }
    /** Abstract load uniform handle the load of each uniform. */
    public abstract loadUniform();

}
/**Enum for each type of uniform in glsl. */
export enum UniformType {
    FloatMat4Array,
    Vector3
}
