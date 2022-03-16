<template>
    <div class="m-calendar-single">
        <section class="m-actions">
            <el-button icon="el-icon-arrow-left" @click="goBack" size="small">返回</el-button>
            <el-button icon="el-icon-setting" type="primary" size="small" @click="manage">管理</el-button>
        </section>
        <section class="m-single-block m-today" v-loading="todayLoading">
            <!-- {{ today.desc }} -->
            <header class="m-single-title m-history-header"><i :class="today.type == 1 ? 'el-icon-collection-tag' : 'el-icon-s-flag'"></i>{{ today.type == 1 ? "事件" : "活动" }}记录</header>
            <div class="m-today-content">
                <i class="u-client" :class="today.client">{{ today.client == "std" ? "正式服" : "怀旧服" }}</i
                >{{ today.desc }}
            </div>
            <div class="m-today-meta" v-if="today && today.user_info">
                <span class="u-user">
                    <img :src="showAvatar(today.user_info.user_avatar)" width="24" height="24" alt="">
                    <a
                        :href="authorLink(today.user_id)"
                        target="_blank"
                    >{{ today.user_info.display_name }}</a>
                </span>
                <span class="u-create-time" title="创建时间">
                    <i class="el-icon-date"></i>
                    <time>{{ showTime(today.created_at) }}</time>
                </span>
            </div>
        </section>

        <div class="m-single-block m-reference">
            <header class="m-single-title m-history-header"><i class="el-icon-connection"></i>参考资料</header>
            <div class="m-reference-item" v-for="(reference, index) in references" :key="index">
                <label class="u-index">{{ index + 1 }}.</label>
                <a class="u-link" :href="reference.url" target="_blank">{{ reference.label }} <i class="el-icon-link"></i></a>
            </div>
        </div>

        <section class="m-single-block m-history" v-loading="historyLoading">
            <header class="m-single-title m-history-header"><i class="el-icon-date"></i>那年今日</header>
            <div class="m-history-content">
                <el-timeline>

                </el-timeline>
                <div class="m-history-item" v-for="item in history" :key="item.id">
                    <time class="u-time">{{ formatDate(item) }}</time>
                    <router-link :to="'/detail/' + item.id" class="u-desc">{{ item.desc }} <i class="el-icon-link"></i></router-link>
                </div>
            </div>
        </section>

        <Thx :postId="id" postType="calendar" :userId="author" :adminBoxcoinEnable="true" :userBoxcoinEnable="true" />

        <Comment class="m-comment" :id="id" category="calendar" />

        <calendar-dialog v-model="visible" :date-obj="dateObj" :selected="today" mode="update"></calendar-dialog>
    </div>
</template>

<script>
    import { getDetail, getHistory } from "@/service/calendar.js";
    import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
    import calendar_dialog from '@/components/calendar/calendar_dialog.vue';
    import { postStat } from "@jx3box/jx3box-common/js/stat";
    import { showAvatar, authorLink } from '@jx3box/jx3box-common/js/utils';
    import { showTime } from '@jx3box/jx3box-common/js/moment';
    export default {
        name: "SingleCalendar",
        components: {
            Comment,
            'calendar-dialog': calendar_dialog,
        },
        data() {
            return {
                today: "",
                history: {},
                todayLoading: false,
                historyLoading: false,

                // 弹窗
                visible: false
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
            dateObj() {
                return {
                    year: this.today.year,
                    month: this.today.month,
                    date: this.today.date,
                }
            },
            references() {
                let arr = [];
                const { link, link_temp, desc } = this.today;

                link && (arr = [...link])

                if (link_temp && !arr.some(item => item.url === link_temp)) {
                    arr.push({
                        label: '官方新闻',
                        url: link_temp
                    })
                }
                return arr
            },
            timelineData() {
                let history;
                history = this.history.reduce((acc, obj) => {
                    const key = obj.year;
                    if (!acc[key]) {
                        acc[key] = []
                    }
                    acc[key].push(obj)

                    return acc
                }, {})

                return history || {}
            }
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
            // ====== 数据获取 ==========
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

            // ========= other ==========
            goBack() {
                // 如果存在历史则返回上一个记录，否则返回月历页面
                history.length ? history.go(-1) : this.$router.push(`/archive/${this.dateObj.year}/${this.dateObj.month}`)
            },
            manage() {
                this.visible = true
            },

            // ========= filters =========
            formatDate({ year, month, date }) {
                return `${year}年${month}月${date}日`;
            },
            showAvatar(val) {
                return showAvatar(val, 24)
            },
            authorLink,
            showTime
        },
    };
</script>

<style lang="less">
    @import "~@/assets/css/calendar/single.less";
</style>
