define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractUniformInformation {
        constructor(location, type, bufferAdmin) {
            this._location = location;
            this._type = type;
            this._bufferAdmin = bufferAdmin;
        }
        get location() {
            return this._location;
        }
        get type() {
            return this._type;
        }
        get bufferAdmin() {
            return this._bufferAdmin;
        }
    }
    exports.AbstractUniformInformation = AbstractUniformInformation;
    var UniformType;
    (function (UniformType) {
        UniformType[UniformType["FloatMat4Array"] = 0] = "FloatMat4Array";
    })(UniformType = exports.UniformType || (exports.UniformType = {}));
});
//# sourceMappingURL=AbstractUniformInformation.js.map