<template>
    <div class="m-calendar-detail" v-loading="loading">
        <!-- 头部 -->
        <header class="m-calendar-detail-header">
            <h1 class="m-calendar-detail-title">{{ currentDate }}</h1>
            <el-button class="m-calendar-detail-add" size="medium" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        </header>

        <main class="m-calendar-detail-content">
            <!-- 活动 -->
            <section class="m-content-part">
                <div class="u-part-header">
                    <el-divider content-position="left"
                        ><i class="el-icon-s-flag"></i> 活动<span class="u-count">({{ activities_count }})</span></el-divider
                    >
                </div>
                <div class="m-part-content">
                    <template v-if="activities && activities.length">
                        <calendar-detail-item class="u-item" v-for="item in activities" :key="item.id" :data="item" @edit="edit" />
                    </template>
                    <template v-else>
                        <div class="u-null"><i class="el-icon-warning-outline"></i>暂时没有任何活动记录</div>
                    </template>
                </div>
            </section>

            <!-- 事件 -->
            <section class="m-content-part" v-if="events && events.length">
                <div class="u-part-header">
                    <el-divider content-position="left"
                        ><i class="el-icon-collection-tag"></i> 事件<span class="u-count">({{ events_count }})</span></el-divider
                    >
                </div>
                <div class="m-part-content">
                    <template v-if="events && events.length">
                        <calendar-detail-item class="u-item" v-for="item in events" :key="item.id" :data="item" @edit="edit" />
                    </template>
                    <template v-else>
                        <div class="u-null"><i class="el-icon-warning-outline"></i>暂时没有任何事件记录</div>
                    </template>
                </div>
            </section>
        </main>

        <calendar-dialog v-model="showAdd" :date-obj="dateObj" :selected="selected" @update="update" @del="del"></calendar-dialog>
    </div>
</template>

<script>
    import { getCalendar, delCalendar } from "@/service/calendar.js";
    import calendar_dialog from "./calendar_dialog.vue";
    import calendar_detail_item from "./calendar_detail_item.vue";
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
            "calendar-detail-item": calendar_detail_item,
        },
        data: () => ({
            showAdd: false,
            loading: false,
            list: [],
            selected: {},
        }),
        computed: {
            currentDate() {
                const { year, month, date } = this.dateObj;
                return `${year} / ${month} / ${date}`;
            },
            // 事件
            events() {
                return this.list?.filter((item) => item.type === 1);
            },
            // 活动
            activities() {
                return this.list?.filter((item) => item.type === 2);
            },
            // 统计
            events_count: function () {
                return this.events?.length || 0;
            },
            activities_count: function () {
                return this.activities?.length || 0;
            },
        },
        watch: {
            dateObj: {
                deep: true,
                immediate: true,
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
            update(res) {
                let { data } = res?.data;

                if (data) {
                    data.desc = `(待审核) ${data.desc}`;
                    data.user_info = {
                        display_name: User.getInfo().name,
                        user_avatar: User.getInfo().avatar,
                    };
                    this.list.unshift(data);

                    this.$notify({
                        type: "success",
                        title: "提交成功",
                        message: "请耐心等待审核",
                    });
                }
                // this.loadData().then(() => {
                //     this.$emit("update");
                // });
                this.showAdd = false;
            },
            // 删除
            del(id) {
                delCalendar(id).then(() => {
                    this.list = this.list.filter((record) => record.id !== id);
                    this.showAdd = false;
                });
            },
        },
    };
</script>

<style lang="less">
    @import "~@/assets/css/calendar/calendar_detail.less";
</style>