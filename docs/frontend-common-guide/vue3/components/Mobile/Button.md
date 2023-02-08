<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#Button"></Iframe>

<div style="height:20px;width:100%;"></div>

# Button 组件

> 手写的普通 button 组件，主要是对齐 UI 设计文档。

## 演示
### 按钮类型 type 

`type` 用于区分按钮类型

```html
 <Button type="plain">按钮-plain</Button>
```

+ blue：主题色按钮（默认）
+ red
+ orange
+ yellow
+ green
+ cyan
+ purple
+ pink
+ white
+ grey
+ plain：朴素按钮
+ text：文本按钮

### 文本类型 textType

仅当 `type` 为 `text`，该属性生效。该属性用于定义文本按钮的类型，参见上面文本按钮

```html
<Button type="text" text-type="hint">文本按钮-提示</Button>
```

+ 正文按钮：default（默认）
+ 提示按钮：hint
+ 次级正文按钮：secondaryDefault
+ 次级提示按钮：secondaryHint

### 宽度类型 widthType

`widthType` 用于定义当前的按钮宽度

```html
<Button width-type="normal">主按钮-单</Button>
```

+ huge：一级宽度
+ big：二级宽度
+ normal：三级宽度（默认）
+ all：通栏

### 字体颜色

该属性标志使用何种字体颜色

```html
<Button color-type="red">red</Button>
```

+ white：白色（默认）
+ red
+ text-1
+ text-2
+ text-3
+ text-occupy
+ text-disable

### 是否禁用 disabled

该属性与 HTML 属性 `disabled` 表现一致

```html
<Button :disabled="true">按钮-不可点</Button>
```

+ true：禁用
+ false：不禁用（默认）

###  滑动自适应 slide

该属性一般配合 `SwipeCell` 组件使用，实现滑动按钮的效果。

## Props

|   属性    | 描述               |  默认值   | 可能的值                                                                                                                                                                 |
| :-------: | ------------------ | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   type    | 按钮类型           |  "blue"   | "blue" &#124; "red" &#124; "orange" &#124; "yellow" &#124; "green" &#124; "cyan" &#124; "purple" &#124; "pink" &#124; "white" &#124; "grey" &#124; "plain" &#124; "text" |
| widthType | 宽度类型           | "normal"  | "huge" &#124; "big" &#124; "normal" &#124; "all"                                                                                                                         |
| textType  | 文本按钮类型       | "default" | "default" &#124; "hint" &#124; "secondaryDefault" &#124; "secondaryHint"                                                                                                 |
| colorType | 文本颜色类型       |  "white"  | "white" &#124; "red" &#124; "text-1" &#124; "text-2" &#124; "text-3" &#124; "text-occupy" &#124; "text-disable"                                                          |
| disabled  | 是否禁用           |   false   | true &#124; false                                                                                                                                                        |
|   slide   | 是否滑动自适应     |   false   | true &#124;  false                                                                                                                                                       |
|   style   | 注入给按钮的 style |     -     | -                                                                                                                                                                        |


## Events

| 事件  | 描述 | 参数  | 备注 |
| :---: | ---- | :---: | ---- |