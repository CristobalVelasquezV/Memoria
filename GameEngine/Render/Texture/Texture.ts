import { IMessageHandler } from "../../Messege/IMessageHandler";
import { gl } from "../gl/GLManager";
import { TextureManager } from "./TextureManager";
import { Message } from "../../Messege/Message";
import { AssetManager } from "../../AssetManager/AssetManager";
import { ImageAsset } from "../../AssetManager/ImageAssetLoader";

const LEVEL: number = 0;
const BORDER: number = 0;
const TEMP_IMG_DATA: Uint8Array = new Uint8Array([255, 255, 255, 255]);

export class Texture implements IMessageHandler {
    private name: string;
    private width: number;
    private height: number;
    private handle: WebGLTexture | null;
    private isLoaded: boolean;

    constructor(name: string, width: number = -1, height: number = 1) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.handle = gl.createTexture();
        //Message.subscribe(Message.MESSAGE_ASSET_LOADED + this.name, this);
        this.bind();
        gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, 1, 1, BORDER, gl.RGBA, gl.UNSIGNED_BYTE, TEMP_IMG_DATA);
        //let asset = AssetManager.getAsset(this.name) as ImageAsset;
        let asset2 = AssetManager.getAssetSync(this.name, this) as ImageAsset;

        if (asset2 !== undefined) {
            //falta checkear unicidad
            this.loadTextureFromAsset(asset2);
        }
        TextureManager.addTexture(this.name, this);
    }

    onMessage(message: Message): void {
        if (message.code === Message.MESSAGE_ASSET_LOADED + this.name) {
            this.loadTextureFromAsset(message.context as ImageAsset);
        }
    }

    onSyncLoad(data: any): void {
        const img: ImageAsset = data as ImageAsset;
        this.loadTextureFromAsset(img);
    }

    public get Name(): string {
        return this.name;
    }
    public get getIsLoaded(): boolean {
        return this.isLoaded;
    }

    public get getWidth(): number {
        return this.width;
    }
    public get getHeight(): number {
        return this.height;
    }

    public activateAndBind(textureUnit: number = 0): void {
        if (textureUnit < 16 && textureUnit >= 0) {
            gl.activeTexture(gl.TEXTURE0 + textureUnit);
        }
        else {
            console.warn("texture Unit wrong");
        }
        this.bind();
    }

    public destroy(): void {
        gl.deleteTexture(this.handle);
    }
    public bind(): void {
        gl.bindTexture(gl.TEXTURE_2D, this.handle);
    }

    public unbind(): void {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    public loadTextureFromAsset(asset: ImageAsset): void {
        this.width = asset.width();
        this.height = asset.height();
        this.bind();
        gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset.data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        this.isLoaded = true;
    }

}