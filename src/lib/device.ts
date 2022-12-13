import UA from "ua-parser-js";

export interface IDeviceInfo {
  isMobile: boolean;
  isAndroid: boolean;
  browser: string | undefined;
  userAgent: string;
  screenW: number;
  screenH: number;
  dpr: number;
}

// 更换ua-parser-js，支持自定义参数
const myBrowser = [
  [/(xiaomiquan)\/([\w.]+)/i],
  [/(micromessenger)\/([\w.]+)/i],
];

export function getDeviceInfo(): IDeviceInfo {
  const md = new UA({ browser: myBrowser });

  return {
    isMobile: md.getDevice().type === "mobile",
    isAndroid: md.getOS().name === "android",
    browser: md.getBrowser().name,
    userAgent: navigator.userAgent,
    dpr: window.devicePixelRatio,
    screenW: document.documentElement.clientWidth || document.body.clientWidth,
    screenH:
      document.documentElement.clientHeight || document.body.clientHeight,
  };
}
