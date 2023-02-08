/**
 * @description 辅助函数，该文件旨在帮助更加方便处理富文本。
 */

import Desgin from '../../../utils/design'
import { EDITOR_FLAG, EDITOR_STYLE_CLASS } from './types/const'
import { EditorInfo } from './types/typings'

// #region cleanStyle
/**
 * @description 去除富文本所有的 style 样式
 * @param {string} html 富文本
 * @returns {string}
 * @example
 */
// #endregion cleanStyle
export function cleanStyle(html: string): string {
  const reg = /\sstyle=\".{1,}?\"/g
  return html.replace(reg, '')
}

// #region addEditorInfo
/**
 * @description 向富文本中添加编辑器信息
 * @param {string} html 富文本
 * @param {Object} info 编辑器信息
 * @returns {string}
 * @example
 */
// #endregion addEditorInfo
export function addEditorInfo(html: string, info: EditorInfo): string {
  let temp = `<div id="${EDITOR_FLAG}" style="display: none;">`
  const hiddenDiv = (() => {
    temp += JSON.stringify(info)
    temp += '</div>'
    return temp
  })()
  return hiddenDiv + html
}

// #region getEditorInfo
/**
 * @description 从富文本中取出编辑器信息
 * @param {string} html 富文本
 * @returns {string}
 * @example
 */
// #endregion getEditorInfo
export function getEditorInfo(html: string): Partial<EditorInfo> {
  const reg = new RegExp(`<div id="${EDITOR_FLAG}" .{1,}?>(.{1,}?)</div>`)
  let info = {}
  if (reg.test(html)) {
    const infoStr = RegExp.lastParen
    try {
      info = JSON.parse(infoStr)
    } catch (error) {
      console.error(error)
      info = {}
    }
  }
  return info
}

// #region addDefaultStyle
/**
 * @description 在富文本顶层 html 进行添加默认样式设置
 * @param {string | AnyObject} styles 样式（PS：这是直接的样式）
 * @param {string} html 富文本
 * @returns {string}
 */
// #endregion addDefaultStyle
export function addDefaultStyle(styles: string | AnyObject, html: string) {
  if (typeof styles === 'string') {
    return `<div style=${styles}>${html}</div>`
  } else {
    const stylesStr = (() => {
      let result = ''
      for (const [key, val] of Object.entries(styles)) {
        result += `${key}:${val};`
      }
      return result
    })()
    return `<div style=${stylesStr}>${html}</div>`
  }
}

// #region getStyle
/**
 * @description 根据传入的对象来组合成 css
 * @param {AnyObject} styles 样式（PS：这里是标签对象）
 * @returns {string}
 */
// #endregion getStyle
export function getStyle(styles: AnyObject): string {
  let result = ''
  for (const [htmlKey, val] of Object.entries(styles)) {
    let temp = `.${EDITOR_STYLE_CLASS} ${htmlKey} {`
    let styles = ''
    for (const [styleKey, styleVal] of Object.entries(val)) {
      styles += `${styleKey}: ${styleVal};`
    }
    temp += styles + `} `
    result += temp
  }
  return result
}

// #region convertUnits
/**
 * @description 转换 css 单位
 * @param {string} str 需要转换的 style 或者 html
 * @param {number} designBase 转换的基数
 * @param {Array<string>} blackList  css 属性黑名单，识别到将不会进行转换
 * @returns {string}
 */
// #endregion convertUnits
export function convertUnits(str: string, designBase: number, blackList: Array<string> = []) {
  const reg = /([\'\";])(.{1,}?):(.{1,}?)px/g
  const design = new Desgin(designBase)
  const strRe = str.replace(reg, (match, match1, match2, match3) => {
    if (blackList.includes(match2)) {
      return match
    } else {
      return match1 + match2 + ': ' + design.px2viewport(Number.parseFloat(match3))
    }
  })
  return strRe
}
