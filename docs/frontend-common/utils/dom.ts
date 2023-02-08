/**
 * @description DOM 相关的操作
 */

// #region switchScroll
/**
 * @description switchScroll 移动端是否允许可滑动（注：如果一直处于滑动状态，禁用滑动将会在停止滑动后生效）
 * @param {boolean} isScroll 是否可滑动
 * @returns {void}
 * @example
 */
// #endregion switchScroll
export function switchScroll(isScroll: boolean, html = document.documentElement): void {
  if (isScroll) {
    html.style.overflow = 'auto'
  } else {
    html.style.overflow = 'hidden'
  }
}

// TODO 暂未启用，请勿使用
export function riseInput(input: HTMLElement | null, target: HTMLElement | null) {
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua)

  function uaIncludes(str: string) {
    return ua.indexOf(str) !== -1
  }

  function testScrollType() {
    if (iOS) {
      if (uaIncludes('Safari/') || /OS 11_[0-3]\D/.test(ua)) {
        /**
         * 不处理
         * - Safari
         * - iOS 11.0-11.3（`scrollTop`/`scrolIntoView` 有 bug）
         */
        return 0
      }
      // 用 `scrollTop` 的方式
      return 1
    }
    // 其它的用 `scrollIntoView` 的方式
    return 2
  }

  const scrollType = testScrollType()
  let scrollTimer: ReturnType<typeof setTimeout>

  if (!input) {
    return
  }

  if (!target) {
    // eslint-disable-next-line no-param-reassign
    target = input
  }

  const scrollIntoView = () => {
    if (scrollType === 0) return
    if (scrollType === 1) {
      document.body.scrollTop = document.body.scrollHeight
    } else {
      target && target.scrollIntoView(false)
    }
  }

  input.addEventListener('focus', () => {
    console.log('focus')
    setTimeout(scrollIntoView, 300)
    scrollTimer = setTimeout(scrollIntoView, 1000)
  })

  input.addEventListener('blur', () => {
    clearTimeout(scrollTimer)

    // 某些情况下收起键盘后输入框不收回，页面下面空白
    // 比如：闲鱼、大麦、乐动力、微信
    if (scrollType && iOS) {
      // 以免点击快捷短语无效
      setTimeout(() => {
        document.body.scrollIntoView()
      })
    }
  })
}
