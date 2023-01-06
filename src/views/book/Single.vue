<template>
    <div v-loading="loading" class="m-book-view">
        <div class="m-search">
            <search-input></search-input>
        </div>
        <div class="m-book-content">
            <div class="w-book">
                <p class="u-title__warpper">
                    <span class="u-name-icon">
                        <item-icon v-if="book.ItemID" :item_id="book.ItemID" :size="36"></item-icon>
                    </span>
                    <span class="u-title-id"> ID:{{ book.idKey }} </span>
                    <span class="u-desc" v-html="book.Desc"></span>
                </p>
                <div class="u-info__wrapper">
                    <div v-if="book.contentInfo" class="book-info__content">
                        <p class="u-subtitle">【书籍内容】</p>
                        <div class="book-content" v-html="book.contentInfo"></div>
                    </div>
                    <div class="common-info__content">
                        <p class="u-subtitle">【书籍信息】</p>
                        <div class="u-book-info">
                            <div class="u-item">类型：{{ getProfessionType(book.ExtendProfessionID1) }}</div>
                            <div class="u-item">来源：{{ getOrigin(book.DoodadTemplateID) }}</div>
                            <div class="u-item">套书：{{ book.BookName }}</div>
                            <div class="u-item">抄录相关：</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-comment">
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="book" />
        </div>
    </div>
</template>

<script>
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
    components: {
        ItemIcon,
        SearchInput,
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
    methods: {
        getOrigin(tempId) {
            return tempId && this.bookMapInfo[tempId] ? "碑铭" : "其它";
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
