<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#Toast"></Iframe>

<div style="height:20px;width:100%;"></div>

# Toast 组件

> 对应 [vant 的 Toast 组件](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)，与 UI 规范对齐。

## 演示

### 函数调用

函数进行了一次写法封装：

```ts
import { ToastFn } from '@common/vue3/components/CustomVant'

// 传入一个字符串为内容
ToastFn('燃烧的法庭')
// 也可以传入一个对象进行所有参数的定义
ToastFn({
    message:'《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
})
ToastFn({
    message:'《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
    align: 'left',
})
ToastFn({
    message:'《燃烧的法庭》是著名推理小说作家约翰·狄克森·卡尔非系列经典杰作之一，与H.M.爵士探案系列的《犹大之窗》、菲尔博士探案系列的《三口棺材》并称为卡尔三大神作。',
    align: 'right',
})
```

## Props & Events & Slots

请参见 [vant 的 Toast 组件](https://vant-contrib.gitee.io/vant/#/zh-CN/toast)
