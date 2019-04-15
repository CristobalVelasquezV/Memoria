import { Message } from "./Message";
import { IMessageHandler } from "./IMessageHandler";

export class MessageSubscription {
    public message: Message;
    public handler: IMessageHandler;

    constructor(message: Message, handler: IMessageHandler) {
        this.message = message;
        this.handler = handler;

    }
}