define(["require", "exports", "./Texture"], function (require, exports, Texture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextureNode {
        constructor(texture) {
            this.referenceCount = 1;
            this.texture = texture;
        }
    }
    exports.TextureNode = TextureNode;
    class TextureManager {
        constructor() { }
        static getTexture(textureName) {
            if (TextureManager.textures[textureName] === undefined) {
                TextureManager.addTextureNode(textureName, new TextureNode(new Texture_1.Texture(textureName)));
            }
            else {
                TextureManager.textures[textureName].referenceCount++;
            }
            return TextureManager.textures[textureName].texture;
        }
        static releaseTexture(textureName) {
            if (TextureManager.textures[textureName] === undefined) {
                console.warn("Texture dont exist: " + textureName);
            }
            else {
                TextureManager.textures[textureName].referenceCount--;
                if (TextureManager.textures[textureName].referenceCount < 1) {
                    TextureManager.textures[textureName].texture.destroy();
                    delete TextureManager.textures[textureName];
                }
            }
        }
        static addTexture(textureName, texture) {
            if (this.textures[textureName] === undefined) {
                let node = new TextureNode(texture);
                TextureManager.textures[textureName] = node;
            }
            else {
                this.textures[textureName].referenceCount++;
            }
        }
        static addTextureNode(textureName, textureNode) {
            TextureManager.textures[textureName] = textureNode;
        }
    }
    TextureManager.textures = {};
    exports.TextureManager = TextureManager;
});
//# sourceMappingURL=TextureManager.js.map