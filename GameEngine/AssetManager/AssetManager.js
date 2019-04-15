define(["require", "exports", "./ImageAssetLoader", "./JsonAssetLoader", "./TextAssetLoader", "../Messege/Message"], function (require, exports, ImageAssetLoader_1, JsonAssetLoader_1, TextAssetLoader_1, Message_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AssetManager {
        static getPromises() {
            return AssetManager.assetPromises;
        }
        static getHandlers() {
            return AssetManager.handlers;
        }
        static initialize() {
            AssetManager.assetLoaders.push(new ImageAssetLoader_1.ImageAssetLoader());
            AssetManager.assetLoaders.push(new JsonAssetLoader_1.JsonAssetLoader());
            AssetManager.assetLoaders.push(new TextAssetLoader_1.TextAssetLoader());
        }
        static registerLoader(newLoader) {
            var load = true;
            for (let loader of this.assetLoaders) {
                if (typeof (loader) === typeof (newLoader)) {
                    load = false;
                }
            }
            if (load) {
                this.assetLoaders.push(newLoader);
            }
            else {
                throw new Error("AssetLoader already exists.");
            }
        }
        static loadAsset(assetName) {
            let split = assetName.split('.');
            let ext = split.pop();
            if (ext === undefined) {
                return;
            }
            let extension = ext.toLowerCase();
            for (let l of this.assetLoaders) {
                if (l.supportedExtentions.indexOf(extension) !== -1) {
                    console.log("load: " + assetName);
                    l.loadAsset(assetName);
                    return;
                }
            }
            console.warn("No loader for extension: " + extension);
        }
        static loadAssetSync(assetName, handler) {
            let split = assetName.split('.');
            let ext = split.pop();
            if (ext === undefined) {
                return;
            }
            let extension = ext.toLowerCase();
            for (let l of this.assetLoaders) {
                if (l.supportedExtentions.indexOf(extension) !== -1) {
                    console.log("loadSync: " + assetName);
                    AssetManager.assetPromises.push(l.loadAssetAsync(assetName));
                    AssetManager.handlers.push(handler);
                    return;
                }
            }
            console.warn("No loader for extension: " + extension);
        }
        static onAssetLoaded(asset) {
            //check if asset already exist
            AssetManager.assetsLoaded[asset.name] = asset;
            Message_1.Message.send(Message_1.Message.MESSAGE_ASSET_LOADED + asset.name, this, asset);
        }
        static isAssetLoaded(assetName) {
            return AssetManager.assetsLoaded[assetName] !== undefined;
        }
        static getAsset(assetName) {
            if (AssetManager.isAssetLoaded(assetName)) {
                return AssetManager.assetsLoaded[assetName];
            }
            else {
                AssetManager.loadAsset(assetName);
            }
            return undefined;
        }
        static getAssetSync(assetName, handler) {
            if (AssetManager.isAssetLoaded(assetName)) {
                return AssetManager.assetsLoaded[assetName];
            }
            else {
                AssetManager.loadAssetSync(assetName, handler);
            }
            return undefined;
        }
    }
    AssetManager.assetLoaders = [];
    AssetManager.assetsLoaded = {};
    AssetManager.assetPromises = [];
    AssetManager.handlers = [];
    exports.AssetManager = AssetManager;
});
//# sourceMappingURL=AssetManager.js.map