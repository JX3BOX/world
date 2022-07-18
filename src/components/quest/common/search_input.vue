<!--
 * @Author: X3ZvaWQ
 * @Date: 2022-07-11 00:14:57
 * @LastEditors: X3ZvaWQ
 * @LastEditTime: 2022-07-12 12:52:34
 * @Description: 抽离出来的三个页面都有用到的搜索框
-->
<template>
    <div class="m-search-input">
        <el-input
            placeholder="输入任务关键字（可包括中括号），「回车」进行搜索"
            v-model="keyword"
            @keyup.enter.native="search"
        >
            <span slot="prepend">
                <el-tooltip content="查看任务链需要键入完整任务名或任务ID哦" placement="top">
                    <el-checkbox v-model="chain">查看任务链</el-checkbox>
                </el-tooltip>
            </span>
            <el-button @click="search" slot="append">
                <span class="u-input-button__normal">搜 索</span>
                <span class="u-input-button__small"><i class="xs el-icon-search"></i></span>
            </el-button>
        </el-input>
    </div>
</template>

<script>
export default {
    name: "SearchInput",
    data() {
        return {
            keyword: "",
            chain: false,
        };
    },
    methods: {
        search(go) {
            if (!go) return;
            this.$router.push({
                name: "result",
                query: { keyword: this.keyword, chain: this.chain },
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/common/search_input.less";
</style>
