# login

和登录相关的函数

## getLoginInfo

获取 `cookie` 中的用户信息

<<< @/frontend-common/utils/login.ts#getLoginInfo

## isLogin

判断当前是否已登录（PS：APP、weChat、H5 都可以用）

<<< @/frontend-common/utils/login.ts#isLogin

## handleWeChatLogion

进行微信登录

<<< @/frontend-common/utils/login.ts#handleWeChatLogion

<<< @/frontend-common/utils/types/typings/login.ts#LoginParamsForWechat

## handleAppLogin

进行 APP 登录

<<< @/frontend-common/utils/login.ts#handleAppLogin

<<< @/frontend-common/utils/types/typings/login.ts#LoginParamsForApp

## handlelLoginExpired

处理登录失效的情况

<<< @/frontend-common/utils/login.ts#handlelLoginExpired

## isNonRegisteredUser

是否为非注册用户（未绑定手机号），仅针对微信环境

<<< @/frontend-common/utils/login.ts#isNonRegisteredUser