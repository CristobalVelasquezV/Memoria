define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MessageSubscription {
        constructor(message, handler) {
            this.message = message;
            this.handler = handler;
        }
    }
    exports.MessageSubscription = MessageSubscription;
});
//# sourceMappingURL=MessageSubscription.js.map