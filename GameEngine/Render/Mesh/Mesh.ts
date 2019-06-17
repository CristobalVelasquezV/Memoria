import { IMessageHandler } from "../../Messege/IMessageHandler";
import { Message } from "../../Messege/Message";
import { JsonAsset } from "../../AssetManager/JsonAssetLoader";
import { AssetManager } from "../../AssetManager/AssetManager";


export class Mesh implements IMessageHandler {


    private jsonData: JsonAsset;
    private jsonData2: JsonAsset;
    private _is3D: boolean;
    private name: string;
    private isLoaded: boolean;
    private static modelPath: string = "assets/models/";
    private static cubeMesh: Mesh;
    private lineVertices: number[];

    public static initialize(): void {
        Mesh.cubeMesh = new Mesh("defaultCube.json");
    }

    public get lines(): number[] {
        return this.lineVertices;
    }

    constructor(name: string, is2D?: number[]) {
        this.name = name;
        if (is2D !== undefined) {
            this._is3D = false;
            this.lineVertices = is2D;
        }
        else {
            this._is3D = true;
            this.isLoaded = false;
            Message.subscribe(Message.MESSAGE_ASSET_LOADED + Mesh.modelPath + this.name, this);
            this.jsonData = AssetManager.getAsset(Mesh.modelPath + this.name) as JsonAsset;
            this.jsonData2 = AssetManager.getAssetSync(Mesh.modelPath + this.name, this) as JsonAsset;
            if (this.jsonData !== undefined) {
                //falta checkear unicidad
                this.loadMeshFromAsset(this.jsonData);
            }
        }

    }

    public static get defaultCube(): Mesh {
        return Mesh.cubeMesh;
    }

    public get is3D() {
        return this._is3D;
    }

    onMessage(message: Message): void {
        if (message.code === Message.MESSAGE_ASSET_LOADED + Mesh.modelPath + this.name) {
            this.loadMeshFromAsset(message.context as JsonAsset);
        }
    }

    onSyncLoad(data: any): void {
        this.jsonData2 = data as JsonAsset;
        console.log("sync json loaded");
    }



    public loadMeshFromAsset(asset: JsonAsset): void {
        this.jsonData = asset;
    }

    public getJsonData(): JsonAsset {
        return this.jsonData;
    }

    public getJsonData2(): JsonAsset {
        return this.jsonData2;
    }

}
