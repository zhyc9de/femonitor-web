import { ConsoleType, ITrackerOptions } from "./monitor";
export type BehaviorCombine = IConsoleBehavior | IClickBehavior;
export interface IConsoleBehavior {
    type: "console";
    level: ConsoleType;
    msg: string;
}
export interface IClickBehavior {
    type: "click";
    classPath: string;
    text: string;
    screenX: number;
    screenY: number;
}
export declare class BehaviorObserver {
    private _options;
    private _isConsoleTrack;
    constructor(options: ITrackerOptions);
    init(): void;
    private handleConsoleSwitch;
    private hackConsole;
    private _globalClickHandler;
    private normalTarget;
    /**
     * Get element path for maxDeepLen at most
     */
    private getElePath;
    private getXPathFromElement;
    listenClickEvent(): void;
}
