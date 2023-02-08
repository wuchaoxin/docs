# 前端上线文档

<script setup lang="ts">
import { ElButton as Button, ElForm as Form, ElFormItem as FormItem,
         ElInput as Input, ElSelect as Select, ElOption as Option,
         ElDatePicker as DatePicker, ElPagination as Pagination} from 'element-plus'

import ReleaseList from '../components/ReleaseList.vue'
import { PUBLISHER_LIST, PLATFORM_LIST, releaseList } from './releaseList.ts'
import { computed, ref, watch } from 'vue'

const formModel = ref({})
const currentPage = ref(1)
const pageSize = ref(5)
const filterList = ref(releaseList)
const list = computed(()=>{
    const pageNum = currentPage.value
    const size = pageSize.value
    return filterList.value.slice((pageNum - 1) * size, pageNum * size)
})

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '三月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

watch(currentPage,()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

function search() {
    setFilterList()
}

function reset() {
    formModel.value = {}
    setFilterList()
}

function setFilterList(){
    const isHaveCondition = (Object.keys(formModel.value).length > 0)
    if(isHaveCondition){
        const list = releaseList.filter(item => {
            const { task, haveMateriel, publisher, platform, createTime, releaseTime } = formModel.value
            const isTask = task ? item.task === task : true
            const isHaveMateriel = haveMateriel ? !!Number(haveMateriel) === !!item.materielMD : true
            const isPublisher = publisher ? item.publisher === publisher : true
            const isPlatform = (()=>{
                if(platform){
                    if(typeof item.platform === 'string'){
                        return item.platform === platform
                    }else{
                        return item.platform.includes(platform)
                    }
                }else{
                    return true
                }
            })()
            const isCreateTime = createTime && createTime.length > 0 ? getTime(createTime[0]) < getTime(item.createTime) && getTime(createTime[1]) > getTime(item.createTime) : true
            const isReleaseTime = releaseTime && releaseTime.length > 0 ? getTime(releaseTime[0]) < getTime(item.releaseTime) && getTime(releaseTime[1]) > getTime(item.releaseTime) : true
            return isTask && isHaveMateriel && isPublisher && isPlatform && isCreateTime && isReleaseTime
        })
        filterList.value = list
    }else{
        filterList.value = releaseList
    }
}

function getTime(time){
    const date = new Date(time)
    return date.getTime()
}
</script>

<div class="avoid-container">
    <Form :inline="true" :model="formModel">
        <FormItem label="task">
            <Input v-model="formModel.task" placeholder="请输入 task 号" />
        </FormItem>
        <FormItem label="发布人">
            <Select v-model="formModel.publisher" placeholder="请选择发布人">
                <Option v-for="item in PUBLISHER_LIST" :label="item" :value="item"></Option>
            </Select>
        </FormItem>
        <FormItem label="发布平台">
            <Select v-model="formModel.platform" placeholder="请选择发布平台">
                <Option v-for="item in PLATFORM_LIST" :label="item" :value="item"></Option>
            </Select>
        </FormItem>
        <FormItem label="物料">
            <Select v-model="formModel.haveMateriel" placeholder="是否有物料">
                <Option label="有" value="1"></Option>
                <Option label="没有" value="0"></Option>
            </Select>
        </FormItem>
        <FormItem label="创建时间">
            <DatePicker v-model="formModel.createTime" type="daterange" :shortcuts="shortcuts" start-placeholder="开始时间"
                end-placeholder="结束时间"></DatePicker>
        </FormItem>
        <FormItem label="发布时间">
            <DatePicker v-model="formModel.releaseTime" type="daterange" :shortcuts="shortcuts" start-placeholder="开始时间"
                end-placeholder="结束时间"></DatePicker>
        </FormItem>
        <FormItem>
            <Button @click="search">查询</Button>
            <Button @click="reset">重置</Button>
        </FormItem>
    </Form>
    <ReleaseList :list="list"></ReleaseList>
    <Pagination layout="prev, pager, next" :total="filterList.length" :hideOnSinglePage="true"
        v-model:currentPage="currentPage" v-model:pageSize="pageSize"></Pagination>
</div>

<style>
    /* 样式变更，通过 scss 修改变量不生效，原因未知 */
    :root {
        --el-color-primary: var(--vp-c-brand) !important;
    }
    .el-button {
        --el-button-hover-border-color: var(--el-button-border-color) !important;
    }
</style>
<style lang="scss" scoped>
    .avoid-container {
        margin-top: 20px;
        :deep(.el-button){
            background-color: transparent;
        }
        :deep(.el-pagination) {
            display: flex;
            justify-content: end;
            .el-pager {
                margin: 0;
                padding-left: 0;
                > li {
                    margin-top: 0;
                }
            }
        }
    }
</style>