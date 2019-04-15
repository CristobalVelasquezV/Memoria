import { Scene } from "./Scene";

export class SceneManager {

    private constructor() { };
    private static scene: Scene;
    private static totalScenes: Scene[]=[];


    public static initialize(): void {
        // search for binarys of scenes.
        if (SceneManager.totalScenes.length == 0) {
            SceneManager.createNewScene(); 
        }
        SceneManager.scene = SceneManager.totalScenes[0];
    }

    public static changeScene(sceneIndex: number): Scene | null {
        if (SceneManager.totalScenes.length < sceneIndex || sceneIndex < 0) {
            return null;
            //throw warning.
        }
        else {
            SceneManager.scene = SceneManager.totalScenes[sceneIndex];
        }
    }

    public static get actualScene(): Scene {
        return SceneManager.scene;
    }

    public static createNewScene(name?: string): void {
        if (name === undefined) {
            SceneManager.totalScenes.push(new Scene("Scene"));
        }
        else {
            SceneManager.totalScenes.push(new Scene(name));
        }     
    }
}