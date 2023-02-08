# FAQ

## 开发为何会出现无限刷新

由于开发中使用了反向代理，会造成 socket 访问失败（加了端口没走 host 文件），这种情况偶尔会造成 vite 无限刷新。

[github issue 问题说明](https://github.com/vitejs/vite/issues/1925)

解决方案：配置 hmr 的实际 host

[vite 配置说明](https://cn.vitejs.dev/config/#server-hmr)


示例：
```
server: {
    host: '127.0.0.1',
    port: VITE_PORT,
    hmr: {
        host: '127.0.0.1',
        port: VITE_PORT,
        protocol: 'ws',
    },
}
```

## 为何本地代码和线上代码不一致

排查一下是否是 jenkins 依赖的问题，jenkins 走的 `package.lock.json`。如果你使用了其他的包管理器，会导致 `package.lock.json` 和你的包管理器（例如：`yarn.lock`）不同步，从而导致本地与线上的依赖版本不一致。

## 微信分享失败

微信配置成功但是分享一直都是链接的形式而不是自定义的。大概率你是从一个链接进入了页面而不是通过公众号，微信在后面对这方面进行了修改，通过链接进入的页面，自定义分享都会失效。

## 微信配置失败

 因为 appid 跟公众号挂钩，所以我们切环境（不同环境公众号不一样），本地保存的 appid 会是错误的，需要清理下，微信 jssdk 才能正常配置好。

## 微信开发者工具执行两次

在微信开发者工具中点击刷新，有几率会发生 `beforeEach` 执行两次的情况（原因未知，仅在此处有问题，其他不受影响，可忽略）。

## Vant List 组件初次进入执行两次

+ 未合理的设置 `finished` 属性
+ 页面滑动到一定程度，跳转到一个具有 list 组件的页面，可能会发生多次请求见：[详情](https://github.com/youzan/vant/issues/7786)
    > 进入页面后 200ms，使load 事件不触发。

## jenkins 拉取 submodule 提示密码错误

如果 jenkins 打包提示 `remote: HTTP Basic: Access denied. The provided password or token is incorrect or your account has 2FA enabled and you must use a personal access token instead of a password. `，这个大概率是 jenkins 某种缓存导致（原因运维没有查出来），让运维删除对应环境 node节点 的库，重新打包即可。

## 老项目引入公共库 ?. 写法报错

如果在老项目中引入公共库（里面包含 `package.json` 被识别成另外的项目了），可能会报类型错误，需将 .babellrc 修改为 babel.config.js。