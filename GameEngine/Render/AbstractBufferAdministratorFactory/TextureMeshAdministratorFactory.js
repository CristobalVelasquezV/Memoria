define(["require", "exports", "./AbstractBufferAdministratorFactory", "../AbstractBufferAdministrator/TextureMeshBufferAdmin"], function (require, exports, AbstractBufferAdministratorFactory_1, TextureMeshBufferAdmin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextureMeshAdministratorFactory extends AbstractBufferAdministratorFactory_1.AbstractBufferAdministratorFactory {
        constructor() {
            super();
        }
        static get instance() {
            if (TextureMeshAdministratorFactory.actualInstance === undefined) {
                TextureMeshAdministratorFactory.actualInstance = new TextureMeshAdministratorFactory();
            }
            return TextureMeshAdministratorFactory.actualInstance;
        }
        getBufferAdmin(renderComp) {
            return new TextureMeshBufferAdmin_1.TextureMeshBufferAdmin(renderComp);
        }
    }
    exports.TextureMeshAdministratorFactory = TextureMeshAdministratorFactory;
});
//# sourceMappingURL=TextureMeshAdministratorFactory.js.map