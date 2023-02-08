# design

移动端有响应式的适配，需要我们在运行时进行单位换算，而 `design` 就是为了处理这种现象，根据传入的设计图尺寸（默认 375），对传入 px 进行单位转换。

## px2px

将设计图上 `px值` 转换为实际的 `px值`

<<< @/frontend-common/utils/design.ts#px2px

## px2viewport

将设计图上 `px值` 转换为实际的 `vw值`

<<< @/frontend-common/utils/design.ts#px2viewport

## px2percentage

将设计图上 `px值` 按照屏幕宽度转换为实际的 `百分比`

<<< @/frontend-common/utils/design.ts#px2percentage

## 基础使用

```ts
import Desgin from '@common-utils/design'

const desgin = new Desgin(375)
desgin.px2px(100)
```

```ts
import { defaultDesgin } from '@common-utils/design'

defaultDesgin.px2px(100, false)
```