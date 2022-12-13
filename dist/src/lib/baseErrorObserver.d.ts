import { ITrackerOptions } from "./monitor";
import { BaseError } from "../types/index";
export interface IError extends BaseError {
    msg: string | Event;
    line: number | undefined;
    column: number | undefined;
    stackTrace: string;
}
export interface IUnHandleRejectionError extends BaseError {
    msg: string;
}
export interface ICacheError {
    [errorMsg: string]: number;
}
export declare class BaseObserver {
    _options: ITrackerOptions;
    private _cacheError;
    constructor(options: ITrackerOptions);
    /**
     * Emit same error not more than repeated times, to prevent dead cycle
     */
    safeEmitError(cacheKey: string, errorType: string, errorObj: IError | BaseError | IUnHandleRejectionError): void;
    /**
     * Check if request url match ignored rules
     */
    isUrlInIgnoreList(url: string): boolean;
}
