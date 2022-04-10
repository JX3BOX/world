<template>
    <el-dialog custom-class="m-calendar-rank-dialog" :visible.sync="show" width="30%" center :before-close="handleClose">
        <span slot="title" class="u-rank-title"><i class="el-icon-s-data"></i> 剑三日历贡献排行榜 </span>

    </el-dialog>
</template>
<script>
//import { demo } from '@/utils/common.js';
//import xSearch from '@/components/search.vue';
export default {
    name: "calendarRank",
    props: ["show"],
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        handleClose() {
            this.$emit("calendarRank", { show: this.show });
        },
    },
};
</script>
<style lang='less'>
    @import "~@/assets/css/calendar/calendar_rank_dialog.less";
</style>