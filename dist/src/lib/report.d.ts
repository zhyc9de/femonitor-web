import { ITrackerOptions } from "./monitor";
import { ErrorCombine } from "./monitor";
export type ErrorList = Array<ErrorCombine>;
export interface IReportParams {
    errorList: ErrorList;
}
export type ReportData = string | FormData;
export declare class Reporter {
    private _options;
    constructor(options: ITrackerOptions);
    private _isMatchMethod;
    private getPureReportData;
    doReport(reportData: ReportData): void;
    reportError(error: ErrorCombine): void;
    reportErrors(errorList: ErrorList): void;
}
