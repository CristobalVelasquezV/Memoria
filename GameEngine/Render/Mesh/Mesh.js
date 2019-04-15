define(["require", "exports", "../../Messege/Message", "../../AssetManager/AssetManager"], function (require, exports, Message_1, AssetManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Mesh {
        constructor(name, is2D) {
            this.name = name;
            if (is2D !== undefined) {
                this._is3D = false;
                this.lineVertices = is2D;
            }
            else {
                this._is3D = true;
                this.isLoaded = false;
                Message_1.Message.subscribe(Message_1.Message.MESSAGE_ASSET_LOADED + Mesh.modelPath + this.name, this);
                this.jsonData = AssetManager_1.AssetManager.getAsset(Mesh.modelPath + this.name);
                this.jsonData2 = AssetManager_1.AssetManager.getAssetSync(Mesh.modelPath + this.name, this);
                if (this.jsonData !== undefined) {
                    //falta checkear unicidad
                    this.loadMeshFromAsset(this.jsonData);
                }
            }
        }
        static initialize() {
            Mesh.cubeMesh = new Mesh("defaultCube.json");
        }
        get lines() {
            return this.lineVertices;
        }
        static get defaultCube() {
            return Mesh.cubeMesh;
        }
        get is3D() {
            return this._is3D;
        }
        onMessage(message) {
            if (message.code === Message_1.Message.MESSAGE_ASSET_LOADED + Mesh.modelPath + this.name) {
                this.loadMeshFromAsset(message.context);
            }
        }
        onSyncLoad(data) {
            this.jsonData2 = data;
            console.log("sync json loaded");
        }
        loadMeshFromAsset(asset) {
            this.jsonData = asset;
        }
        getJsonData() {
            return this.jsonData;
        }
        getJsonData2() {
            return this.jsonData2;
        }
    }
    Mesh.modelPath = "assets/models/";
    exports.Mesh = Mesh;
});
//# sourceMappingURL=Mesh.js.map