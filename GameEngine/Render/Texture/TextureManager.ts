import { Texture } from "./Texture";

export class TextureNode {
    public texture: Texture;
    public referenceCount: number = 1;

    constructor(texture: Texture) {
        this.texture = texture;
    }
}
export class TextureManager {

    private static textures: { [name: string]: TextureNode } = {};



    private constructor() { }

    public static getTexture(textureName: string): Texture {
        if (TextureManager.textures[textureName] === undefined) {
            TextureManager.addTextureNode(textureName, new TextureNode(new Texture(textureName)));
        }
        else {
            TextureManager.textures[textureName].referenceCount++;
        }

        return TextureManager.textures[textureName].texture;
    }

    public static releaseTexture(textureName: string): void {
        if (TextureManager.textures[textureName] === undefined) {
            console.warn("Texture dont exist: " + textureName);
        }
        else {
            TextureManager.textures[textureName].referenceCount--;
            if (TextureManager.textures[textureName].referenceCount < 1) {
                TextureManager.textures[textureName].texture.destroy();
                delete TextureManager.textures[textureName];

            }
        }
    }




    public static addTexture(textureName: string, texture: Texture): void {
        if (this.textures[textureName] === undefined) {
            let node = new TextureNode(texture);
            TextureManager.textures[textureName] = node;
        }
        else {
            this.textures[textureName].referenceCount++;
        }
    }


    private static addTextureNode(textureName: string, textureNode: TextureNode): void {
        TextureManager.textures[textureName] = textureNode;
    }

}