<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#ProgressBar"></Iframe>

<div style="height:20px;width:100%;"></div>

# ProgressBar 组件

> 应用[progressBar](https://github.com/rstacruz/nprogress)，与 UI 规范对齐。

## 演示

```ts
import { progressBarInit, startProgressBar, stopProgressBar } from '@/frontend-common/utils/progressBar'

// 初始化设置 progressBarInit
// startProgressBar 开启进度条
// stopProgressBar 关闭进度条
```

::: tip 值得注意
进度条已集中至 `request` 中，你只需要设置 `progressBar` 属性即可开启。详情见 [request](/frontend-common-guide/utils/request.html)。
:::
