<template>
    <div class="m-nav">
        <el-tree :data="data" :props="defaultProps" node-key="key" :default-expanded-keys="['world']">
            <router-link class="el-tree-node__label" slot-scope="{ data }" to="/">
                <span class="u-name" v-text="data.label"></span>
                <em v-if="data.count" class="u-count" v-text="`(${data.count})`"></em>
            </router-link>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "Nav",
    props: [],
    components: {},
    data: function () {
        return {
            data: [
                // TODO:构建2019~现在及未来的数据
                {
                    label: "日历",
                    children: [
                        {
                            label: "2022年",
                            children: [
                                {
                                    label: "1月",
                                },
                            ],
                        },
                    ],
                },

                // TODO:关联书籍接口
                {
                    label: "书籍",
                    key: "book",
                    children: [
                        {
                            label: "杂集",
                        },
                        {
                            label: "道学",
                        },
                        {
                            label: "佛学",
                        },
                    ],
                },

                // TODO:关联接口
                {
                    label: "声望",
                    children: [
                        {
                            label: "江湖门派",
                        },
                        {
                            label: "江湖势力",
                        },
                    ],
                },

                // TODO:关联接口
                {
                    label: "任务",
                    children: [
                        {
                            label: "xx系列",
                        },
                    ],
                },

                // TODO:关联接口
                {
                    label: "江湖",
                    key: "world",
                    children: [
                        {
                            label: "事件",
                            key: "bigbang",
                        },
                        {
                            label: "八卦",
                            key: "gossip",
                        },
                        {
                            label: "玩法",
                            key: "game",
                        },
                        {
                            label: "术语",
                            key: "jargon",
                        },
                        {
                            label: "玩家",
                            key: "player",
                        },
                        {
                            label: "组织",
                            key: "organization",
                        },
                        {
                            label: "其它",
                            key: "other",
                        },
                    ],
                },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/nav.less";
</style>
