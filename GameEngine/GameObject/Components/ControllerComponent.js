define(["require", "exports", "./IComponent", "../../Input/Input", "../../Matrix-gl/Vector3", "./CollectableComponent", "../../Engine/Engine"], function (require, exports, IComponent_1, Input_1, Vector3_1, CollectableComponent_1, Engine_1) {
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
            this.isJumping = false;
        }
        awake() {
        }
        start() {
        }
        update() {
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_J)) {
                this.origin.transform.position.addVector(new Vector3_1.Vector3(0.1, 0, 0));
                this.xAxis = 1;
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_L)) {
                this.origin.transform.position.addVector(new Vector3_1.Vector3(-0.1, 0, 0));
                this.xAxis = -1;
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_I)) {
                this.yAxis = 1;
                this.origin.transform.position.addVector(new Vector3_1.Vector3(0, 0, 0.1));
            }
            if (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_K)) {
                this.yAxis = 1;
                this.origin.transform.position.addVector(new Vector3_1.Vector3(0, 0, -0.1));
            }
            if (Input_1.Input.isKeyDown(Input_1.KeyCode.SPACE) && this.isJumping == false) {
                console.log("add jump corutine");
                Engine_1.Engine.addCorutine(this.Gen());
            }
            if (!Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_J) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_L) && (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_I) || Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_K))) {
                this.xAxis = 0;
            }
            if (!Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_I) && !Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_K) && (Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_J) || Input_1.Input.isKeyPressed(Input_1.KeyCode.KEY_L))) {
                this.yAxis = 90;
            }
            let vet = new Vector3_1.Vector3(this.xAxis, 0, this.yAxis);
            this.origin.transform.forward = vet;
        }
        onCollisionEnter(other) {
            console.log("oncollitionEnter: " + other.origin.gameObjectName);
            let collectable = other.origin.getComponentTest(CollectableComponent_1.CollectableComponent);
            if (collectable != null) {
                console.log("Its collectable!");
                this.totalCollectables++;
            }
        }
        onCollision(other) {
            //console.log("oncollition: "+other.origin.gameObjectName);
        }
        onCollisionExit(other) {
            //console.log("oncollitionExit: " + other.origin.gameObjectName);
        }
        destroy() {
        }
        *Gen() {
            this.isJumping = true;
            console.log("in jumping corutine");
            while (this.origin.transform.position.y < 5) {
                this.origin.transform.position.addVector(new Vector3_1.Vector3(0, 0.05, 0));
                yield;
            }
            while (this.origin.transform.position.y > 0) {
                this.origin.transform.position.addVector(new Vector3_1.Vector3(0, -0.01, 0));
                yield;
            }
            this.isJumping = false;
        }
    }
    exports.ControllerComponent = ControllerComponent;
});
//# sourceMappingURL=ControllerComponent.js.map