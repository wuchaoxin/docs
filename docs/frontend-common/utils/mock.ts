/* eslint-disable @typescript-eslint/ban-types */
/**
 * @description 与 mock 相关
 */

import { SUCCESS_CODE } from "./types/const/request";
import { Options, Params } from "./types/typings/mock";
import { getURLAndParams } from "./url";

// #region isMock
/**
 * @description 是否处于 mock 环境
 * @returns {boolean}
 */
export function isMock(): boolean {
  if (process.env.SELF_CONFIG?.mock) {
    return true;
  } else {
    return false;
  }
}
// #endregion isMock

// #region handleMock
/**
 * @description 进行 mock 数据（注意：使用 mock.js 后会重写 XMLHTTPRequest，使得依赖此对象的相关内容变得异常）
 * @param {Function} fn 请求方法
 * @param {AnyObject | Function} data 返回的数据
 * @returns {void}
 */
// #endregion handleMock
export function handleMock<T = Record<string, unknown>>(
  fn: Function,
  data: T | ((params: Params) => AnyObject)
): void {
  const { url, method } = getURLAndMethod(fn);
  import("mockjs").then((Mock) => {
    Mock.mock(url, method, (options: Options) => {
      const params = (() => {
        const { url } = options;
        const fakeURL = (()=>{
            const origin = window.location.origin
            if(url[0] === '/'){
                return origin + url
            }else{
                return origin + '/' + url
            }
        })()
        const { params } = getURLAndParams(fakeURL);
        return params;
      })();
      const body = (() => {
        const { body } = options;
        try {
          return JSON.parse(body);
        } catch (error) {
          return {};
        }
      })();
      const fnParams: Params = {
        type: options.type,
        url: options.url,
        params,
        body,
      };
      const responseOptions = options;
      responseOptions.body = body;
      if (typeof data === "function") {
        const fn = data as Function;
        responseOptions.data = fn(fnParams);
      } else {
        responseOptions.data = data;
      }
      console.log("mock 数据成功", responseOptions);
      return {
        code: SUCCESS_CODE,
        message: "数据 mock 成功",
        data: responseOptions.data,
      };
    });
  });
}

// 利用正则获取方法的 url 和方法
function getURLAndMethod(fn: Function): { url: RegExp; method: string } {
  const result = {
    url: new RegExp(""),
    method: "get",
  };
  const fnStr = fn.toString();
  const urlReg = /url:\s.{1,}/;
  const methodReg = /method:\s.{1,}/;
  const urlTemp = urlReg.exec(fnStr);
  const methodTemp = methodReg.exec(fnStr);
  if (urlTemp && urlTemp[0]) {
    result.url = url2reg(deleteSign(urlTemp[0]));
  }
  if (methodTemp && methodTemp[0]) {
    result.method = deleteSign(methodTemp[0]);
  }
  return result;
}

// 将 url 处于成正则
function url2reg(url: string) {
  // 替换 es6 字符变量（故请求里不要使用字符串拼接）
  const reg = /\${.{1,}}/;
  // 拿到新的正则
  const newReg = new RegExp(url.replace(reg, ".{1,}"));
  return newReg;
}

// 删除传递过来的不需要的符号
function deleteSign(str: string) {
  const val = str.split(":")[1].slice(1);
  const reg = /`|"|'|,/g;
  return val.replace(reg, "");
}
