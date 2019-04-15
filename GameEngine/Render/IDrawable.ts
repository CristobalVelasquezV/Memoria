import { GlBuffer } from "./gl/GLBuffer";

export interface IDrawable {
    buffer: GlBuffer;
    draw(): void;
}