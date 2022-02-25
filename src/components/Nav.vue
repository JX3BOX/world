<template>
    <div class="m-nav">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                    children: [
                        {
                            label: "事件",//（包含新闻，正规的）
                        },
                        {
                            label: "八卦",//八卦（不正经的）
                        },
                        {
                            label: "玩法",
                        },
                        {
                            label: "术语",
                        },
                        {
                            label: "玩家",
                        },
                        {
                            label: "组织",
                        },
                        {
                            label: "其它",
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
