<template>
    <div class="m-calendar-detail-item" @click="view(data.id)">
        <div class="u-primary" :to="`/view/${data.id}`">
            <!-- 图标 -->
            <img v-if="data.type == 2" class="u-icon" :src="iconLink(data.icon)" />
            <a v-else class="u-author" @click.stop target="_blank" :href="authorLink(data.user_id)" :title="`由${data.user_info.display_name}贡献`"
                ><img class="u-avatar" :src="showAvatar(data.user_info.user_avatar)" :alt="data.user_info.display_name"
            /></a>
            <!-- 文本 -->
            <span class="u-desc" :style="descStyle(data)"
                ><i class="u-client" v-if="data.type == 1" :class="data.client">{{ data.client == "std" ? "正" : "怀" }}</i
                >{{ data.desc }}</span
            >
        </div>

        <div class="u-actions">
            <span class="u-action u-comment">
                <i class="u-comment-icon el-icon-chat-dot-round"></i>
                <span class="u-comment-count">评论</span>
                <!-- <em class="u-count">({{ data.count || 0 }})</em> -->
            </span>

            <span class="u-action u-reference">
                <i class="u-reference-icon el-icon-connection"></i>
                <span class="u-reference-count"
                    >参考资料<span class="u-count">({{ getRefCount(data) }})</span></span
                >
            </span>

            <span class="u-action u-edit" @click.stop="edit(data)" v-if="isEditor">
                <i class="el-icon-edit-outline"></i>
                <span class="u-edit-text">编辑</span>
            </span>
        </div>
    </div>
</template>

<script>
    import { showAvatar, authorLink, iconLink } from "@jx3box/jx3box-common/js/utils";
    import User from "@jx3box/jx3box-common/js/user.js";
    export default {
        name: "CalendarDetailItem",
        props: ["type", "data"],
        components: {},
        data: function () {
            return {};
        },
        computed: {
            isEditor() {
                return User.isEditor();
            },
        },
        watch: {},
        methods: {
            // 查看
            view(id) {
                this.$router.push(`/view/${id}`);
            },
            // 编辑
            edit(data) {
                this.$emit("edit", data);
            },

            // 过滤方法
            // =========================
            authorLink,
            iconLink,
            showAvatar,
            descStyle({ color }) {
                return color ? { color, fontWeight: "bold" } : {};
            },
            getRefCount(item) {
                if (item.link?.length) {
                    return item.link.length;
                } else {
                    return item.link_temp ? 1 : 0;
                }
            },
        },
    };
</script>

<style lang="less">
@import "~@/assets/css/calendar/calendar_detail_item.less";
</style>
