/// <reference types="node" />
import { EventEmitter } from "events";
export declare class MyEmitter extends EventEmitter {
    private globalData;
    constructor();
    customEmit(event: string | symbol, ...args: any[]): boolean;
    emitWithGlobalData(event: string | symbol, ...args: any[]): boolean;
    private decorateData;
    init(): void;
}
export declare const myEmitter: MyEmitter;
