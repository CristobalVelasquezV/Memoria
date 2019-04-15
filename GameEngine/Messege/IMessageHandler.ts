﻿import { Message } from "./Message";

export interface IMessageHandler {
    onMessage(message: Message): void;

    onSyncLoad(data: any): void;
}
