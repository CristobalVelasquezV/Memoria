import { Render } from "../Render/Render";
import { Input } from "../Input/Input";
import { RenderableComponent } from "../GameObject/Components/RenderableComponent";
import { GameObject } from "../GameObject/GameObject";
import { Mesh } from "../Render/Mesh/Mesh";
import { Texture } from "../Render/Texture/Texture";
import { IMessageHandler } from "../Messege/IMessageHandler";
import { Time } from "../Time/Time";
import { MessageManager } from "../Messege/MessageManager";
import { AssetManager } from "../AssetManager/AssetManager";
import { SceneManager } from "../Scenes/SceneManager";
import { Vector3 } from "../Matrix-gl/Vector3";
import { TextAsset } from "../AssetManager/TextAssetLoader";
import { Material } from "../Render/Material/Material";
import { IComponent } from "../GameObject/Components/IComponent";
import { TestComponent } from "../GameObject/Components/TestComponent";

/**Engine class, manages the startup of the game engine, and the game loop of the program.
    * @class
    * */


export class Engine {

    private static corutineList:any[]=[];

    public constructor() { }

    public initialize(): void {
        Render.initialize();
        AssetManager.initialize();
        Input.initialize();
        SceneManager.initialize();
        Mesh.initialize();



        /**Asset declaration */
        let vertexshaderAssetglsl: TextAsset = AssetManager.getAsset("assets/textures/2.glsl");
        let vertexshaderAsset: TextAsset = AssetManager.getAsset("assets/textures/1.txt");
        let mesh: Mesh = new Mesh("cube.json");
        let mesh2: Mesh = new Mesh("Model.json");
        let texture: Texture = new Texture("assets/textures/crate.png");
        let material: Material = new Material("material", texture);



        this.resize();
        const promises: Promise<any>[] = AssetManager.getPromises();
        const handlers: IMessageHandler[] = AssetManager.getHandlers();

        Promise.all(promises).then(data => {
            for (let i = 0; i < data.length; i++) {
                handlers[i].onSyncLoad(data[i]);
            }

            let go: GameObject = new GameObject("cube");
            let go12: GameObject = new GameObject("deer");
            let go13: GameObject = new GameObject("go13");
            let go14: GameObject = new GameObject();
            let go1: GameObject = new GameObject("bla", new Vector3(10, 10, 10));
            let go2: GameObject = new GameObject("go2");
            let component3: RenderableComponent = new RenderableComponent(go12, mesh2, material);
            let component: RenderableComponent = new RenderableComponent(go, mesh, material);
            go12.transform.scale = new Vector3(0.08, 0.08, 0.08);
            go.transform.scale = new Vector3(0.08, 0.08, 0.08);

            go.transform.position = new Vector3(5, 1, 5);
            let component2: RenderableComponent = new RenderableComponent(go2, Mesh.defaultCube);
            go2.transform.position = new Vector3(1, 1, 1);


            let comp: RenderableComponent | null = go.getComponent<RenderableComponent>(component);
            let comptest: RenderableComponent | null = go.getComponentTest<RenderableComponent>(RenderableComponent);
            let testcomponet: TestComponent = new TestComponent(go13);
            this.start();
            this.gameLoop();
        }

        )
    }

    private start(): void {
        Time.start();

        SceneManager.actualScene.printAllGameObjects();
        let gos: { [name: string]: GameObject } = SceneManager.actualScene.getAllGameObjects();
        for (let name in gos) {
            console.log("start go:",name);
            let go: GameObject = gos[name];
            let components: IComponent[] = go.getComponents();
            for (let i = 0; i < components.length; i++) {
                components[i].start();
            }
        }
    }

    private gameLoop(): void {
        Time.thick();
        Render.update();
        MessageManager.update();
        for (let i = 0; i < Engine.corutineList.length; i++) {
            Engine.corutineList[i].next();
        }
        let gos: { [name: string]: GameObject } = SceneManager.actualScene.getAllGameObjects();
        for (let name in gos) {
            let go: GameObject = gos[name];
            let components: IComponent[] = go.getComponents();
            for (let i = 0; i < components.length; i++) {
                components[i].update();
            }
        }
        Input.update();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public instanciateCube(): void {
        console.log("funciona");
    }



    public stop(): void {

    }

    public resize(): void {
        Render.resize();
    }

    public static addCorutine(corutine: any): void {
        Engine.corutineList.push(corutine);
    }
}
