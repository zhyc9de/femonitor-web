import { VueConstructor } from "vue";
import { ErrorObserver } from "./errorObserver";
import { ISimpleVueError, IVueError } from "./vueErrorObserver";
import { AjaxInterceptor } from "./ajaxInterceptor";
import { FetchInterceptor } from "./fetchInterceptor";
import { PerformanceObserver } from "./performance";
import { BehaviorCombine, BehaviorObserver } from "./behaviorObserver";
import { Reporter } from "./report";
import { IHttpReqErrorRes } from "../types";
import { SpaHandler } from "./spaHandler";
import { eventWithTime } from "rrweb/typings/types";
import { IError, IUnHandleRejectionError } from "./baseErrorObserver";
export type ErrorCombine = IError | ISimpleVueError | IVueError | IUnHandleRejectionError | IHttpReqErrorRes;
export declare enum Env {
    Dev = "dev",
    Sandbox = "sandbox",
    Production = "production"
}
export interface IErrorOptions {
    watch: boolean;
    random: number;
    repeat: number;
    delay: number;
}
export type URLItem = string | RegExp;
export interface IHttpOptions {
    fetch: boolean;
    ajax: boolean;
    ignoreRules: URLItem[];
}
export declare enum ConsoleType {
    log = "log",
    error = "error",
    warn = "warn",
    info = "info",
    debug = "debug"
}
export interface IBehaviorOption {
    watch: boolean;
    console: ConsoleType[];
    click: boolean;
    queueLimit: number;
}
export interface IRrwebOption {
    watch: boolean;
    queueLimit: number;
    delay: number;
}
export interface IHookBeforeSend {
    (data: ErrorCombine, eventName: ErrorCombine["errorType"]): ErrorCombine;
}
export interface ReportOptions {
    url: string;
    method: string;
    contentType: string;
    beforeSend: IHookBeforeSend;
}
export interface ITrackerOptions {
    env: Env;
    error: IErrorOptions;
    http: IHttpOptions;
    data: IData;
    report: ReportOptions;
    performance: boolean;
    isSpa: boolean;
    behavior: IBehaviorOption;
    rrweb: IRrwebOption;
}
export type ITrackerOptionsKey = keyof ITrackerOptions;
export type Value = number | string | boolean | undefined;
export interface IConfigDataOptions {
    [key: string]: Value;
}
export type PlainObject = Record<string | number | symbol, unknown>;
export type IData = Record<string | number | symbol, unknown>;
export declare const defaultTrackerOptions: {
    env: Env;
    report: {
        url: string;
        method: string;
        contentType: string;
        beforeSend: (data: ErrorCombine) => ErrorCombine;
    };
    data: {};
    error: {
        watch: boolean;
        random: number;
        repeat: number;
        delay: number;
    };
    performance: boolean;
    http: {
        fetch: boolean;
        ajax: boolean;
        ignoreRules: never[];
    };
    behavior: {
        watch: boolean;
        console: ConsoleType[];
        click: boolean;
        queueLimit: number;
    };
    /**
     * rrweb use mutation observer api, for compatibility see:
     * https://caniuse.com/mutationobserver
     */
    rrweb: {
        watch: boolean;
        queueLimit: number;
        delay: number;
    };
    isSpa: boolean;
};
export type EventName = string | symbol;
export declare class Monitor {
    static instance: Monitor;
    errObserver: ErrorObserver;
    ajaxInterceptor: AjaxInterceptor;
    fetchInterceptor: FetchInterceptor;
    performanceObserver: PerformanceObserver;
    spaHandler: SpaHandler;
    behaviorObserver: BehaviorObserver;
    reporter: Reporter;
    sdkVersion: string;
    errorQueue: ErrorCombine[];
    behaviorQueue: BehaviorCombine[];
    rrwebQueue: eventWithTime[];
    private readonly defaultOptions;
    $data: IData;
    $options: ITrackerOptions;
    private errorQueueTimer;
    constructor(options: Partial<ITrackerOptions> | undefined);
    /**
     * 初始化tracker实例，单例
     * @param options ITrackerOptions
     */
    static init(options?: Partial<ITrackerOptions> | undefined): Monitor;
    /**
     * 获取设备信息
     */
    getDeviceInfo(): void;
    getNetworkType(): void;
    getLocaleLanguage(): void;
    getUserAgent(): void;
    /**
     * 初始化配置项
     */
    private initOptions;
    private initGlobalData;
    /**
     * Inject instances and init
     */
    initInstances(): void;
    private listenMouseTrack;
    private listenBehaviors;
    private listenPerformanceInfo;
    private pushBehavior;
    /**
     * 设置全局数据
     */
    configData(key: string, value: unknown, deepmerge?: boolean): Monitor;
    configData(options: PlainObject, deepmerge?: boolean): Monitor;
    changeOptions(key: keyof ITrackerOptions, value: ITrackerOptions[keyof ITrackerOptions]): void;
    private handleErrorReport;
    private initEventListeners;
    private _on;
    on(event: EventName | Array<EventName>, listener: (...args: any[]) => void): Monitor;
    once(event: EventName, listener: (...args: any[]) => void): Monitor;
    off(event: EventName, listener: (...args: any[]) => void): Monitor;
    removeAllListeners(event?: EventName | undefined): Monitor;
    emit(event: EventName, ...args: any[]): boolean;
    useVueErrorListener(Vue: VueConstructor): void;
}
