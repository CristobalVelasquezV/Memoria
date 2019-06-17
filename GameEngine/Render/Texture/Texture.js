define(["require", "exports", "../gl/GLManager", "./TextureManager", "../../Messege/Message", "../../AssetManager/AssetManager"], function (require, exports, GLManager_1, TextureManager_1, Message_1, AssetManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const LEVEL = 0;
    const BORDER = 0;
    const TEMP_IMG_DATA = new Uint8Array([255, 255, 255, 255]);
    class Texture {
        constructor(name, width = -1, height = 1) {
            this.name = name;
            this.width = width;
            this.height = height;
            this.handle = GLManager_1.gl.createTexture();
            //Message.subscribe(Message.MESSAGE_ASSET_LOADED + this.name, this);
            this.bind();
            GLManager_1.gl.texImage2D(GLManager_1.gl.TEXTURE_2D, LEVEL, GLManager_1.gl.RGBA, 1, 1, BORDER, GLManager_1.gl.RGBA, GLManager_1.gl.UNSIGNED_BYTE, TEMP_IMG_DATA);
            //let asset = AssetManager.getAsset(this.name) as ImageAsset;
            let asset2 = AssetManager_1.AssetManager.getAssetSync(this.name, this);
            if (asset2 !== undefined) {
                //falta checkear unicidad
                this.loadTextureFromAsset(asset2);
            }
            TextureManager_1.TextureManager.addTexture(this.name, this);
        }
        onMessage(message) {
            if (message.code === Message_1.Message.MESSAGE_ASSET_LOADED + this.name) {
                this.loadTextureFromAsset(message.context);
            }
        }
        onSyncLoad(data) {
            const img = data;
            this.loadTextureFromAsset(img);
        }
        get Name() {
            return this.name;
        }
        get getIsLoaded() {
            return this.isLoaded;
        }
        get getWidth() {
            return this.width;
        }
        get getHeight() {
            return this.height;
        }
        activateAndBind(textureUnit = 0) {
            if (textureUnit < 16 && textureUnit >= 0) {
                GLManager_1.gl.activeTexture(GLManager_1.gl.TEXTURE0 + textureUnit);
            }
            else {
                console.warn("texture Unit wrong");
            }
            this.bind();
        }
        destroy() {
            GLManager_1.gl.deleteTexture(this.handle);
        }
        bind() {
            GLManager_1.gl.bindTexture(GLManager_1.gl.TEXTURE_2D, this.handle);
        }
        unbind() {
            GLManager_1.gl.bindTexture(GLManager_1.gl.TEXTURE_2D, null);
        }
        loadTextureFromAsset(asset) {
            this.width = asset.width();
            this.height = asset.height();
            this.bind();
            GLManager_1.gl.texImage2D(GLManager_1.gl.TEXTURE_2D, LEVEL, GLManager_1.gl.RGBA, GLManager_1.gl.RGBA, GLManager_1.gl.UNSIGNED_BYTE, asset.data);
            GLManager_1.gl.texParameteri(GLManager_1.gl.TEXTURE_2D, GLManager_1.gl.TEXTURE_WRAP_S, GLManager_1.gl.CLAMP_TO_EDGE);
            GLManager_1.gl.texParameteri(GLManager_1.gl.TEXTURE_2D, GLManager_1.gl.TEXTURE_WRAP_T, GLManager_1.gl.CLAMP_TO_EDGE);
            GLManager_1.gl.texParameteri(GLManager_1.gl.TEXTURE_2D, GLManager_1.gl.TEXTURE_MIN_FILTER, GLManager_1.gl.LINEAR);
            GLManager_1.gl.texParameteri(GLManager_1.gl.TEXTURE_2D, GLManager_1.gl.TEXTURE_MAG_FILTER, GLManager_1.gl.LINEAR);
            this.isLoaded = true;
        }
    }
    exports.Texture = Texture;
});
//# sourceMappingURL=Texture.js.map