/**
 * @description 自动处理文字溢出，当溢出时，自动缩小字号直至文字能被当前容纳
 */
import { Directive, DirectiveBinding } from "vue";
import { nextTick } from "vue";

export interface FontSizeAdaptConfig {
  // 规定文字的行数
  allowLine?: number;
  // 等待时间间隔
  waitTimeGap?: number;
  // 最大等待次数
  waitMaxTime?: number;
  // 最多递减循环次数
  reduceMaxTime?: number;
  // 每次扣减的 fontsize
  reduceSize?: number;
  // 最小 font-size
  safeSize?: number;
  // 允许的误差（在缩减过程中或者设置样式中，偶尔会有一些误差出现）
  allowDifference?: number;
}

const DEFAULT_CONFIG = {
  allowLine: 1,
  waitTimeGap: 100,
  waitMaxTime: 10,
  reduceMaxTime: 20,
  reduceSize: 2,
  safeSize: 4,
  allowDifference: 2,
};

const fontSizeAdapt: Directive = {
  //   beforeMount(el, binding): void {},
  mounted(el, binding) {
    const container: HTMLElement = el;
    // 如果不是文本类型，那么退出
    if (container.nodeType !== 1) {
      console.error("fontSizeAdapt use error");
      return;
    }
    // 等待时间间隔
    const waitTimeGap = getConfigValue("waitTimeGap", binding);
    // 最大等待次数
    let waitTime = getConfigValue("waitMaxTime", binding);
    if (container.innerText) {
      // 直接拿取可能会有高度为 0的情况
      if (container.clientHeight) {
        autoSetFontSize(container, binding);
      } else {
        const containerShow = new Promise<void>((resolved, rejected) => {
          nextTick(() => {
            if (container.clientHeight) {
              resolved();
            }
          });
          setTimeout(() => {
            if (container.clientHeight) {
              resolved();
            }
          }, 0);
          window.onpageshow = () => {
            if (container.clientHeight) {
              resolved();
            } else {
              rejected();
            }
          };
          setTimeout(() => {
            if (container.clientHeight) {
              resolved();
            }
          }, 200);
          setTimeout(() => {
            if (container.clientHeight) {
              resolved();
            }
          }, 500);
          setTimeout(() => {
            if (container.clientHeight) {
              resolved();
            }
          }, 1000);
        });
        containerShow
          .then(() => {
            autoSetFontSize(container, binding);
          })
          .catch(() => {
            console.error(
              "FontSizeAdapt can not get height.Check whether your element uses display:none"
            );
          });
      }
    } else {
      // 有可能请求比较慢，所以等一等
      const timer = setInterval(() => {
        if (waitTime <= 0) {
          clearInterval(timer);
          return;
        }
        if (container.innerText) {
          autoSetFontSize(container, binding);
          clearInterval(timer);
        } else {
          waitTime--;
        }
      }, waitTimeGap);
    }
  },
  //   beforeUpdate() {},
  //   updated(el, binding) {},
  //   beforeUnmount() {},
  //   unmounted() {},
};

export default fontSizeAdapt;

// 自动设置 fontsize
function autoSetFontSize(container: HTMLElement, binding: DirectiveBinding) {
  const allowLine = getConfigValue("allowLine", binding);
  const containerWidth = container.offsetWidth;
  const spanTemp = generateSpanTemp(container);
  const containerCSS = window.getComputedStyle(container);
  const spanTempCSS = window.getComputedStyle(spanTemp);
  const oneLineHeight = getOneLineHeight(spanTemp, container);
  // 安全器，一般不会有超过 40px 的字体
  let safeTimer = getConfigValue("reduceMaxTime", binding);
  const reduceSize = getConfigValue("reduceSize", binding);
  // 最小 fontSize
  const safeSize = getConfigValue("safeSize", binding);
  if (allowLine === 1) {
    while (isWrongWidth(container, spanTemp, binding)) {
      const containerNextSize =
        Number.parseInt(containerCSS.fontSize) - reduceSize;
      if (containerNextSize > safeSize) {
        container.style.fontSize = containerNextSize + "px";
        spanTemp.style.fontSize =
          Number.parseInt(spanTempCSS.fontSize) - reduceSize + "px";
      } else {
        break;
      }
      safeTimer--;
      if (safeTimer <= 0) {
        break;
      }
    }
  } else {
    spanTemp.style.width = containerWidth + "px";
    while (isWrongLine(container, oneLineHeight, allowLine, binding)) {
      const nextSize = Number.parseInt(containerCSS.fontSize) - reduceSize;
      if (nextSize > safeSize) {
        container.style.fontSize = nextSize + "px";
      } else {
        break;
      }
      safeTimer--;
      if (safeTimer <= 0) {
        break;
      }
    }
  }
  document.body.removeChild(spanTemp);
}

// 获取配置值，如果没有那么取默认值
function getConfigValue(
  key: keyof typeof DEFAULT_CONFIG,
  binding: DirectiveBinding
): number {
  const value = binding.value;
  if (typeof value === "object") {
    if (value[key]) {
      const configValue = Number(value[key]);
      if (Number.isNaN(configValue)) {
        return DEFAULT_CONFIG[key];
      } else {
        return configValue;
      }
    } else {
      return DEFAULT_CONFIG[key];
    }
  } else {
    if (key === "allowLine" && typeof value === "number") {
      return value;
    } else {
      return DEFAULT_CONFIG[key];
    }
  }
}

// 宽度是否达标
function isWrongWidth(
  container: HTMLElement,
  spanTemp: HTMLElement,
  binding: DirectiveBinding
) {
  const allowDifference = getConfigValue("allowDifference", binding);
  const containerWidth = getContainerRealWidth(container);
  const spanTempWidth = spanTemp.offsetWidth;
  if (Math.abs(containerWidth - spanTempWidth) < allowDifference) {
    return false;
  } else {
    return containerWidth < spanTempWidth;
  }
}
// 行数是否达标（本质上是判断高度进行操作）
function isWrongLine(
  container: HTMLElement,
  oneLineHeight: number,
  allowLine: number,
  binding: DirectiveBinding
) {
  const realHeight = getContainerRealHeight(container);
  const mockHeight = oneLineHeight * allowLine;
  // 允许的误差
  const allowDifference = getConfigValue("allowDifference", binding);
  if (Math.abs(realHeight - mockHeight) < allowDifference) {
    return false;
  } else {
    return realHeight > mockHeight;
  }
}

// 获取真实的宽度
function getContainerRealWidth(container: HTMLElement) {
  const containerCSS = window.getComputedStyle(container);
  return (
    container.offsetWidth -
    Number.parseFloat(containerCSS.paddingLeft) -
    Number.parseFloat(containerCSS.paddingRight) -
    Number.parseFloat(containerCSS.borderWidth) * 2
  );
}

/// 获取真实的高度
function getContainerRealHeight(container: HTMLElement) {
  const containerCSS = window.getComputedStyle(container);
  return (
    container.offsetHeight -
    Number.parseFloat(containerCSS.paddingTop) -
    Number.parseFloat(containerCSS.paddingBottom) -
    Number.parseFloat(containerCSS.borderWidth) * 2
  );
}

// 生成一个 span（用于检测标准宽度、高度）
function generateSpanTemp(container: HTMLElement) {
  const containerCSS = window.getComputedStyle(container);
  const spanTempInfo = {
    display: "inline-block",
    visibility: "hidden",
    "font-size": containerCSS.fontSize,
    "font-family": containerCSS.fontFamily,
    "font-weight": containerCSS.fontWeight,
    "line-height": containerCSS.lineHeight,
  };
  const spanTempCss = ((spanTempInfo) => {
    let result = "";
    for (const [key, val] of Object.entries(spanTempInfo)) {
      if (val) {
        result += `${key}:${val};`;
      }
    }
    return result;
  })(spanTempInfo);
  const spanTemp = document.createElement("span");
  spanTemp.style.cssText = spanTempCss;
  document.body.appendChild(spanTemp);
  return spanTemp;
}

//  获取单行的高度
function getOneLineHeight(spanTemp: HTMLElement, container: HTMLElement) {
  const containerText = container.innerText;
  spanTemp.innerText = containerText[0];
  const oneLineHeight = spanTemp.offsetHeight;
  spanTemp.innerText = containerText;
  return oneLineHeight;
}
