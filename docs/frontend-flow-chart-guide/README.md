# 流程图（flow chart）

本系列旨在用流程图阐明项目中常见且稍微有些复杂的场景

## 为什么会有流程图

在一些场景中，我们十分难以通过言语去阐明相关流程，用流程图的形式去说明是一个很好的方法。

## 如何实现

本项目通过 [vitepress-plugin-mermaid 插件](https://github.com/emersonbottero/vitepress-plugin-mermaid)实现。其本身原理使用过 `mermaid` 实现，关于 `mermaid` 你可以参数其中文文档 [mermaid](https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md)。

## 如何书写

关于流程图的书写格式你可以参见 [mermaid](https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md)。你也可以参见本目录下的 `md` 文件，去参见基本写法。

一般来讲我们只会书写流程图，所以直接查看流程图的书写即可，[流程图文档](https://mermaid-js.github.io/mermaid/#/flowchart)。

## 举例

```mmd
flowchart LR
  Start --> Stop
```

```mermaid
flowchart LR
  Start --> Stop
```