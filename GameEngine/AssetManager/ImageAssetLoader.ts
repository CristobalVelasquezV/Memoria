import { IAssetLoader } from "./IAssetLoader";
import { AssetManager } from "./AssetManager";
import { IAsset } from "./IAsset";

export class ImageAsset implements IAsset {
    public readonly name: string;
    public readonly data: HTMLImageElement;

    public constructor(n: string, d: HTMLImageElement) {
        this.name = n;
        this.data = d;
    }

    public width(): number {
        return this.data.width;
    }
    public height(): number {
        return this.data.height;
    }
}

export class ImageAssetLoader implements IAssetLoader {

    async loadAssetAsync(assetName: string): Promise<any> {

        return new Promise((resolve, reject) => {
            let img = new Image()

            img.onerror = reject
            img.src = assetName
            let asset = new ImageAsset(assetName, img);
            img.onload = () => resolve(asset);
            AssetManager.onAssetLoaded(asset);
        })
    }

    supportedExtentions: string[] = ['jpg', 'png', 'gif'];

    loadAsset(assetName: string): void {

        const prom = this.loadAssetAsync(assetName).then(
            img => {
                //console.log("image sync",img);
            }
        );

        let image: HTMLImageElement = new Image();
        image.onload = this.onImageLoaded.bind(this, assetName, image);
        image.src = assetName;
    }

    onImageLoaded(assetName: string, image: HTMLImageElement): void {
        console.log("Loaded Image: Image Name / Image ", assetName, image);
        let asset = new ImageAsset(assetName, image);
        AssetManager.onAssetLoaded(asset);
    }
}