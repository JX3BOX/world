<template>
    <el-dialog custom-class="m-calendar-rank-dialog" :visible.sync="show" width="30%" center :before-close="handleClose">
        <span slot="title" class="u-rank-title"><i class="el-icon-s-data"></i> 剑三日历贡献排行榜 </span>
        <el-divider>【 {{date.start}} ~ {{date.end}} 】</el-divider>
        <ul class="m-list">
            <li v-for="item in list" :key="item.user_id">
                <span class="u-number"> <img :src="rankImg(item.user_id)" alt="" srcset="" v-if="item.user_id <4"><span v-else>{{item.user_id}}</span> </span>
                <img class="u-avatar" :src="item.user.user_avatar" :alt="item.user.display_name">
                <span class="u-name">{{item.user.display_name}}{{item.user.display_name}}</span>
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