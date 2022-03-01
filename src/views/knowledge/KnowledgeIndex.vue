<template>
    <div class="v-knowledge-index" v-loading="loading">
        <!-- 搜索 -->
        <knowledgeSearch @onSearchKey="onSearchKey" />
        <!-- 搜索结果 -->
        <knowledgeList v-if="search" :list="list" :pagination="pagination" @onSearchKey="onSearchKey" />
        <template v-else>
            <!--  玩法指南 -->
            <wikiGuide :data="guide" />
            <!-- 热门剧情 -->
            <wikiRecent :list="recent" />
        </template>
    </div>
</template>

<script>
import knowledgeSearch from "@/components/knowledge/search.vue";
import knowledgeList from "@/components/knowledge/list.vue";
import wikiGuide from "@/components/knowledge/guide.vue";
import wikiRecent from "@/components/knowledge/recent.vue";
import { getKnowledgeSearch } from "@/service/knowledge.js";
import { getKnowledgeNewest, getMenuGroups } from "@/service/wiki.js";
export default {
    name: "KnowledgeIndex",
    components: {
        knowledgeSearch,
        knowledgeList,
        wikiGuide,
        wikiRecent,
    },
    data: function () {
        return {
            loading: false,
            search: "",
            list: "",

            page: 1,
            per: 15,
            total: 1,
            pages: 1,

            guide: "",
            recent: "",
        };
    },
    computed: {
        params() {
            let params = {
                limit: this.per,
                page: this.page,
                keyword: this.search,
            };
            return params;
        },
        pagination() {
            return {
                page: this.page,
                total: this.total,
                per: this.per,
            };
        },
    },
    methods: {
        // 获取玩法指南
        getGuideData() {
            getMenuGroups({ names: ["guide-pve", "guide-pvx", "guide-pvp"] }).then((res) => {
                this.guide = res.data;
            });
        },
        // 获取最新帖子数据
        getRecentData() {
            getKnowledgeNewest({ type: "knowledge", limit: this.per }).then((res) => {
                this.recent = res.newest;
            });
        },
        // 获取搜索的数据
        getSearchData() {
            this.loading = true;
            getKnowledgeSearch(this.params)
                .then((res) => {
                    this.list = res.data;
                    this.total = res.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // ===============
        // 搜索关键词查找
        onSearchKey(val) {
            this.search = val;
            this.page = 1;
        },
        // 切换页码
        onPageKey(val) {
            this.page = val;
        },
    },
    watch: {
        params() {
            this.getSearchData();
        },
    },
    created: function () {
        this.getGuideData();
        // this.getHotData();
        this.getRecentData();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/knowledge/index.less";
</style>
