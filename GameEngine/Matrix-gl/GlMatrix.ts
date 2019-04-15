export class GlMatrix {
    public static readonly EPSILON: number = 0.000001;
    public static readonly DEGREE: number = Math.PI / 180;

    public static toRadian(angle: number): number {
        return angle * GlMatrix.DEGREE
    }
}