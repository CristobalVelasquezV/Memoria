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
    class TextAsset {
        constructor(name, data) {
            this.name = name;
            this.data = data;
        }
    }
    exports.TextAsset = TextAsset;
    class TextAssetLoader {
        constructor() {
            this.supportedExtentions = ["txt", "glsl", "frag"];
        }
        loadAssetAsync(assetName) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(assetName);
                    const text = yield response.text();
                    let asset = new TextAsset(assetName, text);
                    AssetManager_1.AssetManager.onAssetLoaded(asset);
                    return asset;
                }
                catch (err) {
                    throw new Error("Error getting Text File:" + err);
                }
            });
        }
        loadAssetSync(assetName) {
            let request = new XMLHttpRequest();
            request.open("GET", assetName);
            request.addEventListener("load", this.onTextLoaded.bind(this, assetName, request));
            request.send();
        }
        loadAsset(assetName) {
            let request = new XMLHttpRequest();
            request.open("GET", assetName);
            request.addEventListener("load", this.onTextLoaded.bind(this, assetName, request));
            request.send();
        }
        onTextLoaded(assetName, request) {
            console.log("onTextLoaded: assetName/request", assetName, request);
            if (request.readyState === request.DONE) {
                console.debug(request.responseText);
                let asset = new TextAsset(assetName, request.responseText);
                AssetManager_1.AssetManager.onAssetLoaded(asset);
            }
        }
    }
    exports.TextAssetLoader = TextAssetLoader;
});
//# sourceMappingURL=TextAssetLoader.js.map