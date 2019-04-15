define(["require", "exports", "../gl/GLBuffer", "../gl/GLManager"], function (require, exports, GLBuffer_1, GLManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractBufferAdministrator {
        constructor(mesh, usedMaterial) {
            this.loadDefaultBuffers(mesh, usedMaterial);
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
            this.indexBuffer.draw();
        }
        loadDefaultBuffers(mesh, material) {
            let meshData = mesh.getJsonData();
            let prog = material.program;
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
                let modelindices = [].concat.apply([], meshData.data.meshes[0].faces);
                this.indexBuffer = new GLBuffer_1.GlBuffer(modelindices.length, GLManager_1.gl.UNSIGNED_SHORT, GLManager_1.gl.ELEMENT_ARRAY_BUFFER);
                this.indexBuffer.bind();
                this.indexBuffer.pushBackData(modelindices);
                this.indexBuffer.upload();
                this.indexBuffer.unbind();
            }
        }
    }
    exports.AbstractBufferAdministrator = AbstractBufferAdministrator;
});
//# sourceMappingURL=AbstracBufferAdministrator.js.map