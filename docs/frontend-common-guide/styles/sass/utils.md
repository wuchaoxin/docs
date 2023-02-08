# 混入

## textOverflow

文字溢出处理

<<< @/frontend-common/styles/sass/_utils.scss#textOverflow

## safeTop

IOS 开启顶部安全距离

<<< @/frontend-common/styles/sass/_utils.scss#safeTop

## safeBottom

IOS 开启底部安全距离

<<< @/frontend-common/styles/sass/_utils.scss#safeBottom

## zIndex

`z-index` 的设置，解决在ios下偶尔 z-index 不生效（原因是设置了-webkit-overflow-scrolling: touch，并且 Safari 的图层渲染和 Chrome 有点不一样）

<<< @/frontend-common/styles/sass/_utils.scss#zIndex

## autoFontFamily

`autoFontFamily` 是为了设置好字体的 fallback 机制，值得注意安卓预装了 `MiSans` 字体，我们只需要按照苹果的字体走，安卓会自动应用对应其字体。

<<< @/frontend-common/styles/sass/_utils.scss#autoFontFamily

## autoFontWeight

`autoFontWeight` 是为了区分安卓下对很多字体 `font-weight` 不支持，所以我们在这里直接判断安卓下如果小于 400 则为 400，大于 400 则为 700，而 IOS 不受影响。如果安卓预装了 `MiSans` 字体对`font-weight` 支持度够好，其实也就不用使用这个混入了，不过一切需要测试后才知道。

<<< @/frontend-common/styles/sass/_utils.scss#autoFontWeight

## setBackgroundImage

处理图片分辨率问题，如果你使用的是svg，则不应该使用该函数（原理：根据图片名称，自动加入不同分辨率的图片）

<<< @/frontend-common/styles/sass/_utils.scss#setBackgroundImage

## setBackgroundImageForTheme

`setBackgroundImage` 混入的变种，目的是为了处理多主题的图片

自动加入 `dark` 类，然后 dark 类下加入和 `setBackgroundImage` 一样的图片（不过名称后面跟了`_dark`）

## thinBorder

处理 1px 问题（原理：利用伪元素画出一个 div，再将这个 div 进行取消互动事件以及局部缩放处理）

<<< @/frontend-common/styles/sass/_utils.scss#thinBorder

## 基础使用

```scss
// 提前在 webpack 或者 vite 中引入样式
.test {
    @include textOverflow(2);
}
```