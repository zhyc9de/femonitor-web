import { ITrackerOptions } from "./monitor";
import { BaseObserver } from "./baseErrorObserver";
export interface IFetchReqStartRes {
    url: string;
    options: any;
    context?: any;
}
export declare class FetchInterceptor extends BaseObserver {
    _options: ITrackerOptions;
    constructor(options: ITrackerOptions);
    init(): void;
}
