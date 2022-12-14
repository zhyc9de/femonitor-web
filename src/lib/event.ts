import { EventEmitter } from "events";
import { TrackerEvents } from "../types";
import { isObject, getPageUrl, getUvLabel, getUserSessionLabel } from "./util";

export class MyEmitter extends EventEmitter {
  private globalData: any;

  constructor() {
    super();
    this.init();
  }

  public customEmit(event: string | symbol, ...args: any[]): boolean {
    const [data, ...rest] = args;

    if (!isObject(data)) {
      return super.emit(event, ...args);
    }

    if (typeof data.beforeEmit === "function") {
      const global = data.beforeEmit.call(this, data);
      Object.assign(data, global);
      Reflect.deleteProperty(data, "beforeEmit");
    }

    super.emit(TrackerEvents.event, event, data, ...rest);
    return super.emit(event, data, ...rest);
  }

  // Emit an event with decorated data
  public emitWithGlobalData(event: string | symbol, ...args: any[]): boolean {
    const [data, ...rest] = args;
    return this.customEmit(
      event,
      {
        dataset: data, // 将数据放到dataset
        beforeEmit: (dataset: any) => {
          return this.decorateData(dataset);
        },
      },
      ...rest
    );
  }

  private decorateData(dataset: any) {
    const data: any = {
      time: Date.now(),
      globalData: this.globalData,
    };
    if (!data.title) {
      data.title = document.title;
    }

    if (!data.url) {
      data.url = getPageUrl();
    }

    if (!data.preUrl) {
      data.preUrl =
        document.referrer && document.referrer !== location.href
          ? document.referrer
          : "";
    }

    if (!data.uvLabel) {
      data.uvLabel = getUvLabel();
    }

    if (!data.userLabel) {
      data.userLabel = getUserSessionLabel();
    }

    return data;
  }

  init() {
    this.globalData = {};
    this.on(TrackerEvents._globalDataChange, (globalData) => {
      this.globalData = globalData;
    });
  }
}

export const myEmitter = new MyEmitter();
