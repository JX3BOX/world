<template>
    <el-dialog custom-class="m-calendar-rank-dialog" :visible.sync="show" width="30%" center :before-close="handleClose">
        <span slot="title" class="u-rank-title"><i class="el-icon-s-data"></i> 剑三日历贡献排行榜 </span>
        <el-divider>【 {{date.start}} ~ {{date.end}} 】</el-divider>
        <ul class="m-list">
            <li v-for="(item,index) in list" :key="index">
                <span class="u-number"> <img :src="rankImg(index+1)" alt="" srcset="" v-if="index <3"><span v-else>{{index+1}}</span> </span>
                <img class="u-avatar" :src="item.user.user_avatar" :alt="item.user.display_name">
                <span class="u-name">{{item.user.display_name}}</span>
                <span class="u-num"><b>{{item.count}} </b>条</span>
            </li>
        </ul>
    </el-dialog>
</template>
<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "calendarRank",
    props: ["list", "date"],
    data: function () {
        return {
            show: false,
        };
    },
    computed: {},
    watch: {
        list: {
            immediate: true,
            handler: function (val) {
                val.length ? (this.show = true) : "";
            },
        },
    },
    methods: {
        handleClose() {
            this.show = false;
        },
        rankImg(id) {
            return `${__imgPath}image/other/rank_${id}.png`;
        },
    },
};
</script>
<style lang='less'>
    @import "~@/assets/css/calendar/calendar_rank_dialog.less";
</style>