import { Mesh } from "../Mesh/Mesh";
import { Material } from "../Material/Material";
import { GlBuffer, AttributeInformation } from "../gl/GLBuffer";
import { JsonAsset } from "../../AssetManager/JsonAssetLoader";
import { AbstractProgram } from "../AbstractProgram/AbstractProgram";
import { gl } from "../gl/GLManager";
import { UniformType, AbstractUniformInformation } from "../AbstractUniformInformation/AbstractUniformInformation";
import { RenderableComponent } from "../../GameObject/Components/RenderableComponent";
import { UniformWorldPosition } from "../AbstractUniformInformation/UniformWorldPosition";
import { UniformSize } from "../AbstractUniformInformation/UniformSize";
import { UniformViewSceneCamera } from "../AbstractUniformInformation/UniformViewSceneCamera";
import { UniformProjectionSceneCamera } from "../AbstractUniformInformation/UniformProjectionSceneCamera";

export abstract class AbstractBufferAdministrator {

    private vertexBuffer: GlBuffer;
    private indexBuffer: GlBuffer;
    private normalsBuffer: GlBuffer;
    private textureCoordinatesBuffer: GlBuffer;

    private _renderComponent: RenderableComponent;

    private totalBuffers: GlBuffer[] = [];
    private totalUniforms: AbstractUniformInformation[] = [];


    constructor( renderableComponent: RenderableComponent) {
        this._renderComponent = renderableComponent;
        this.loadDefaultBuffers();
        this.loadDefaultUniforms();    
    }

    public get renderComponent() {
        return this._renderComponent;
    }

    public bindBuffers(): void {
        for (let i = 0; i < this.totalBuffers.length; i++) {
            this.totalBuffers[i].bind();
        }
    }
    public unbindBuffers(): void {
        for (let i = 0; i < this.totalBuffers.length; i++) {
            this.totalBuffers[i].unbind();
        }
    }

    public draw(): void {
        if (this.indexBuffer !== undefined) {
            this.indexBuffer.draw();
        }
        else {
            //console.log(this.renderComponent.origin.gameObjectName);
            //console.log("index buffer undefined");
        }
    }

    public updateAllUniforms(): void {
        for (let i = 0; i < this.totalUniforms.length; i++) {
            this.totalUniforms[i].loadUniform();
        }
    }

    private loadDefaultUniforms(): void {

        let meshData: JsonAsset = this.renderComponent.meshModel.getJsonData2();
        let prog: AbstractProgram = this.renderComponent.material.program;

        let worldLocation: WebGLUniformLocation | null;
        worldLocation = prog.getUniformLocation('mWorld');
        if (worldLocation !== null) {
            let uniformWorld: UniformWorldPosition = new UniformWorldPosition(worldLocation, UniformType.FloatMat4Array,this);
            this.totalUniforms.push(uniformWorld);
        }

        let sizeLocation: WebGLUniformLocation | null;
        sizeLocation = prog.getUniformLocation('mSize');
        if (sizeLocation !== null) {
            let uniformSize: UniformSize = new UniformSize(sizeLocation, UniformType.FloatMat4Array, this);
            this.totalUniforms.push(uniformSize);
        }

        let viewLocation: WebGLUniformLocation | null;
        viewLocation = prog.getUniformLocation('mView');
        if (viewLocation !== null) {
            let uniformView: UniformViewSceneCamera = new UniformViewSceneCamera(viewLocation, UniformType.FloatMat4Array, this);
            this.totalUniforms.push(uniformView);
        }

        let projLocation: WebGLUniformLocation | null;
        projLocation = prog.getUniformLocation('mProj');
        if (projLocation !== null) {
            let uniformProj: UniformProjectionSceneCamera = new UniformProjectionSceneCamera(projLocation, UniformType.FloatMat4Array, this);
            this.totalUniforms.push(uniformProj);
        }

    }

    public loadDefaultBuffers() {

        let mesh1: Mesh = this.renderComponent.meshModel;
        let mat: Material = this.renderComponent.material;
        if (mesh1 !== undefined) {
            let meshData: JsonAsset = mesh1.getJsonData2();
            let prog: AbstractProgram = mat.program;
            if (meshData !== undefined) {
                let textureCoordLocation = new AttributeInformation();
                textureCoordLocation.size = 0;
                textureCoordLocation.size = 2;
                textureCoordLocation.location = prog.getAttributeLocation('vertTexCoord');

                if (textureCoordLocation.location !== -1) {
                    this.textureCoordinatesBuffer = new GlBuffer(meshData.data.meshes[0].texturecoords[0].length);
                    this.textureCoordinatesBuffer.addAttributeLocation(textureCoordLocation);
                    let texCoords = meshData.data.meshes[0].texturecoords[0];
                    this.textureCoordinatesBuffer.pushBackData(texCoords);
                    this.textureCoordinatesBuffer.upload();
                    this.textureCoordinatesBuffer.unbind();
                    this.totalBuffers.push(this.textureCoordinatesBuffer);
                }


                this.vertexBuffer = new GlBuffer(meshData.data.meshes[0].vertices.length);
                this.vertexBuffer.bind();
                let positionLocation = new AttributeInformation();
                positionLocation.location = prog.getAttributeLocation('vertPosition');
                if (positionLocation.location !== -1) {
                    positionLocation.offset = 0;
                    positionLocation.size = 3;
                    this.vertexBuffer.addAttributeLocation(positionLocation);
                    this.vertexBuffer.pushBackData(meshData.data.meshes[0].vertices);
                    this.vertexBuffer.upload();
                    this.vertexBuffer.unbind();
                    this.totalBuffers.push(this.vertexBuffer);
                    if (this._renderComponent.meshModel.is3D) {
 
                    }

                }


                this.normalsBuffer = new GlBuffer(meshData.data.meshes[0].normals.length);
                this.normalsBuffer.bind();
                let normalsLocation = new AttributeInformation();
                normalsLocation.location = prog.getAttributeLocation('vertNormal');
                if (normalsLocation.location !== -1) {
                    normalsLocation.offset = 0;
                    normalsLocation.size = 3;
                    this.normalsBuffer.addAttributeLocation(normalsLocation);
                    this.normalsBuffer.pushBackData(meshData.data.meshes[0].normals);
                    this.normalsBuffer.upload();
                    this.normalsBuffer.unbind();
                    this.totalBuffers.push(this.normalsBuffer);
                }

                if (this._renderComponent.meshModel.is3D) {
                    let modelindices = [].concat.apply([], meshData.data.meshes[0].faces);
                    this.indexBuffer = new GlBuffer(modelindices.length, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER)
                    this.indexBuffer.bind();
                    this.indexBuffer.pushBackData(modelindices);
                    this.indexBuffer.upload();
                    this.indexBuffer.unbind();
                    this.totalBuffers.push(this.indexBuffer);
                }
                else {
                    this.indexBuffer = new GlBuffer(3, gl.FLOAT, gl.ARRAY_BUFFER, gl.LINES);
                    this.indexBuffer.bind();
                    this.indexBuffer.pushBackData(this._renderComponent.meshModel.lines);
                    this.indexBuffer.upload();
                    this.indexBuffer.unbind();
                    this.totalBuffers.push(this.indexBuffer);
                }


            }
            else {
                console.log("undef jsondata");
            }
        }
        
        
    }

}