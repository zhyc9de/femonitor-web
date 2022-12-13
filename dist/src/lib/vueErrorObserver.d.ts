import { VueConstructor } from "vue";
import { BaseError } from "../types/index";
import { ITrackerOptions } from "./monitor";
import { BaseObserver } from "./baseErrorObserver";
export interface IVueError extends BaseError {
    info: string | undefined;
    propsData: any;
    componentName: string | undefined;
    msg: string;
    stackTrace: string;
    componentNameTrace: string[];
}
export interface ISimpleVueError extends BaseError {
    msg: string;
    stackTrace: string;
}
export declare class VueErrorObserver extends BaseObserver {
    constructor(Vue: VueConstructor, options: ITrackerOptions);
    init(Vue: VueConstructor): void;
    getComponentNameTrace(vm: any): string[];
    formatComponentName(vm: any): string;
}
