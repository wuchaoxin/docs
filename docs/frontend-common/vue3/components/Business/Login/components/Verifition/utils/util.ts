import { Size } from '../types/typings'

export function resetSize(el: HTMLElement | null, imgSize: Size, barSize: Size) {
  // 图片的宽度、高度，移动条的宽度、高度
  let img_width = ''
  let img_height = ''
  let bar_width = ''
  let bar_height = ''
  const parentEL = el?.parentNode as HTMLElement | null
  const parentWidth = parentEL?.offsetWidth || document.body.offsetWidth || document.documentElement.offsetWidth
  const parentHeight = parentEL?.offsetHeight || document.body.offsetHeight || document.documentElement.offsetHeight

  if (imgSize.width.indexOf('%') != -1) {
    img_width = (parseInt(imgSize.width) / 100) * parentWidth + 'px'
  } else {
    img_width = imgSize.width
  }

  if (imgSize.height.indexOf('%') != -1) {
    img_height = (parseInt(imgSize.height) / 100) * parentHeight + 'px'
  } else {
    img_height = imgSize.height
  }

  if (barSize.width.indexOf('%') != -1) {
    bar_width = (parseInt(barSize.width) / 100) * parentWidth + 'px'
  } else {
    bar_width = barSize.width
  }

  if (barSize.height.indexOf('%') != -1) {
    bar_height = (parseInt(barSize.height) / 100) * parentHeight + 'px'
  } else {
    bar_height = barSize.height
  }

  return { imgWidth: img_width, imgHeight: img_height, barWidth: bar_width, barHeight: bar_height }
}

export const _code_color1 = ['#fffff0', '#f0ffff', '#f0fff0', '#fff0f0']
export const _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC']
export const _code_chars = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
