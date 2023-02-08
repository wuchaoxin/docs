# storage

主要针对 localStorage 进行封装

## get

和 `localStorage.getItem` 用法大致相同，不过第二个参数可以进行断言得到的类型，如果是复杂数据类型，会自动`JSON.parse`处理一下。

如果是通过本 api 添加的 localStorage 回去判断数据是否过期（过期不会使用），如果不是本 api 添加的那么不会去判断；

## add

和 `localStorage.setItem` 用法大致相同，不过第二个参数为一个对象了，对象中包括值和过期时间（可以为空）。

## delete

和 `localStorage.removeItem` 一致

## clear

和 `localStorage.clear` 一致

## api 示例

<<< @/frontend-common/utils/storage.ts#LocalStorage

## 基础使用

```ts
import LocalStorage from '@common-utils/storage'

const localStorageRe = new LocalStorage()
localStorageRe.get('test')
```

```ts
import { defaultLocalStorage } from '@common-utils/storage'

defaultLocalStorage.add('test',{
    val: 'hello world!',
    expires: 1000 * 60
})
defaultLocalStorage.get('test')
```