<!--
 * @description 消息卡片组件
!-->
<template>
    <div class="card-container">
        <template v-for="(item, index) in list" :key="item.task + item.releaseTime">
            <ReleaseDisplay :info="item" :class="[hoverIndex === index ? 'tip' : '']" @click="jumpMateriel(item)"
                @mouseenter="enter(index)" @mouseleave="leave()"></ReleaseDisplay>
        </template>
    </div>
</template>
<script setup lang="ts">
import { Info } from '/frontend-release-guide/releaseList'
import ReleaseDisplay from './ReleaseDisplay.vue'
import { ref } from 'vue'
import { useRouter } from 'vitepress'

defineProps<{
    list: Info[]
}>()

const hoverIndex = ref<number | null>(null)
const router = useRouter()

function getKey(item: Info) {
    const time = new Date(item.releaseTime).getTime()
    return item.task + time
}

function enter(index) {
    hoverIndex.value = index
}

function leave() {
    hoverIndex.value = null
}

function jumpMateriel(item: Info) {
    if (item.materielMD) {
        router.go(`/frontend-release-guide/materiels/${item.materielMD}?key=${getKey(item)}`)
    } else {
        router.go(`/frontend-release-guide/detail?key=${getKey(item)}`)
    }
}
</script>
<style scoped lang="scss">
.card-container {
    .card {
        cursor: pointer;
        transition: all 0.5s;

        .materielMD {
            color: var(--vp-c-brand);
        }
    }
}
</style>