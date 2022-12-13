import { ITrackerOptions } from "./monitor";
import { BaseObserver } from "./baseErrorObserver";
export interface IAjaxReqStartRes {
    context: any;
}
export declare class AjaxInterceptor extends BaseObserver {
    constructor(options: ITrackerOptions);
    init(): void;
}
