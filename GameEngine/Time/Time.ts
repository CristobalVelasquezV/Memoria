export class Time {
    private static frameCounter: number = 0;
    private static startTime: number;
    private static deltaTimer = 0;
    private static totalTimer = 0;

    private constructor() {

    }
    public static start(): void {
        this.startTime = Date.now();
    }

    public static get frameCount(): number {
        return Time.frameCounter;
    }

    public static get deltaTime(): number {
        return Time.deltaTimer;
    }

    public static get totalTime(): number {
        return Time.totalTimer;
    }

    public static thick() {
        Time.frameCounter++;
        let newTime: number = Date.now();
        let newDeltaTime: number = newTime - Time.startTime;
        Time.totalTimer += newDeltaTime;
        Time.startTime = newTime;
        Time.deltaTimer = newDeltaTime;
    }


}