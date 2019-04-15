define(["require", "exports", "./AbstractBufferAdministratorFactory", "../AbstractBufferAdministrator/ShaderLineBufferAdmin"], function (require, exports, AbstractBufferAdministratorFactory_1, ShaderLineBufferAdmin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShaderLineAdminFactory extends AbstractBufferAdministratorFactory_1.AbstractBufferAdministratorFactory {
        constructor() {
            super();
        }
        static get instance() {
            if (ShaderLineAdminFactory.actualInstance === undefined) {
                ShaderLineAdminFactory.actualInstance = new ShaderLineAdminFactory();
            }
            return ShaderLineAdminFactory.actualInstance;
        }
        getBufferAdmin(renderComp) {
            return new ShaderLineBufferAdmin_1.ShaderLineBufferAdmin(renderComp);
        }
    }
    exports.ShaderLineAdminFactory = ShaderLineAdminFactory;
});
//# sourceMappingURL=ShaderLineAdminFactory.js.map