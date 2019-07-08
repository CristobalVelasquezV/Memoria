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
import { ControllerComponent } from "../GameObject/Components/ControllerComponent";
import { TextureMeshShader } from "../Render/AbstractProgram/TextureMeshShader";
import { DirectionalLightComponent } from "../GameObject/Components/DirectionalLightComponent";
import { BoxColliderComponent } from "../GameObject/Components/BoxColliderComponent";
import { Physics } from "../Physics/Physics";
import { Scene } from "../Scenes/Scene";
import { CollectableComponent } from "../GameObject/Components/CollectableComponent";
import { AnimationComponent } from "../GameObject/Components/AnimationComponent";
import { MovingPlatformComponent } from "../GameObject/Components/MovingPlatformComponent";
import { GlMatrix } from "../Matrix-gl/GlMatrix";

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

            /**Deer */
            let deer: GameObject = new GameObject("deer"); 


            deer.transform.scale = new Vector3(0.03, 0.03, 0.03);
            
            let component3: RenderableComponent = new RenderableComponent(deer, mesh2, materialdeer);
            deer.transform.position = new Vector3(30, 0, 50);
            deer.transform.rotateX(GlMatrix.toRadian(-90));

            /**Directional Light */
            let dirGameObject: GameObject = new GameObject("directionalLightGameObject");     
            let dirLightPlayer: DirectionalLightComponent = new DirectionalLightComponent(dirGameObject);
            dirGameObject.transform.forward = new Vector3(1,1,1);
      

            /**Player */
            let player: GameObject = new GameObject("playerGameObject");
            player.transform.scale = new Vector3(0.1, 0.1, 0.1);
            player.transform.position = new Vector3(1, 0.5, 5);
            let renderComponentPlayer: RenderableComponent = new RenderableComponent(player, mesh);
            let boxColliderOfPlayer: BoxColliderComponent = new BoxColliderComponent(player);
            boxColliderOfPlayer.isTrigger = false;
           
            let playerController: ControllerComponent = new ControllerComponent(player);



            /**Animated Component */
            let animatedGo: GameObject = new GameObject("animatedGo");
            animatedGo.transform.scale = new Vector3(0.1, 0.1, 0.1);
            animatedGo.transform.position = new Vector3(20, 1, 20);
            let testcomponet: AnimationComponent = new AnimationComponent(animatedGo);
            let component: RenderableComponent = new RenderableComponent(animatedGo, mesh, material);
            

            /**Platform 1 */
            let boxPlatform1: GameObject = new GameObject("boxPlatform1", new Vector3(10, 0, 10));
            boxPlatform1.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider: BoxColliderComponent = new BoxColliderComponent(boxPlatform1);
            boxPlatformCollider.isTrigger = false;
            let boxPlatform1Render: RenderableComponent = new RenderableComponent(boxPlatform1, mesh, material);


            /**Platform 2 */
            let boxPlatform2: GameObject = new GameObject("boxPlatform2", new Vector3(10, 3.8, 12));
            boxPlatform2.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider2: BoxColliderComponent = new BoxColliderComponent(boxPlatform2);
            boxPlatformCollider2.isTrigger = false;
            let boxPlatform2Render: RenderableComponent = new RenderableComponent(boxPlatform2, mesh, material);


            /**Platform 3 */
            let boxPlatform3: GameObject = new GameObject("boxPlatform3", new Vector3(8, 8, 12));
            boxPlatform3.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider3: BoxColliderComponent = new BoxColliderComponent(boxPlatform3);
            boxPlatformCollider3.isTrigger = false;
            let boxPlatform2Render3: RenderableComponent = new RenderableComponent(boxPlatform3, mesh, material);


            /**Platform 4*/
            let boxPlatform4: GameObject = new GameObject("boxPlatform4", new Vector3(8, 12, 15));
            boxPlatform4.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider4: BoxColliderComponent = new BoxColliderComponent(boxPlatform4);
            boxPlatformCollider4.isTrigger = false;
            let boxPlatform2Render4: RenderableComponent = new RenderableComponent(boxPlatform4, mesh, material);


            /**Platform 5*/
            let boxPlatform5: GameObject = new GameObject("boxPlatform5", new Vector3(8, 14, 19));
            boxPlatform5.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider5: BoxColliderComponent = new BoxColliderComponent(boxPlatform5);
            boxPlatformCollider5.isTrigger = false;
            let boxPlatform2Render5: RenderableComponent = new RenderableComponent(boxPlatform5, mesh, material);


            /**Platform 6*/
            let boxPlatform6: GameObject = new GameObject("boxPlatform6", new Vector3(14, 14, 19));
            boxPlatform6.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider6: BoxColliderComponent = new BoxColliderComponent(boxPlatform6);
            boxPlatformCollider6.isTrigger = false;
            let boxPlatform2Render6: RenderableComponent = new RenderableComponent(boxPlatform6, mesh, material);


            /**Platform 7*/
            let boxPlatform7: GameObject = new GameObject("boxPlatform7", new Vector3(19, 16, 19));
            boxPlatform7.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider7: BoxColliderComponent = new BoxColliderComponent(boxPlatform7);
            boxPlatformCollider7.isTrigger = false;
            let boxPlatform2Render7: RenderableComponent = new RenderableComponent(boxPlatform7, mesh, material);

            /**Platform 8 Moving*/
            let boxPlatform8: GameObject = new GameObject("boxPlatform8", new Vector3(23, 16, 19));
            boxPlatform8.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider8: BoxColliderComponent = new BoxColliderComponent(boxPlatform8);
            boxPlatformCollider8.isTrigger = false;
            let movingPlatform8: MovingPlatformComponent = new MovingPlatformComponent(boxPlatform8, new Vector3(29, 16, 19));
            let boxPlatform2Render8: RenderableComponent = new RenderableComponent(boxPlatform8, mesh, material);

            /**Platform9 Moving*/
            let boxPlatform9: GameObject = new GameObject("boxPlatform9", new Vector3(31, 16, 19));
            boxPlatform9.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider9: BoxColliderComponent = new BoxColliderComponent(boxPlatform9);
            boxPlatformCollider9.isTrigger = false;
            let movingPlatform9: MovingPlatformComponent = new MovingPlatformComponent(boxPlatform9, new Vector3(36, 20, 19));
            let boxPlatform2Render9: RenderableComponent = new RenderableComponent(boxPlatform9, mesh, material);

            /**Platform10*/
            let boxPlatform10: GameObject = new GameObject("boxPlatform10", new Vector3(40, 25, 19));
            boxPlatform10.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider10: BoxColliderComponent = new BoxColliderComponent(boxPlatform10);
            boxPlatformCollider10.isTrigger = false;
            let boxPlatform2Render10: RenderableComponent = new RenderableComponent(boxPlatform10, mesh, material);
            /**Platform11*/
            let boxPlatform11: GameObject = new GameObject("boxPlatform11", new Vector3(40, 27, 19));
            boxPlatform11.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider11: BoxColliderComponent = new BoxColliderComponent(boxPlatform11);
            boxPlatformCollider11.isTrigger = false;
            let boxPlatform2Render11: RenderableComponent = new RenderableComponent(boxPlatform11, mesh, material);

            /**Platform12*/
            let boxPlatform12: GameObject = new GameObject("boxPlatform12", new Vector3(40, 29, 19));
            boxPlatform12.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider12: BoxColliderComponent = new BoxColliderComponent(boxPlatform12);
            boxPlatformCollider12.isTrigger = false;
            let boxPlatform2Render12: RenderableComponent = new RenderableComponent(boxPlatform12, mesh, material);

            /**Platform13*/
            let boxPlatform13: GameObject = new GameObject("boxPlatform13", new Vector3(50, 29, 19));
            boxPlatform13.transform.scale = new Vector3(0.1, 0.1, 0.1);
            let boxPlatformCollider13: BoxColliderComponent = new BoxColliderComponent(boxPlatform13);
            boxPlatformCollider13.isTrigger = false;
            let boxPlatform2Render13: RenderableComponent = new RenderableComponent(boxPlatform13, mesh, material);


            /**Collectable 1 */
            let collectable1: GameObject = new GameObject("collectable1");
            collectable1.transform.position = new Vector3(1, 0.8, 1);
            let renderCollectable1: RenderableComponent = new RenderableComponent(collectable1, mesh);
            let collectableCollider1: BoxColliderComponent = new BoxColliderComponent(collectable1);
            collectable1.transform.scale = new Vector3(0.03, 0.03, 0.03);
            let collectableComponent1: CollectableComponent = new CollectableComponent(collectable1);


            /**Collectable 2 */
            let collectable2: GameObject = new GameObject("collectable2");
            collectable2.transform.position = new Vector3(14, 16, 20);
            let renderCollectable2: RenderableComponent = new RenderableComponent(collectable2, mesh);
            let collectableCollider2: BoxColliderComponent = new BoxColliderComponent(collectable2);
            collectable2.transform.scale = new Vector3(0.03, 0.03, 0.03);
            let collectableComponent2: CollectableComponent = new CollectableComponent(collectable2);

            /**Collectable 3 */
            let collectable3: GameObject = new GameObject("collectable3");
            collectable3.transform.position = new Vector3(40, 31, 20)
            let renderCollectable3: RenderableComponent = new RenderableComponent(collectable3, mesh);
            let collectableCollider3: BoxColliderComponent = new BoxColliderComponent(collectable3);
            collectable3.transform.scale = new Vector3(0.03, 0.03, 0.03);
            let collectableComponent3: CollectableComponent = new CollectableComponent(collectable3);


            /**Collectable 4 */
            let collectable4: GameObject = new GameObject("collectable4");
            collectable4.transform.position = new Vector3(47, 33, 19)
            let renderCollectable4: RenderableComponent = new RenderableComponent(collectable4, mesh);
            let collectableCollider34: BoxColliderComponent = new BoxColliderComponent(collectable4);
            collectable4.transform.scale = new Vector3(0.03, 0.03, 0.03);
            let collectableComponent4: CollectableComponent = new CollectableComponent(collectable4);


            /**Collectable 5 */
            let collectable5: GameObject = new GameObject("collectable5");
            collectable5.transform.position = new Vector3(60, 26, 19)
            let renderCollectable5: RenderableComponent = new RenderableComponent(collectable5, mesh);
            let collectableCollider35: BoxColliderComponent = new BoxColliderComponent(collectable5);
            collectable5.transform.scale = new Vector3(0.03, 0.03, 0.03);
            let collectableComponent5: CollectableComponent = new CollectableComponent(collectable5);

            /**Scene Two index 1 */
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
