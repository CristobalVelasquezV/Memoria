define(["require", "exports", "./IComponent", "../../Time/Time", "../../Engine/Engine", "../../Scenes/SceneManager", "../../Matrix-gl/Vector3"], function (require, exports, IComponent_1, Time_1, Engine_1, SceneManager_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TestComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
            this.finalposition = new Vector3_1.Vector3(10, 10, 10);
        }
        awake() {
            this.cube = SceneManager_1.SceneManager.actualScene.getGameObject("cube");
        }
        start() {
            let g = this.Gen();
            console.log("add corutine");
            Engine_1.Engine.addCorutine(g);
        }
        update() {
        }
        destroy() {
            throw new Error("Method not implemented.");
        }
        *Gen() {
            let t = 10000;
            let totalTime = 0;
            while (totalTime < t) {
                this.origin.transform.position.addVector(new Vector3_1.Vector3(0.01, 0.01, 0.01));
                this.origin.transform.rotateY(0.01);
                totalTime += Time_1.Time.deltaTime;
                yield;
            }
            console.log("termino corrutina");
        }
    }
    exports.TestComponent = TestComponent;
});
//# sourceMappingURL=TestComponent.js.map