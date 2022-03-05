<template>
    <div class="v-calendar m-calendar">
        <main class="m-calendar-main">
            <!-- 年份切换 -->
            <section class="m-calendar-year">
                <el-button icon="el-icon-arrow-left" size="medium" :disabled="prevDisabled" @click="toggleYear('prev')" class="u-btn"></el-button>
                <span class="u-year">{{ current.year }}</span>
                <el-button icon="el-icon-arrow-right" size="medium" :disabled="nextDisabled" @click="toggleYear('next')" class="u-btn"></el-button>
            </section>
            <!-- 月份切换 -->
            <section class="m-calendar-month">
                <!-- TODO:标语调用 -->
                <div class="u-slogan">烟花三月下扬州</div>
                <el-button-group>
                    <el-button v-for="(item, index) in months" :key="index" size="medium" class="u-month" @click="toggleMonth(index)" :class="{active : current.month - 1 == index}">{{ item }}</el-button>
                </el-button-group>
            </section>
            <section class="m-calendar-content">
                <section class="m-calendar-week">
                    <div class="u-week" v-for="week in weeks" :key="week">
                        <span>{{ week }}</span>
                    </div>
                </section>
                <section class="m-calendar-date">
                    <div
                        v-for="(item, index) in dataArr"
                        class="u-date"
                        @click.prevent="dateClick(item)"
                        :class="[{ 'u-other': ['pre', 'next'].includes(item.type) }, { 'u-today': isToday(item) }, { 'u-current': isCurrent(item) }]"
                        :key="index"
                    >
                        {{ item.date }}
                    </div>
                </section>
            </section>
        </main>
        <transition name="fade">
            <aside class="m-calendar-aside" v-if="isExact">
                <calendar-detail></calendar-detail>
            </aside>
        </transition>
    </div>
</template>

<script>
import { months, weeks } from "@/assets/data/calendar.json";
import calendarDetail from "@/components/calendar/calendar_detail.vue";

export default {
    name: "Archive",
    components: {
        calendarDetail,
    },
    data: () => ({
        current: {
            year: "",
            month: "",
            date: "",
        },
        months,
        weeks,

        dataArr: [],
    }),
    computed: {
        // 禁止下一年
        nextDisabled() {
            const this_year = new Date().getFullYear();
            return this_year + 1 <= this.current.year;
        },
        // 禁止上一年
        prevDisabled() {
            // jx3 公测 2009
            return this.current.year <= 2009;
        },
        params() {
            const { year, month, date } = this.current;
            return {
                year,
                month,
                date,
            };
        },
        today() {
            return new Date().getDate();
        },
        isExact() {
            return !!this.current.date;
        },
    },
    mounted() {
        this.init();
        this.dataArr = this.getMonthData();
    },
    methods: {
        /**
         * 切换年份
         * @param {String}} action next 下一年 prev 上一年
         */
        toggleYear(action) {
            action === "prev" ? (this.current.year -= 1) : (this.current.year += 1);

            this.current.date = 0;

            this.dataArr = this.getMonthData();
        },
        /**
         * 切换月份
         * @param {number} num
         */
        toggleMonth(num) {
            this.current.month = num + 1;

            this.current.date = 0;

            this.dataArr = this.getMonthData();
        },
        // 获取指定月份数据
        getMonthData() {
            const { year, month } = this.current;
            let dataArr = [];
            let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // 闰年
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                daysInMonth[1] = 29;
            }

            const monthStartWeekday = new Date(year, month - 1, 1).getDay();
            const monthEndtWeekday = new Date(year, month, 1).getDay() || 7;

            const preInfo = this.getPreMonth(this.current);
            const nextInfo = this.getNextMonth();

            for (let i = 0; i < monthStartWeekday; i++) {
                let preObj = {
                    type: "pre",
                    date: daysInMonth[preInfo.month - 1] - (monthStartWeekday - i - 1),
                    month: preInfo.month,
                    year: preInfo.year,
                };
                dataArr.push(preObj);
            }

            for (let i = 0; i < daysInMonth[month - 1]; i++) {
                let itemObj = {
                    type: "normal",
                    date: i + 1,
                    month,
                    year,
                };
                dataArr.push(itemObj);
            }

            for (let i = 0; i < 7 - monthEndtWeekday; i++) {
                let nextObj = {
                    type: "next",
                    date: i + 1,
                    month: nextInfo.month,
                    year: nextInfo.year,
                };
                dataArr.push(nextObj);
            }

            return dataArr;
        },
        // 获取前一个月的年月日信息
        getPreMonth(date, defaultDate = 1) {
            let { year, month } = date || this.current;

            if (month === 1) {
                year -= 1;
                month = 12;
            } else {
                month -= 1;
            }

            return { year, month, date: defaultDate };
        },
        // 获取后一个月的年月日信息
        getNextMonth(defaultDate = 1) {
            let { year, month } = this.current;
            if (month === 12) {
                year += 1;
                month = 1;
            } else {
                month += 1;
            }

            return { year, month, date: defaultDate };
        },
        dateClick({ date, month, year }) {
            this.current.year = year;
            this.current.month = month;
            this.current.date = date;
            this.dataArr = this.getMonthData();
        },
        isToday({ year, month, date }) {
            const dateObj = new Date();

            return dateObj.getFullYear() === year && dateObj.getMonth() + 1 === month && dateObj.getDate() === date;
        },
        isCurrent({ year, month, date }) {
            const { current } = this;

            return current.year === year && current.month === month && current.date === date;
        },
        // 点击当前日期
        init() {
            // const date = new Date();
            // this.current.year = date.getFullYear();
            // this.current.month = date.getMonth() + 1;
            // this.current.date = date.getDate();
        },
    },
    watch: {
        "$route.params": {
            immediate: true,
            handler: function ({ year, month, date }) {
                this.current = { year: ~~year, month: ~~month, date: ~~date || 0 };
            },
        },
    },
};
</script>
