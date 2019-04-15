import { Engine } from "./GameEngine/Engine/Engine";
var engine: Engine;
declare let window: any;

window.onload = function () {
    window.engine = new Engine(); 
    //engine = new Engine();
    window.engine.initialize();
}

/**refactor this in to event class */
window.onresize = function () {
    window.engine.resize();
}