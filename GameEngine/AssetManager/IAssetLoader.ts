export interface IAssetLoader {

    readonly supportedExtentions: string[];

    loadAsset(assetName: string): void;

    loadAssetAsync(assetName: string): Promise<any>;

}