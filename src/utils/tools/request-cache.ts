import { isEqual } from "@src/utils/tools";
interface RequestPayload {
  url: string; // api 地址
  method: string; // get post put delete
  params?: any; // 参数 post请求
  lastTime: number;
  timeOut: number; // 缓存时间
}

// 有些地址根本无需cache
const ignoreUrls = ["/login", "/logout"];

export default class RequestUtils {
  public static cacheMap = new Map<RequestPayload, any>();

  public static addPayload(requestPayload: RequestPayload, promise) {
    if (ignoreUrls.includes(requestPayload.url)) return;

    RequestUtils.cacheMap.set(requestPayload, promise);

    const timeout = setTimeout(() => {
      RequestUtils.cacheMap.delete(requestPayload);
      clearTimeout(timeout);
    }, requestPayload.timeOut * 1000);
  }

  public static hasPayload(requestPayload: RequestPayload) {
    if (ignoreUrls.includes(requestPayload.url)) return [false, null];

    for (const [keyObj, value] of RequestUtils.cacheMap.entries()) {
      const [requestUrl, url] = [requestPayload.url, keyObj.url];
      const [requestMethod, method] = [requestPayload.method, keyObj.method];
      const [requestParams, params] = [requestPayload.params, keyObj.params];

      if (
        requestUrl === url &&
        requestMethod === method &&
        isEqual(requestParams, params)
      ) {
        return [true, value];
      }
    }
    return [false, null];
  }
}
