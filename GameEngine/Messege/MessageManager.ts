import { MessageSubscription } from "./MessageSubscription";
import { IMessageHandler } from "./IMessageHandler";
import { Message, MessagePriority } from "./Message";

export class MessageManager {
    private static subscriptions: { [code: string]: IMessageHandler[] } = {}
    private static messagePerUpdate: number = 10;
    private static normalMessageQueue: MessageSubscription[] = [];
    private static highMessageQueue: MessageSubscription[] = [];
    private constructor() { }


    public static addSubscription(code: string, handler: IMessageHandler) {
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


    public static removeSubscription(code: string, handler: IMessageHandler) {
        if (MessageManager.subscriptions[code] === undefined) {
            console.warn("Cant unsusbcribe handler from code : " + code + " The code is not subscribed to. ");
            return;
        }

        let index = MessageManager.subscriptions[code].lastIndexOf(handler);
        if (index !== -1) {
            MessageManager.subscriptions[code].splice(index, 1);
        }
    }


    public static post(message: Message): void {
        let handlers = MessageManager.subscriptions[message.code];
        if (handlers === undefined) {
            return;
        }

        for (let h of handlers) {

            switch (message.priority) {
                case MessagePriority.High:
                    h.onMessage(message);
                    break;
                case MessagePriority.Normal:
                    MessageManager.normalMessageQueue.push(new MessageSubscription(message, h));
                    break;


            }

        }
    }


    public static update(): void {
        if (MessageManager.normalMessageQueue.length === 0) {
            return;
        }

        let messageLimit: number = Math.min(MessageManager.normalMessageQueue.length, MessageManager.messagePerUpdate);

        for (let i = 0; i < messageLimit; i++) {
            let subscription: MessageSubscription | undefined = this.normalMessageQueue.pop();
            if (subscription === undefined) {
                return;
            }
            else {
                subscription.handler.onMessage(subscription.message);
            }
        }
    }

}