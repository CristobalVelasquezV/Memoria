define(["require", "exports", "../Scenes/SceneManager"], function (require, exports, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Physics {
        static fixedUpdate() {
            Physics.collitionCalculation();
        }
        static collitionCalculation() {
            let colliders = SceneManager_1.SceneManager.actualScene.getDictColliders();
            for (let i in colliders) {
                for (let j in colliders) {
                    if (i != j) {
                        if (colliders[i].collide(colliders[j])) {
                            let comp1 = colliders[i].origin.getComponents();
                            let comp2 = colliders[j].origin.getComponents();
                            if (!colliders[i].inCollitionWith(colliders[j])) {
                                for (let k = 0; k < comp1.length; k++) {
                                    if (comp1[k] !== null && comp1[k] !== undefined) {
                                        comp1[k].onCollisionEnter(colliders[j]);
                                    }
                                }
                                for (let l = 0; l < comp2.length; l++) {
                                    if (comp2[l] !== null && comp2[l] !== undefined) {
                                        comp2[l].onCollisionEnter(colliders[i]);
                                    }
                                }
                                colliders[i].addCollition(colliders[j]);
                                colliders[j].addCollition(colliders[i]);
                                colliders[i].onCollition = true;
                                colliders[j].onCollition = true;
                            }
                            else {
                                for (let k = 0; k < comp1.length; k++) {
                                    if (comp1[k] !== null && comp1[k] !== undefined) {
                                        comp1[k].onCollision(colliders[j]);
                                    }
                                }
                                for (let l = 0; l < comp2.length; l++) {
                                    if (comp2[l] !== null && comp2[l] !== undefined) {
                                        comp2[l].onCollision(colliders[i]);
                                    }
                                }
                            }
                        }
                        else if ((colliders[i].inCollitionWith(colliders[j]) || colliders[j].inCollitionWith(colliders[i])) && !colliders[i].collide(colliders[j])) {
                            let comp1 = colliders[i].origin.getComponents();
                            let comp2 = colliders[j].origin.getComponents();
                            colliders[i].deleteCollition(colliders[j]);
                            colliders[j].deleteCollition(colliders[i]);
                            if (colliders[i].numberCollitions() == 0) {
                                colliders[i].onCollition = false;
                            }
                            if (colliders[j].numberCollitions() == 0) {
                                colliders[j].onCollition = false;
                            }
                            for (let k = 0; k < comp1.length; k++) {
                                if (comp1[k] !== null && comp1[k] !== undefined) {
                                    comp1[k].onCollisionExit(colliders[i]);
                                }
                            }
                            for (let l = 0; l < comp2.length; l++) {
                                if (comp2[l] !== null && comp2[l] !== undefined) {
                                    comp2[l].onCollisionExit(colliders[j]);
                                }
                            }
                        }
                    }
                }
            }
        }
        constructor() {
        }
    }
    exports.Physics = Physics;
});
//# sourceMappingURL=Physics.js.map