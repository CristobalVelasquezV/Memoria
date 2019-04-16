define(["require", "exports", "../Render/Render", "../Input/Input", "../GameObject/Components/RenderableComponent", "../GameObject/GameObject", "../Render/Mesh/Mesh", "../Render/Texture/Texture", "../Time/Time", "../Messege/MessageManager", "../AssetManager/AssetManager", "../Scenes/SceneManager", "../Matrix-gl/Vector3", "../Render/Material/Material", "../GameObject/Components/TestComponent"], function (require, exports, Render_1, Input_1, RenderableComponent_1, GameObject_1, Mesh_1, Texture_1, Time_1, MessageManager_1, AssetManager_1, SceneManager_1, Vector3_1, Material_1, TestComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**Engine class, manages the startup of the game engine, and the game loop of the program.
        * @class
        * */
    class Engine {
        constructor() { }
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
            let material = new Material_1.Material("material", texture);
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
                let go1 = new GameObject_1.GameObject("bla", new Vector3_1.Vector3(10, 10, 10));
                let go2 = new GameObject_1.GameObject("go2");
                let component3 = new RenderableComponent_1.RenderableComponent(go12, mesh2, material);
                let component = new RenderableComponent_1.RenderableComponent(go, mesh, material);
                go12.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go.transform.scale = new Vector3_1.Vector3(0.08, 0.08, 0.08);
                go.transform.position = new Vector3_1.Vector3(5, 1, 5);
                let component2 = new RenderableComponent_1.RenderableComponent(go2, Mesh_1.Mesh.defaultCube);
                go2.transform.position = new Vector3_1.Vector3(1, 1, 1);
                let comp = go.getComponent(component);
                let comptest = go.getComponentTest(RenderableComponent_1.RenderableComponent);
                let testcomponet = new TestComponent_1.TestComponent(go13);
                this.start();
                this.gameLoop();
            });
        }
        start() {
            Time_1.Time.start();
            SceneManager_1.SceneManager.actualScene.printAllGameObjects();
            let gos = SceneManager_1.SceneManager.actualScene.getAllGameObjects();
            for (let name in gos) {
                console.log("start go:", name);
                let go = gos[name];
                let components = go.getComponents();
                for (let i = 0; i < components.length; i++) {
                    components[i].start();
                }
            }
        }
        gameLoop() {
            Time_1.Time.thick();
            Render_1.Render.update();
            MessageManager_1.MessageManager.update();
            for (let i = 0; i < Engine.corutineList.length; i++) {
                Engine.corutineList[i].next();
            }
            let gos = SceneManager_1.SceneManager.actualScene.getAllGameObjects();
            for (let name in gos) {
                let go = gos[name];
                let components = go.getComponents();
                for (let i = 0; i < components.length; i++) {
                    components[i].update();
                }
            }
            Input_1.Input.update();
            requestAnimationFrame(this.gameLoop.bind(this));
        }
        instanciateCube() {
            console.log("funciona");
        }
        stop() {
        }
        resize() {
            Render_1.Render.resize();
        }
        static addCorutine(corutine) {
            Engine.corutineList.push(corutine);
        }
    }
    Engine.corutineList = [];
    exports.Engine = Engine;
});
//# sourceMappingURL=Engine.js.map