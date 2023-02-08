# mock

该文件下的函数是用于处理 mock 数据，这里的方案是 [mock.js](https://github.com/nuysoft/Mock)

## isMock

判断当前的环境是否是 `mock 环境`，从这里可以看出我们是从 `process.env` 配置里判断的，所以我们需要提前进行注入环境变量。

参见移动开发架子[启动注入变量](https://gitlab.healthych.com/front/frontend-common/-/blob/master-template/mobile-template/package.json)以及[打包注入变量](https://gitlab.healthych.com/front/frontend-common/-/blob/master-template/mobile-template/vue.config.js)

<<< @/frontend-common/utils/mock.ts#isMock

## handleMock

传入函数后，对该函数进行拦截处理。

<<< @/frontend-common/utils/mock.ts#handleMock

## 基础使用

```ts
import { handleMock } from '@common-utils/mock'
import { getData } from '@/scr/apis/test'

// 这样就进行拦截了，返回值就是后者的对象（不必担心 code 层级参数，已经在方面包了一层）
handleMock(getData, {
    age: 11,
    name: 'zhangsan'
})
```

```ts
import { handleMock } from '@common-utils/mock'
import { getData } from '@/scr/apis/test'

// 第二个参数也可以是一个函数
handleMock(getData, ({ type, url, params, body })=>{
    // type 请求类型
    // url 请求 url
    // params url 参数
    // body body 参数
    return {
        age: 11,
        name: 'zhangsan'
    }
})
```