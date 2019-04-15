define(["require", "exports", "./AbstractBufferAdministratorFactory", "../AbstractBufferAdministrator/BasicNoTextureBufferAdmin"], function (require, exports, AbstractBufferAdministratorFactory_1, BasicNoTextureBufferAdmin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BasicNoTextureMeshAdminFactory extends AbstractBufferAdministratorFactory_1.AbstractBufferAdministratorFactory {
        constructor() {
            super();
        }
        static get instance() {
            if (BasicNoTextureMeshAdminFactory.actualInstance === undefined) {
                BasicNoTextureMeshAdminFactory.actualInstance = new BasicNoTextureMeshAdminFactory();
            }
            return BasicNoTextureMeshAdminFactory.actualInstance;
        }
        getBufferAdmin(renderComp) {
            return new BasicNoTextureBufferAdmin_1.BasicNoTextureBufferAdmin(renderComp);
        }
    }
    exports.BasicNoTextureMeshAdminFactory = BasicNoTextureMeshAdminFactory;
});
//# sourceMappingURL=BasicNoTextureMeshAdminFactory.js.map