import { IAsset } from "./IAsset";
import { IAssetLoader } from "./IAssetLoader";
import { AssetManager } from "./AssetManager";

export class JsonAsset implements IAsset {

    public readonly name: string;

    public readonly data: any;

    public constructor(name: string, data: any) {
        this.name = name;
        this.data = data;
    }
}

export class JsonAssetLoader implements IAssetLoader {


    async loadAssetAsync(assetName: string): Promise<any> {
        try {
            const response = await fetch(assetName);
            let data = await response.json();
            let asset = new JsonAsset(assetName, data);
            AssetManager.onAssetLoaded(asset);
            return asset;
        }
        catch (err) {
            throw new Error("Error getting Json:" + err);
        }
    }


    supportedExtentions: string[] = ["json"];


    /**
        * Loads an asset with the given name.
        * @param assetName The name of the asset to be loaded.
        */
    public loadAsset(assetName: string): void {
        const prom = this.loadAssetAsync(assetName);
        prom.then(
            json => {
                //console.log("async json", json);
            }
        )
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", assetName);
        request.addEventListener("load", this.onJsonLoaded.bind(this, assetName, request));
        request.send();
    }

    private onJsonLoaded(assetName: string, request: XMLHttpRequest): void {
        console.log("onJsonLoaded: assetName/request", assetName, request);

        if (request.readyState === request.DONE) {
            let json = JSON.parse(request.responseText);
            let asset = new JsonAsset(assetName, json);
            AssetManager.onAssetLoaded(asset);
        }
    }
}