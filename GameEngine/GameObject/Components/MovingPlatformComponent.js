define(["require", "exports", "./IComponent", "../../Matrix-gl/Vector3", "../../Time/Time", "../../Engine/Engine"], function (require, exports, IComponent_1, Vector3_1, Time_1, Engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MovingPlatformComponent extends IComponent_1.IComponent {
        constructor(go, moving) {
            super(go);
            this.initialPosition = this.origin.transform.position;
            this.movingTo = moving;
        }
        awake() {
        }
        start() {
            Engine_1.Engine.addCorutine(this.moving());
        }
        update() {
        }
        destroy() {
        }
        *moving() {
            let timeToComplete = 5000;
            let totalTime = 0;
            let t = 0;
            while (true) {
                t = 0;
                totalTime = 0;
                while (t <= 1) {
                    this.origin.transform.position = Vector3_1.Vector3.lerp(this.initialPosition, this.movingTo, t);
                    totalTime += Time_1.Time.deltaTime;
                    t = totalTime / timeToComplete;
                    yield;
                }
                t = 0;
                totalTime = 0;
                while (t <= 1) {
                    this.origin.transform.position = Vector3_1.Vector3.lerp(this.movingTo, this.initialPosition, t);
                    totalTime += Time_1.Time.deltaTime;
                    t = totalTime / timeToComplete;
                    yield;
                }
                yield;
            }
        }
    }
    exports.MovingPlatformComponent = MovingPlatformComponent;
});
//# sourceMappingURL=MovingPlatformComponent.js.map