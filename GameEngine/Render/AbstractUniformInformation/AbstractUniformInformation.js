define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Abstract Uniform Class handle the uniform setting each frame of the game for each Renderable Object, the abstract method loadUniform must
     *  * Load the uniform that the class handle.
     *  *
     * @param {WebGLUniformLocation} location
     * @param {UniformType} type
     * @param {AbstractBufferAdministrator} bufferAdmin
     * @returns
     */
    class AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            this._location = location;
            this._type = type;
            this._bufferAdmin = bufferAdmin;
        }
        /**
         * Location of the Uniform.
         * @returns
         */
        get location() {
            return this._location;
        }
        /**
         * Type of the uniform in glsl type lenguaje.
         * @returns
         */
        get type() {
            return this._type;
        }
        /**
         * The buffer Administrator that this uniform belongs.
         * @returns
         */
        get bufferAdmin() {
            return this._bufferAdmin;
        }
    }
    exports.AbstractUniformInformation = AbstractUniformInformation;
    /**Enum for each type of uniform in glsl. */
    var UniformType;
    (function (UniformType) {
        UniformType[UniformType["FloatMat4Array"] = 0] = "FloatMat4Array";
        UniformType[UniformType["Vector3"] = 1] = "Vector3";
    })(UniformType = exports.UniformType || (exports.UniformType = {}));
});
//# sourceMappingURL=AbstractUniformInformation.js.map