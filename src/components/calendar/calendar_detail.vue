<template>
    <div class="m-calendar-detail" v-loading="loading">
        <header class="u-date">{{ currentDate }}</header>
        <el-button class="u-add-btn" size="medium" type="primary" icon="el-icon-plus" @click="add">新增</el-button>

        <main class="m-content">
            <section class="m-content-part">
                <div class="u-part-header">
                    <el-divider content-position="left"><i class="el-icon-s-order"></i> 事件</el-divider>
                </div>
                <div class="m-part-content">
                    <div class="u-item" v-for="item in events" :key="item.id" :title="item.desc">
                        <img class="u-avatar" :src="showAvatar(item.user_info.user_avatar)" :alt="item.user_info.display_name">
                        <span class="u-desc" :style="descStyle(item)">{{ item.desc }}</span>
                        <div class="u-actions" v-if="isEditor">
                            <el-button type="text" icon="el-icon-s-comment" title="评论"></el-button>
                            <el-button type="text" icon="el-icon-edit-outline" title="编辑" @click="edit(item)"></el-button>
                            <el-popconfirm title="确认删除该事件吗?" @confirm="del(item)">
                                <el-button slot="reference" class="u-del-btn" type="text" icon="el-icon-delete" title="删除"></el-button>
                            </el-popconfirm>
                        </div>
                    </div>
                </div>
            </section>
            <section class="m-content-part">
                <div class="u-part-header">
                    <el-divider content-position="left"><i class="el-icon-s-flag"></i> 活动</el-divider>
                </div>
                <div class="m-part-content">
                    <div class="u-item" v-for="item in activities" :key="item.id" :title="item.desc">
                        <img class="u-avatar" :src="item.img">
                        <span class="u-desc" :style="descStyle(item)">{{ item.desc }}</span>
                        <div class="u-actions" v-if="isEditor">
                            <el-button type="text" icon="el-icon-s-comment" title="评论"></el-button>
                            <el-button type="text" icon="el-icon-edit-outline" title="编辑"></el-button>
                            <el-popconfirm title="确认删除该活动吗?" @confirm="del(item)">
                                <el-button slot="reference" class="u-del-btn" type="text" icon="el-icon-delete" title="删除"></el-button>
                            </el-popconfirm>
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
import { showAvatar } from '@jx3box/jx3box-common/js/utils';
import User from '@jx3box/jx3box-common/js/user.js';
export default {
    name: "calendar-detail",
    props: {
        dateObj: {
            type: Object,
            default: () => {},
        }
    },
    components: {
        "calendar-dialog": calendar_dialog,
    },
    data: () => ({
        showAdd: false,
        loading: false,
        list: [],
        selected: {}
    }),
    computed: {
        // 事件
        events() {
            return this.list?.filter(item => item.type === 1)
        },
        // 活动
        activities() {
            return this.list?.filter(item => item.type === 2)
        },
        currentDate() {
            const { year, month, date } = this.dateObj;
            return `${year} / ${month} / ${date}`
        },
        isEditor() {
            return User.isEditor()
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
        showAvatar,
        descStyle({ color }) {
            return color ? { color, fontWeight: 'bold' } : {}
        },
        add() {
            this.selected = {}
            this.showAdd = true;
        },
        update() {
            this.loadData().then(() => {
                this.$emit("update");
            });
            this.showAdd = false;
        },
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
        /**
         * 编辑日历
         * @param {Object} item 待选日历
         */
        edit(item) {
            this.selected = item;
            this.showAdd = true
        },
        // 删除日历
        del({ id }) {
            delCalendar(id).then(() => {
                this.list = this.list.filter(record => record.id !== id)
            })
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/calendar/calendar_detail.less";
</style>
