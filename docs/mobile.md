---
layout: page
---

<script setup lang="ts">
import Mobile from "@/components/Mobile/Mobile.vue";
// 模拟手机交互手势
import "@/utils/touch-emulator.js"
import { onMounted,ref, nextTick } from 'vue'

const currentComponent = ref('')
const mobileShow = ref(false)

onMounted(()=>{
    const header = document.querySelector('.VPNav')
    const footer = document.querySelector('.VPFooter')
    header.style.display="none"
    footer.style.display="none"
    currentComponent.value = location.hash.slice(1,)
    setTimeout(()=>{
        mobileShow.value = true
    })
})
</script>

<Mobile v-show="mobileShow" :component="currentComponent"></Mobile>

<style lang="scss" scoped></style>