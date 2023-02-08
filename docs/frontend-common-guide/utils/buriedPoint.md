# buriedPoint

埋点相关的函数，基于 `神策 1.24.2` 二次开发。

具体的数据模型请参见具体的 TS 接口，具体的常量设置请参见 `types/const/buriedPoint.ts`。

## initBuriedPoint

初始化埋点信息（一般放在 `main.ts` 中），该函数操作内容如下：
1. 下载 `SDK`
2. 初始化埋点请求
3. 初始化埋点信息

<<< @/frontend-common/utils/buriedPoint.ts#initBuriedPoint

> 在 `SDK` 未下载完毕时，触发的埋点将进入队列中，下载完毕后，将触发队列中的埋点

## sensorsTrack

触发埋点

<<< @/frontend-common/utils/buriedPoint.ts#sensorsTrack

## pageViewTrack

web 浏览页面事件上报（该方法一般放在路由拦截器中）

<<< @/frontend-common/utils/buriedPoint.ts#pageViewTrack

## getAppKeyAndSecret

获取数据上报的 `key` 和 `secret`，因为不同环境以及项目的 `key` 和 `secret` 不一样。

<<< @/frontend-common/utils/buriedPoint.ts#getAppKeyAndSecret


## SDK说明

目前web埋点SDK采用 [神策数据](https://manual.sensorsdata.cn/sa/latest/web-js-sdk-7548149.html) 开源方案，由于特殊需求和后端接口参数规范，进行了二次开发，对相关的API进行了调整。当前采用的开源版本为 `sa-sdk-javascript-1.24.2` [源码地址](https://github.com/sensorsdata/sa-sdk-javascript/releases)对应SDK文件为 `sensorsdata.full.js`

#### Ajax方法添加Token信息

``` javascript
function ajax(para) {
  // 获取请求头 token
  var tk = saCookie.get("_xzkj_") ? saCookie.get("_xzkj_") : "ymtk";

  var g = xhr(para.cors);

  // 添加header tk
  g.setRequestHeader && g.setRequestHeader('tk', tk);
}
```

#### 注释以下预置属性

属性is_first_time 由于产品需求和源码表达的意思不一样，要求是当前事件是否首次触发，故在后续 `initSensors.js` 文件中重写了该属性。

``` javascript
function getPresetProperties() {
  /**
   * 注释 $is_first_time
   */
  var obj = {
    $is_first_day: isNewUser(),
    // $is_first_time: saNewUser.is_page_first_visited,
    $referrer: pageInfo.pageProp.referrer || '',
    $referrer_host: pageInfo.pageProp.referrer ? getHostname(pageInfo.pageProp.referrer) : '',
    $url: getURL(),
    $url_path: getURLPath(),
    $title: document.title || '',
    _distinct_id: store.getDistinctId(),
    identities: JSON.parse(JSON.stringify(store._state.identities))
  };
}
```

#### 重写参数base64方法

直接将参数进行 `base64` 编码，返回 `base64` 数据，进行接口数据上报。

##### before

``` javascript
kit.encodeTrackData = function(data) {
  var dataStr = base64Encode(data);
  var crc = 'crc=' + hashCode(dataStr);
  return 'data=' + encodeURIComponent(dataStr) + '&ext=' + encodeURIComponent(crc);
};
```

##### after
``` javascript
kit.encodeTrackData = function(data) {
  return base64Encode(data)
};
```

#### 重写getSendData

重写获取埋点属性参数方法。

##### before
``` javascript
function getSendData(data) {
  return sd.kit.encodeTrackData(data);
}

```

###### after

`_SET_SEND_DATA` 在 `initSensors.js` 文件中进行了重写，为了输出同一格式的属性数据。

``` javascript
/**
 *  在getSendData中进行参数拦截，将_SET_SEND_DATA返回的参数转换成字符串
 */
function getSendData(data) {
  var send_data = _SET_SEND_DATA(data);
  var org = new Array(send_data);
  return sd.kit.encodeTrackData(JSON.stringify(org));
}

```

#### POST请求contentType

新增 contentType: application/json

``` javascript 
AjaxSender.prototype.start = function() {
  var me = this;
  ajax$1({
    url: this.server_url,
    type: 'POST',
    data: this.data,
    contentType: 'application/json', // 新增
    credentials: false,
    timeout: sd.para.datasend_timeout,
    cors: true,
    success: function() {
      me.isEnd();
    },
    error: function() {
      me.isEnd();
    }
  });
};
``` 

#### 调整POST请求data参数

去除POST请求data参数中 `data_list=`,去除 `encodeURIComponent` 编码格式，只保留输出 `base64` 格式

``` javascript
request: function(data, dataKeys) {
  var self = this;
  ajax$1({
    url: this.serverUrl,
    type: 'POST',
    // data: 'data_list=' + encodeURIComponent(base64Encode(JSON.stringify(data))),
    data: base64Encode(JSON.stringify(data.vals)),
    credentials: false,
    timeout: sd.para.batch_send.datasend_timeout,
    cors: true,
    success: function() {
      self.remove(dataKeys);
      self.sendTimeStamp = 0;
    },
    error: function() {
      self.sendTimeStamp = 0;
    }
  });
},
```

#### 重写批量上报add缓存方法

批量上报时，调用 `_SET_SEND_DATA` 方法，将存储在 `localStorage` 的数据进行同一格式输出。

``` javascript
add: function(data) {
  var dataKey = dataStoragePrefix + String(getRandom());
  var tabStorage = _localStorage.get(this.tabKey);
  if (tabStorage === null) {
    this.tabKey = tabStoragePrefix + String(getRandom());
    tabStorage = this.generateTabStorageVal();
  } else {
    tabStorage = safeJSONParse(tabStorage) || this.generateTabStorageVal();
  }
  tabStorage.data.push(dataKey);
  tabStorage.expireTime = now() + sd.para.batch_send.send_interval * 2;
  _localStorage.set(this.tabKey, JSON.stringify(tabStorage));

  // before
  // store.saveObjectVal(dataKey, data);
  
  // after
  var send_data = _SET_SEND_DATA(JSON.stringify(data))
  store.saveObjectVal(dataKey, send_data);

  if (data.type === 'track_signup' || data.event === '$pageview') {
    this.sendImmediately();
  }
}
```