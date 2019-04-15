define(["require", "exports", "./Transform", "../Scenes/SceneManager"], function (require, exports, Transform_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameObject {
        constructor(name, position) {
            this.transform = new Transform_1.Transform();
            this.components = [];
            if (position !== undefined) {
                this.transform.position = position;
            }
            if (name === undefined) {
                //see if already exist this name.
                let newName = "GameObject";
                let name = "GameObject";
                let i = 1;
                while (null !== SceneManager_1.SceneManager.actualScene.getGameObject(name)) {
                    name = newName + "(" + i.toString() + ")";
                    i++;
                }
                this.name = name;
                SceneManager_1.SceneManager.actualScene.putGameObject(name, this);
            }
            else {
                this.name = name;
                SceneManager_1.SceneManager.actualScene.putGameObject(name, this);
            }
        }
        get gameObjectName() {
            return this.name;
        }
        static createCube() {
        }
        static loadGameObjectFromResources(meshResource) {
        }
        addComponent(component) {
            this.components.push(component);
        }
        deleteComponent(component) {
            for (let i = 0; i < this.components.length; i++) {
                if (typeof (component) === typeof (this.components[i])) {
                    let comp = this.components.splice(i - 1, 1);
                }
            }
        }
        getComponent(component) {
            // let s2: string = component instanceof T;
            for (let i = 0; i < this.components.length; i++) {
                if (typeof (this.components[i]) === typeof (component)) {
                    let comp = this.components[i];
                    console.log("retorno componente correcto");
                    return comp;
                }
            }
            return null;
        }
        getComponentTest(component) {
            // let s2: string = component instanceof T;
            for (let i = 0; i < this.components.length; i++) {
                if (this.components[i] instanceof component) {
                    let comp = this.components[i];
                    console.log("retorno componente correcto test");
                    console.log(typeof comp);
                    return comp;
                }
            }
            return null;
        }
        getComponents() {
            return this.components;
        }
    }
    GameObject.modelPath = "assets/models/";
    GameObject.cubeDataPath = "cube.json";
    exports.GameObject = GameObject;
});
//# sourceMappingURL=GameObject.js.map