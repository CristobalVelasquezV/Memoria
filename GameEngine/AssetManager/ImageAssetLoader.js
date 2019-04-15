var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./AssetManager"], function (require, exports, AssetManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageAsset {
        constructor(n, d) {
            this.name = n;
            this.data = d;
        }
        width() {
            return this.data.width;
        }
        height() {
            return this.data.height;
        }
    }
    exports.ImageAsset = ImageAsset;
    class ImageAssetLoader {
        constructor() {
            this.supportedExtentions = ['jpg', 'png', 'gif'];
        }
        loadAssetAsync(assetName) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.onerror = reject;
                    img.src = assetName;
                    let asset = new ImageAsset(assetName, img);
                    img.onload = () => resolve(asset);
                    AssetManager_1.AssetManager.onAssetLoaded(asset);
                });
            });
        }
        loadAsset(assetName) {
            const prom = this.loadAssetAsync(assetName).then(img => {
                //console.log("image sync",img);
            });
            let image = new Image();
            image.onload = this.onImageLoaded.bind(this, assetName, image);
            image.src = assetName;
        }
        onImageLoaded(assetName, image) {
            console.log("Loaded Image: Image Name / Image ", assetName, image);
            let asset = new ImageAsset(assetName, image);
            AssetManager_1.AssetManager.onAssetLoaded(asset);
        }
    }
    exports.ImageAssetLoader = ImageAssetLoader;
});
//# sourceMappingURL=ImageAssetLoader.js.map