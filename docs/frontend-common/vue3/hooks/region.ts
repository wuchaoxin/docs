import { Ref, ref, watch } from 'vue'
import service from '../../utils/request'
import { Data, ReAxiosPromise } from '../../utils/types/typings/request'
import { defaultLocalStorage } from '../../utils/storage'

type DepaType = 1 | 2
interface GetRegion {
  name: string
  code: string
  type?: DepaType
  childList?: RegionList
}
type RegionList = GetRegion[]

interface Code {
  provinceCode: Ref<string>
  cityCode: Ref<string>
  areaCode: Ref<string>
}

interface Callback {
  provinceCodeChange?: (val: string) => void
  cityCodeChange?: (val: string) => void
  areaCodeChange?: (val: string) => void
}

interface Options {
  // 缓存过期时间
  expires?: number
  request?: () => ReAxiosPromise<Data<RegionList>>
}

// 储存 key
const REGION_CACHE_DATA = 'YM_ALL_CITIES_DATA'
// 直辖市省级code码
const CHARTERED_CITYS_CODE = ['11', '12', '31', '50', '110000', '120000', '310000', '500000']

/**
 * @description 获取地区信息
 * @param {Code} code
 * @param {Callback} callback
 * @param {Options} options
 * @returns {Object}
 * @example
 */
export function useRegion(options?: Options): { regionData: Ref<RegionList> }
export function useRegion(
  code?: Code,
  callback?: Callback,
  options?: Options
): { regionData: Ref<RegionList>; provinceData: Ref<GetRegion[]>; cityData: Ref<GetRegion[]>; areaData: Ref<GetRegion[]> }
export function useRegion(code?: Code | Options, callback?: Callback, options?: Options) {
  // 获取地区数据
  const regionData = ref<RegionList>([])
  const regionCacheData = (() => {
    return defaultLocalStorage.get(REGION_CACHE_DATA)
  })() as null | RegionList
  const realCode = (() => {
    const codeTemp = code as Dynamic | undefined
    if (codeTemp?.provinceCode) {
      const temp = code as Code
      return temp
    } else {
      return null
    }
  })() as Code | undefined
  const realOptions = (() => {
    const codeTemp = code as Dynamic | undefined
    if (!codeTemp?.provinceCode) {
      const temp = code as Options
      return temp
    } else {
      return null
    }
  })() as Options | undefined
  if (!regionCacheData) {
    const promiseFn = (() => {
      if (realOptions) {
        if (realOptions.request) {
          return realOptions.request()
        } else {
          return getRegion()
        }
      } else {
        return getRegion()
      }
    })()
    promiseFn.then((res) => {
      const data = fillRegionData(res.data || [])
      regionData.value = data
      defaultLocalStorage.add(REGION_CACHE_DATA, {
        val: data,
        expires: options?.expires,
      })
    })
  } else {
    regionData.value = regionCacheData || []
  }
  if (realCode) {
    const { provinceCode, cityCode, areaCode } = realCode

    const provinceData = ref<GetRegion[]>([])
    const cityData = ref<GetRegion[]>([])
    const areaData = ref<GetRegion[]>([])

    generateProvinceData(regionData.value, provinceData)

    watch(regionData, () => {
      generateProvinceData(regionData.value, provinceData)
    })

    watch(provinceCode, () => {
      cityData.value = []
      areaData.value = []
      cityCode.value = ''
      areaCode.value = ''
      generateCityData(regionData.value, cityData, provinceCode.value)
      callback?.provinceCodeChange?.(provinceCode.value)
    })

    watch(cityCode, () => {
      areaData.value = []
      areaCode.value = ''
      generateAreaData(regionData.value, areaData, provinceCode.value, cityCode.value)
      callback?.cityCodeChange?.(cityCode.value)
    })

    watch(areaCode, () => {
      callback?.areaCodeChange?.(areaCode.value)
    })

    return {
      provinceData,
      cityData,
      areaData,
      regionData,
    }
  } else {
    return {
      regionData,
    }
  }
}

/**
 * @description 转换数据
 * @param {Array<Record<string, unknown>>} data 需要转换的数据
 * @param {string} nameKey 名称 key
 * @param {string} codeKey code码 key
 * @param {string} childListKey 子列表 key
 * @returns {RegionList}
 * @example
 */
export function convertData(data: Array<Record<string, unknown>>, nameKey: string, codeKey: string, childListKey: string) {
  const result: RegionList = []
  for (const item of data) {
    const temp: any = {}
    temp.name = item[nameKey]
    temp.code = item[codeKey]
    if (item[childListKey]) {
      temp.childList = convertData(temp.childList, nameKey, codeKey, childListKey)
    } else {
      temp.childList = undefined
    }
    result.push(temp)
  }
  return result
}

// 填充地区数据（主要是针对直辖市的情况）
function fillRegionData(regionData: RegionList) {
  for (const item of regionData) {
    if (CHARTERED_CITYS_CODE.includes(item.code)) {
      const childList = item.childList
      item.childList = [
        {
          name: item.name,
          code: item.code + '01',
          childList,
        },
      ]
    }
  }
  return regionData
}

// 生成 省份数据
function generateProvinceData(regionData: RegionList, provinceData: Ref<RegionList>) {
  provinceData.value = (() => {
    const result: RegionList = []
    for (const item of regionData) {
      result.push({
        code: item.code,
        name: item.name,
      })
    }
    return result
  })()
}

// 生成城市相关数据
function generateCityData(regionData: RegionList, cityData: Ref<RegionList>, provinceCode: string) {
  let result: RegionList = []
  for (const item of regionData) {
    if (item.code === provinceCode) {
      if (CHARTERED_CITYS_CODE.includes(provinceCode)) {
        result = [
          {
            code: item.code + '01',
            name: item.name,
          },
        ]
      } else {
        result = item.childList || []
      }
    }
  }
  cityData.value = result
}

// 生成区域相关数据
function generateAreaData(regionData: RegionList, areaData: Ref<RegionList>, provinceCode: string, areaCode: string) {
  let result: RegionList = []
  for (const item of regionData) {
    if (item.code === provinceCode) {
      if (CHARTERED_CITYS_CODE.includes(provinceCode)) {
        result = item.childList || []
      } else {
        for (const city of item.childList || []) {
          if (city.code === areaCode) {
            result = city.childList || []
          }
        }
      }
    }
  }
  areaData.value = result
}

function getRegion(): ReAxiosPromise<Data<RegionList>> {
  return service({
    url: '/region/get.do',
  })
}
