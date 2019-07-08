define(["require", "exports", "./Transform", "../Scenes/SceneManager"], function (require, exports, Transform_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * GameObject Class contains metods for scripting components.
     * @param {string} name?
     * @param {Vector3} position?
     * @returns
     */
    class GameObject {
        constructor(name, position) {
            this.components = [];
            this.transform = new Transform_1.Transform(this);
            this.components = [];
            this.enabled = true;
            if (position !== undefined) {
                this.transform.position = position;
            }
            if (name === undefined) {
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
        /**
         * Get Game Object names must be unique in each Scene.
         * @returns
         */
        get gameObjectName() {
            return this.name;
        }
        static createCube() {
        }
        static loadGameObjectFromResources(meshResource) {
        }
        /**
         * Adds a Component to the gameObject
         * @param {IComponent} component
         */
        addComponent(component) {
            component.origin = this;
            this.components.push(component);
        }
        /**
         * Deletes a Component
         * @param {IComponent} component
         */
        deleteComponent(component) {
            for (let i = 0; i < this.components.length; i++) {
                if (typeof (component) === typeof (this.components[i])) {
                    let comp = this.components.splice(i - 1, 1);
                }
            }
        }
        /**
         * Deletes a Component Generic Version
         * @param {IComponent} component
         */
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
        /**
         * Get specific Component from the gameObjects, returns nulls if the component do not exist.
         * @param {Class} component
         * @returns
         */
        getComponentTest(component) {
            for (let i = 0; i < this.components.length; i++) {
                if (this.components[i] instanceof component) {
                    let comp = this.components[i];
                    return comp;
                }
            }
            return null;
        }
        /**
         * Get every component of the GameObject.
         * @returns
         */
        getComponents() {
            return this.components;
        }
        static Destroy(go) {
            let components = go.getComponents();
            for (let i = 0; i < components.length; i++) {
                if (components[i] !== null && components[i] !== undefined) {
                    components[i].destroy();
                }
                delete components[i];
            }
            SceneManager_1.SceneManager.actualScene.destroyGameObject(go.name);
        }
    }
    GameObject.modelPath = "assets/models/";
    GameObject.cubeDataPath = "cube.json";
    exports.GameObject = GameObject;
});
//# sourceMappingURL=GameObject.js.map