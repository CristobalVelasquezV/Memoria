define(["require", "exports", "../Render/Render", "../Input/Input", "../GameObject/Components/RenderableComponent", "../GameObject/GameObject", "../Render/Mesh/Mesh", "../Render/Texture/Texture", "../Time/Time", "../Messege/MessageManager", "../AssetManager/AssetManager", "../Scenes/SceneManager", "../Matrix-gl/Vector3", "../Render/Material/Material", "../GameObject/Components/TestComponent", "../GameObject/Components/ControllerComponent", "../Render/AbstractProgram/TextureMeshShader", "../GameObject/Components/DirectionalLightComponent", "../GameObject/Components/BoxColliderComponent", "../Physics/Physics", "../GameObject/Components/CollectableComponent"], function (require, exports, Render_1, Input_1, RenderableComponent_1, GameObject_1, Mesh_1, Texture_1, Time_1, MessageManager_1, AssetManager_1, SceneManager_1, Vector3_1, Material_1, TestComponent_1, ControllerComponent_1, TextureMeshShader_1, DirectionalLightComponent_1, BoxColliderComponent_1, Physics_1, CollectableComponent_1) {
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
                let go = new GameObject_1.GameObject("cube");
                let go12 = new GameObject_1.GameObject("deer");
                let go13 = new GameObject_1.GameObject("go13");
                let go14 = new GameObject_1.GameObject();
                let go1 = new GameObject_1.GameObject("bla", new Vector3_1.Vector3(10, 0, 10));
                let go2 = new GameObject_1.GameObject("go2");
                go1.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go2.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go13.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go12.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go.transform.position = new Vector3_1.Vector3(5, 1, 5);
                let component3 = new RenderableComponent_1.RenderableComponent(go12, mesh2, materialdeer);
                let component = new RenderableComponent_1.RenderableComponent(go, mesh, material);
                let component2 = new RenderableComponent_1.RenderableComponent(go2, mesh);
                let component4 = new RenderableComponent_1.RenderableComponent(go13, mesh);
                let component5 = new RenderableComponent_1.RenderableComponent(go1, mesh);
                let collectable = new CollectableComponent_1.CollectableComponent(go13);
                let testcomponet = new TestComponent_1.TestComponent(go);
                let controller = new ControllerComponent_1.ControllerComponent(go2);
                let dirLight = new DirectionalLightComponent_1.DirectionalLightComponent(go2);
                let boxCollider = new BoxColliderComponent_1.BoxColliderComponent(go2);
                let boxCollider2 = new BoxColliderComponent_1.BoxColliderComponent(go13);
                let boxCollider3 = new BoxColliderComponent_1.BoxColliderComponent(go1);
                go2.transform.position = new Vector3_1.Vector3(1, 1, 5);
                go13.transform.position = new Vector3_1.Vector3(1, 1, 1);
                let comp = go.getComponent(component);
                let comptest = go.getComponentTest(RenderableComponent_1.RenderableComponent);
                let comptest2 = go.getComponentTest(TestComponent_1.TestComponent);
                //scene two
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