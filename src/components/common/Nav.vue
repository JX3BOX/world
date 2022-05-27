<template>
    <div class="m-nav">
        <el-tree
            :data="tree_data"
            :props="defaultProps"
            node-key="key"
            :default-expanded-keys="defaultExpandedKeys"
            @node-click="clickHandler"
        >
            <template slot-scope="{ data }">
                <template v-if="data.app == app">
                    <router-link :to="data.path || '/'" class="el-tree-node__label" :class="{ on: isActive(data) }">
                        <span class="u-name" v-text="data.label"></span>
                        <em v-if="data.count" class="u-count" v-text="`( ${data.count} )`"></em>
                    </router-link>
                </template>
                <template v-else>
                    <a
                        :href="`/${data.app}/${data.path == '/' ? '' : data.path}`"
                        class="el-tree-node__label"
                        :class="{ on: isActive(data) }"
                    >
                        <span class="u-name" v-text="data.label"></span>
                        <em v-if="data.count" class="u-count" v-text="`( ${data.count} )`"></em>
                    </a>
                </template>
            </template>
        </el-tree>
    </div>
</template>

<script>
import { getKnowledgeMenus } from "@/service/wiki.js";
import { map, each } from "lodash";
import { getAppType } from "@jx3box/jx3box-common/js/utils";
import buildCalendarNav from "@/utils/buildCalendarNav";
import { getCalendarCount } from "@/service/calendar";

export default {
    name: "Nav",
    props: {
        defaultExpandedKeys: {
            type: Array,
            default: () => ["knowledge"],
        },
        activeKey: {
            type: String,
            default: "",
        },
    },
    components: {},
    data: function () {
        return {
            active: "calendar",

            data: {
                // 日历索引
                calendar: {
                    label: "日历",
                    key: "calendar",
                    path: "/",
                    app: "calendar",
                    children: [],
                },

                // TODO:关联书籍接口
                // book: {
                //     label: "书籍",
                //     key: "book",
                //     children: [
                //         {
                //             label: "杂集",
                //         },
                //         {
                //             label: "道学",
                //         },
                //         {
                //             label: "佛学",
                //         },
                //     ],
                // },

                // TODO:关联接口
                // reputation: {
                //     label: "声望",
                //     children: [
                //         {
                //             label: "江湖门派",
                //         },
                //         {
                //             label: "江湖势力",
                //         },
                //     ],
                // },

                // TODO:关联接口
                // quest: {
                //     label: "任务",
                //     children: [
                //         {
                //             label: "xx系列",
                //         },
                //     ],
                // },

                knowledge: {
                    label: "通识",
                    key: "knowledge",
                    app: "knowledge",
                    path: "/",
                    children: [],
                },
            },
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    computed: {
        tree_data: function () {
            return map(this.data, (item, key) => {
                return item;
            });
        },
        app: function () {
            return getAppType();
        },
    },
    watch: {
        activeKey: {
            immediate: true,
            handler(val) {
                val && (this.active = val);
            },
        },
    },
    methods: {
        // 数据加载
        init: function () {
            // 通识
            this.loadKnowledge();
            this.data.calendar.children = buildCalendarNav({ start: 2009, end: new Date().getFullYear() });
        },
        loadKnowledge: function () {
            // 加载通识子类统计
            getKnowledgeMenus().then((res) => {
                let knowledgeMenus = res?.data?.data?.menus;
                let knowledgeTree = [];
                each(knowledgeMenus, (item, key) => {
                    knowledgeTree.push({
                        key: key,
                        path: "/type/" + key,
                        label: item.label,
                        count: item.count,
                        app: "knowledge",
                    });
                });
                this.data.knowledge.children = knowledgeTree;
            });
        },
        loadCalendarCount: function (year) {
            getCalendarCount({ year }).then((res) => {
                const currentYear = this.data.calendar.children.find((child) => child.key == year);

                res.data.forEach((item) => {
                    const month = currentYear.children.find((currentMonth) => currentMonth.month == item.month);

                    if (month) {
                        month.count = item.count;
                    }
                });
            });
        },

        // 交互操作
        clickHandler: function (data, node) {
            this.active = data.key;

            if (data.type === "calendar" && node.expanded) {
                this.loadCalendarCount(data.key);
            }
        },
        isActive: function (data) {
            if (data.children) {
                return this.app == data.key;
            } else {
                return this.active == data.key;
            }
        },
    },
    created: function () {
        this.init();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/nav.less";
</style>
