<template>
    <div class="m-nav">
        <el-tree :data="tree_data" :props="defaultProps" node-key="key" :default-expanded-keys="defaultExpandedKeys" @node-click="clickHandler">
            <template slot-scope="{ data }">
                <router-link :to="data.href || ''" class="el-tree-node__label" :class="{ on: isActive(data) }">
                    <span class="u-name" v-text="data.label"></span>
                    <em v-if="data.count" class="u-count" v-text="`( ${data.count} )`"></em>
                </router-link>
            </template>
        </el-tree>
    </div>
</template>

<script>
import { getKnowledgeMenus } from "@/service/wiki.js";
import { map, each } from "lodash";
import {getAppType} from '@jx3box/jx3box-common/js/utils';
import buildClendarNav from '@/utils/buildCalendarNav';
import { getCalendarCount } from '@/service/calendar';

export default {
    name: "Nav",
    props: {
        defaultExpandedKeys: {
            type: Array,
            default: () => ['knowledge']
        },
        activeKey: {
            type: String,
            default: ''
        }
    },
    components: {},
    data: function () {
        return {
            active : 'calendar',

            data: {
                // TODO:构建2009~现在及未来的数据
                calendar: {
                    label: "日历",
                    key: 'calendar',
                    href: '/calendar/',
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
                book: {
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
                reputation: {
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
                quest: {
                    label: "任务",
                    children: [
                        {
                            label: "xx系列",
                        },
                    ],
                },

                knowledge: {
                    label: "通识",
                    key: "knowledge",
                    href : '/knowledge/',
                    children: [
                        {
                            label: "事件",
                            key: "bigbang",
                            count: 0,
                            href : '/knowledge/#/type/bigbang',
                        },
                        {
                            label: "八卦",
                            key: "gossip",
                            count: 0,
                            href : '/knowledge/#/type/gossip',
                        },
                        {
                            label: "玩法",
                            key: "game",
                            count: 0,
                            href : '/knowledge/#/type/game',
                        },
                        {
                            label: "术语",
                            key: "jargon",
                            count: 0,
                            href : '/knowledge/#/type/jargon',
                        },
                        {
                            label: "玩家",
                            key: "player",
                            count: 0,
                            href : '/knowledge/#/type/player',
                        },
                        {
                            label: "组织",
                            key: "organization",
                            count: 0,
                            href : '/knowledge/#/type/organization',
                        },
                        {
                            label: "其它",
                            key: "other",
                            count: 0,
                            href : '/knowledge/#/type/other',
                        },
                    ],
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
    },
    watch: {
        activeKey: {
            immediate: true,
            handler(val) {
                val && (this.active = val)
            }
        }
    },
    methods: {
        // 数据加载
        init: function () {
            this.loadKnowledge();

            this.data.calendar.children = buildClendarNav({ start: 2009, end: new Date().getFullYear() })
        },
        loadKnowledge: function () {
            // 加载通识子类统计
            getKnowledgeMenus().then((res) => {
                let knowledgeMenus = res?.data?.data?.menus;
                let knowledgeTreeIndex = {};
                this.data.knowledge.children.forEach((item, i) => {
                    knowledgeTreeIndex[item.key] = i;
                });
                each(knowledgeMenus, (item, i) => {
                    let typePos = knowledgeTreeIndex[item.name];
                    if (knowledgeTreeIndex[item.name] !== undefined) {
                        let distItem = this.data.knowledge.children[typePos];
                        distItem["count"] = item.count;
                    }
                });
            });
        },

        // 交互操作
        clickHandler : function (data, node){
            this.active = data.key

            if (data.type === 'calendar' && node.expanded) {
                this.loadCalendarCount(data.key)
            }
        },
        isActive : function (data){
            if(data.children){
                return getAppType() == data.key
            }else{
                return this.active == data.key
            }
        },
        loadCalendarCount: function (year){
            getCalendarCount({ year }).then(res => {
                // console.log(res)
                const currentYear = this.data.calendar.children.find(child => child.key == year);

                res.data.forEach(item => {
                    const month = currentYear.children.find(currentMonth => currentMonth.month == item.month);

                    if (month) {
                        month.count = item.count
                    }
                })
            })
        }
    },
    filters: {},
    created: function () {
        this.init();
    },
    mounted: function () {
    },
};
</script>

<style lang="less">
@import "~@/assets/css/nav.less";
</style>
