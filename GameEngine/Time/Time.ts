/**
 * Static Time Class manages the time that passes, totaltime,delta time (time between frames)
 * @returns
 */
export class Time {
    private static frameCounter: number = 0;
    private static startTime: number;
    private static deltaTimer: number = 0;
    private static totalTimer: number = 0;
    private static fixedTime: number = 0;


    public static pastFixedTime(): boolean {
        if (this.fixedTime > 30) {
            this.fixedTime = 0;
            return true;
        }
        return false;
    }

    private constructor() {

    }
    /**
     * Starts the time counting.
     */

    public static start(): void {
        this.startTime = Date.now();
    }
    /**
     * Number of frames pased since start.
     * @returns
     */
    public static get frameCount(): number {
        return Time.frameCounter;
    }
    /**
     * Time between last frame and actual frame.
     * @returns
     */
    public static get deltaTime(): number {
        return Time.deltaTimer;
    }
    /**
     * Total time since the start of the game.
     * @returns
     */
    public static get totalTime(): number {
        return Time.totalTimer;
    }
    /**
     * Updates the time variables, delta time and total time.
     */
    public static thick() {
        Time.frameCounter++;
        let newTime: number = Date.now();
        let newDeltaTime: number = newTime - Time.startTime;
        Time.totalTimer += newDeltaTime;
        Time.fixedTime += newDeltaTime;
        Time.startTime = newTime;
        Time.deltaTimer = newDeltaTime;
    }


}