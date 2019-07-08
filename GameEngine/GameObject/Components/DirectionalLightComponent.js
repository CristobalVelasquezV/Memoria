define(["require", "exports", "./IComponent", "../../Matrix-gl/Vector3"], function (require, exports, IComponent_1, Vector3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DirectionalLightComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
            this.directionLightColor = new Vector3_1.Vector3(0.9, 0.9, 0.9);
            DirectionalLightComponent.allLights.push(this);
        }
        set lightColor(color) {
            this.directionLightColor = color;
        }
        get lightColor() {
            return this.directionLightColor;
        }
        awake() {
        }
        start() {
        }
        update() {
        }
        destroy() {
        }
        static getFirstLight() {
            return this.allLights[0];
        }
    }
    DirectionalLightComponent.allLights = [];
    exports.DirectionalLightComponent = DirectionalLightComponent;
});
//# sourceMappingURL=DirectionalLightComponent.js.map