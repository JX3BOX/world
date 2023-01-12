<template>
    <div v-loading="loading" class="m-book-view">
        <div class="m-search">
            <search-input></search-input>
        </div>
        <div class="m-book-content">
            <div class="w-book" v-if="book">
                <p class="u-title__warpper">
                    <span class="u-name-icon">
                        <item-icon v-if="book.ItemID" :item_id="book.ItemID" :size="36"></item-icon>
                    </span>
                    <span class="u-title-id"> ID:{{ book.idKey }} </span>
                    <span class="u-desc" v-html="book.Desc"></span>
                </p>
                <div class="vertical-item u-info__wrapper">
                    <div class="u-header">
                        <img class="u-icon" svg-inline src="../../assets/img/achievement.svg" />
                        <span class="u-txt">书籍内容</span>
                    </div>
                    <div class="u-content">
                        <div v-if="book.contentInfo" class="book-info__content">
                            <div class="book-content" v-html="book.contentInfo"></div>
                        </div>
                        <div class="common-info__content">
                            <p class="u-subtitle">【书籍信息】</p>
                            <div class="u-book-info">
                                <div class="u-item">书籍类型：{{ getProfessionType(book.ExtendProfessionID1) }}</div>
                                <div class="u-item">书籍来源：{{ getOrigin(book.DoodadTemplateID) }}</div>
                                <div class="u-item">所属套书：{{ book.BookName }}</div>
                                <div class="u-item">阅读等级：{{ book.RequireLevel }}级</div>
                            </div>
                            <template v-if="book.copy && book.copy.ID">
                                <p class="u-subtitle">【抄录信息】</p>
                                <div class="u-book-info">
                                    <div class="u-item">
                                        <span>需求阅读：</span>
                                        <span>{{ book.copy.RequireLevel }}级</span>
                                    </div>
                                    <div class="u-item">
                                        <span>需求{{ getProfessionType(book.ExtendProfessionID1) }}：</span>
                                        <span>{{ book.copy.RequireLevelExt }}级</span>
                                    </div>
                                    <div class="u-item">
                                        <span>角色等级：</span>
                                        <span>{{ book.copy.RequirePlayerLevel }}级</span>
                                    </div>
                                    <div class="u-item">
                                        <span>消耗精力：</span>
                                        <span>{{ book.copy.CostVigor }}点</span>
                                    </div>
                                    <div v-if="book.copyList.length" class="u-item">
                                        <span>消耗材料：</span>
                                        <item-icon
                                            v-for="meterial in book.copyList"
                                            :key="meterial.item_id"
                                            :item_id="meterial.item_id"
                                            :size="28"
                                            :amount="meterial.count"
                                            :onlyIcon="true"
                                        ></item-icon>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="bookMapSite.length" class="vertical-item book-map">
                <div class="u-header">
                    <!-- <img class="u-icon" svg-inline src="../../assets/img/achievement.svg" /> -->
                    <span class="u-txt">碑铭信息</span>
                </div>
                <jx3box-map
                    class="u-content"
                    :map-id="parseInt(bookMapSite[0].map)"
                    :datas="bookMapSite[0].position"
                ></jx3box-map>
            </div>
        </div>
        <div class="m-comment">
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="book" />
        </div>
    </div>
</template>

<script>
import Jx3boxMap from "@jx3box/jx3box-map/src/components/Map.vue";
import ItemIcon from "@/components/book/common/item_icon.vue";
import SearchInput from "@/components/book/common/search_input.vue";
import bookProfession from "@/assets/data/book_profession.json";
// 碑铭坐标json
import bookMapInfoStd from "@/assets/data/stele_std_fwd.json";
import bookMapInfoOrigin from "@/assets/data/stele_origin_fwd.json";

import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

import { postStat } from "@jx3box/jx3box-common/js/stat.js";
import { wiki } from "@jx3box/jx3box-common/js/wiki.js";
// import { getAppIcon } from "@jx3box/jx3box-common/js/utils";

import { publishLink, ts2str, showAvatar, iconLink } from "@jx3box/jx3box-common/js/utils";

import { getInfo } from "@/service/book";
// import isArray from "lodash/isArray";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
    name: "bookSingle",
    components: { Jx3boxMap, ItemIcon, SearchInput, Comment },
    data() {
        return {
            wiki_post: {
                source: {},
                post: null,
            },
            compatible: false,
            is_empty: true,

            book: {
                idKey: "",
                Name: "",
                Desc: "",
                BookName: "",
                contentInfo: "",
            },
            loading: false,
            bookMapSite: [], // 碑铭点位信息
        };
    },
    computed : {
        book_copy_id () {
            return book?.copy?.ID
        },
    },
    methods: {
        getOrigin(tempId) {
            return tempId && this.bookMapInfo[tempId] ? "碑铭" : this.book.ShopID ? this.book.ShopName : "其它";
        },
        getProfessionType(type) {
            return bookProfession.find((item) => item.id === Number(type))
                ? bookProfession.find((item) => item.id === Number(type)).name
                : "";
        },
        getData() {
            this.loading = true;
            getInfo({
                id: this.idKey,
                client: this.client,
            })
                .then((res) => {
                    const data = res.data;
                    data.contentInfo = data.contents.map((item) => item.content.replace(/\\n/g, "<br>")).join("<br>");
                    if (data.DoodadTemplateID && this.bookMapInfo[data.DoodadTemplateID]) {
                        this.bookMapSite = this.bookMapInfo[data.DoodadTemplateID];
                        this.bookMapSite[0].position[0] = Object.assign(this.bookMapSite[0].position[0], {
                            title: data.Name,
                            content: `坐标：(${this.bookMapSite[0].position[0].x},${this.bookMapSite[0].position[0].y},${this.bookMapSite[0].position[0].z})`,
                        });
                    }
                    if (data?.copy?.ID) {
                        const keyArr = Object.keys(data.copy).filter((key) => key.indexOf("RequireItem") > -1);
                        let len = parseInt(keyArr.length / 3);
                        data.copyList = [];
                        for (let i = 1; i <= len; i++) {
                            if (data.copy["RequireItemType" + i]) {
                                data.copyList.push({
                                    item_id: data.copy["RequireItemType" + i] + "_" + data.copy["RequireItemIndex" + i],
                                    count: data.copy["RequireItemCount" + i],
                                });
                            }
                        }
                    }
                    this.book = data;
                })
                .finally(() => {
                    this.loading = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        //百科相关
        loadData: function () {
            // 获取最新攻略
            if (this.id) {
                wiki.mix({ type: "book", id: this.id, client: this.client }, { supply: 1 }).then((res) => {
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
            wiki.getById(this.post_id, { type: "book" }).then((res) => {
                this.wiki_post = res?.data?.data;
            });
            this.triggerStat();
        },
        publish_url: publishLink,
        triggerStat: function () {
            if (this.client == "origin") {
                postStat("origin_book", this.id);
            } else {
                postStat("book", this.id);
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
        idKey: function () {
            return this.$route.params.book_id;
        },
        id: function () {
            return parseInt(this.$route.params.book_id);
        },
        client() {
            return this.$store.state.client;
        },
        bookMapInfo() {
            return this.client === "std" ? bookMapInfoStd : bookMapInfoOrigin;
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
    },
};
</script>

<style lang="less">
@import "~@/assets/css/book/single.less";
</style>
