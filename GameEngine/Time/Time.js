define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Static Time Class manages the time that passes, totaltime,delta time (time between frames)
     * @returns
     */
    class Time {
        constructor() {
        }
        static pastFixedTime() {
            if (this.fixedTime > 30) {
                this.fixedTime = 0;
                return true;
            }
            return false;
        }
        /**
         * Starts the time counting.
         */
        static start() {
            this.startTime = Date.now();
        }
        /**
         * Number of frames pased since start.
         * @returns
         */
        static get frameCount() {
            return Time.frameCounter;
        }
        /**
         * Time between last frame and actual frame.
         * @returns
         */
        static get deltaTime() {
            return Time.deltaTimer;
        }
        /**
         * Total time since the start of the game.
         * @returns
         */
        static get totalTime() {
            return Time.totalTimer;
        }
        /**
         * Updates the time variables, delta time and total time.
         */
        static thick() {
            Time.frameCounter++;
            let newTime = Date.now();
            let newDeltaTime = newTime - Time.startTime;
            Time.totalTimer += newDeltaTime;
            Time.fixedTime += newDeltaTime;
            Time.startTime = newTime;
            Time.deltaTimer = newDeltaTime;
        }
    }
    Time.frameCounter = 0;
    Time.deltaTimer = 0;
    Time.totalTimer = 0;
    Time.fixedTime = 0;
    exports.Time = Time;
});
//# sourceMappingURL=Time.js.map