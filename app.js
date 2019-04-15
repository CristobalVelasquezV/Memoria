define(["require", "exports", "./GameEngine/Engine/Engine"], function (require, exports, Engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var engine;
    window.onload = function () {
        window.engine = new Engine_1.Engine();
        //engine = new Engine();
        window.engine.initialize();
    };
    /**refactor this in to event class */
    window.onresize = function () {
        window.engine.resize();
    };
});
//# sourceMappingURL=app.js.map