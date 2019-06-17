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
import { ControllerComponent } from "../GameObject/Components/ControllerComponent";
import { TextureMeshShader } from "../Render/AbstractProgram/TextureMeshShader";
import { DirectionalLightComponent } from "../GameObject/Components/DirectionalLightComponent";
import { BoxColliderComponent } from "../GameObject/Components/BoxColliderComponent";
import { ColliderComponent } from "../GameObject/Components/ColliderComponent";
import { Physics } from "../Physics/Physics";
import { Scene } from "../Scenes/Scene";
import { CollectableComponent } from "../GameObject/Components/CollectableComponent";

/**Engine class, manages the startup of the game engine, and the game loop of the program.
    * @class
    * */


export class Engine {
    /*list of corutines*/
    private static corutineList: any[] = [];
    private static onSyncLoading: boolean = false;
    public static onGameMode: boolean = false;

    public constructor() { }
    /**
     * Initializes every module in the engine and load the resources of the game.
     */
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
        let material: Material = new Material("material", texture, TextureMeshShader.program);
        let materialdeer: Material = new Material("material", texture);


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
            let go1: GameObject = new GameObject("bla", new Vector3(10, 0, 10));
            let go2: GameObject = new GameObject("go2");
            go1.transform.scale = new Vector3(0.08, 0.08, 0.08);
            go2.transform.scale = new Vector3(0.08, 0.08, 0.08);
            go13.transform.scale = new Vector3(0.08, 0.08, 0.08);
            go12.transform.scale = new Vector3(0.08, 0.08, 0.08);
            go.transform.scale = new Vector3(0.08, 0.08, 0.08);
            go.transform.position = new Vector3(5, 1, 5);

            let component3: RenderableComponent = new RenderableComponent(go12, mesh2, materialdeer);
            let component: RenderableComponent = new RenderableComponent(go, mesh, material);
            let component2: RenderableComponent = new RenderableComponent(go2, mesh);
            let component4: RenderableComponent = new RenderableComponent(go13, mesh);
            let component5: RenderableComponent = new RenderableComponent(go1, mesh);

            let collectable: CollectableComponent = new CollectableComponent(go13);
            let testcomponet: TestComponent = new TestComponent(go);
            let controller: ControllerComponent = new ControllerComponent(go2);
            let dirLight: DirectionalLightComponent = new DirectionalLightComponent(go2);

            let boxCollider: BoxColliderComponent = new BoxColliderComponent(go2);
            let boxCollider2: BoxColliderComponent = new BoxColliderComponent(go13);
            let boxCollider3: BoxColliderComponent = new BoxColliderComponent(go1);

            go2.transform.position = new Vector3(1, 1, 5);
            go13.transform.position = new Vector3(1, 1, 1);


            let comp: RenderableComponent | null = go.getComponent<RenderableComponent>(component);
            let comptest: RenderableComponent | null = go.getComponentTest<RenderableComponent>(RenderableComponent);
            let comptest2: TestComponent | null = go.getComponentTest<TestComponent>(TestComponent);




            //scene two
            let SceneTwo: Scene = SceneManager.createNewScene("endScene");
            SceneManager.changeScene(1);
            let goSceneTwo: GameObject = new GameObject("goSceneTwo");
            let renderCompGoSceneTwo: RenderableComponent = new RenderableComponent(goSceneTwo, Mesh.defaultCube);
            SceneManager.changeScene(0);


            this.awake();
            this.start();
            this.gameLoop();
        }

        )
    }
    /**
     * First function to be called from the engine works for initialize classes and variables.
     */
    private awake(): void {
        let gos: { [name: string]: GameObject } = SceneManager.actualScene.getAllGameObjects();
        for (let name in gos) {
            let go: GameObject = gos[name];
            let components: IComponent[] = go.getComponents();
            for (let i = 0; i < components.length; i++) {
                components[i].awake();
            }
        }
    }
    /**
     * Every class should be already initialized and the game will start.
     */
    private start(): void {
        Time.start();

        SceneManager.actualScene.printAllGameObjects();
        let gos: { [name: string]: GameObject } = SceneManager.actualScene.getAllGameObjects();
        for (let name in gos) {
            let go: GameObject = gos[name];
            let components: IComponent[] = go.getComponents();
            for (let i = 0; i < components.length; i++) {
                components[i].start();
            }
        }
    }
    /**
     * Game loop of the Engine the order of execution is:
     *  * Time
     *  * Render
     *  * Dinamic assets
     *  * Corutines
     *  * Message
     *  * Components
     *  * Inputs
     */

    private gameLoop(): void {  
        Time.thick();
        
        Render.update();
        MessageManager.update();
        for (let i = 0; i < Engine.corutineList.length; i++) {
            Engine.corutineList[i].next();
        }
        let gos: { [name: string]: GameObject } = SceneManager.actualScene.getAllGameObjects();
        //fixed update call
        if (Time.pastFixedTime()) {
            Physics.fixedUpdate();
            for (let name in gos) {
                let go: GameObject = gos[name];
                if (go.enabled) {
                    let components: IComponent[] = go.getComponents();
                    for (let i = 0; i < components.length; i++) {
                        if (components[i].enabled) {
                            components[i].fixedUpdate();
                        } 
                    }
                }
            }
        }
        //update call
        for (let name in gos) {
            let go: GameObject = gos[name];
            if (go.enabled) {
                let components: IComponent[] = go.getComponents();
                for (let i = 0; i < components.length; i++) {
                    if (components[i].enabled) {
                        components[i].update();
                    } 
                }
            }
        }
        Input.update();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public instanciateCube(): void {
        console.log("funciona");
    }


    /**
     * Stops the game engine
     */
    public stop(): void {

    }
    /**
     * Resizes the canvas.
     */
    public resize(): void {
        Render.resize();
    }
    /**
     * Add a corutine to the execution of the game.
     * @param {any} corutine
     */
    public static addCorutine(corutine: any): void {
        Engine.corutineList.push(corutine);
    }
}
