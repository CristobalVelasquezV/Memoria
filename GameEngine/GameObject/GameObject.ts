import { IComponent } from "./Components/IComponent";
import { Transform } from "./Transform";
import { RenderableComponent } from "./Components/RenderableComponent";
import { SceneManager } from "../Scenes/SceneManager";
import { Vector3 } from "../Matrix-gl/Vector3";
import { ColliderComponent } from "./Components/ColliderComponent";


type Class = { new(...args: any[]): any; } | { [name: string]: new () => ColliderComponent };
//
type Constructor<T> = Function & { prototype: T }

/**
 * GameObject Class contains metods for scripting components.
 * @param {string} name?
 * @param {Vector3} position?
 * @returns
 */
export class GameObject {

    public transform: Transform;
    private components: IComponent[]=[];
    private readonly name: string;
    public enabled: boolean;

    private static readonly modelPath: string = "assets/models/";
    private static readonly cubeDataPath: string = "cube.json";



    constructor(name?: string, position?: Vector3) {
        this.transform = new Transform(this);
        this.components = [];
        this.enabled = true;
        if (position !== undefined) {
            this.transform.position = position;
        }
        if (name === undefined) {
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
    /**
     * Get Game Object names must be unique in each Scene.
     * @returns
     */
    public get gameObjectName(): string {
        return this.name;
    }

    public static createCube(): void {

    }

    public static loadGameObjectFromResources(meshResource: string) {

    }
    /**
     * Adds a Component to the gameObject
     * @param {IComponent} component
     */
    public addComponent(component: IComponent): void {
        component.origin = this;
        this.components.push(component);
    }
    /**
     * Deletes a Component
     * @param {IComponent} component
     */
    public deleteComponent(component: IComponent): void {
        for (let i = 0; i < this.components.length; i++) {
            if (typeof (component) === typeof (this.components[i])) {
                let comp: IComponent[] = this.components.splice(i - 1, 1);
            }
        }
    }
    /**
     * Deletes a Component Generic Version
     * @param {IComponent} component
     */
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
    /**
     * Get specific Component from the gameObjects, returns nulls if the component do not exist.
     * @param {Class} component
     * @returns
     */
    public getComponentTest<T extends IComponent>(component: any): T | null {
        // let s2: string = component instanceof T;
        //console.log(component);
        for (let i = 0; i < this.components.length; i++) {
            //console.log(this.components[i] instanceof component);
            if (this.components[i] instanceof component ) {
                let comp: T = this.components[i] as unknown as T;
                //console.log("retorno componente correcto test");
                //console.log(typeof comp);
                return comp;
            }
        }
        return null;
    }
    /**
     * Get every component of the GameObject.
     * @returns
     */
    public getComponents(): IComponent[] {
        return this.components;
    }

    public static Destroy(go: GameObject) {
        let components: IComponent[] = go.getComponents();
        for (let i = 0; i < components.length; i++) {
            if (components[i] !== null && components[i] !== undefined) {
                components[i].destroy();
            }
            delete components[i];
        }
        SceneManager.actualScene.destroyGameObject(go.name);
    }




} 
