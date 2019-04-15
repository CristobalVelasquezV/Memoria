define(["require", "exports", "./MessageSubscription", "./Message"], function (require, exports, MessageSubscription_1, Message_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MessageManager {
        constructor() { }
        static addSubscription(code, handler) {
            if (MessageManager.subscriptions[code] === undefined) {
                MessageManager.subscriptions[code] = [];
            }
            if (MessageManager.subscriptions[code].lastIndexOf(handler) !== -1) {
                console.warn("Attempting to add duplicate handler to code : " + code);
            }
            else {
                MessageManager.subscriptions[code].push(handler);
            }
        }
        static removeSubscription(code, handler) {
            if (MessageManager.subscriptions[code] === undefined) {
                console.warn("Cant unsusbcribe handler from code : " + code + " The code is not subscribed to. ");
                return;
            }
            let index = MessageManager.subscriptions[code].lastIndexOf(handler);
            if (index !== -1) {
                MessageManager.subscriptions[code].splice(index, 1);
            }
        }
        static post(message) {
            let handlers = MessageManager.subscriptions[message.code];
            if (handlers === undefined) {
                return;
            }
            for (let h of handlers) {
                switch (message.priority) {
                    case Message_1.MessagePriority.High:
                        h.onMessage(message);
                        break;
                    case Message_1.MessagePriority.Normal:
                        MessageManager.normalMessageQueue.push(new MessageSubscription_1.MessageSubscription(message, h));
                        break;
                }
            }
        }
        static update() {
            if (MessageManager.normalMessageQueue.length === 0) {
                return;
            }
            let messageLimit = Math.min(MessageManager.normalMessageQueue.length, MessageManager.messagePerUpdate);
            for (let i = 0; i < messageLimit; i++) {
                let subscription = this.normalMessageQueue.pop();
                if (subscription === undefined) {
                    return;
                }
                else {
                    subscription.handler.onMessage(subscription.message);
                }
            }
        }
    }
    MessageManager.subscriptions = {};
    MessageManager.messagePerUpdate = 10;
    MessageManager.normalMessageQueue = [];
    MessageManager.highMessageQueue = [];
    exports.MessageManager = MessageManager;
});
//# sourceMappingURL=MessageManager.js.map