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
    class JsonAsset {
        constructor(name, data) {
            this.name = name;
            this.data = data;
        }
    }
    exports.JsonAsset = JsonAsset;
    class JsonAssetLoader {
        constructor() {
            this.supportedExtentions = ["json"];
        }
        loadAssetAsync(assetName) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(assetName);
                    let data = yield response.json();
                    let asset = new JsonAsset(assetName, data);
                    AssetManager_1.AssetManager.onAssetLoaded(asset);
                    return asset;
                }
                catch (err) {
                    throw new Error("Error getting Json:" + err);
                }
            });
        }
        /**
            * Loads an asset with the given name.
            * @param assetName The name of the asset to be loaded.
            */
        loadAsset(assetName) {
            const prom = this.loadAssetAsync(assetName);
            prom.then(json => {
                //console.log("async json", json);
            });
            let request = new XMLHttpRequest();
            request.open("GET", assetName);
            request.addEventListener("load", this.onJsonLoaded.bind(this, assetName, request));
            request.send();
        }
        onJsonLoaded(assetName, request) {
            console.log("onJsonLoaded: assetName/request", assetName, request);
            if (request.readyState === request.DONE) {
                let json = JSON.parse(request.responseText);
                let asset = new JsonAsset(assetName, json);
                AssetManager_1.AssetManager.onAssetLoaded(asset);
            }
        }
    }
    exports.JsonAssetLoader = JsonAssetLoader;
});
//# sourceMappingURL=JsonAssetLoader.js.map