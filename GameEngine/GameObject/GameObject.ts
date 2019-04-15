import { IComponent } from "./Components/IComponent";
import { Transform } from "./Transform";
import { RenderableComponent } from "./Components/RenderableComponent";
import { SceneManager } from "../Scenes/SceneManager";
import { Vector3 } from "../Matrix-gl/Vector3";

type Class = { new(...args: any[]): any; };

export class GameObject {

    public transform: Transform;
    private components: IComponent[];
    private readonly name: string;

    private static readonly modelPath: string = "assets/models/";
    private static readonly cubeDataPath: string = "cube.json";



    constructor(name?: string, position?: Vector3) {
        this.transform = new Transform();
        this.components = [];
        if (position !== undefined) {
            this.transform.position = position;
        }
        if (name === undefined) {
            //see if already exist this name.
            let newName: string = "GameObject";
            let name: string = "GameObject";
            let i: number = 1;
            while (null !== SceneManager.actualScene.getGameObject(name)) {
                name = newName + "(" + i.toString() + ")";
                i++;
            }
            this.name = name;
            SceneManager.actualScene.putGameObject(name, this);
        }
        else {
            this.name = name;
            SceneManager.actualScene.putGameObject(name, this);
        }
    }

    public get gameObjectName(): string {
        return this.name;
    }

    public static createCube(): void {

    }

    public static loadGameObjectFromResources(meshResource: string) {

    }

    public addComponent(component: IComponent): void {
        this.components.push(component);
    }

    public deleteComponent(component: IComponent): void {
        for (let i = 0; i < this.components.length; i++) {
            if (typeof (component) === typeof (this.components[i])) {
                let comp: IComponent[] = this.components.splice(i - 1, 1);
            }
        }
    }
    public getComponent<T extends IComponent>(component: T): T | null {
       // let s2: string = component instanceof T;
        for (let i = 0; i < this.components.length; i++) {
            if (typeof (this.components[i]) === typeof (component)) {
                let comp: T = this.components[i] as unknown as T;
                console.log("retorno componente correcto");
                return comp;
            }
        }
        return null;
    }

    public getComponentTest<T extends IComponent>(component: Class): T | null {
        // let s2: string = component instanceof T;
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof component) {
                let comp: T = this.components[i] as unknown as T;
                console.log("retorno componente correcto test");
                console.log(typeof comp);
                return comp;
            }
        }
        return null;
    }

    public getComponents(): IComponent[] {
        return this.components;
    }




} 
