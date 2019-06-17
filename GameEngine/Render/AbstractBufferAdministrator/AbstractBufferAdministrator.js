define(["require", "exports", "../gl/GLBuffer", "../gl/GLManager", "../AbstractUniformInformation/AbstractUniformInformation", "../AbstractUniformInformation/UniformWorldPosition", "../AbstractUniformInformation/UniformSize", "../AbstractUniformInformation/UniformViewSceneCamera", "../AbstractUniformInformation/UniformProjectionSceneCamera", "../AbstractUniformInformation/UniformSampler", "../AbstractUniformInformation/UniformDirectionalLightDirection", "../AbstractUniformInformation/UniformDirectionalLightColor", "../AbstractUniformInformation/UniformAmbientLight"], function (require, exports, GLBuffer_1, GLManager_1, AbstractUniformInformation_1, UniformWorldPosition_1, UniformSize_1, UniformViewSceneCamera_1, UniformProjectionSceneCamera_1, UniformSampler_1, UniformDirectionalLightDirection_1, UniformDirectionalLightColor_1, UniformAmbientLight_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractBufferAdministrator {
        constructor(renderableComponent) {
            this.totalBuffers = [];
            this.totalUniforms = [];
            this._renderComponent = renderableComponent;
            this.loadDefaultBuffers();
            this.loadDefaultUniforms();
        }
        destroy() {
            for (let i = 0; i < this.totalBuffers.length; i++) {
                this.totalBuffers[i].destroy();
            }
            delete this.totalUniforms;
        }
        get renderComponent() {
            return this._renderComponent;
        }
        bindBuffers() {
            for (let i = 0; i < this.totalBuffers.length; i++) {
                this.totalBuffers[i].bind();
            }
        }
        unbindBuffers() {
            for (let i = 0; i < this.totalBuffers.length; i++) {
                this.totalBuffers[i].unbind();
            }
        }
        draw() {
            if (this.indexBuffer !== undefined) {
                this.indexBuffer.draw();
            }
            else {
                //console.log(this.renderComponent.origin.gameObjectName);
                //console.log("index buffer undefined");
            }
        }
        updateAllUniforms() {
            for (let i = 0; i < this.totalUniforms.length; i++) {
                this.totalUniforms[i].loadUniform();
            }
        }
        loadDefaultUniforms() {
            let meshData = this.renderComponent.meshModel.getJsonData2();
            let prog = this.renderComponent.material.program;
            let worldLocation;
            worldLocation = prog.getUniformLocation('mWorld');
            if (worldLocation !== null) {
                let uniformWorld = new UniformWorldPosition_1.UniformWorldPosition(worldLocation, AbstractUniformInformation_1.UniformType.FloatMat4Array, this);
                this.totalUniforms.push(uniformWorld);
            }
            let sizeLocation;
            sizeLocation = prog.getUniformLocation('mSize');
            if (sizeLocation !== null) {
                let uniformSize = new UniformSize_1.UniformSize(sizeLocation, AbstractUniformInformation_1.UniformType.FloatMat4Array, this);
                this.totalUniforms.push(uniformSize);
            }
            let viewLocation;
            viewLocation = prog.getUniformLocation('mView');
            if (viewLocation !== null) {
                let uniformView = new UniformViewSceneCamera_1.UniformViewSceneCamera(viewLocation, AbstractUniformInformation_1.UniformType.FloatMat4Array, this);
                this.totalUniforms.push(uniformView);
            }
            let projLocation;
            projLocation = prog.getUniformLocation('mProj');
            if (projLocation !== null) {
                let uniformProj = new UniformProjectionSceneCamera_1.UniformProjectionSceneCamera(projLocation, AbstractUniformInformation_1.UniformType.FloatMat4Array, this);
                this.totalUniforms.push(uniformProj);
            }
            let ambientLightLocation;
            ambientLightLocation = prog.getUniformLocation('ambientLight');
            if (ambientLightLocation !== null) {
                let uniformambient = new UniformAmbientLight_1.UniformAmbientLight(ambientLightLocation, AbstractUniformInformation_1.UniformType.Vector3, this);
                this.totalUniforms.push(uniformambient);
            }
            let directionalLightLocation;
            directionalLightLocation = prog.getUniformLocation('directionalLightDirection');
            if (directionalLightLocation !== null) {
                let uniformdirectional = new UniformDirectionalLightDirection_1.UniformDirectionalLightDirection(directionalLightLocation, AbstractUniformInformation_1.UniformType.Vector3, this);
                this.totalUniforms.push(uniformdirectional);
            }
            let directionalLightColorLocation;
            directionalLightColorLocation = prog.getUniformLocation('directionalLightColor');
            if (directionalLightColorLocation !== null) {
                let uniformcolor = new UniformDirectionalLightColor_1.UniformDirectionalLightColor(directionalLightColorLocation, AbstractUniformInformation_1.UniformType.Vector3, this);
                this.totalUniforms.push(uniformcolor);
            }
        }
        loadDefaultBuffers() {
            let mesh1 = this.renderComponent.meshModel;
            let mat = this.renderComponent.material;
            if (mesh1 !== undefined) {
                let meshData = mesh1.getJsonData2();
                let prog = mat.program;
                if (meshData !== undefined) {
                    let textureCoordLocation = new GLBuffer_1.AttributeInformation();
                    textureCoordLocation.size = 0;
                    textureCoordLocation.size = 2;
                    textureCoordLocation.location = prog.getAttributeLocation('vertTexCoord');
                    if (textureCoordLocation.location !== -1) {
                        this.textureCoordinatesBuffer = new GLBuffer_1.GlBuffer(meshData.data.meshes[0].texturecoords[0].length);
                        this.textureCoordinatesBuffer.addAttributeLocation(textureCoordLocation);
                        let texCoords = meshData.data.meshes[0].texturecoords[0];
                        this.textureCoordinatesBuffer.pushBackData(texCoords);
                        this.textureCoordinatesBuffer.upload();
                        this.textureCoordinatesBuffer.unbind();
                        this.totalBuffers.push(this.textureCoordinatesBuffer);
                        let uniformSampler = new UniformSampler_1.UniformSampler(prog.getUniformLocation('sampler'), AbstractUniformInformation_1.UniformType.FloatMat4Array, this);
                        this.totalUniforms.push(uniformSampler);
                    }
                    this.vertexBuffer = new GLBuffer_1.GlBuffer(meshData.data.meshes[0].vertices.length);
                    this.vertexBuffer.bind();
                    let positionLocation = new GLBuffer_1.AttributeInformation();
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
                    this.normalsBuffer = new GLBuffer_1.GlBuffer(meshData.data.meshes[0].normals.length);
                    this.normalsBuffer.bind();
                    let normalsLocation = new GLBuffer_1.AttributeInformation();
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
                        this.indexBuffer = new GLBuffer_1.GlBuffer(modelindices.length, GLManager_1.gl.UNSIGNED_SHORT, GLManager_1.gl.ELEMENT_ARRAY_BUFFER);
                        this.indexBuffer.bind();
                        this.indexBuffer.pushBackData(modelindices);
                        this.indexBuffer.upload();
                        this.indexBuffer.unbind();
                        this.totalBuffers.push(this.indexBuffer);
                    }
                    else {
                        this.indexBuffer = new GLBuffer_1.GlBuffer(3, GLManager_1.gl.FLOAT, GLManager_1.gl.ARRAY_BUFFER, GLManager_1.gl.LINES);
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
    exports.AbstractBufferAdministrator = AbstractBufferAdministrator;
});
//# sourceMappingURL=AbstractBufferAdministrator.js.map