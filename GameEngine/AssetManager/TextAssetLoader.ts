import { IAsset } from "./IAsset";
import { IAssetLoader } from "./IAssetLoader";
import { AssetManager } from "./AssetManager";

export class TextAsset implements IAsset {

    public readonly name: string;

    public readonly data: string;

    public constructor(name: string, data: string) {
        this.name = name;
        this.data = data;
    }
}

export class TextAssetLoader implements IAssetLoader {

    async loadAssetAsync(assetName: string): Promise<any> {
        try {
            const response = await fetch(assetName);
            const text = await response.text();
            let asset = new TextAsset(assetName, text);
            AssetManager.onAssetLoaded(asset);
            return asset;
        }
        catch (err) {
            throw new Error("Error getting Text File:" + err);
        }
    }


    public loadAssetSync(assetName: string): void {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", assetName);
        request.addEventListener("load", this.onTextLoaded.bind(this, assetName, request));
        request.send();
    }

    supportedExtentions: string[] = ["txt", "glsl", "frag"];

    public loadAsset(assetName: string): void {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", assetName);
        request.addEventListener("load", this.onTextLoaded.bind(this, assetName, request));
        request.send();

    }

    private onTextLoaded(assetName: string, request: XMLHttpRequest): void {
        console.log("onTextLoaded: assetName/request", assetName, request);
        if (request.readyState === request.DONE) {
            console.debug(request.responseText);
            let asset = new TextAsset(assetName, request.responseText);
            AssetManager.onAssetLoaded(asset);
        }
    }
}