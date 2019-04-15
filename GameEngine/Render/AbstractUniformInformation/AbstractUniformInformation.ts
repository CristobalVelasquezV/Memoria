import { AbstractBufferAdministrator } from "../AbstractBufferAdministrator/AbstractBufferAdministrator";

export abstract class AbstractUniformInformation {

    public constructor(location: WebGLUniformLocation, type: UniformType, bufferAdmin: AbstractBufferAdministrator) {
        this._location = location;
        this._type = type;
        this._bufferAdmin = bufferAdmin;
    }

    protected _location: WebGLUniformLocation;
    protected _type: UniformType;
    protected _bufferAdmin: AbstractBufferAdministrator;

    public get location() {
        return this._location;
    }

    public get type() {
        return this._type;
    }

    public get bufferAdmin() {
        return this._bufferAdmin;
    }

    public abstract loadUniform();
}

export enum UniformType {
    FloatMat4Array
}
