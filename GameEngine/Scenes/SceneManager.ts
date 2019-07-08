import { Scene } from "./Scene";
import { GameObject } from "../GameObject/GameObject";
/**
 * Static Class SceneManager manages every scene in the Game.
 * @returns
 */
export class SceneManager {

    private constructor() { };
    private static scene: Scene;
    private static totalScenes: Scene[]=[];

    /**
     * Initializes the SceneManager.
     */
    public static initialize(): void {
        if (SceneManager.totalScenes.length == 0) {
            SceneManager.createNewScene(); 
        }
        SceneManager.scene = SceneManager.totalScenes[0];
    }
    /**
     * Changes the actual Scene.
     * @param {number} sceneIndex
     * @returns
     */
    public static changeScene(sceneIndex: number): Scene | null {

        if (SceneManager.totalScenes.length < sceneIndex || sceneIndex < 0) {
            return null;
            //throw warning.
        }
        else {
            let gameObjects: { [name: string]: GameObject } = SceneManager.scene.getAllGameObjects();
            for (let name in gameObjects) {
                let button: HTMLElement = document.getElementById(name);
                button.parentNode.removeChild(button);
            }
            SceneManager.scene = SceneManager.totalScenes[sceneIndex];
            SceneManager.scene.addAllGameObjectsToHTML();
        }
    }
    /**
     * returns the actual Scene.
     * @returns
     */
    public static get actualScene(): Scene {
        return SceneManager.scene;
    }
    /**
     * Creates a new Scene and adds it to the array totalScenes.
     * @param {string} name?
     */
    public static createNewScene(name?: string): Scene {
        let scene: Scene;
        if (name === undefined) {
            scene = new Scene("Scene");
        }
        else {
           scene= new Scene(name);
        }
        SceneManager.totalScenes.push(scene);
        return scene;
    }
}