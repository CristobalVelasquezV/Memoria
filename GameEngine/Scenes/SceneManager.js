define(["require", "exports", "./Scene"], function (require, exports, Scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SceneManager {
        constructor() { }
        ;
        static initialize() {
            // search for binarys of scenes.
            if (SceneManager.totalScenes.length == 0) {
                SceneManager.createNewScene();
            }
            SceneManager.scene = SceneManager.totalScenes[0];
        }
        static changeScene(sceneIndex) {
            if (SceneManager.totalScenes.length < sceneIndex || sceneIndex < 0) {
                return null;
                //throw warning.
            }
            else {
                SceneManager.scene = SceneManager.totalScenes[sceneIndex];
            }
        }
        static get actualScene() {
            return SceneManager.scene;
        }
        static createNewScene(name) {
            if (name === undefined) {
                SceneManager.totalScenes.push(new Scene_1.Scene("Scene"));
            }
            else {
                SceneManager.totalScenes.push(new Scene_1.Scene(name));
            }
        }
    }
    SceneManager.totalScenes = [];
    exports.SceneManager = SceneManager;
});
//# sourceMappingURL=SceneManager.js.map