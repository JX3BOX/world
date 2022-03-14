<template>
    <div class="v-calendar-single">
        <section class="m-today" v-loading="todayLoading">
            {{ today }}

            <Comment :id="id" category="calendar" />
        </section>

        <section class="m-history" v-loading="historyLoading">
            <header class="u-header">那年今日</header>

            <div class="m-history-content">
                <div class="m-history-item" v-for="item in history" :key="item.id">
                    <time class="u-time">{{ formatDate(item) }}</time>
                    <router-link :to="'/detail/' + item.id" class="u-desc" >{{ item.desc }}</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { getDetail, getHistory } from '@/service/calendar.js';
import Comment from '@jx3box/jx3box-comment-ui/src/Comment.vue';
import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
    name: "SingleCalendar",
    components: {
        Comment
    },
    data() {
        return {
            today: '',
            history: {},
            todayLoading: false,
            historyLoading: false,
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        params({ today }) {
            return today ? {
                month: today.month,
                date: today.date
            } : ''
        }
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.loadData()
                }
            }
        },
        params: {
            deep: true,
            handler(val) {
                if (val) {
                    this.loadHistory(val)
                }
            }
        }
    },
    methods: {
        loadData() {
            this.todayLoading = true;
            getDetail(this.id).then(res => {
                this.today = res.data.data
            }).finally(() => {
                postStat('calendar', this.id);
                this.todayLoading = false
            })
        },
        loadHistory(params) {
            this.historyLoading = true
            getHistory(params, { mode: 'all' }).then(res => {
                this.history = (res.data.data || []).reverse()
            }).finally(() => {
                this.historyLoading = false
            })
        },
        formatDate({ year, month, date }) {
            return `${year}年${month}月${date}日`
        }
    }
}
</script>

<style lang="less">
@import "~@/assets/css/calendar/single.less";
</style>