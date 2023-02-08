# Login 组件

该组件是针对 `H5` 场景下所做的通用登录组件。

::: warning 注意
在后续，应该将此组件作为项目进行单独部署，而非作为组件进行穿插使用，因为作为组件它的便利性并不好。
:::

## 对外暴露的 URL 参数

|  参数名  | 描述           |             可能的值             | 备注 |
| :------: | -------------- | :------------------------------: | ---- |
|   type   | 登录的方式     | 'password' \| 'verificationCode' \| 'register' |  对应`密码`、`验证码`、`注册`   |
|  later   | 是否不提示登录 |                -                 | -    |
|  uFrom   | 来源           |                -                 | -    |
| redirect | 重定向的地址   |                -                 | -    |

## 作为组件所需要的路由

```ts
{
    path: "/login",
    name: "Login",
    component: () => import("@common/vue3/components/Business/Login/index.vue"),
    meta: {
      title: "登录注册",
    },
  },
  {
    path: "/password",
    name: "Password",
    component: () =>
      import("@common/vue3/components/Business/Login/password.vue"),
    meta: {
      title: "登录注册",
    },
  },
  {
    path: "/regist",
    name: "Regist",
    component: () =>
      import("@common/vue3/components/Business/Login/regist.vue"),
    meta: {
      title: "登录注册",
    },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () =>
      import("@common/vue3/components/Business/Login/privacy.vue"),
    meta: {
      title: "登录注册",
    },
  }
```