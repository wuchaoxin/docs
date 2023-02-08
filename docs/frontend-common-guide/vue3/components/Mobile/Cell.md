<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#Cell"></Iframe>

<div style="height:20px;width:100%;"></div>

# Cell 组件

> 手写的普通 Cell 组件，主要是对齐 UI 设计文档。

## 演示

### 基础用法

传入基础的属性 `title` 和 `value` 即可呈现基础的单元格。

```html
<Cell title="描述" value="固定内容"></Cell>
```

### 值类型 valueType

`value` 对应的值有几种类型，设置不同 `valueType` 对应不同的样式。

```html
<Cell title="描述" value="键入内容" value-type="bold"></Cell>
```

+ normal：不同（默认）
+ bold：加粗
+ light：轻量

### 图标 titleIcon titleIcon

你可以设置 `title-icon` 和 `value-icon` 分别设置标题和值处的 icon 。

```html
<Cell title="描述" title-icon="weChatpay" value-icon="complete"></Cell>
```

目前支持的值：

+ weChat：微信图标
+ complete：单选完成图标
+ weChatpay：微信支持图标
+ link：跳转箭头

## Props

|      属性      | 描述             |  默认值  | 可能的值                                                    |
| :------------: | ---------------- | :------: | ----------------------------------------------------------- |
|     title      | 标题             |    -     | -                                                           |
|     value      | 值               |    -     | -                                                           |
|   valueType    | 值类型           | "normal" | "normal" &#124; "bold" &#124; "light"                       |
|   titleIcon    | 标题图标         |    -     | "weChat" &#124; "complete" &#124; "weChatPay" &#124; "link" |
|   valueIcon    | 值图标           |    -     | "weChat" &#124; "complete" &#124; "weChatPay" &#124; "link" |
|   titleStyle   | 标题注入样式     |    -     | -                                                           |
|   valueStyle   | 值注入样式       |    -     | -                                                           |
| titleIconStyle | 标题图标注入样式 |    -     | -                                                           |
| valueIconStyle | 值图标注入样式   |    -     | -                                                           |


## Events

|     事件     | 描述         | 参数  | 备注 |
| :----------: | ------------ | :---: | ---- |