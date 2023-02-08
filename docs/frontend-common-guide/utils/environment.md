# environment

与环境操作相关的函数

## getEnv

根据域名获取当前的运行环境

1. qa：测试环境
2. stage：预发环境
3. live：正式环境

<<< @/frontend-common/utils/environment.ts#getEnv

## getEnvFlag

反向获取当前环境对应的 `flag`。

> 因为目前域名命名很烂，qa 对应 3，stage 对应 1，live 没有数字，所以会有这个方法。

<<< @/frontend-common/utils/environment.ts#getEnvFlag

## getProject

根据当前的域名获取到当前是哪一个项目（这里的名字为了方便统一记住，使用的其实是仓库的大写名）。

<<< @/frontend-common/utils/environment.ts#getProject