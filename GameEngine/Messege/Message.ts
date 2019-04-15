import { MessageManager } from "./MessageManager";
import { IMessageHandler } from "./IMessageHandler";
export enum MessagePriority { Normal, High }

export class Message {

    public static readonly MESSAGE_ASSET_LOADED = ' MESSAGE_ASSET_LOADED::';

    public code: string;
    public context: any;
    public sender: any;
    public priority: MessagePriority;

    constructor(code: string, sender: any, context?: any, priority: MessagePriority = MessagePriority.Normal) {
        this.code = code;
        this.context = context;
        this.sender = sender;
        this.priority = priority;
    }

    public static send(code: string, sender: any, context?: any): void {
        MessageManager.post(new Message(code, sender, context));
    }

    public static sendPriority(code: string, sender: any, context?: any): void {
        MessageManager.post(new Message(code, sender, context, MessagePriority.High));
    }

    public static subscribe(code: string, handler: IMessageHandler): void {
        MessageManager.addSubscription(code, handler);
    }

    public static unsubscribe(code: string, handler: IMessageHandler): void {
        MessageManager.removeSubscription(code, handler);
    }
}
