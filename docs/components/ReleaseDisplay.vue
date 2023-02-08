<!--
 * @description 用于展示上线的详细信息
!-->
<template>
    <div class="card info custom-block">
        <div>task：{{ data.task }}</div>
        <div>发布人：{{ data.publisher }}</div>
        <div>需要部署的平台：{{ data.platform ? data.platform.toString() : '' }}</div>
        <div>
            是否具有其他配置物料：
            <span :class="data.materielMD ? 'materielMD' : ''">
                {{ data.materielMD ? '有' : '否' }}
            </span>
        </div>
        <div>上线时间：{{ data.releaseTime }}</div>
        <div>填写时间：{{ data.createTime }}</div>
        <div>备注：{{ data.remark || '无' }}</div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Info, releaseList } from '@/frontend-release-guide/releaseList'
import { getURLAndParams } from '@/frontend-common/utils/url'

const props = defineProps<{
    info?: Info
    useKey?: boolean
}>()

const keyInfo = ref<Info | Record<string, string | string[]>>({})

onMounted(() => {
    const { params } = getURLAndParams()
    const key = params.key
    for (const item of releaseList) {
        const tempKey = ((item) => {
            return item.task + new Date(item.releaseTime).getTime()
        })(item)
        if (tempKey === key) {
            keyInfo.value = item
            break
        }
    }
})

const data = computed<Info | Record<string, string | string[]>>(() => {
    if (props.useKey) {
        return keyInfo.value
    } else {
        return props.info || {}
    }
})

</script>
<style scoped lang="scss">
.card {
    .materielMD {
        color: var(--vp-c-brand);
    }
}
</style>