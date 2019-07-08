import { IComponent } from "./IComponent";
import { GameObject } from "../GameObject";
import { Vector3 } from "../../Matrix-gl/Vector3";
import { Mat4 } from "../../Matrix-gl/Mat4";
import { GlMatrix } from "../../Matrix-gl/GlMatrix";
import { Render } from "../../Render/Render";

export class CameraComponent extends IComponent {

    private mProj: Mat4 = Mat4.projection(GlMatrix.toRadian(45), Render.sceneCanvasWidth / Render.sceneCanvasHeight, 0.1, 1000);
    private cameraId: number;


    private static cameraIdGenerator = 0;
    public static mainCamera: CameraComponent;
    public static allCameras: CameraComponent[]=[];

    constructor(go: GameObject) {
        super(go);
        this.cameraId = CameraComponent.cameraIdGenerator;
        if (CameraComponent.cameraIdGenerator == 0) {
            CameraComponent.mainCamera = this;
        }
        CameraComponent.cameraIdGenerator++;
        CameraComponent.allCameras.push(this);
    }

    public getProjectionMatrix(): Mat4 {
        return this.mProj;
    }

    public getViewMatrix(): Mat4 {
        let lookAt: Vector3 = Vector3.add(this.origin.transform.position, this.origin.transform.forward);
        return Mat4.lookAt(this.origin.transform.position, lookAt, this.origin.transform.up);
    }

    awake(): void {
        
    }
    start(): void {
        
    }
    update(): void {
        
    }
    destroy(): void {
        CameraComponent.cameraIdGenerator--;
    }


}
