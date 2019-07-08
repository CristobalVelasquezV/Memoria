define(["require", "exports", "./IComponent", "../GameObject", "../../Input/Input", "../../Matrix-gl/Vector3", "./ColliderComponent", "./CollectableComponent", "../../Engine/Engine", "../../Scenes/SceneManager", "../../Render/Camera/Camera"], function (require, exports, IComponent_1, GameObject_1, Input_1, Vector3_1, ColliderComponent_1, CollectableComponent_1, Engine_1, SceneManager_1, Camera_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Test Component for moving a GameObject
     * @param {GameObject} go
     */
    class ControllerComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
            this.totalCollectables = 0;
            this.xAxis = 0;
            this.yAxis = 0;
            this.finalSceneIndex = 1;
            this.isJumping = false;
            this.isFalling = false;
            this.jVector = new Vector3_1.Vector3(0.1, 0, 0);
            this.lVector = new Vector3_1.Vector3(-0.1, 0, 0);
            this.iVector = new Vector3_1.Vector3(0, 0, 0.1);
            this.kVector = new Vector3_1.Vector3(0, 0, -0.1);
            this.upVector = new Vector3_1.Vector3(0, 0.3, 0);
            this.downVector = new Vector3_1.Vector3(0, -0.1, 0);
        }
        awake() {
        }
        start() {
            Engine_1.Engine.addCorutine(this.falling());
        }
        update() {
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_J)) {
                this.origin.transform.position = Vector3_1.Vector3.add(this.origin.transform.position, this.jVector);
                this.xAxis = 1;
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_L)) {
                this.origin.transform.position = Vector3_1.Vector3.add(this.origin.transform.position, this.lVector);
                this.xAxis = -1;
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_I)) {
                this.yAxis = 1;
                this.origin.transform.position = Vector3_1.Vector3.add(this.origin.transform.position, this.iVector);
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_K)) {
                this.yAxis = -1;
                this.origin.transform.position = Vector3_1.Vector3.add(this.origin.transform.position, this.kVector);
            }
            if (Input_1.Input.isKeyDown(Input_1.KeyCode.SPACE) && this.isJumping == false) {
                Engine_1.Engine.addCorutine(this.jump());
            }
            if (!Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_J) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_L) && (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_I) || Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_K))) {
                this.xAxis = 0;
            }
            if (!Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_I) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_K) && (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_J) || Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_L))) {
                this.yAxis = 0;
            }
            let vet = new Vector3_1.Vector3(this.xAxis, 0, this.yAxis);
            // this.origin.transform.forward = vet;
        }
        onTriggerEnter(other) {
            console.log("oncollitionEnter: " + other.origin.gameObjectName);
            let collectable = other.origin.getComponentTest(CollectableComponent_1.CollectableComponent);
            if (collectable != null) {
                console.log("Its collectable!");
                this.totalCollectables++;
                GameObject_1.GameObject.Destroy(other.origin);
                if (this.totalCollectables == 5) {
                    console.log("END of Game");
                    SceneManager_1.SceneManager.changeScene(this.finalSceneIndex);
                    Camera_1.Camera.instance.setPosition(new Vector3_1.Vector3(0, 0, -30));
                }
            }
        }
        onTrigger(other) {
            console.log("oncollition: " + other.origin.gameObjectName);
        }
        onCollisionExit(other) {
            console.log("oncollitionExit: " + other.origin.gameObjectName);
        }
        destroy() {
        }
        *jump() {
            this.isJumping = true;
            let collider = this.origin.getComponentTest(ColliderComponent_1.ColliderComponent);
            let initialPos = this.origin.transform.position;
            while (this.origin.transform.position.y < 5 + initialPos.y) {
                this.origin.transform.position = Vector3_1.Vector3.add(this.origin.transform.position, this.upVector);
                yield;
            }
        }
        *falling() {
            let collider = this.origin.getComponentTest(ColliderComponent_1.ColliderComponent);
            while (true) {
                if (collider.onCollition || this.origin.transform.position.y <= 0.5) {
                    this.isJumping = false;
                }
                else {
                    this.isJumping = true;
                }
                if (!(this.origin.transform.position.y <= 0.5)) {
                    this.origin.transform.position = Vector3_1.Vector3.add(this.origin.transform.position, this.downVector);
                }
                yield;
            }
        }
    }
    exports.ControllerComponent = ControllerComponent;
});
//# sourceMappingURL=ControllerComponent.js.map