<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#Input"></Iframe>

<div style="height:20px;width:100%;"></div>

# Input 组件

> 手写的普通 Input 组件，主要是对齐 UI 设计文档。

## 演示

### 基础用法

```html
<Input v-model="inputVal"/>
```

### 带有 label

```html
<Input v-model="inputVal" label="姓名" />
```

### 带有清除功能

```html
<Input v-model="inputVal" label="姓名" clearable />
```

### 带有处理按钮

```html
<Input v-model="inputVal" label="手机号" handleText="发送验证码" :handleStyle="{ color: '#0078f5' }" @handleClick="ToastFn('已发送')" />
```

## Props

|        属性         | 描述                 | 默认值 | 可能的值 |
| :-----------------: | -------------------- | :----: | -------- |
|        label        | 输入框左边的标题     |   -    | -        |
|      clearable      | 是有带有清除按钮     |   -    | -        |
|     handleText      | 右侧处理按钮文本     |   -    | -        |
|     handleStyle     | 右侧处理按钮文本样式 |   -    | -        |
| inputContainerStyle | 外层样式             |   -    | -        |
|     labelStyle      | 输入框左边的标题样式 |   -    | -        |
|     inputStyle      | 输入框样式           |   -    | -        |

## Events

|    事件     | 描述               | 参数  | 备注 |
| :---------: | ------------------ | :---: | ---- |
| handleClick | 右侧处理按钮点击后 |   -   | -    |