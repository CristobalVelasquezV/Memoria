import { GameObject } from "../GameObject/GameObject";

export class Scene {
    private sceneGameObjects: { [name: string]: GameObject };
    private sceneName: string;
    private selectedGameObject: GameObject;

    public constructor(name: string) {
        this.sceneName = name;
        this.sceneGameObjects = {};
        //initialize with a camera and a directional light go.
    }

    //camera
    //global light

    public getGameObject(gameObjectName: string): GameObject | null {
        let go: GameObject | null = this.sceneGameObjects[gameObjectName];
        if (go === undefined) {
            go = null;
        }
        return go;
    }

    public getAllGameObjects(): { [name: string]: GameObject } {
        return this.sceneGameObjects;
    }

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

    public printAllGameObjects(): void{
        for (let key in this.sceneGameObjects) {
            console.log(key);
        }
    }

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
    private onClickGameObjectButton(name: string): void {
        let go: GameObject | null = this.getGameObject(name);
        if (go !== null) {
            this.selectedGameObject = go;
            console.log("Game Object selected: ",name);
        }
    }
}