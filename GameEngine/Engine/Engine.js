define(["require", "exports", "../Render/Render", "../Input/Input", "../GameObject/Components/RenderableComponent", "../GameObject/GameObject", "../Render/Mesh/Mesh", "../Render/Texture/Texture", "../Time/Time", "../Messege/MessageManager", "../AssetManager/AssetManager", "../Scenes/SceneManager", "../Matrix-gl/Vector3", "../Render/Material/Material", "../GameObject/Components/ControllerComponent", "../Render/AbstractProgram/TextureMeshShader", "../GameObject/Components/DirectionalLightComponent", "../GameObject/Components/BoxColliderComponent", "../Physics/Physics", "../GameObject/Components/CollectableComponent", "../GameObject/Components/AnimationComponent", "../GameObject/Components/MovingPlatformComponent", "../Matrix-gl/GlMatrix"], function (require, exports, Render_1, Input_1, RenderableComponent_1, GameObject_1, Mesh_1, Texture_1, Time_1, MessageManager_1, AssetManager_1, SceneManager_1, Vector3_1, Material_1, ControllerComponent_1, TextureMeshShader_1, DirectionalLightComponent_1, BoxColliderComponent_1, Physics_1, CollectableComponent_1, AnimationComponent_1, MovingPlatformComponent_1, GlMatrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**Engine class, manages the startup of the game engine, and the game loop of the program.
        * @class
        * */
    class Engine {
        constructor() { }
        /**
         * Initializes every module in the engine and load the resources of the game.
         */
        initialize() {
            Render_1.Render.initialize();
            AssetManager_1.AssetManager.initialize();
            Input_1.Input.initialize();
            SceneManager_1.SceneManager.initialize();
            Mesh_1.Mesh.initialize();
            /**Asset declaration */
            let vertexshaderAssetglsl = AssetManager_1.AssetManager.getAsset("assets/textures/2.glsl");
            let vertexshaderAsset = AssetManager_1.AssetManager.getAsset("assets/textures/1.txt");
            let mesh = new Mesh_1.Mesh("cube.json");
            let mesh2 = new Mesh_1.Mesh("Model.json");
            let texture = new Texture_1.Texture("assets/textures/crate.png");
            let material = new Material_1.Material("material", texture, TextureMeshShader_1.TextureMeshShader.program);
            let materialdeer = new Material_1.Material("material", texture);
            this.resize();
            const promises = AssetManager_1.AssetManager.getPromises();
            const handlers = AssetManager_1.AssetManager.getHandlers();
            Promise.all(promises).then(data => {
                for (let i = 0; i < data.length; i++) {
                    handlers[i].onSyncLoad(data[i]);
                }
                /**Deer */
                let deer = new GameObject_1.GameObject("deer");
                deer.transform.scale = new Vector3_1.Vector3(0.03, 0.03, 0.03);
                let component3 = new RenderableComponent_1.RenderableComponent(deer, mesh2, materialdeer);
                deer.transform.position = new Vector3_1.Vector3(30, 0, 50);
                deer.transform.rotateX(GlMatrix_1.GlMatrix.toRadian(-90));
                /**Directional Light */
                let dirGameObject = new GameObject_1.GameObject("directionalLightGameObject");
                let dirLightPlayer = new DirectionalLightComponent_1.DirectionalLightComponent(dirGameObject);
                dirGameObject.transform.forward = new Vector3_1.Vector3(1, 1, 1);
                /**Player */
                let player = new GameObject_1.GameObject("playerGameObject");
                player.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                player.transform.position = new Vector3_1.Vector3(1, 0.5, 5);
                let renderComponentPlayer = new RenderableComponent_1.RenderableComponent(player, mesh);
                let boxColliderOfPlayer = new BoxColliderComponent_1.BoxColliderComponent(player);
                boxColliderOfPlayer.isTrigger = false;
                let playerController = new ControllerComponent_1.ControllerComponent(player);
                /**Animated Component */
                let animatedGo = new GameObject_1.GameObject("animatedGo");
                animatedGo.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                animatedGo.transform.position = new Vector3_1.Vector3(20, 1, 20);
                let testcomponet = new AnimationComponent_1.AnimationComponent(animatedGo);
                let component = new RenderableComponent_1.RenderableComponent(animatedGo, mesh, material);
                /**Platform 1 */
                let boxPlatform1 = new GameObject_1.GameObject("boxPlatform1", new Vector3_1.Vector3(10, 0, 10));
                boxPlatform1.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform1);
                boxPlatformCollider.isTrigger = false;
                let boxPlatform1Render = new RenderableComponent_1.RenderableComponent(boxPlatform1, mesh, material);
                /**Platform 2 */
                let boxPlatform2 = new GameObject_1.GameObject("boxPlatform2", new Vector3_1.Vector3(10, 3.8, 12));
                boxPlatform2.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider2 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform2);
                boxPlatformCollider2.isTrigger = false;
                let boxPlatform2Render = new RenderableComponent_1.RenderableComponent(boxPlatform2, mesh, material);
                /**Platform 3 */
                let boxPlatform3 = new GameObject_1.GameObject("boxPlatform3", new Vector3_1.Vector3(8, 8, 12));
                boxPlatform3.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider3 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform3);
                boxPlatformCollider3.isTrigger = false;
                let boxPlatform2Render3 = new RenderableComponent_1.RenderableComponent(boxPlatform3, mesh, material);
                /**Platform 4*/
                let boxPlatform4 = new GameObject_1.GameObject("boxPlatform4", new Vector3_1.Vector3(8, 12, 15));
                boxPlatform4.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider4 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform4);
                boxPlatformCollider4.isTrigger = false;
                let boxPlatform2Render4 = new RenderableComponent_1.RenderableComponent(boxPlatform4, mesh, material);
                /**Platform 5*/
                let boxPlatform5 = new GameObject_1.GameObject("boxPlatform5", new Vector3_1.Vector3(8, 14, 19));
                boxPlatform5.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider5 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform5);
                boxPlatformCollider5.isTrigger = false;
                let boxPlatform2Render5 = new RenderableComponent_1.RenderableComponent(boxPlatform5, mesh, material);
                /**Platform 6*/
                let boxPlatform6 = new GameObject_1.GameObject("boxPlatform6", new Vector3_1.Vector3(14, 14, 19));
                boxPlatform6.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider6 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform6);
                boxPlatformCollider6.isTrigger = false;
                let boxPlatform2Render6 = new RenderableComponent_1.RenderableComponent(boxPlatform6, mesh, material);
                /**Platform 7*/
                let boxPlatform7 = new GameObject_1.GameObject("boxPlatform7", new Vector3_1.Vector3(19, 16, 19));
                boxPlatform7.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider7 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform7);
                boxPlatformCollider7.isTrigger = false;
                let boxPlatform2Render7 = new RenderableComponent_1.RenderableComponent(boxPlatform7, mesh, material);
                /**Platform 8 Moving*/
                let boxPlatform8 = new GameObject_1.GameObject("boxPlatform8", new Vector3_1.Vector3(23, 16, 19));
                boxPlatform8.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider8 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform8);
                boxPlatformCollider8.isTrigger = false;
                let movingPlatform8 = new MovingPlatformComponent_1.MovingPlatformComponent(boxPlatform8, new Vector3_1.Vector3(29, 16, 19));
                let boxPlatform2Render8 = new RenderableComponent_1.RenderableComponent(boxPlatform8, mesh, material);
                /**Platform9 Moving*/
                let boxPlatform9 = new GameObject_1.GameObject("boxPlatform9", new Vector3_1.Vector3(31, 16, 19));
                boxPlatform9.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider9 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform9);
                boxPlatformCollider9.isTrigger = false;
                let movingPlatform9 = new MovingPlatformComponent_1.MovingPlatformComponent(boxPlatform9, new Vector3_1.Vector3(36, 20, 19));
                let boxPlatform2Render9 = new RenderableComponent_1.RenderableComponent(boxPlatform9, mesh, material);
                /**Platform10*/
                let boxPlatform10 = new GameObject_1.GameObject("boxPlatform10", new Vector3_1.Vector3(40, 25, 19));
                boxPlatform10.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider10 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform10);
                boxPlatformCollider10.isTrigger = false;
                let boxPlatform2Render10 = new RenderableComponent_1.RenderableComponent(boxPlatform10, mesh, material);
                /**Platform11*/
                let boxPlatform11 = new GameObject_1.GameObject("boxPlatform11", new Vector3_1.Vector3(40, 27, 19));
                boxPlatform11.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider11 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform11);
                boxPlatformCollider11.isTrigger = false;
                let boxPlatform2Render11 = new RenderableComponent_1.RenderableComponent(boxPlatform11, mesh, material);
                /**Platform12*/
                let boxPlatform12 = new GameObject_1.GameObject("boxPlatform12", new Vector3_1.Vector3(40, 29, 19));
                boxPlatform12.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider12 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform12);
                boxPlatformCollider12.isTrigger = false;
                let boxPlatform2Render12 = new RenderableComponent_1.RenderableComponent(boxPlatform12, mesh, material);
                /**Platform13*/
                let boxPlatform13 = new GameObject_1.GameObject("boxPlatform13", new Vector3_1.Vector3(50, 29, 19));
                boxPlatform13.transform.scale = new Vector3_1.Vector3(0.1, 0.1, 0.1);
                let boxPlatformCollider13 = new BoxColliderComponent_1.BoxColliderComponent(boxPlatform13);
                boxPlatformCollider13.isTrigger = false;
                let boxPlatform2Render13 = new RenderableComponent_1.RenderableComponent(boxPlatform13, mesh, material);
                /**Collectable 1 */
                let collectable1 = new GameObject_1.GameObject("collectable1");
                collectable1.transform.position = new Vector3_1.Vector3(1, 0.8, 1);
                let renderCollectable1 = new RenderableComponent_1.RenderableComponent(collectable1, mesh);
                let collectableCollider1 = new BoxColliderComponent_1.BoxColliderComponent(collectable1);
                collectable1.transform.scale = new Vector3_1.Vector3(0.03, 0.03, 0.03);
                let collectableComponent1 = new CollectableComponent_1.CollectableComponent(collectable1);
                /**Collectable 2 */
                let collectable2 = new GameObject_1.GameObject("collectable2");
                collectable2.transform.position = new Vector3_1.Vector3(14, 16, 20);
                let renderCollectable2 = new RenderableComponent_1.RenderableComponent(collectable2, mesh);
                let collectableCollider2 = new BoxColliderComponent_1.BoxColliderComponent(collectable2);
                collectable2.transform.scale = new Vector3_1.Vector3(0.03, 0.03, 0.03);
                let collectableComponent2 = new CollectableComponent_1.CollectableComponent(collectable2);
                /**Collectable 3 */
                let collectable3 = new GameObject_1.GameObject("collectable3");
                collectable3.transform.position = new Vector3_1.Vector3(40, 31, 20);
                let renderCollectable3 = new RenderableComponent_1.RenderableComponent(collectable3, mesh);
                let collectableCollider3 = new BoxColliderComponent_1.BoxColliderComponent(collectable3);
                collectable3.transform.scale = new Vector3_1.Vector3(0.03, 0.03, 0.03);
                let collectableComponent3 = new CollectableComponent_1.CollectableComponent(collectable3);
                /**Collectable 4 */
                let collectable4 = new GameObject_1.GameObject("collectable4");
                collectable4.transform.position = new Vector3_1.Vector3(47, 33, 19);
                let renderCollectable4 = new RenderableComponent_1.RenderableComponent(collectable4, mesh);
                let collectableCollider34 = new BoxColliderComponent_1.BoxColliderComponent(collectable4);
                collectable4.transform.scale = new Vector3_1.Vector3(0.03, 0.03, 0.03);
                let collectableComponent4 = new CollectableComponent_1.CollectableComponent(collectable4);
                /**Collectable 5 */
                let collectable5 = new GameObject_1.GameObject("collectable5");
                collectable5.transform.position = new Vector3_1.Vector3(60, 26, 19);
                let renderCollectable5 = new RenderableComponent_1.RenderableComponent(collectable5, mesh);
                let collectableCollider35 = new BoxColliderComponent_1.BoxColliderComponent(collectable5);
                collectable5.transform.scale = new Vector3_1.Vector3(0.03, 0.03, 0.03);
                let collectableComponent5 = new CollectableComponent_1.CollectableComponent(collectable5);
                /**Scene Two index 1 */
                let SceneTwo = SceneManager_1.SceneManager.createNewScene("endScene");
                SceneManager_1.SceneManager.changeScene(1);
                let goSceneTwo = new GameObject_1.GameObject("goSceneTwo");
                let renderCompGoSceneTwo = new RenderableComponent_1.RenderableComponent(goSceneTwo, Mesh_1.Mesh.defaultCube);
                SceneManager_1.SceneManager.changeScene(0);
                this.awake();
                this.start();
                this.gameLoop();
            });
        }
        /**
         * First function to be called from the engine works for initialize classes and variables.
         */
        awake() {
            let gos = SceneManager_1.SceneManager.actualScene.getAllGameObjects();
            for (let name in gos) {
                let go = gos[name];
                let components = go.getComponents();
                for (let i = 0; i < components.length; i++) {
                    components[i].awake();
                }
            }
        }
        /**
         * Every class should be already initialized and the game will start.
         */
        start() {
            Time_1.Time.start();
            SceneManager_1.SceneManager.actualScene.printAllGameObjects();
            let gos = SceneManager_1.SceneManager.actualScene.getAllGameObjects();
            for (let name in gos) {
                let go = gos[name];
                let components = go.getComponents();
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
        gameLoop() {
            Time_1.Time.thick();
            Render_1.Render.update();
            MessageManager_1.MessageManager.update();
            for (let i = 0; i < Engine.corutineList.length; i++) {
                Engine.corutineList[i].next();
            }
            let gos = SceneManager_1.SceneManager.actualScene.getAllGameObjects();
            //fixed update call
            if (Time_1.Time.pastFixedTime()) {
                Physics_1.Physics.fixedUpdate();
                for (let name in gos) {
                    let go = gos[name];
                    if (go.enabled) {
                        let components = go.getComponents();
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
                let go = gos[name];
                if (go.enabled) {
                    let components = go.getComponents();
                    for (let i = 0; i < components.length; i++) {
                        if (components[i].enabled) {
                            components[i].update();
                        }
                    }
                }
            }
            Input_1.Input.update();
            requestAnimationFrame(this.gameLoop.bind(this));
        }
        instanciateCube() {
            console.log("funciona");
        }
        /**
         * Stops the game engine
         */
        stop() {
        }
        /**
         * Resizes the canvas.
         */
        resize() {
            Render_1.Render.resize();
        }
        /**
         * Add a corutine to the execution of the game.
         * @param {any} corutine
         */
        static addCorutine(corutine) {
            Engine.corutineList.push(corutine);
        }
    }
    /*list of corutines*/
    Engine.corutineList = [];
    Engine.onSyncLoading = false;
    Engine.onGameMode = false;
    exports.Engine = Engine;
});
//# sourceMappingURL=Engine.js.map