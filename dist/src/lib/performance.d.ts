export declare enum NavigationType {
    navigate = 0,
    reload = 1,
    forward = 2,
    reserved = 255
}
export interface IPerformanceInfo<T = number> {
    dnsLkTime: T;
    tcpConTime: T;
    reqTime: T;
    domParseTime: T;
    domReadyTime: T;
    loadTime: T;
    fpTime: T;
    fcpTime: T;
    navigationType: string;
}
export declare class PerformanceObserver {
    private performance;
    private timingInfo;
    constructor();
    private isDataExist;
    /**
     * 异步检测performance数据是否完备
     */
    private check;
    private getPerformanceData;
    init(): void;
}
