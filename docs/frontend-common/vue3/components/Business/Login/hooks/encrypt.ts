import { loginInitClient } from '../apis/index'
import JsEncrypt from 'jsencrypt'

export const useJSEncrypt = function () {
  // 实例化一个JSEncrypt对象
  var rsa = new JsEncrypt()

  // 获取加密签名等要素
  const getLoginInitClient = () => {
    return new Promise((resolve: (value?: unknown) => void) => {
      loginInitClient()
        .then((res) => {
          var resData = res.data
          // rsa 公钥（client端）
          let pub = resData.pub
          // 设置公钥
          rsa.setPublicKey(pub)
          resolve(pub)
        })
        .catch(() => {
          resolve('error')
        })
    })
  }

  return {
    getLoginInitClient,
    rsa,
  }
}
