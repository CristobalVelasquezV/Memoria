import { gl } from "./GLManager";

export class AttributeInformation {
    public location: number;
    public size: number;
    public offset: number;
}



//faltan uniforms para los shaders.
export class GlBuffer {
    private hasAttributeLocation: boolean = false;
    private elementSize: number;
    private stride: number;
    private buffer: WebGLBuffer | null;
    private targetBufferType: number;
    private dataType: number;
    private typeSize: number;
    private mode: number;
    private size: number;

    private data: number[] = [];

    private attributes: AttributeInformation[] = [];



    public constructor(elementSize: number, dataType: number = gl.FLOAT, targetBufferType: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
        this.elementSize = elementSize;
        this.dataType = dataType;
        this.targetBufferType = targetBufferType;
        this.mode = mode;
        switch (this.dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                this.typeSize = 4;
                break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                this.typeSize = 2;
                break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                this.typeSize = 1;
                break;
            default:
                console.warn("GlBuffer with unrecongnizable data type: " + this.dataType.toString());
        }

        this.buffer = gl.createBuffer();
    }

    public destroy(): void {
        gl.deleteBuffer(this.buffer);
    }

    public bind(normalized: boolean = false): void {
        gl.bindBuffer(this.targetBufferType, this.buffer);
        if (this.hasAttributeLocation) {
            for (let attributeInfo of this.attributes) {
                gl.vertexAttribPointer(attributeInfo.location, attributeInfo.size, this.dataType, normalized, this.stride, attributeInfo.offset * this.dataType);
                gl.enableVertexAttribArray(attributeInfo.location);
            }
        }
    }

    public unbind(): void {
        for (let attributeInfo of this.attributes) {
            gl.disableVertexAttribArray(attributeInfo.location);
        }
        gl.bindBuffer(this.targetBufferType, null);
    }

    public addAttributeLocation(info: AttributeInformation): void {
        this.hasAttributeLocation = true;
        this.attributes.push(info);
    }


    public setData(data: number[]): void {
        this.clearData();
        this.pushBackData(data);
    }

    /**
     * Adds data to this buffer.
     * @param data
     */
    public pushBackData(data: number[]): void {
        for (let d of data) {
            this.data.push(d);
        }
    }

    /**
     * Clears out all data in this buffer.
     * */
    public clearData(): void {
        this.data.length = 0;
    }

    public upload(): void {
        gl.bindBuffer(this.targetBufferType, this.buffer);

        let bufferData: ArrayBufferView;
        switch (this.dataType) {
            case gl.FLOAT:
                bufferData = new Float32Array(this.data);
                break;
            case gl.INT:
                bufferData = new Int32Array(this.data);
                break;
            case gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this.data);
                break;
            case gl.SHORT:
                bufferData = new Int16Array(this.data);
                break;
            case gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this.data);
                break;
            case gl.BYTE:
                bufferData = new Int8Array(this.data);
                break;
            case gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this.data);
                break;
            default:
                bufferData = new Float32Array(this.data);
                break;
        }

        gl.bufferData(this.targetBufferType, bufferData, gl.STATIC_DRAW);
    }

    public draw(): void {
        //fix mal array buuger deberia ser element

        if (this.targetBufferType === gl.ARRAY_BUFFER) {
            gl.drawArrays(this.mode, 0, this.data.length / this.elementSize);
        } else if (this.targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this.mode, this.data.length, this.dataType, 0);
        }
    }
}