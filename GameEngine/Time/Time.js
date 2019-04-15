define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Time {
        constructor() {
        }
        static start() {
            this.startTime = Date.now();
        }
        static get frameCount() {
            return Time.frameCounter;
        }
        static get deltaTime() {
            return Time.deltaTimer;
        }
        static get totalTime() {
            return Time.totalTimer;
        }
        static thick() {
            Time.frameCounter++;
            let newTime = Date.now();
            let newDeltaTime = newTime - Time.startTime;
            Time.totalTimer += newDeltaTime;
            Time.startTime = newTime;
            Time.deltaTimer = newDeltaTime;
        }
    }
    Time.frameCounter = 0;
    Time.deltaTimer = 0;
    Time.totalTimer = 0;
    exports.Time = Time;
});
//# sourceMappingURL=Time.js.map