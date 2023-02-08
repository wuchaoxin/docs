import request from '../../../../utils/request'
import { Data, ReAxiosPromise } from '../../../../utils/types/typings/request'
import { ReqGetParams, ReqGet, ReqCheckParams, ReqCheck } from './types/typings'

//获取验证图片  以及token
export function reqGet(data: ReqGetParams): ReAxiosPromise<Data<ReqGet>> {
  return request({
    url: '/captcha/captcha/v2/get.do',
    method: 'post',
    data,
  })
}

//滑动或者点选验证
export function reqCheck(data: ReqCheckParams): ReAxiosPromise<Data<ReqCheck>> {
  return request({
    url: '/captcha/captcha/v2/check.do',
    method: 'post',
    data,
  })
}
