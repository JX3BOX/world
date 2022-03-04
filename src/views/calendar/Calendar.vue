<template>
    <div class="v-calendar">
        <!-- 年份切换 -->
        <section class="m-calendar-year">
            <el-button
                icon="el-icon-arrow-left"
                size="mini"
                :disabled="prevDisabled"
                @click="toggleYear('prev')"
            ></el-button>
            <span class="u-year">{{ current.year }}</span>
            <el-button
                icon="el-icon-arrow-right"
                size="mini"
                :disabled="nextDisabled"
                @click="toggleYear('next')"
            ></el-button>
        </section>
        <!-- 月份切换 -->
        <section class="m-calendar-month">
            <el-button-group>
                <el-button
                    v-for="(item, index) in months"
                    :type="current.month - 1 == index ? 'primary' : ''"
                    :key="index"
                    size="small"
                    clas="u-month"
                    @click="toggleMonth(index)"
                    >{{ item }}月</el-button
                >
            </el-button-group>
        </section>
        <main class="m-calendar-content">
            <section class="m-calendar-week">
                <div class="u-week" v-for="week in weeks" :key="week">
                    <span>{{ week }}</span>
                </div>
            </section>
            <section class="m-calendar-date">
                <div
                    class="u-date"
                    v-for="(item, index) in dataArr"
                    :key="index"
                >
                    {{ item }}
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import { months, weeks } from "@/assets/data/calendar.json";

export default {
    name: "Calendar",
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
            action === "prev"
                ? (this.current.year -= 1)
                : (this.current.year += 1);

            this.current.date = 1;
        },
        /**
         * 切换月份
         * @param {number} num
         */
        toggleMonth(num) {
            this.current.month = num;

            this.current.date = 1;
        },
        // 获取指定月份数据
        getMonthData() {
            const { year, month, date } = this.current;
            let dataArr = [];
            let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // 闰年
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                daysInMonth[1] = 29;
            }

            const monthStartWeekday = new Date(year, month - 1, 1).getDay();
            const monthEndtWeekday = new Date(year, month, 1).getDay() || 7;

            for (let i = 0; i < monthStartWeekday; i++) {
                let emptyObj = {
                    type: "pre",
                    date: daysInMonth,
                    month: "",
                    year: "",
                };
                dataArr.push(emptyObj);
            }

            for (let i = 0; i < daysInMonth[month - 1]; i++) {
                let emptyObj = {
                    type: "normal",
                    day: "",
                    month: "",
                    year: "",
                };
                dataArr.push(emptyObj);
            }

            for (let i = 0; i < 6 - monthEndtWeekday; i++) {
                let emptyObj = {
                    type: "next",
                    day: "",
                    month: "",
                    year: "",
                };
                dataArr.push(emptyObj);
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
        init() {
            const date = new Date();
            this.current.year = date.getFullYear();
            this.current.month = date.getMonth() + 1;
            this.current.date = date.getDate();
        },
    },
};
</script>
