<template>
    <div class="m-calendar-detail">
        详情
        <el-button class="u-add-btn" size="medium" type="primary" icon="el-icon-plus" @click="add">新增</el-button>

        <calendar-dialog v-model="showAdd" :date-obj="dateObj" @update="update"></calendar-dialog>
    </div>
</template>

<script>
import calendar_dialog from './calendar_dialog.vue';
export default {
    name: 'calendar-detail',
    props: {
        dateObj: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        'calendar-dialog': calendar_dialog
    },
    data: () => ({
        showAdd: false
    }),
    methods: {
        add() {
            this.showAdd = true
        },
        update() {

        }
    }
}
</script>

<style lang="less">
@import '~@/assets/css/calendar/calendar_detail.less';
</style>