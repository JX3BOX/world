<template>
    <div class="u-input">
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
                <span class="lg">搜 索</span>
                <i class="xs el-icon-search"></i>
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
@import "~@/assets/css/quest/search_input.less";
</style>
