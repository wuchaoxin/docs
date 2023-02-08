<script setup lang="ts">
import SlideVerify from "@/frontend-common/vue3/components/Business/SlideVerify/Mobile.vue"
import { Button } from "@/frontend-common/vue3/components/Common"
import { ref } from 'vue'

const slideVerify = ref(null)
</script>

# SlideVerify 组件

该组件是针对`滑块验证`所做的通用登录组件。

> UI地址：[verification](http://192.168.10.248/xujingxian/xjx/ym_app/verification)

> 基础代码来源于：[vue3-slide-verify](https://github.com/monoplasty/vue3-slide-verify)

::: info 提示
此项目虽然 star 低，但是其 vue2 版本的仓库 star 量不低故而选用了该仓库。不过发现该仓库有一些 bug，不等作者修改了也方便修改样式，直接拉下来源码进行修改。
:::

## 展示

<Button @click="slideVerify.openDialog()">图片验证</Button>
<SlideVerify ref="slideVerify" :imgs="['https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/09/06/ChMkJ1Z83fOIGtc6AArD4UbZy3kAAGk2gCEZ7QACsP5906.jpg']"></SlideVerify>

## Props 参数

::: warning 注意
如果只用作服务端滑块验证，你其实不需要传入 props。如果你需要传入 props 参数，请理解每个参数的作用。
:::

|    属性    | 描述               | 默认值 | 可能的值 | 备注                     |
| :--------: | ------------------ | :----: | -------- | ------------------------ |
|     l      | block 图片的宽度   |   40   | -        | -                        |
|     r      | block 图片的半径   |   10   | -        | 只适用本地图片模式       |
|     w      | 背景图片的宽度     |  280   | -        | -                        |
|     n      | 背景图片的高度     |  140   | -        | -                        |
| sliderText | 滑块区域的文字     |  140   | -        | -                        |
|    imgs    | 传入的本地图片 URL |  140   | -        | 传入后会启用本地图片模式 |
|  accuracy  | 滑动验证的误差范围 |   5    | -        | 只适用本地图片模式       |
|    show    | 是否显示刷新按钮   |  true  | -        | -                        |
|  interval  | 节流函数的时间间隔 |   50   | -        | -                        |

## Events

|  事件   | 描述     |                                                    参数                                                    | 备注 |
| :-----: | -------- | :--------------------------------------------------------------------------------------------------------: | ---- |
| success | 验证成功 | 本地图片模式：`{timestamp:number}`；远程模式：`{timestamp:number;captchaVerification:string;token:string}` | -    |
|  fail   | 验证失败 |                        本地图片模式：`{}`；远程模式：`{repData:any;repCode:string}`                        | -    |