<!--
 * @Author: iRuxu
 * @Date: 2022-07-09 19:40:42
 * @LastEditTime: 2022-07-10 04:13:14
 * @Description:
-->
<template>
    <div class="chain">
        <div class="list" v-if="showCurrent">
            <el-divider><i class="el-icon-connection"></i> 任务链</el-divider>
            <div class="quest-name" v-for="item in display_data.current" :key="item.id">
                <span v-if="item.logic !== undefined">
                    <span :class="{ all: item.logic, one: !item.logic }" v-for="b in item.quests" :key="b.id">
                        【<router-link
                            class="quest-link"
                            :class="{ current: current == b.id }"
                            :to="{ name: 'single', params: { quest_id: b.id } }"
                            >{{ b.name }}</router-link
                        >】
                    </span>
                </span>
                <span v-else>
                    【<router-link
                        class="quest-link"
                        :class="{ current: current == item.id }"
                        :to="{ name: 'single', params: { quest_id: item.id } }"
                        >{{ item.name }}</router-link
                    >】
                </span>
            </div>
        </div>
        <div class="branch" v-if="showBranch">
            <el-divider><i class="el-icon-rank"></i> 任务分支</el-divider>
            <span class="quest-name" v-for="item in display_data.branch" :key="item.id">
                【<router-link class="quest-link" :to="{ name: 'single', params: { quest_id: item.id } }">{{
                    item.name
                }}</router-link
                >】
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "QuestChain",
    props: {
        data: {
            type: Object,
        },
        current: {
            type: Number,
        },
    },
    computed: {
        display_data() {
            let current = this.data.current;
            if (current[0].id.startsWith("b_")) {
                current[0].quests = current[0].quests.filter((item) => item.visible);
                if (current[0].quests.length == 1) {
                    current[0] = current[0].quests[0];
                }
            }
            current = current.filter((item) => item.hasOwnProperty("logic") || item.visible);
            let branch = this.data.branch.filter((item) => item.visible);
            return {
                current,
                branch,
            };
        },
        showBranch() {
            return this.data.branch.length > 0;
        },
        showCurrent() {
            return this.data.current.length > 1;
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/quest/single/chain.less";
</style>
