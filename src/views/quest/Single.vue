<template>
    <div class="quest">
        <div class="info">
            <p class="title">
                <span class="name">
                    <span :style="questNameColor">{{ quest.name }}</span>
                    <img v-if="quest.schoolName" :src="schoolIcon(quest.schoolName)" alt="" />
                    <span class="difficulty" v-if="quest.difficulty">【{{ quest.difficulty }}】</span>
                </span>
                <span class="id"> (ID:{{ quest.id }})</span>
            </p>
            <div class="tag-list">
                <el-tag v-show="quest.canShare"><img src="@/assets/img/quest/player-63.png" alt="" />可分享任务</el-tag>
                <el-tag v-show="quest.canAssist"
                    ><img src="@/assets/img/quest/player-62.png" alt="" />可协助任务</el-tag
                >
            </div>
            <p class="start" v-show="quest.start">
                <span>任务起点: </span>
                <span>{{ quest.start.map }} - {{ quest.start.name || "未知" }}</span>
                <span class="id">({{ quest.start.type | startType }}ID: {{ quest.start.id }})</span>
                <point-filter
                    v-if="showPointFilter('Start')"
                    :default="true"
                    :pointType="'Start'"
                    @onPointFilterChange="changePointFilter"
                ></point-filter>
            </p>
            <p class="end">
                <span>任务终点: </span>
                <span>{{ quest.end.map }} - {{ quest.end.name || "未知" }}</span>
                <span class="id">({{ quest.end.type | startType }}ID: {{ quest.end.id }})</span>
                <point-filter
                    v-if="showPointFilter('End')"
                    :default="true"
                    :pointType="'End'"
                    @onPointFilterChange="changePointFilter"
                ></point-filter>
            </p>
            <div class="target" v-show="targetDesc">
                <p>任务目标：</p>
                <p v-html="targetDesc"></p>
                <template v-if="quest.killNpcs && quest.killNpcs.length > 0">
                    <div v-for="(killNpc, i) in quest.killNpcs" :key="i" class="sub-target">
                        <span>击杀 {{ killNpc.name }}</span>
                        <el-tooltip v-if="killNpc.share" content="该目标可共享击杀" placement="top">
                            <img src="@/assets/img/quest/target-15.png" alt="" />
                        </el-tooltip>
                        <span> x {{ killNpc.count }}</span>
                        <point-filter
                            v-if="showPointFilter(`KillNpc${i + 1}`)"
                            :default="true"
                            :pointType="`KillNpc${i + 1}`"
                            @onPointFilterChange="changePointFilter"
                        ></point-filter>
                    </div>
                </template>
                <template v-if="quest.needItems && quest.needItems.length > 0">
                    <div v-for="(needItem, i) in quest.needItems" :key="i" class="sub-target">
                        <span>收集 {{ needItem.name }} x {{ needItem.count }}</span>
                        <point-filter
                            v-if="showPointFilter(`NeedItem${i + 1}`)"
                            :default="true"
                            :pointType="`NeedItem${i + 1}`"
                            @onPointFilterChange="changePointFilter"
                        ></point-filter>
                    </div>
                </template>
                <div v-for="(target, i) in quest.questValueStrs" :key="target" class="sub-target">
                    <span>{{ target }} x {{ quest.questValue[i] }}</span>
                    <point-filter
                        v-if="showPointFilter(`State${i + 1}`)"
                        :default="true"
                        :pointType="`State${i + 1}`"
                        @onPointFilterChange="changePointFilter"
                    ></point-filter>
                </div>
            </div>
            <div class="desc" v-show="questDesc">
                <p>任务描述：</p>
                <p v-html="questDesc"></p>
            </div>
            <div class="reward" v-show="showReward">
                <p>任务奖励：</p>
                <div class="list">
                    <reward-item v-for="(reward, i) in quest.rewards" :key="i" :reward="reward"></reward-item>
                </div>
            </div>
            <quest-chain :current="id" :data="quest.chain"></quest-chain>
        </div>
        <div class="quest-map">
            <quest-map
                :points="quest.points"
                :filter="point_filter"
                :questType="quest.questType"
                v-if="showMap"
            ></quest-map>
            <div class="empty" v-else>该任务妹有指引</div>
        </div>
        <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
            <WikiPanel :wiki-post="wiki_post">
                <template slot="head-title">
                    <img class="u-icon" svg-inline :src="icon" />
                    <span class="u-txt">任务攻略</span>
                </template>
                <template slot="head-actions">
                    <a class="el-button el-button--primary" :href="publish_url(`quest/${id}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善任务攻略</span>
                    </a>
                </template>
                <template slot="body">
                    <div class="m-wiki-compatible" v-if="compatible">
                        <i class="el-icon-warning-outline"></i> 暂无缘起攻略，以下为重制攻略，仅作参考，<a
                            class="s-link"
                            :href="publish_url(`quest/${id}`)"
                            >参与修订</a
                        >。
                    </div>
                    <Article :content="wiki_post.post.content" />
                    <div class="m-wiki-signature">
                        <i class="el-icon-edit"></i>
                        本次修订由 <b>{{ user_name }}</b> 提交于{{ updated_at }}
                    </div>
                    <Thx
                        class="m-thx"
                        :postId="id"
                        postType="quest"
                        :postTitle="wiki_post.source.Name"
                        :userId="author_id"
                        :adminBoxcoinEnable="true"
                        :userBoxcoinEnable="true"
                        :authors="authors"
                        mode="wiki"
                        :key="'quest-thx-' + id"
                    />
                </template>
            </WikiPanel>

            <!-- 历史版本 -->
            <WikiRevisions type="quest" :source-id="id" />

            <!-- 百科评论 -->
            <WikiComments type="quest" :source-id="id" />
        </div>
        <div class="m-wiki-post-empty" v-else>
            <i class="el-icon-s-opportunity"></i>
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`quest/${id}`)">完善攻略</a>
        </div>
        <!-- <div class="quest-comment">
            <Comment :id="id" category="quest" order="desc" />
        </div> -->
    </div>
</template>

<script>
import QuestChain from "@/components/quest/single/quest_chain.vue";
import QuestMap from "@/components/quest/single/quest_map.vue";
import RewardItem from "@/components/quest/single/reward_item.vue";
import PointFilter from "@/components/quest/single/point_filter.vue";
import { postStat, getStat } from "@jx3box/jx3box-common/js/stat.js";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import questFont from "@/assets/data/questFont.json";

import { publishLink, ts2str, showAvatar, iconLink } from "@jx3box/jx3box-common/js/utils";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";
import WikiComments from "@jx3box/jx3box-common-ui/src/wiki/WikiComments";

import { getQuest } from "@/service/quest";

export default {
    name: "QuestSingle",
    components: {
        QuestMap,
        RewardItem,
        QuestChain,
        PointFilter,
        WikiPanel,
        WikiRevisions,
        WikiComments,
    },
    data() {
        return {
            wiki_post: {
                source: {},
                post: null,
            },
            compatible: false,
            is_empty: true,

            quest: {
                id: -1,
                name: "",
                start: {
                    type: "npc",
                    id: -1,
                    map: "扬州",
                },
                end: {
                    type: "npc",
                    id: -1,
                    map: "扬州",
                },
                questDesc: "",
                targetDesc: "",
                rewards: [],
                chain: {
                    current: [],
                    branch: [],
                },
                points: {},
            },
            point_filter: {
                Start: true,
                End: true,
            },
            icon: getAppIcon("quest"),
        };
    },
    methods: {
        getData() {
            getQuest({
                id: this.id,
                client: this.client,
            }).then((res) => {
                this.quest = res.data;
            });
        },
        schoolIcon(school) {
            let map = {
                北天药宗: "药宗",
                凌雪阁: "凌雪",
                衍天宗: "衍天",
            };
            if (map[school]) school = map[school];
            return `https://img.jx3box.com/image/school/${school}.png`;
        },
        changePointFilter(type, enable) {
            this.$set(this.point_filter, type, enable);
        },
        showPointFilter(type) {
            let points = [];
            for (let map in this.quest.points) {
                points.push(...this.quest.points[map]);
            }
            return points.some((point) => {
                return point.Types === type;
            });
        },
        //
        loadData: function () {
            // 获取最新攻略
            if (this.id) {
                if (this.client == "std") {
                    WikiPost.newest("quest", this.id, 1, "std").then((res) => {
                        let data = res?.data?.data;
                        this.wiki_post = data;
                        if (data.post) {
                            this.is_empty = false;
                        }
                        // console.log("获取重制攻略");
                    });
                } else {
                    WikiPost.newest("quest", this.id, 1, "origin")
                        .then((res) => {
                            let data = res?.data?.data;
                            this.wiki_post = data;
                            if (data.post) {
                                this.is_empty = false;
                            }
                            // console.log("获取缘起攻略");
                            return !!data.post;
                        })
                        .then((data) => {
                            if (!data) {
                                // console.log("兼容：获取重制攻略");
                                WikiPost.newest("quest", this.id, 1, "std").then((res) => {
                                    let data = res?.data?.data;
                                    this.wiki_post = data;
                                    if (data.post) {
                                        this.is_empty = false;
                                    }
                                    this.compatible = true;
                                });
                            }
                        });
                }
            }
            this.triggerStat();
        },
        loadRevision: function () {
            // 获取指定攻略
            WikiPost.view(this.post_id, { type: "quest" }).then((res) => {
                this.wiki_post = res?.data?.data;
            });
            this.triggerStat();
        },
        publish_url: publishLink,
        triggerStat: function () {
            if (this.client == "origin") {
                postStat("origin_quest", this.id);
            } else {
                postStat("quest", this.id);
            }
        },
    },
    mounted() {
        this.getData();
        if (this.post_id) {
            this.loadRevision();
        } else {
            this.loadData();
        }
    },
    computed: {
        id: function () {
            return parseInt(this.$route.params.quest_id);
        },
        showMap: function () {
            return this.quest.points && Object.keys(this.quest.points).length > 0;
        },
        questDesc: function () {
            if (this.quest.questDesc) {
                let result = this.quest.questDesc
                    .replace(/\\n/g, "\n")
                    .replace(/\<G\>/g, "&emsp;&emsp;")
                    .replace(/\<N\>/g, "侠士")
                    .replace(/\<C\>/g, "侠士")
                    .replace(/\<H(\d+)\>/g, '<div style="height: calc($1px - 1.5rem)"></div>');
                while (true) {
                    let match = /\<F(\d+) (.+?)\>/.exec(result);
                    if (match) {
                        let font = questFont[match[1]];
                        result = result.replace(match[0], `<span style="color: ${font.color}99">${match[2]}</span>`);
                    } else {
                        break;
                    }
                }
                return result;
            } else return null;
        },
        targetDesc: function () {
            if (this.quest.targetDesc)
                return this.quest.targetDesc
                    .replace(/\\n/g, "\n")
                    .replace(/\<G\>/g, "&emsp;&emsp;")
                    .replace(/\<C\>/g, "侠士")
                    .replace(/\<N\>/g, "侠士");
            else return null;
        },
        showReward: function () {
            return this.quest.rewards && this.quest.rewards.length > 0;
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
        client() {
            return this.$store.state.client;
        },

        //
        post_id: function () {
            return this.$route.params.post_id;
        },
        isRevision: function () {
            return !!this.$route.params.post_id;
        },
        author_id: function () {
            return ~~this.wiki_post?.post?.user_id;
        },
        user_name: function () {
            return this.wiki_post?.post?.user_nickname;
        },
        updated_at: function () {
            return ts2str(this.wiki_post?.post?.updated);
        },
        fav_title: function () {
            return this.wiki_post?.source?.Name;
        },
        authors: function () {
            if (!this.isRevision) {
                return (
                    this.wiki_post?.users
                        ?.filter((user) => user.id)
                        ?.map((user) => {
                            return {
                                user_id: user.id,
                                user_avatar: user.avatar,
                                display_name: user.nickname,
                            };
                        }) || []
                );
            }
            return [];
        },
    },
    watch: {
        id() {
            this.getData();
            this.loadData();
        },
        post_id: {
            handler() {
                this.loadRevision();
            },
        },
    },
    filters: {
        startType: (value) => {
            if (value === "npc") return "NPC";
            else if (value === "doodad") return "交互物品";
            else if (value === "item") return "物品";
            else return "";
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/quest/single.less";
@import "~@jx3box/jx3box-editor/assets/css/module/jx3_element.less";
</style>
