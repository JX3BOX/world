<template>
    <div class="quest-card" @click="go(quest.id)">
        <div class="u-map">{{ quest.map }}</div>
        <div class="u-name">
            <span>
                <el-tooltip v-if="quest.questType == 'act'" :content="`该任务是活动任务`" placement="top">
                    <img class="quest-type" src="@/assets/img/quest/quest_logo_purple.png" />
                </el-tooltip>
                <el-tooltip v-else-if="quest.questType == 'repeat'" :content="`该任务可重复完成`" placement="top">
                    <img class="quest-type" src="@/assets/img/quest/quest_logo_blue.png" />
                </el-tooltip>
                <span class="quest-name" :style="questNameColor">{{ quest.name }}</span>
                <el-tooltip
                    v-if="quest.schoolName"
                    :content="`该任务仅 ${quest.schoolName} 门派可接取`"
                    placement="top"
                >
                    <img class="quest-school" :src="schoolIcon(quest.schoolName)" alt="" />
                </el-tooltip>
            </span>
            <span class="u-id">（ID：{{ quest.id }}）</span>
        </div>
        <div class="u-level">{{ quest.level }}</div>
        <div class="u-target">{{ quest.target }}</div>
        <div class="u-reward">
            <div class="text-reward">
                <span class="reward-item" v-for="reward in textReward" :key="reward">{{ reward }}</span>
            </div>
            <div class="item-reward">
                <item-icon
                    v-for="item in items"
                    :key="item.id"
                    :item_id="item.id"
                    :amount="item.amount"
                    :onlyIcon="true"
                    :size="28"
                ></item-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { schoolIcon } from "@/utils/quest";
import ItemIcon from "../item_icon.vue";

export default {
    name: "QuestCard",
    components: {
        ItemIcon,
    },
    props: {
        quest: {
            type: Object,
            required: true,
        },
    },
    methods: {
        go(id) {
            this.$router.push({ name: "single", params: { quest_id: id } });
        },
        schoolIcon,
    },
    computed: {
        items() {
            if (!this.quest.reward || this.quest.reward.length == 0) {
                return [];
            }
            let rewards = this.quest.reward.filter((i) => i.type == "item_group");
            let items = [];
            for (let reward of rewards) items.push(...reward.items);
            return items.slice(0, 7);
        },
        questNameColor() {
            let map = {
                common: "#0d0e0d",
                repeat: "#0366d6",
                act: "#7632ff",
            };
            return {
                color: map[this.quest.questType],
            };
        },
        textReward() {
            return this.quest.reward
                .filter((i) => i.type != "item_group")
                .map((item) => {
                    if (item.type == "money") {
                        let price = item.count;
                        let z = "";
                        let result = {
                            zhuan: Math.floor(price * 0.01 * 0.01 * 0.0001) || 0,
                            jin: Math.floor((price * 0.01 * 0.01) % 10000) || 0,
                            yin: Math.floor((price * 0.01) % 100) || 0,
                            tong: Math.floor(price % 100) || 0,
                        };
                        if (result["zhuan"]) z += `${result["zhuan"]}砖`;
                        if (result["jin"]) z += `${result["jin"]}金`;
                        if (result["yin"]) z += `${result["yin"]}银`;
                        if (result["tong"]) z += `${result["tong"]}铜`;
                        return `金钱:${z}`;
                    } else if (item.type == "exp") {
                        return `阅历:${item.count}`;
                    } else if (item.type == "justice") {
                        return `侠行点:${item.count}`;
                    } else if (item.type == "prestige") {
                        return `威名点:${item.count}`;
                    } else if (item.type == "tongFund") {
                        return `帮会资金:${item.count}`;
                    } else if (item.type == "vigor") {
                        return `精力:${item.count}`;
                    } else if (item.type == "tongResource") {
                        return `载具资源:${item.count}`;
                    } else if (item.type == "affect") {
                        return `声望:${item.force}${item.count > 0 ? "+" : ""}${item.count}`;
                    } else if (item.type == "achievement") {
                        return `成就:${item.name}`;
                    } else if (item.type == "train") {
                        return `修为:${item.count}`;
                    }
                })
                .filter((str) => str != undefined);
        },
    },
};
</script>
<style lang="less">
.item-icon-popup {
    min-width: initial;
    padding: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;
    transform: translateY(-10px);
}
</style>
<style lang="less">
@import "~@/assets/css/quest/quest_card.less";
</style>
