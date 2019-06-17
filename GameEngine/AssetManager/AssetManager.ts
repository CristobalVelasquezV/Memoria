import { IAssetLoader } from "./IAssetLoader";
import { IAsset } from "./IAsset";
import { IMessageHandler } from "../Messege/IMessageHandler";
import { ImageAssetLoader } from "./ImageAssetLoader";
import { JsonAssetLoader } from "./JsonAssetLoader";
import { TextAssetLoader } from "./TextAssetLoader";
import { Message } from "../Messege/Message";


export class AssetManager {

    private static assetLoaders: IAssetLoader[] = [];
    private static assetsLoaded: { [name: string]: IAsset } = {};
    private static assetPromises: Promise<any>[] = [];
    private static handlers: IMessageHandler[] = [];


    public static getPromises(): Promise<any>[] {
        return AssetManager.assetPromises;
    }

    public static getHandlers(): IMessageHandler[] {
        return AssetManager.handlers;
    }


    public static initialize(): void {
        AssetManager.assetLoaders.push(new ImageAssetLoader());
        AssetManager.assetLoaders.push(new JsonAssetLoader());
        AssetManager.assetLoaders.push(new TextAssetLoader());
    }

    public static registerLoader(newLoader: IAssetLoader): void {
        var load: boolean = true;
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

    public static loadAsset(assetName: string): void {

        let split: string[] = assetName.split('.');
        let ext: string | undefined = split.pop();
        if (ext === undefined) {
            return;
        }
        let extension: string = ext.toLowerCase();
        for (let l of this.assetLoaders) {
            if (l.supportedExtentions.indexOf(extension) !== -1) {
                console.log("load: " + assetName);
                l.loadAsset(assetName);
                return;
            }

        }

        console.warn("No loader for extension: " + extension);
    }


    public static loadAssetSync(assetName: string, handler: IMessageHandler): void {
        let split: string[] = assetName.split('.');
        let ext: string | undefined = split.pop();
        if (ext === undefined) {
            return;
        }
        let extension: string = ext.toLowerCase();

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

    public static onAssetLoaded(asset: IAsset): void {
        //check if asset already exist
        AssetManager.assetsLoaded[asset.name] = asset;
        Message.send(Message.MESSAGE_ASSET_LOADED + asset.name, this, asset);
    }

    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager.assetsLoaded[assetName] !== undefined;
    }

    public static getAsset(assetName: string): IAsset | undefined {
        if (AssetManager.isAssetLoaded(assetName)) {
            return AssetManager.assetsLoaded[assetName];
        }
        else {
            AssetManager.loadAsset(assetName);
        }
        return undefined;
    }


    public static getAssetSync(assetName: string, handler: IMessageHandler): IAsset | undefined {
        if (AssetManager.isAssetLoaded(assetName)) {
            return AssetManager.assetsLoaded[assetName];
        }
        else {
            AssetManager.loadAssetSync(assetName, handler);
        }
        return undefined;
    }
}
