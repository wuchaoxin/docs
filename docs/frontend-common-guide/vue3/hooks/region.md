# useRegion

获取地区数据，并且数据之间有联动。

## 基本用法

### 获取地区数据

```ts
import { useRegion } from '@common/vue3/hooks/region'

const { regionData } = useRegion()
```

### 获取联动数据

传入固定的 `ref` 参数，即可获取到具体的数据

```ts
import { ref } from 'vue'
import { useRegion } from '@common/vue3/hooks/region'

const provinceCode = ref('')
const cityCode = ref('')
const areaCode = ref('')

const { provinceData, cityData, areaData, regionData } = useRegion({ provinceCode, cityCode, areaCode })
```

## 回调函数

当某些数据发生变动时你可能想要执行某些回调函数

```ts
import { ref } from 'vue'
import { useRegion } from '@common/vue3/hooks/region'

const provinceCode = ref('')
const cityCode = ref('')
const areaCode = ref('')

const { provinceData, cityData, areaData, } = useRegion(
    { provinceCode, cityCode, areaCode }, 
    {
        provinceCodeChange: () => {
            // todo
        },
        cityCodeChange: () => {
            // todo
        },
        areaCodeChange: () => {
            // todo
        },
    }
)
```

## 额外选项

这里包含了其他的特殊选项：
+ expires：缓存过期时间（默认不过期）
+ request：修改请求函数

```ts
import { ref } from 'vue'
import { useRegion } from '@common/vue3/hooks/region'

const provinceCode = ref('')
const cityCode = ref('')
const areaCode = ref('')

const { provinceData, cityData, areaData, } = useRegion(
    { provinceCode, cityCode, areaCode }, 
    {},
    {
        expires: 6 * 60 * 1000,
    }
)
```

## 参数

重载一：
|   参数   | 描述                  |   类型   | 默认值 | 备注   |
| :------: | --------------------- | :------: | ------ | ------ |
| options  | 特殊选项              | Options  | -      | 见下表 |

重载二：
|   参数   | 描述                  |   类型   | 默认值 | 备注   |
| :------: | --------------------- | :------: | ------ | ------ |
|   code   | 固定的 ref 组成的对象 |   Code   | -      | 见下表 |
| callback | 回调函数对象          | Callback | -      | 见下表 |
| options  | 特殊选项              | Options  | -      | 见下表 |


### Code

|     参数     | 描述          |     类型      | 默认值 | 备注 |
| :----------: | ------------- | :-----------: | ------ | ---- |
| provinceCode | 省对应的 code | Ref\<string\> | -      | -    |
|   cityCode   | 市对应的 code | Ref\<string\> | -      | -    |
|   areaCode   | 区对应的 code | Ref\<string\> | -      | -    |

### Callback

|        参数        | 描述             |         类型          | 默认值 | 备注 |
| :----------------: | ---------------- | :-------------------: | ------ | ---- |
| provinceCodeChange | 省数据变动时执行 | (val: string) => void | -      | -    |
|   cityCodeChange   | 市数据变动时执行 | (val: string) => void | -      | -    |
|   areaCodeChange   | 区数据变动时执行 | (val: string) => void | -      | -    |

### Options

|  参数   | 描述           |                 类型                 | 默认值 | 备注 |
| :-----: | -------------- | :----------------------------------: | ------ | ---- |
| expires | 缓存需要的时间 |                number                | -      | 毫秒级别   |
| request | 请求函数       | ReAxiosPromise\<Data\<RegionList\>\> | -      | -    |