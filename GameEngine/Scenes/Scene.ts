import { GameObject } from "../GameObject/GameObject";
import { Vector3 } from "../Matrix-gl/Vector3";
import { ColliderComponent } from "../GameObject/Components/ColliderComponent";

/**
 * Scene class represents a scene in a game, it contains a dictionary of game objects, and light settings
 * @param {string} name
 * @returns
 */
export class Scene {
    private sceneGameObjects: { [name: string]: GameObject };
    private _sceneName: string;
    private selectedGameObject: GameObject;
    private _totalColliders: number = 0;
    private ambientLight: Vector3;
    private dictColliders: { [id: number]: ColliderComponent } = {};

    private colliders: ColliderComponent[] = [];

    public putCollider(collider: ColliderComponent): void {
        collider.colliderId = this._totalColliders;
        this.dictColliders[this._totalColliders] = collider;
        this._totalColliders++;
        this.colliders.push(collider);
    }

    public  getColliders(): ColliderComponent[] {
        return this.colliders;
    }
    public destroyCollider(collider: ColliderComponent) {
        delete this.dictColliders[collider.colliderId];
    }

    public getDictColliders(): { [id: number]: ColliderComponent } {
        return this.dictColliders;
    }

    public constructor(name: string) {
        this._sceneName = name;
        this.ambientLight = new Vector3(0.3, 0.3, 0.3);
        this.sceneGameObjects = {};
    }

    /**
     * Name of the Scene
     * @returns
     */
    public get sceneName(): string {
        return this._sceneName;
    }
    /**
     * Returns the GameObject selected in the UI.
     * @returns
     */
    public getSelectedObject(): GameObject {
        return this.selectedGameObject;
    }
    /**
     * Returns the ambient light intensity.
     * @returns
     */
    public get ambientLightIntencity(): Vector3 {
        return this.ambientLight;
    }

    /**
     * Returns the GameObject with the name given, null if its dosent exists.
     * @param {string} gameObjectName
     * @returns
     */
    public getGameObject(gameObjectName: string): GameObject | null {
        let go: GameObject | null = this.sceneGameObjects[gameObjectName];
        if (go === undefined) {
            go = null;
        }
        return go;
    }

    public destroyGameObject(gameObjectName: string): void {
        let go: GameObject | null = this.sceneGameObjects[gameObjectName];
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
    public getAllGameObjects(): { [name: string]: GameObject } {
        return this.sceneGameObjects;
    }
    /**
     * Puts a GameObject in the scene.
     * @param {string} gameObjectName
     * @param {GameObject} gameObject
     */
    public putGameObject(gameObjectName: string, gameObject: GameObject): void {
        let go: GameObject = this.sceneGameObjects[gameObjectName];
        if (go === undefined || go === null) {
            this.sceneGameObjects[gameObjectName] = gameObject;
        }
        else {
            let i = 1;
            let num: string = "";
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
    public printAllGameObjects(): void{
        for (let key in this.sceneGameObjects) {
            console.log(key);
        }
    }
    /**
     * Adds a button to the list of gameObjects in the UI.
     * @param {string} name
     */
    private addGameObjectToHTML(name: string): void {
        let list: HTMLElement = document.getElementById("gameObjectList");
        let newGameObjectElement: HTMLButtonElement = document.createElement("button");
        newGameObjectElement.id = name;
        newGameObjectElement.innerHTML = name;
        newGameObjectElement.classList.add("list-group-item");
        newGameObjectElement.classList.add("list-group-item-action");
        newGameObjectElement.addEventListener("click", (e: Event) => this.onClickGameObjectButton(name))

        list.appendChild(newGameObjectElement);
    }
    /**
     * Handles the press of a button in the UI.
     * @param {string} name
     */
    private onClickGameObjectButton(name: string): void {
        let go: GameObject | null = this.getGameObject(name);
        if (go !== null) {
            this.selectedGameObject = go;
            console.log("Game Object selected: ",name);
        }
    }
    public addAllGameObjectsToHTML(): void {
        let gos: { [name: string]: GameObject } = this.sceneGameObjects;
        for (let name in gos) {
            this.addGameObjectToHTML(name);
        }
    }


}