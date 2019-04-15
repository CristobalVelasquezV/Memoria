define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scene {
        constructor(name) {
            this.sceneName = name;
            this.sceneGameObjects = {};
            //initialize with a camera and a directional light go.
        }
        //camera
        //global light
        getGameObject(gameObjectName) {
            let go = this.sceneGameObjects[gameObjectName];
            if (go === undefined) {
                go = null;
            }
            return go;
        }
        getAllGameObjects() {
            return this.sceneGameObjects;
        }
        putGameObject(gameObjectName, gameObject) {
            let go = this.sceneGameObjects[gameObjectName];
            if (go === undefined || go === null) {
                this.sceneGameObjects[gameObjectName] = gameObject;
            }
            else {
                let i = 1;
                let num = "";
                while (go !== undefined) {
                    num = i.toString();
                    go = this.sceneGameObjects[gameObjectName + num];
                    i++;
                }
                this.sceneGameObjects[gameObjectName + num] = gameObject;
            }
            this.addGameObjectToHTML(gameObjectName);
        }
        printAllGameObjects() {
            for (let key in this.sceneGameObjects) {
                console.log(key);
            }
        }
        addGameObjectToHTML(name) {
            let list = document.getElementById("gameObjectList");
            let newGameObjectElement = document.createElement("button");
            newGameObjectElement.id = name;
            newGameObjectElement.innerHTML = name;
            newGameObjectElement.classList.add("list-group-item");
            newGameObjectElement.classList.add("list-group-item-action");
            newGameObjectElement.addEventListener("click", (e) => this.onClickGameObjectButton(name));
            list.appendChild(newGameObjectElement);
        }
        onClickGameObjectButton(name) {
            let go = this.getGameObject(name);
            if (go !== null) {
                this.selectedGameObject = go;
                console.log("Game Object selected: ", name);
            }
        }
    }
    exports.Scene = Scene;
});
//# sourceMappingURL=Scene.js.map