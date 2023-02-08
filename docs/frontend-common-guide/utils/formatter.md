# formatter

跟格式化相关的函数，这个文件你可能会经常使用。

## moneyFormat

将数字格式化为金钱格式（例如：3000 => '3,000'）

<<< @/frontend-common/utils/formatter.ts#moneyFormat

## moneyUnformat

将金钱格式转换为数字格式

<<< @/frontend-common/utils/formatter.ts#moneyUnformat

## time

利用`day.js`，返回一个可操作的`dayjs 对象`

> 这里时间格式选用 `day.js` 是因为 `day.js` 比 `moment` 更加小。`day.js` 与 `moment` api 基本一致。

<<< @/frontend-common/utils/formatter.ts#time

## timeFormat

利用`day.js`，进行格式化

<<< @/frontend-common/utils/formatter.ts#timeFormat

## removeSpace

删除输入的字符串的空格（可选前侧、右侧、两端、全部）

<<< @/frontend-common/utils/formatter.ts#removeSpace

## addSuffix

给一个字符串补上后缀或者前缀

<<< @/frontend-common/utils/formatter.ts#addSuffix

## toFixed

针对数字和字符串进行小数格式化（字符串对象下的 toFixed 函数具有精度问题）

<<< @/frontend-common/utils/formatter.ts#toFixed


## isRightJSType

判断当前的值类型是否正确

<<< @/frontend-common/utils/formatter.ts#isRightJSType

## getRightTypeVal

判断当前的类型是否正确，如果不正确，那么进行转换或者启用默认值（一般用于检测后端返回的数据类型）

<<< @/frontend-common/utils/formatter.ts#getRightTypeVal

## 基础使用

```ts
import { getRightTypeVal } from '@common-utils/formatter'

// 请求得到的数据
const requestData = null
// 这里就可以直接拿到 []，可以不用判断空值了
const data = getRightTypeVal(requestData, [])
```