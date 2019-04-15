define(["require", "exports", "./IComponent", "../../Time/Time", "../../Engine/Engine"], function (require, exports, IComponent_1, Time_1, Engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TestComponent extends IComponent_1.IComponent {
        constructor(go) {
            super(go);
            go.addComponent(this);
        }
        awake() {
            throw new Error("Method not implemented.");
        }
        start() {
            let g = Gen();
            console.log("add corutine");
            Engine_1.Engine.addCorutine(g);
        }
        update() {
            throw new Error("Method not implemented.");
        }
        destroy() {
            throw new Error("Method not implemented.");
        }
        *generation() {
            let t = 5;
            let totalTime = 0;
            while (totalTime < t) {
                console.log("en la corutina");
                totalTime += Time_1.Time.deltaTime;
                yield totalTime;
            }
            console.log("termino corrutina");
        }
    }
    exports.TestComponent = TestComponent;
    function* Gen() {
        let t = 10000;
        let totalTime = 0;
        while (totalTime < t) {
            totalTime += Time_1.Time.deltaTime;
            //console.log("en la corutina");
            yield;
        }
        // console.log("termino corrutina");
    }
});
//# sourceMappingURL=TestComponent.js.map