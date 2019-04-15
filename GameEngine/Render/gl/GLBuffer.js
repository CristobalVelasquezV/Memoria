define(["require", "exports", "./GLManager"], function (require, exports, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AttributeInformation {
    }
    exports.AttributeInformation = AttributeInformation;
    //faltan uniforms para los shaders.
    class GlBuffer {
        constructor(elementSize, dataType = GLManager_1.gl.FLOAT, targetBufferType = GLManager_1.gl.ARRAY_BUFFER, mode = GLManager_1.gl.TRIANGLES) {
            this.hasAttributeLocation = false;
            this.data = [];
            this.attributes = [];
            this.elementSize = elementSize;
            this.dataType = dataType;
            this.targetBufferType = targetBufferType;
            this.mode = mode;
            switch (this.dataType) {
                case GLManager_1.gl.FLOAT:
                case GLManager_1.gl.INT:
                case GLManager_1.gl.UNSIGNED_INT:
                    this.typeSize = 4;
                    break;
                case GLManager_1.gl.SHORT:
                case GLManager_1.gl.UNSIGNED_SHORT:
                    this.typeSize = 2;
                    break;
                case GLManager_1.gl.BYTE:
                case GLManager_1.gl.UNSIGNED_BYTE:
                    this.typeSize = 1;
                    break;
                default:
                    console.warn("GlBuffer with unrecongnizable data type: " + this.dataType.toString());
            }
            this.buffer = GLManager_1.gl.createBuffer();
        }
        destroy() {
            GLManager_1.gl.deleteBuffer(this.buffer);
        }
        bind(normalized = false) {
            GLManager_1.gl.bindBuffer(this.targetBufferType, this.buffer);
            if (this.hasAttributeLocation) {
                for (let attributeInfo of this.attributes) {
                    GLManager_1.gl.vertexAttribPointer(attributeInfo.location, attributeInfo.size, this.dataType, normalized, this.stride, attributeInfo.offset * this.dataType);
                    GLManager_1.gl.enableVertexAttribArray(attributeInfo.location);
                }
            }
        }
        unbind() {
            for (let attributeInfo of this.attributes) {
                GLManager_1.gl.disableVertexAttribArray(attributeInfo.location);
            }
            GLManager_1.gl.bindBuffer(this.targetBufferType, null);
        }
        addAttributeLocation(info) {
            this.hasAttributeLocation = true;
            this.attributes.push(info);
        }
        setData(data) {
            this.clearData();
            this.pushBackData(data);
        }
        /**
         * Adds data to this buffer.
         * @param data
         */
        pushBackData(data) {
            for (let d of data) {
                this.data.push(d);
            }
        }
        /**
         * Clears out all data in this buffer.
         * */
        clearData() {
            this.data.length = 0;
        }
        upload() {
            GLManager_1.gl.bindBuffer(this.targetBufferType, this.buffer);
            let bufferData;
            switch (this.dataType) {
                case GLManager_1.gl.FLOAT:
                    bufferData = new Float32Array(this.data);
                    break;
                case GLManager_1.gl.INT:
                    bufferData = new Int32Array(this.data);
                    break;
                case GLManager_1.gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this.data);
                    break;
                case GLManager_1.gl.SHORT:
                    bufferData = new Int16Array(this.data);
                    break;
                case GLManager_1.gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this.data);
                    break;
                case GLManager_1.gl.BYTE:
                    bufferData = new Int8Array(this.data);
                    break;
                case GLManager_1.gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this.data);
                    break;
                default:
                    bufferData = new Float32Array(this.data);
                    break;
            }
            GLManager_1.gl.bufferData(this.targetBufferType, bufferData, GLManager_1.gl.STATIC_DRAW);
        }
        draw() {
            //fix mal array buuger deberia ser element
            if (this.targetBufferType === GLManager_1.gl.ARRAY_BUFFER) {
                GLManager_1.gl.drawArrays(this.mode, 0, this.data.length / this.elementSize);
            }
            else if (this.targetBufferType === GLManager_1.gl.ELEMENT_ARRAY_BUFFER) {
                GLManager_1.gl.drawElements(this.mode, this.data.length, this.dataType, 0);
            }
        }
    }
    exports.GlBuffer = GlBuffer;
});
//# sourceMappingURL=GLBuffer.js.map