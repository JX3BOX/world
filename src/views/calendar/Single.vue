<template>
    <div class="m-calendar-single">
        <section class="m-single-block m-today" v-loading="todayLoading">
            {{ today }}
            <header class="m-single-title m-history-header"><i :class="today.type == 1 ? 'el-icon-collection-tag' : 'el-icon-s-flag'"></i>{{ today.type == 1 ? "事件" : "活动" }}记录</header>
            <div class="m-today-content">
                <i class="u-client" :class="today.client">{{ today.client == "std" ? "正式服" : "怀旧服" }}</i
                >{{ today.desc }}
            </div>
            <div class="m-today-meta">
                <!-- TODO:作者信息 -->
            </div>
        </section>

        <div class="m-single-block m-reference">
            <header class="m-single-title m-history-header"><i class="el-icon-connection"></i>参考资料</header>
        </div>

        <section class="m-single-block m-history" v-loading="historyLoading">
            <header class="m-single-title m-history-header"><i class="el-icon-date"></i>那年今日</header>
            <div class="m-history-content">
                <div class="m-history-item" v-for="item in history" :key="item.id">
                    <time class="u-time">{{ formatDate(item) }}</time>
                    <router-link :to="'/detail/' + item.id" class="u-desc">{{ item.desc }}</router-link>
                </div>
            </div>
        </section>

        <Thx :postId="id" postType="calendar" :userId="author" :adminBoxcoinEnable="true" :userBoxcoinEnable="true" />

        <Comment class="m-comment" :id="id" category="calendar" />
    </div>
</template>

<script>
    import { getDetail, getHistory } from "@/service/calendar.js";
    import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
    import { postStat } from "@jx3box/jx3box-common/js/stat";
    export default {
        name: "SingleCalendar",
        components: {
            Comment,
        },
        data() {
            return {
                today: "",
                history: {},
                todayLoading: false,
                historyLoading: false,
            };
        },
        computed: {
            id() {
                return this.$route.params.id;
            },
            author() {
                return this.today.user_id;
            },
            params({ today }) {
                return today
                    ? {
                          month: today.month,
                          date: today.date,
                      }
                    : "";
            },
        },
        watch: {
            id: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.loadData();
                    }
                },
            },
            params: {
                deep: true,
                handler(val) {
                    if (val) {
                        this.loadHistory(val);
                    }
                },
            },
        },
        methods: {
            loadData() {
                this.todayLoading = true;
                getDetail(this.id)
                    .then((res) => {
                        this.today = res.data.data;
                    })
                    .finally(() => {
                        postStat("calendar", this.id);
                        this.todayLoading = false;
                    });
            },
            loadHistory(params) {
                this.historyLoading = true;
                getHistory(params, { mode: "all" })
                    .then((res) => {
                        this.history = (res.data.data || []).reverse();
                    })
                    .finally(() => {
                        this.historyLoading = false;
                    });
            },
            formatDate({ year, month, date }) {
                return `${year}年${month}月${date}日`;
            },
        },
    };
</script>

<style lang="less">
    @import "~@/assets/css/calendar/single.less";
</style>
