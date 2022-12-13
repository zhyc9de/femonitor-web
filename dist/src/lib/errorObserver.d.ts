import { ITrackerOptions } from "./monitor";
import { BaseObserver } from "./baseErrorObserver";
export declare class ErrorObserver extends BaseObserver {
    constructor(options: ITrackerOptions);
    init(): void;
}
