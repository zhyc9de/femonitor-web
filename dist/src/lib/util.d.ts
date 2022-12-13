export declare function isObject(input: any): boolean;
export declare function getPageUrl(): string;
export declare function getNetworkType(): string;
export declare function randomString(len?: number): string;
export declare function getUvLabel(): string;
export declare function getUserSessionLabel(): {
    label: string;
    isFristIn: boolean;
};
export declare function getLocaleLanguage(): string;
export declare function replaceSlash(url: string): string;
export declare function convertObjToUrlencoded(obj: {
    [key: string]: any;
}): string;
