/**
 * @description 请关注 common-class.scss 这个文件，两个文件为强关联
 */

export const BACKGROUND_COLOR_NAMESPACE = "ym-background-color";
export const TEXT_COLOR_NAMESPACE = "ym-text-color";
export const FONT_FAMILY_NAMESPACE = "ym-font-family";
export const FONT_SIZE_NAMESPACE = "ym-font-size";
export const DIALOG_NAMESPACE = "ym-dialog";
export const TOAST_NAMESPACE = "ym-toast";

const BACKGROUND_COLOR_LIST = [
  "blue",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "purple",
  "pink",
  "white",
  "grey",
] as const;
export type BackgroundColor = typeof BACKGROUND_COLOR_LIST[number];

const TEXT_COLOR_LIST = [
  "white",
  "red",
  "text-1",
  "text-2",
  "text-3",
  "text-occupy",
  "text-disable",
] as const;
export type TextColor = typeof TEXT_COLOR_LIST[number];

const FONT_FAMILY_LIST = ["medium", "regular"] as const;
export type FontFamily = typeof FONT_FAMILY_LIST[number];

const FONT_SIZE_LIST = ["huge", "big", "sub", "main", "hint", "label"] as const;
export type FontSize = typeof FONT_SIZE_LIST[number];

export function getCommonBackgroundColorClass(
  key: undefined | BackgroundColor
) {
  if (key) {
    const backgroundColorTemp =
      BACKGROUND_COLOR_LIST as unknown as Array<unknown>;
    if (backgroundColorTemp.includes(key)) {
      return `${BACKGROUND_COLOR_NAMESPACE}_${key}`;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function getCommonTextColorClass(key: undefined | TextColor) {
  if (key) {
    const textColorTemp = TEXT_COLOR_LIST as unknown as Array<unknown>;
    if (textColorTemp.includes(key)) {
      return `${TEXT_COLOR_NAMESPACE}_${key}`;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function getCommonFontFamilyClass(key: undefined | FontFamily) {
  if (key) {
    const fontFamilyTemp = FONT_FAMILY_LIST as unknown as Array<unknown>;
    if (fontFamilyTemp.includes(key)) {
      return `${FONT_FAMILY_NAMESPACE}_${key}`;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function getCommonFontSizeClass(key: undefined | FontSize) {
  if (key) {
    const fontSizeTemp = FONT_SIZE_LIST as unknown as Array<unknown>;
    if (fontSizeTemp.includes(key)) {
      return `${FONT_SIZE_NAMESPACE}_${key}`;
    } else {
      return "";
    }
  } else {
    return "";
  }
}
