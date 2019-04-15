define(["require", "exports", "./MessageManager"], function (require, exports, MessageManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessagePriority;
    (function (MessagePriority) {
        MessagePriority[MessagePriority["Normal"] = 0] = "Normal";
        MessagePriority[MessagePriority["High"] = 1] = "High";
    })(MessagePriority = exports.MessagePriority || (exports.MessagePriority = {}));
    class Message {
        constructor(code, sender, context, priority = MessagePriority.Normal) {
            this.code = code;
            this.context = context;
            this.sender = sender;
            this.priority = priority;
        }
        static send(code, sender, context) {
            MessageManager_1.MessageManager.post(new Message(code, sender, context));
        }
        static sendPriority(code, sender, context) {
            MessageManager_1.MessageManager.post(new Message(code, sender, context, MessagePriority.High));
        }
        static subscribe(code, handler) {
            MessageManager_1.MessageManager.addSubscription(code, handler);
        }
        static unsubscribe(code, handler) {
            MessageManager_1.MessageManager.removeSubscription(code, handler);
        }
    }
    Message.MESSAGE_ASSET_LOADED = ' MESSAGE_ASSET_LOADED::';
    exports.Message = Message;
});
//# sourceMappingURL=Message.js.map