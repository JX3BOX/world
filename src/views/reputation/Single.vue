<template>
    <div class="m-reputation-view">
        <div class="m-search">
            <search-input></search-input>
        </div>
        <div class="m-reputation-content">
            <div class="w-reputation">
                <p class="u-title__warpper">
                    <span class="u-name-icon">
                        <img :src="getIcon(reputation.szIconPath)" />
                    </span>
                    <span class="u-title-desc">
                        <span class="u-title">
                            <span class="u-title-name">{{ reputation.szName }}</span>
                            <span class="u-title-id"> (ID:{{ reputation.dwForceID }})</span>
                        </span>
                        <span class="u-desc" v-html="reputation.szDesc"></span>
                    </span>
                </p>
                <div class="u-other-info">
                    <p class="u-subtitle">【声望信息】</p>
                    <div class="other-wrap">
                        <span v-if="reputation.szMapNames && reputation.szMapNames.length"
                            >地图：{{ reputation.szMapNames[0] }}</span
                        >
                        <span v-if="reputation.GroupName">势力：{{ reputation.GroupName }}</span>
                        <span v-if="getPath(reputation.szName)">遗失的尊敬：{{ getPath(reputation.szName) }}</span>
                    </div>
                </div>
                <div class="u-path" v-show="showPath">
                    <p class="u-subtitle">【声望获取途径】</p>
                    <div class="u-path-list">
                        <div class="path-item" v-for="(path, index) in reputation.gainList" :key="index">
                            <p class="desc-title">{{ path.level }}</p>
                            <p class="desc-info">{{ path.desc }}</p>
                        </div>
                    </div>
                </div>
                <div class="u-reward" v-show="showReward">
                    <p class="u-subtitle">【声望奖励】</p>
                    <div class="u-reward-list">
                        <reward-item v-for="(reward, i) in reputation.rewards" :key="i" :reward="reward"></reward-item>
                    </div>
                </div>
            </div>
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                <el-tab-pane label="知交奖励" v-if="showDialog" name="dialog">
                    <div class="u-reputation-dialog">
                        <servant-info :info="getServant(reputation.servant)"></servant-info>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="声望商人" v-if="showMap" name="map">
                    <div class="u-reputation-map">
                        <reputation-map ref="map" :points="reputation.points"> </reputation-map>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="m-comment">
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="reputation" />
        </div>
    </div>
</template>

<script>
import reputationMap from "@/components/reputation/single/reputation_map.vue";
import RewardItem from "@/components/reputation/single/reward_item.vue";
// import PointFilter from "@/components/reputation/single/point_filter.vue";
// import ItemIcon from "@/components/reputation/common/item_icon.vue";
import SearchInput from "@/components/reputation/common/search_input.vue";
import servantInfo from "@/components/reputation/single/servant_info.vue";
import paths from "@/assets/data/reputation_exchange_path.json";
import levelList from "@/assets/data/reputation_level.json";

import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

import { postStat } from "@jx3box/jx3box-common/js/stat.js";
import { wiki } from "@jx3box/jx3box-common/js/wiki.js";
// import { getAppIcon } from "@jx3box/jx3box-common/js/utils";

import { publishLink, ts2str, showAvatar, iconLink } from "@jx3box/jx3box-common/js/utils";

import { getInfo } from "@/service/reputation";
// import isArray from "lodash/isArray";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
    name: "reputationSingle",
    components: {
        reputationMap,
        RewardItem,
        SearchInput,
        servantInfo,
        Comment,
    },
    data() {
        return {
            wiki_post: {
                source: {},
                post: null,
            },
            compatible: false,
            is_empty: true,

            activeTab: "dialog",

            reputation: {
                dwForceID: -1,
                szName: "",
                szDesc: "",
            },
            // icon: getAppIcon("reputation"),
        };
    },
    methods: {
        getServant(obj) {
            if (obj) {
                return {
                    level: `声望达到“${this.getLevelDesc(obj.nRequiredRepuLevel)}”即可获得`,
                    image: this.getIcon(obj.szImagePath, "partner"),
                    ...obj,
                };
            } else {
                return {};
            }
        },
        getPath(name) {
            return paths.find((item) => item.reputations.includes(name))
                ? paths.find((item) => item.reputations.includes(name)).path
                : "";
        },
        getIcon(iconPath, type = "icon") {
            const iconName = iconPath ? iconPath.split("\\")[iconPath.split("\\").length - 1].split(".")[0] : "";
            const path = "reputation/reputation/std/" + type + "/";
            if (iconName) {
                return __imgPath + path + iconName.toLowerCase() + ".png";
            } else {
                return "";
            }
        },
        getLevelDesc(level) {
            return levelList.find((item) => item.level === Number(level))
                ? levelList.find((item) => item.level === Number(level)).name
                : "未知";
        },
        getData() {
            getInfo({
                id: this.id,
                client: this.client,
            }).then((res) => {
                const data = res.data;
                data.szDesc = data.szDesc.replace(/\\n/g, "<br>");
                data.gainList = data.GainDesc
                    ? data.GainDesc.map((item) => {
                          return {
                              level: `《${this.getLevelDesc(item.from)} - ${this.getLevelDesc(item.to)}》`,
                              desc: item.desc,
                          };
                      })
                    : [];
                data.rewards = data.RewardItems
                    ? Object.keys(data.RewardItems).map((item) => {
                          return {
                              level: `【${this.getLevelDesc(item)}】声望奖励：`,
                              list: data.RewardItems[item].map((reward) => {
                                  return {
                                      id: reward,
                                      amount: 1,
                                  };
                              }),
                          };
                      })
                    : [];
                data.points = [
                    {
                        mapId: data.szMapIDs,
                        guides: data.Guides && data.Guides.length && data.Guides[0],
                    },
                ];
                // console.log(data)
                this.reputation = data;
            });
        },
        handleTabClick(tab, event) {
            if (tab.name == "map") {
                setTimeout(() => {
                    this.$refs.map && this.$refs.map.updateSize();
                }, 100);
            }
        },
        //百科相关
        loadData: function () {
            // 获取最新攻略
            if (this.id) {
                wiki.mix({ type: "reputation", id: this.id, client: this.client }, { supply: 1 }).then((res) => {
                    const { post, source, compatible, isEmpty, users } = res;
                    this.wiki_post = {
                        post: post,
                        source: source,
                        users,
                    };
                    this.is_empty = isEmpty;
                    this.compatible = compatible;
                });
            }
            this.triggerStat();
        },
        loadRevision: function () {
            // 获取指定攻略
            wiki.getById(this.post_id, { type: "reputation" }).then((res) => {
                this.wiki_post = res?.data?.data;
            });
            this.triggerStat();
        },
        publish_url: publishLink,
        triggerStat: function () {
            if (this.client == "origin") {
                postStat("origin_reputation", this.id);
            } else {
                postStat("reputation", this.id);
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
        id_str: function () {
            return String(this.id);
        },
        id: function () {
            return parseInt(this.$route.params.reputation_id);
        },
        showMap: function () {
            return this.reputation.szMapIDs;
        },
        showDialog: function () {
            return this.reputation.servant;
        },
        showReward: function () {
            return this.reputation.RewardItems;
        },
        showPath() {
            return this.reputation.gainList && this.reputation.gainList.length;
        },
        client() {
            return this.$store.state.client;
        },

        //wiki相关
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
        showDialog() {
            if (!this.reputation.servant) {
                this.activeTab = "map";
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/single.less";
</style>
