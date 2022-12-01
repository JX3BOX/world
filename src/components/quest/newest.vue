<template>
    <div class="m-quest-newest">
        <div class="u-newest-title">
            <i class="el-icon-collection"></i>
            <span>最新攻略</span>
        </div>
        <div class="u-newest-body">
            <div class="u-post" v-for="(post, key) in data" :key="key">
                <div class="u-post-head">
                    <div class="u-quest">
                        <router-link
                            class="u-quest-name"
                            :to="{
                                name: 'single',
                                params: {
                                    quest_id: post.source_id,
                                    source_id: post.id,
                                },
                            }"
                            target='_blank'
                            v-text="questName(post.title)"
                        ></router-link>
                        <div class="u-quest-level" v-text="'综合难度：' + star(post.level)"></div>
                        <div class="u-post-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                    </div>
                    <div class="u-post-user">
                        <div class="u-author">
                            <img class="u-icon" :src="post.user_avatar | showAvatar" :alt="post.user_nickname" />
                            <a
                                :href="post.user_id ? authorLink(post.user_id) : null"
                                class="u-name"
                                v-text="post.user_nickname"
                                target="_blank"
                            ></a>
                        </div>
                        <div class="u-updated" v-text="ts2str(post.updated)"></div>
                    </div>
                </div>
                <div class="u-post-body">
                    <div
                        class="u-excerpt"
                        :to="{
                            name: 'view',
                            params: { source_id: post.source_id },
                        }"
                        v-html="ellipsis(post.excerpt)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNewest } from "@/service/quest";
import { authorLink, ts2str, iconLink, showAvatar, getLink } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "QuestNewest",
    data() {
        return {
            data: [],
        };
    },
    mounted() {
        this.getData();
    },
    computed: {
        client() {
            return this.$store.state.client;
        },
    },
    methods: {
        authorLink,
        ts2str,
        iconLink,
        showAvatar,
        getLink,
        async getData() {
            const res = await getNewest(this.client);
            let data = res.data;
            if (data.code != 200) {
                this.$message.error(data.msg);
                return;
            }
            this.data = data.data.newest;
        },
        star(level) {
            return "⭐️".repeat(level ? level : 1);
        },
        ellipsis(value) {
            value = value ? value.trim() : "";
            if (value.length > 100) {
                return value.slice(0, 100) + "...";
            }
            return value;
        },
        questName(name) {
            return name || "未知任务";
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/quest/newest.less";
</style>
