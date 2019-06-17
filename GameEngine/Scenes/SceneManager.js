define(["require", "exports", "./Scene"], function (require, exports, Scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Static Class SceneManager manages every scene in the Game.
     * @returns
     */
    class SceneManager {
        constructor() { }
        ;
        /**
         * Initializes the SceneManager.
         */
        static initialize() {
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
        static changeScene(sceneIndex) {
            if (SceneManager.totalScenes.length < sceneIndex || sceneIndex < 0) {
                return null;
                //throw warning.
            }
            else {
                let gameObjects = SceneManager.scene.getAllGameObjects();
                for (let name in gameObjects) {
                    let button = document.getElementById(name);
                    button.parentNode.removeChild(button);
                }
                SceneManager.scene = SceneManager.totalScenes[sceneIndex];
            }
        }
        /**
         * returns the actual Scene.
         * @returns
         */
        static get actualScene() {
            return SceneManager.scene;
        }
        /**
         * Creates a new Scene and adds it to the array totalScenes.
         * @param {string} name?
         */
        static createNewScene(name) {
            let scene;
            if (name === undefined) {
                scene = new Scene_1.Scene("Scene");
            }
            else {
                scene = new Scene_1.Scene(name);
            }
            SceneManager.totalScenes.push(scene);
            return scene;
        }
    }
    SceneManager.totalScenes = [];
    exports.SceneManager = SceneManager;
});
//# sourceMappingURL=SceneManager.js.map