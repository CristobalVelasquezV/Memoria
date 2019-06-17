define(["require", "exports", "../Matrix-gl/Vector3"], function (require, exports, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Scene class represents a scene in a game, it contains a dictionary of game objects, and light settings
     * @param {string} name
     * @returns
     */
    class Scene {
        constructor(name) {
            this._totalColliders = 0;
            this.dictColliders = {};
            this.colliders = [];
            this._sceneName = name;
            this.ambientLight = new Vector3_1.Vector3(0.1, 0.1, 0.2);
            this.sceneGameObjects = {};
        }
        putCollider(collider) {
            collider.colliderId = this._totalColliders;
            this.dictColliders[this._totalColliders] = collider;
            this._totalColliders++;
            this.colliders.push(collider);
        }
        getColliders() {
            return this.colliders;
        }
        destroyCollider(collider) {
            delete this.dictColliders[collider.colliderId];
        }
        getDictColliders() {
            return this.dictColliders;
        }
        /**
         * Name of the Scene
         * @returns
         */
        get sceneName() {
            return this._sceneName;
        }
        /**
         * Returns the GameObject selected in the UI.
         * @returns
         */
        getSelectedObject() {
            return this.selectedGameObject;
        }
        /**
         * Returns the ambient light intensity.
         * @returns
         */
        get ambientLightIntencity() {
            return this.ambientLight;
        }
        /**
         * Returns the GameObject with the name given, null if its dosent exists.
         * @param {string} gameObjectName
         * @returns
         */
        getGameObject(gameObjectName) {
            let go = this.sceneGameObjects[gameObjectName];
            if (go === undefined) {
                go = null;
            }
            return go;
        }
        destroyGameObject(gameObjectName) {
            let go = this.sceneGameObjects[gameObjectName];
            if (go === undefined || go === null) {
                console.warn(" Destroy GameObject that dont exist: ", gameObjectName);
            }
            else {
                delete this.sceneGameObjects[gameObjectName];
            }
        }
        /**
         * Returns the dictionary of GameObjects.
         */
        getAllGameObjects() {
            return this.sceneGameObjects;
        }
        /**
         * Puts a GameObject in the scene.
         * @param {string} gameObjectName
         * @param {GameObject} gameObject
         */
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
        /**
         * Prints every GameObject in the scene debugin purpose.
         */
        printAllGameObjects() {
            for (let key in this.sceneGameObjects) {
                console.log(key);
            }
        }
        /**
         * Adds a button to the list of gameObjects in the UI.
         * @param {string} name
         */
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
        /**
         * Handles the press of a button in the UI.
         * @param {string} name
         */
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