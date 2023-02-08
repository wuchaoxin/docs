# UA

用于判断用户当前的访问平台相关信息，该工具旨在快速判断平台相关信息。

UA 可以得到以下信息（detail）：
+ system：系统（Windows、MacOS、Linux、Android、iOS）
+ platform：平台（Desktop桌面端、Mobile移动端）
+ engine：内核（Webkit、Gecko、Presto、Trident）
+ engineVs：内核版本
+ supporter： 载体（Chrome、Safari、Firefox、Opera、IExplore/Edge）
+ supporterVs：载体版本
+ shell：外壳（基于 Chromium 进行二次开发再套多一层外壳的浏览器，如 qq、uc 等）
+ shellVs：外壳版本

## 暴露方法

从以上信息中，衍生出了一些快速判断的方法，见下方：

<<< @/frontend-common/utils/UA/index.ts#UA

## 基础使用

```ts
import UADetector from '@common-utils/UA'

const UA = new UADetector()
UA.isApp()
```

```ts
import { defaultUADetector } from '@common-utils/UA'

defaultUADetector.isApp()
```