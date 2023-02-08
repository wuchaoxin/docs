<script setup lang="ts">
import Iframe from '@/components/Iframe.vue'
</script>

<Iframe src="/mobile.html#Textarea"></Iframe>

<div style="height:20px;width:100%;"></div>

# Textarea 组件

> 手写的普通 Textarea 组件，主要是对齐 UI 设计文档。

## 演示

### 基础用法

```html
<Textarea v-model="inputVal" placeholder="有什么意见就说一说吧（200字以内）" maxlength="200"/>
```

## Props

## Events