<!--
 * @Author: iRuxu
 * @Date: 2022-07-09 19:40:42
 * @LastEditTime: 2022-07-10 04:16:23
 * @Description:
-->
<template>
    <div class="m-quest">
        <img class="u-logo" src="@/assets/img/quest/quest_logo.png" alt="" />
        <h1 class="u-title">任务百科</h1>
        <search-input></search-input>
        <p class="u-desc">
            <span>※ 支持任务名称精确或模糊搜索</span> <br />
            <span>※ 支持任务相关物品名称精确搜索</span> <br />
            <span>※ 支持成就名称精确搜索</span> <br />
            <span>※ 支持声望名称精确搜索</span>
        </p>
        <!-- <div class="u-recommand">
            <p class="title"><i class="el-icon-collection-tag"></i> 热门任务</p>
            <div class="list">
                <div class="item" v-for="quest in recommand" :key="quest.ID">
                    <img class="icon" :src="iconLink(quest.Icon)" />
                    <div class="content">
                        <p class="name">{{ quest.Name }}</p>
                        <p class="class">{{ quest.Class }}</p>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import SearchInput from "@/components/quest/search_input.vue";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Search",
    components: { SearchInput },
    data: () => ({
        by: "all",
        recommand: [
            {
                ID: 1,
                Name: "收集石头1",
                Class: "【黑山林海】",
                Icon: "10909",
            },
            {
                ID: 2,
                Name: "收集石头2",
                Class: "【龙泉府】",
                Icon: "10452",
            },
            {
                ID: 3,
                Name: "收集石头3",
                Class: "【侠客岛】",
                Icon: "10451",
            },
            {
                ID: 4,
                Name: "收集石头4",
                Class: "【经首道源岛】",
                Icon: "8848",
            },
            {
                ID: 5,
                Name: "收集石头5",
                Class: "【鲲鹏岛】",
                Icon: "5389",
            },
            {
                ID: 6,
                Name: "收集石头6",
                Class: "【扬州】",
                Icon: "4853",
            },
        ],
    }),
    mounted() {},
    methods: {
        iconLink,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/search.less";
</style>
