<template>
    <div class="search-result">
        <div class="u-input">
            <el-input
                placeholder="输入任务关键字（可包括中括号），「回车」进行搜索"
                v-model="input"
                @keyup.enter.native="pushRoute()"
            >
                <template slot="prepend"><span>关键词</span></template>
                <el-button slot="append" @click="pushRoute()"><i class="el-icon-search"></i></el-button>
            </el-input>
            <el-tooltip content="查看任务链需要键入完整任务名或任务ID哦" placement="top">
                <el-checkbox v-model="checkChain" @change="pushRoute()">查看任务链</el-checkbox>
            </el-tooltip>
        </div>
        <div class="result-head">
            <div>起始地图</div>
            <div>任务名称</div>
            <div>可接等级</div>
            <div>任务目标</div>
            <div>任务奖励</div>
        </div>
        <template v-if="resultIsObject">
            <template v-if="result.prev && result.prev.length > 0">
                <el-divider><i class="el-icon-star-off"></i> 前置分支</el-divider>
                <quest-card v-for="quest in result.prev" :key="quest.id" :quest="quest"></quest-card>
            </template>
            <template v-if="result.current && result.current.length > 0">
                <el-divider v-if="result.current.length > 0"><i class="el-icon-star-off"></i> 任务链条</el-divider>
                <quest-card
                    v-for="quest in result.current"
                    :class="{ current: quest.name == keyword }"
                    :key="quest.id"
                    :quest="quest"
                ></quest-card>
            </template>
            <template v-if="result.branch && result.branch.length > 0">
                <el-divider><i class="el-icon-star-off"></i> 任务分支</el-divider>
                <quest-card v-for="quest in result.branch" :key="quest.id" :quest="quest"></quest-card>
            </template>
            <template v-if="result.byId && result.byId.length > 0">
                <el-divider><i class="el-icon-star-off"></i> 任务ID匹配</el-divider>
                <quest-card v-for="quest in result.byId" :key="quest.id" :quest="quest"></quest-card>
            </template>
            <template v-if="result.byItem && result.byItem.length > 0">
                <el-divider><i class="el-icon-star-off"></i> 物品匹配</el-divider>
                <quest-card v-for="quest in result.byItem" :key="quest.id" :quest="quest"></quest-card>
            </template>
            <template v-if="result.byKeyword && result.byKeyword.length > 0">
                <el-divider class="u-result-hr"><i class="el-icon-star-off"></i> 模糊搜索结果</el-divider>
                <quest-card v-for="quest in result.byKeyword" :key="quest.id" :quest="quest"></quest-card>
            </template>
        </template>
        <el-pagination
            hide-on-single-page
            background
            layout="prev, pager, next"
            @current-change="search"
            :total="total"
            :page-size="pageSize"
            style="text-align: center; margin-top: 1.5rem"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getQuests } from "@/service/quest";
import QuestCard from "@/components/quest/result/quest_card.vue";

export default {
    name: "SearchResult",
    components: { QuestCard },
    data: () => ({
        input: "",
        checkChain: false,
        total: 1,
        pageSize: 10,
        result: {},
    }),
    mounted() {
        this.input = this.keyword;
        this.checkChain = this.chain;
        this.search();
    },
    methods: {
        pushRoute() {
            this.$router.push({
                name: "result",
                query: {
                    keyword: this.input,
                    chain: this.checkChain,
                },
            });
        },
        search(page = 1) {
            getQuests({
                keyword: this.keyword,
                chain: this.chain,
                class_id: this.class_id,
                map_id: this.map_id,
                client: this.client,
                page,
            }).then((res) => {
                this.result = res.data.list;
                this.total = res.data.total;
                this.pageSize = res.data.per;
            });
        },
    },
    computed: {
        keyword() {
            return this.$route.query.keyword;
        },
        chain() {
            return this.$route.query.chain;
        },
        class_id() {
            return this.$route.query.class_id;
        },
        map_id() {
            return this.$route.query.map_id;
        },
        watchId() {
            return this.keyword + this.chain + this.class_id + this.map_id;
        },
        resultIsObject() {
            return this.result instanceof Object;
        },
        client() {
            return this.$store.state.client;
        },
    },
    watch: {
        watchId: function () {
            this.search();
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/result.less";
</style>
