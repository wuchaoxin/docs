<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#SwipeCell"></Iframe>

<div style="height:20px;width:100%;"></div>

# SwipeCell 组件

SwipeCell 组件基于 [vant 的 SwipeCell 组件](https://vant-contrib.gitee.io/vant/#/zh-CN/swipe-cell)

## 演示

### 基础用法

```html
<SwipeCell>
    <template #left>
        <Button :slide="true">选择</Button>
    </template>
    <Cell title="描述" value="固定值"></Cell>
    <template #right>
        <Button type="red" :slide="true">删除</Button>
        <Button :slide="true">收藏</Button>
    </template>
</SwipeCell>
```

## 属性与事件

属性与事件与 [vant 的 SwipeCell 组件](https://vant-contrib.gitee.io/vant/#/zh-CN/swipe-cell) 保持一致。