<template>
    <div class="m-calendar-detail" v-loading="loading">
        <!-- 头部 -->
        <header class="m-calendar-detail-header">
            <h1 class="m-calendar-detail-title">{{ currentDate }}</h1>
            <el-button class="m-calendar-detail-add" size="medium" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        </header>

        <main class="m-calendar-detail-content">
            <!-- 活动 -->
            <section class="m-content-part" v-if="activities && activities.length">
                <div class="u-part-header">
                    <el-divider content-position="left"><i class="el-icon-s-flag"></i> 活动<span class="u-count">({{activities_count}})</span></el-divider>
                </div>
                <div class="m-part-content">
                    <div class="u-item" v-for="item in activities" :key="item.id" @click="view(item.id)">
                        <router-link class="u-primary" :to="`/view/${item.id}`">
                            <img class="u-icon" :src="iconLink(item.icon)" />
                            <span class="u-desc" :style="descStyle(item)" >{{ item.desc }}</span>
                        </router-link>

                        <div class="u-actions">
                            <span class="u-action u-comment" :to="`/view/${item.id}`">
                                <i class="u-comment-icon el-icon-chat-dot-round"></i
                                ><span class="u-comment-count"
                                    >评论</span
                                >
                                <!-- <em class="u-count">({{ item.count || 0 }})</em> -->
                            </span>

                            <span class="u-action u-edit" @click.stop="edit(item)" v-if="isEditor">
                                <i class="el-icon-edit-outline"></i>
                                <span class="u-edit-text">编辑</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 事件 -->
            <section class="m-content-part">
                <div class="u-part-header">
                    <el-divider content-position="left"><i class="el-icon-collection-tag"></i> 事件<span class="u-count">({{events_count}})</span></el-divider>
                </div>
                <div class="m-part-content">
                    <div class="u-item" v-for="item in events" :key="item.id" @click="view(item.id)">
                        <router-link class="u-primary" :to="`/view/${item.id}`">
                            <a class="u-author" @click.stop target="_blank" :href="authorLink(item.user_id)" :title="`由${item.user_info.display_name}贡献`"
                                ><img class="u-avatar" :src="showAvatar(item.user_info.user_avatar)" :alt="item.user_info.display_name"
                            /></a>
                            <span class="u-desc" :style="descStyle(item)" ><span v-if="item.is_top">⭐️</span>{{ item.desc }}</span>
                        </router-link>

                        <div class="u-actions">
                            <span class="u-action u-comment" :to="`/view/${item.id}`">
                                <i class="u-comment-icon el-icon-chat-dot-round"></i
                                ><span class="u-comment-count"
                                    >评论</span
                                >
                                <!-- <em class="u-count">({{ item.count || 0 }})</em> -->
                            </span>

                            <span class="u-action u-edit" @click.stop="edit(item)" v-if="isEditor">
                                <i class="el-icon-edit-outline"></i>
                                <span class="u-edit-text">编辑</span>
                            </span>

                            <!-- <el-popconfirm title="确认删除该事件吗?" >
                            <span class="u-action u-delete" @confirm="del(item)" slot="reference">
                                <i class="el-icon-delete"></i>
                                <span class="u-edit-text">删除</span>
                            </span>
                            </el-popconfirm> -->
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <calendar-dialog v-model="showAdd" :date-obj="dateObj" :selected="selected" @update="update"></calendar-dialog>
    </div>
</template>

<script>
    import { getCalendar, delCalendar } from "@/service/calendar.js";
    import calendar_dialog from "./calendar_dialog.vue";
    import { showAvatar, authorLink, iconLink } from "@jx3box/jx3box-common/js/utils";
    import User from "@jx3box/jx3box-common/js/user.js";
    export default {
        name: "calendar-detail",
        props: {
            dateObj: {
                type: Object,
                default: () => {},
            },
        },
        components: {
            "calendar-dialog": calendar_dialog,
        },
        data: () => ({
            showAdd: false,
            loading: false,
            list: [],
            selected: {},
        }),
        computed: {
            // 事件
            events() {
                return this.list?.filter((item) => item.type === 1);
            },
            // 活动
            activities() {
                return this.list?.filter((item) => item.type === 2);
            },
            currentDate() {
                const { year, month, date } = this.dateObj;
                return `${year} / ${month} / ${date}`;
            },
            isEditor() {
                return User.isEditor();
            },
            // 统计
            events_count : function (){
                return this.events?.length || 0
            },
            activities_count : function (){
                return this.activities?.length || 0
            }
        },
        watch: {
            dateObj: {
                deep: true,
                handler() {
                    this.loadData();
                },
            },
        },
        methods: {
            // 数据
            // ======================
            loadData() {
                this.loading = true;
                return getCalendar(this.dateObj)
                    .then((res) => {
                        this.list = res.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            // 操作
            // ======================
            // 添加
            add() {
                this.selected = {};
                this.showAdd = true;
            },
            // 编辑
            edit(item) {
                this.selected = item;
                this.showAdd = true;
            },
            // 提交
            update() {
                this.loadData().then(() => {
                    this.$emit("update");
                });
                this.showAdd = false;
            },
            // 删除
            del({ id }) {
                delCalendar(id).then(() => {
                    this.list = this.list.filter((record) => record.id !== id);
                });
            },
            // 查看
            view(id) {
                this.$router.push(`/view/${id}`);
            },

            // 过滤方法
            // =========================
            authorLink,
            iconLink,
            showAvatar,
            descStyle({ color }) {
                return color ? { color, fontWeight: "bold" } : {};
            },
        },
    };
</script>

<style lang="less">
    @import "~@/assets/css/calendar/calendar_detail.less";
</style>
