<template>
    <div class="m-newest-quest">
        <!-- 搜索框 -->
        <search-input></search-input>
        <!-- 列表头部 -->
        <list-head></list-head>
        <!-- 任务列表 -->
        <div class="u-quest-list">
            <quest-card v-for="(item, key) in data" :key="key" :quest="item"></quest-card>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="15"
            hide-on-single-page
            style="text-align: center"
            @current-change="getData"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getNewestQuests } from "@/service/quest";
import SearchInput from "@/components/quest/common/search_input.vue";
import QuestCard from "@/components/quest/result/quest_card.vue";
import ListHead from "@/components/quest/result/list_head.vue";

export default {
    name: "QuestNewest",
    components: { QuestCard, SearchInput, ListHead },
    data: () => ({
        data: [],
        total: 0,
    }),
    computed: {
        client() {
            return this.$store.state.client;
        },
    },
    methods: {
        getData(page = 1) {
            let params = {
                page,
                pageSize: 15,
                client: this.client,
            };
            getNewestQuests(params).then((res) => {
                this.data = res.data.list;
                this.total = res.data.total;
            });
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style lang="less" scoped></style>
