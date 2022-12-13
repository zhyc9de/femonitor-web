export interface IDeviceInfo {
    isMobile: boolean;
    isAndroid: boolean;
    browser: string | undefined;
    userAgent: string;
    screenW: number;
    screenH: number;
    dpr: number;
}
export declare function getDeviceInfo(): IDeviceInfo;
